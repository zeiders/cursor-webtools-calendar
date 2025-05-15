import React from 'react';
import { PublicEventWS } from '../types/calendar';

interface CalendarEventListItemProps {
  event: PublicEventWS;
}

const CalendarEventListItem: React.FC<CalendarEventListItemProps> = ({ event }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {event.title ? (
              event.titleURL ? (
                <a href={event.titleURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {event.title}
                </a>
              ) : (
                event.title
              )
            ) : (
              'Untitled Event'
            )}
          </h3>
          <div className="text-sm text-gray-500 mb-1">
            Calendar: {event.calendarName} (ID: {event.calendarId})
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Event ID: {event.eventId}
          </div>
        </div>
        {event.virtualEvent && event.virtualEventURL && (
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">Virtual</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="mb-3">
            {event.eventType && (
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-700">Type:</span>{' '}
                <span className="text-sm text-gray-600">{event.eventType}</span>
              </div>
            )}
            {event.topic && event.topic.length > 0 && (
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-700">Topic:</span>{' '}
                <span className="text-sm text-gray-600">{event.topic.map(t => t.name).join(', ')}</span>
              </div>
            )}
            {event.sponsor && (
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-700">Sponsor:</span>{' '}
                <span className="text-sm text-gray-600">{event.sponsor}</span>
              </div>
            )}
          </div>
          
          {event.summary && (
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-700 mb-1">Summary:</div>
              <p className="text-sm text-gray-600">{event.summary}</p>
            </div>
          )}
          
          {event.location && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Location:</span>{' '}
              <span className="text-sm text-gray-600">{event.location}</span>
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-3">
            {event.startDate && (
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-700">Date:</span>{' '}
                <span className="text-sm text-gray-600">
                  {event.startDate}
                  {event.endDate && event.startDate !== event.endDate && ` - ${event.endDate}`}
                </span>
              </div>
            )}
            
            {event.timeType && event.timeType !== 'NONE' && (
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-700">Time:</span>{' '}
                <span className="text-sm text-gray-600">
                  {event.timeType === 'ALL_DAY' && 'All Day'}
                  {event.timeType === 'START_TIME_ONLY' && event.startTime}
                  {event.timeType === 'START_AND_END_TIME' && `${event.startTime} - ${event.endTime}`}
                </span>
              </div>
            )}
          </div>
          
          {event.speaker && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Speaker:</span>{' '}
              <span className="text-sm text-gray-600">{event.speaker}</span>
            </div>
          )}
          
          {event.contactName && (
            <div className="text-sm text-gray-600">
              <div className="font-medium text-gray-700 mb-1">Contact:</div>
              <div>{event.contactName}</div>
              {event.contactEmail && <div>{event.contactEmail}</div>}
              {event.contactPhone && <div>{event.contactPhone}</div>}
            </div>
          )}
        </div>
      </div>
      
      {event.registrationURL && (
        <div className="mt-3">
          <a 
            href={event.registrationURL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            {event.registrationLabel || 'Register'}
          </a>
        </div>
      )}
    </div>
  );
};

export default CalendarEventListItem; 