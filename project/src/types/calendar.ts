// TypeScript interfaces based on calendarResponse.xsd

export interface Topic {
  id: number;
  name: string;
}

export interface PublicEventWS {
  calendarId: number;
  calendarName: string;
  
  eventId: number;
  recurrence: boolean;
  recurrenceId: number;
  originatingCalendarId: number;
  originatingCalendarName: string;
  title?: string;
  titleURL?: string;
  eventType?: string;
  topic?: Topic[];
  sponsor?: string;
  dateDisplay: boolean;
  startDate?: string;
  endDate?: string;
  timeType?: string;
  startTime?: string;
  endTime?: string;
  endTimeLabel?: string;
  inPersonEvent: boolean;
  location?: string;
  description?: string;
  speaker?: string;
  registrationLabel?: string;
  registrationURL?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  costFree: boolean;
  cost?: string;
  createdBy?: string;
  createdDate?: string;
  editedBy?: string;
  editedDate?: string;
  summary?: string;
  audienceFacultyStaff: boolean;
  audienceStudents: boolean;
  audiencePublic: boolean;
  audienceAlumni: boolean;
  audienceParents: boolean;
  shareWithUrbanaEventsInChicagoArea: boolean;
  shareWithResearch: boolean;
  shareWithSpeakers: boolean;
  shareWithIllinoisMobileApp: boolean;
  thumbImageUploaded: boolean;
  largeImageUploaded: boolean;
  largeImageSize: number;
  virtualEvent: boolean;
  virtualEventURL?: string;
}

export interface CalendarResponseWS {
  deprecated: boolean;
  endOfServiceDate?: string;
  maxPageSize: number;
  publicEventWS?: PublicEventWS[];
}

// Interface for request arguments based on calendarAPI.md
export interface CalendarRequestParams {
  schemaId?: string;
  calendarId: number;
  pageNumber?: number;
  startDate: string;
  endDate?: string;
  keywords?: string;
  search?: string;
  eventType?: string | string[];
} 