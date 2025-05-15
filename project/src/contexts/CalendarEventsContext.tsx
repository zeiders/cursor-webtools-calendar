import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CalendarEventService } from '../services/calendarEventService';
import { CalendarRequestParams, PublicEventWS } from '../types/calendar';

interface CalendarEventsContextType {
  events: PublicEventWS[];
  loading: boolean;
  error: string | null;
  fetchEvents: (params: CalendarRequestParams) => void;
  cancelRequest: (params: CalendarRequestParams) => void;
  resetError: () => void;
}

const CalendarEventsContext = createContext<CalendarEventsContextType | undefined>(undefined);

interface CalendarEventsProviderProps {
  children: ReactNode;
}

export const CalendarEventsProvider: React.FC<CalendarEventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<PublicEventWS[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calendarEventService = CalendarEventService.getInstance();

  const fetchEvents = async (params: CalendarRequestParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await calendarEventService.fetchEvents(params);
      setEvents(response.publicEventWS || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = (params: CalendarRequestParams) => {
    calendarEventService.cancelRequest(params);
  };

  const resetError = () => {
    setError(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // No specific cleanup needed at this level
    };
  }, []);

  const value = {
    events,
    loading,
    error,
    fetchEvents,
    cancelRequest,
    resetError,
  };

  return (
    <CalendarEventsContext.Provider value={value}>
      {children}
    </CalendarEventsContext.Provider>
  );
};

export const useCalendarEvents = (): CalendarEventsContextType => {
  const context = useContext(CalendarEventsContext);
  if (!context) {
    throw new Error('useCalendarEvents must be used within a CalendarEventsProvider');
  }
  return context;
}; 