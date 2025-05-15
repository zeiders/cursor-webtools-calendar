import { CalendarRequestParams, CalendarResponseWS } from '../types/calendar';

export class CalendarEventService {
  private static instance: CalendarEventService;
  private abortControllers: Map<string, AbortController> = new Map();
  private baseUrl = 'https://xml.calendars.illinois.edu';
  private defaultSchemaId = 'eventXML16';

  private constructor() {}

  public static getInstance(): CalendarEventService {
    if (!CalendarEventService.instance) {
      CalendarEventService.instance = new CalendarEventService();
    }
    return CalendarEventService.instance;
  }

  private getRequestUrl(params: CalendarRequestParams): string {
    const { schemaId = this.defaultSchemaId, calendarId, pageNumber = 0, startDate, endDate, keywords, search, eventType } = params;
    const url = new URL(`${this.baseUrl}/${schemaId}/${calendarId}.xml`);
    
    // Add required parameters
    url.searchParams.append('pageNumber', pageNumber.toString());
    url.searchParams.append('startDate', startDate);
    
    // Add optional parameters if they exist
    if (endDate) url.searchParams.append('endDate', endDate);
    if (keywords) url.searchParams.append('keywords', keywords);
    if (search) url.searchParams.append('search', search);
    
    // Handle eventType (can be string or array of strings)
    if (eventType) {
      if (Array.isArray(eventType)) {
        eventType.forEach(type => url.searchParams.append('eventType', type));
      } else {
        url.searchParams.append('eventType', eventType);
      }
    }
    
    return url.toString();
  }

  private getRequestId(params: CalendarRequestParams): string {
    return `${params.calendarId}_${params.pageNumber || 0}_${params.startDate}`;
  }

  public cancelRequest(params: CalendarRequestParams): void {
    const requestId = this.getRequestId(params);
    if (this.abortControllers.has(requestId)) {
      this.abortControllers.get(requestId)?.abort();
      this.abortControllers.delete(requestId);
    }
  }

  public async fetchEvents(params: CalendarRequestParams): Promise<CalendarResponseWS> {
    const requestId = this.getRequestId(params);
    
    // Cancel any existing request with the same ID
    this.cancelRequest(params);
    
    // Create a new AbortController for this request
    const abortController = new AbortController();
    this.abortControllers.set(requestId, abortController);
    
    try {
      const url = this.getRequestUrl(params);
      const response = await fetch(url, {
        signal: abortController.signal,
        headers: {
          'Accept': 'application/xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Parse the XML response into a JavaScript object
      const responseWS: CalendarResponseWS = this.parseXmlResponse(xmlDoc);
      
      return responseWS;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }
      throw error;
    } finally {
      // Clean up the AbortController
      this.abortControllers.delete(requestId);
    }
  }

  private parseXmlResponse(xmlDoc: Document): CalendarResponseWS {
    const response: CalendarResponseWS = {
      deprecated: this.getBooleanValue(xmlDoc, 'deprecated'),
      maxPageSize: this.getNumberValue(xmlDoc, 'maxPageSize'),
      publicEventWS: [],
    };

    // Get endOfServiceDate if exists
    const endOfServiceDate = this.getTextValue(xmlDoc, 'endOfServiceDate');
    if (endOfServiceDate) {
      response.endOfServiceDate = endOfServiceDate;
    }

    // Parse all publicEventWS elements
    const publicEventNodes = xmlDoc.getElementsByTagName('publicEventWS');
    for (let i = 0; i < publicEventNodes.length; i++) {
      const eventNode = publicEventNodes[i];
      
      const event = {
        calendarId: this.getNumberValue(eventNode, 'calendarId'),
        calendarName: this.getTextValue(eventNode, 'calendarName') || '',
        eventId: this.getNumberValue(eventNode, 'eventId'),
        recurrence: this.getBooleanValue(eventNode, 'recurrence'),
        recurrenceId: this.getNumberValue(eventNode, 'recurrenceId'),
        originatingCalendarId: this.getNumberValue(eventNode, 'originatingCalendarId'),
        originatingCalendarName: this.getTextValue(eventNode, 'originatingCalendarName') || '',
        dateDisplay: this.getBooleanValue(eventNode, 'dateDisplay'),
        inPersonEvent: this.getBooleanValue(eventNode, 'inPersonEvent'),
        costFree: this.getBooleanValue(eventNode, 'costFree'),
        audienceFacultyStaff: this.getBooleanValue(eventNode, 'audienceFacultyStaff'),
        audienceStudents: this.getBooleanValue(eventNode, 'audienceStudents'),
        audiencePublic: this.getBooleanValue(eventNode, 'audiencePublic'),
        audienceAlumni: this.getBooleanValue(eventNode, 'audienceAlumni'),
        audienceParents: this.getBooleanValue(eventNode, 'audienceParents'),
        shareWithUrbanaEventsInChicagoArea: this.getBooleanValue(eventNode, 'shareWithUrbanaEventsInChicagoArea'),
        shareWithResearch: this.getBooleanValue(eventNode, 'shareWithResearch'),
        shareWithSpeakers: this.getBooleanValue(eventNode, 'shareWithSpeakers'),
        shareWithIllinoisMobileApp: this.getBooleanValue(eventNode, 'shareWithIllinoisMobileApp'),
        thumbImageUploaded: this.getBooleanValue(eventNode, 'thumbImageUploaded'),
        largeImageUploaded: this.getBooleanValue(eventNode, 'largeImageUploaded'),
        largeImageSize: this.getNumberValue(eventNode, 'largeImageSize'),
        virtualEvent: this.getBooleanValue(eventNode, 'virtualEvent'),
      };
      
      // Handle optional string fields
      const optionalStringFields = [
        'title', 'titleURL', 'eventType', 'sponsor', 'startDate', 'endDate', 
        'timeType', 'startTime', 'endTime', 'endTimeLabel', 'location', 
        'description', 'speaker', 'registrationLabel', 'registrationURL', 
        'contactName', 'contactEmail', 'contactPhone', 'cost', 'createdBy', 
        'createdDate', 'editedBy', 'editedDate', 'summary', 'virtualEventURL'
      ];
      
      optionalStringFields.forEach(field => {
        const value = this.getTextValue(eventNode, field);
        if (value !== null) {
          (event as any)[field] = value;
        }
      });
      
      // Handle topics if any
      const topicNodes = eventNode.getElementsByTagName('topic');
      if (topicNodes.length > 0) {
        const topics = [];
        for (let j = 0; j < topicNodes.length; j++) {
          const topicNode = topicNodes[j];
          topics.push({
            id: this.getNumberValue(topicNode, 'id'),
            name: this.getTextValue(topicNode, 'name') || '',
          });
        }
        if (topics.length > 0) {
          (event as any).topic = topics;
        }
      }
      
      response.publicEventWS?.push(event);
    }
    
    return response;
  }

  private getTextValue(element: Document | Element, tagName: string): string | null {
    const node = element.getElementsByTagName(tagName)[0];
    return node ? node.textContent : null;
  }

  private getNumberValue(element: Document | Element, tagName: string): number {
    const value = this.getTextValue(element, tagName);
    return value ? parseInt(value, 10) : 0;
  }

  private getBooleanValue(element: Document | Element, tagName: string): boolean {
    const value = this.getTextValue(element, tagName);
    return value === 'true';
  }
} 