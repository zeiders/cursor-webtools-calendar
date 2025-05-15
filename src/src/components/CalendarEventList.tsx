import React from 'react';
import { useCalendarEvents } from '../contexts/CalendarEventsContext';
import CalendarEventListItem from './CalendarEventListItem';

const CalendarEventList: React.FC = () => {
  const { events, loading, error } = useCalendarEvents();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-5 rounded text-center">
        No events found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <CalendarEventListItem key={event.eventId} event={event} />
      ))}
    </div>
  );
};

export default CalendarEventList; 