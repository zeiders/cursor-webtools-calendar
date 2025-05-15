import React, { useState, FormEvent, useEffect } from 'react';
import { useCalendarEvents } from '../contexts/CalendarEventsContext';
import { CalendarRequestParams } from '../types/calendar';

interface CalendarEventSearchProps {
  defaultCalendarId?: number;
}

const CalendarEventSearch: React.FC<CalendarEventSearchProps> = ({ defaultCalendarId }) => {
  const { fetchEvents, loading } = useCalendarEvents();
  
  // Use config if available, otherwise use props or default value
  const configCalendarId = window.calendarConfig?.defaultCalendarId;
  const initialCalendarId = configCalendarId || defaultCalendarId || 8230;
  
  const [calendarId, setCalendarId] = useState<number>(initialCalendarId);
  const [startDate, setStartDate] = useState<string>(getTodayFormatted());
  const [endDate, setEndDate] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Effect to load initial data
  useEffect(() => {
    const initialSearchParams: CalendarRequestParams = {
      calendarId: initialCalendarId,
      startDate: getTodayFormatted(),
      pageNumber: 0,
    };
    
    fetchEvents(initialSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCalendarId]);

  function getTodayFormatted(): string {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const searchParams: CalendarRequestParams = {
      calendarId,
      startDate,
      pageNumber,
    };
    
    // Add optional parameters if they have values
    if (endDate) searchParams.endDate = endDate;
    if (keywords) searchParams.keywords = keywords;
    if (eventType) searchParams.eventType = eventType;
    
    fetchEvents(searchParams);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Search Calendar Events</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="calendarId" className="block text-sm font-medium text-gray-700 mb-1">
              Calendar ID
            </label>
            <input
              type="number"
              id="calendarId"
              value={calendarId}
              onChange={(e) => setCalendarId(parseInt(e.target.value, 10))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date (mm/dd/yyyy)
            </label>
            <input
              type="text"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="mm/dd/yyyy"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date (mm/dd/yyyy)
            </label>
            <input
              type="text"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="mm/dd/yyyy"
            />
          </div>
          
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter keywords"
            />
          </div>
          
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <input
              type="text"
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event type"
            />
          </div>
          
          <div>
            <label htmlFor="pageNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Page Number
            </label>
            <input
              type="number"
              id="pageNumber"
              value={pageNumber}
              onChange={(e) => setPageNumber(parseInt(e.target.value, 10))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarEventSearch; 