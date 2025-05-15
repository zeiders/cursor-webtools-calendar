import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CalendarEventsProvider, useCalendarEvents } from '../CalendarEventsContext';
import { CalendarEventService } from '../../services/calendarEventService';

// Mock the CalendarEventService
jest.mock('../../services/calendarEventService', () => {
  return {
    CalendarEventService: {
      getInstance: jest.fn(() => ({
        fetchEvents: jest.fn(),
        cancelRequest: jest.fn(),
      })),
    },
  };
});

// Create a test component that uses the context
const TestComponent = () => {
  const { events, loading, error, fetchEvents } = useCalendarEvents();
  
  return (
    <div>
      <button onClick={() => fetchEvents({ calendarId: 123, startDate: '1/1/2025' })}>
        Fetch Events
      </button>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      <div data-testid="event-count">Event Count: {events.length}</div>
    </div>
  );
};

describe('CalendarEventsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should provide initial state values', () => {
    render(
      <CalendarEventsProvider>
        <TestComponent />
      </CalendarEventsProvider>
    );
    
    expect(screen.getByTestId('event-count')).toHaveTextContent('Event Count: 0');
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
  
  it('should handle loading state while fetching events', async () => {
    // Mock implementation for fetchEvents
    const mockFetchEvents = jest.fn(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          deprecated: false,
          maxPageSize: 100,
          publicEventWS: [{ eventId: 1, calendarId: 123, calendarName: 'Test' }],
        });
      }, 100);
    }));
    
    (CalendarEventService.getInstance as jest.Mock).mockReturnValue({
      fetchEvents: mockFetchEvents,
      cancelRequest: jest.fn(),
    });
    
    render(
      <CalendarEventsProvider>
        <TestComponent />
      </CalendarEventsProvider>
    );
    
    // Click the fetch button to trigger loading
    const fetchButton = screen.getByText('Fetch Events');
    act(() => {
      fetchButton.click();
    });
    
    // Check loading state is shown
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });
  
  it('should handle error state when fetching fails', async () => {
    // Mock implementation that throws an error
    const mockFetchEvents = jest.fn(() => Promise.reject(new Error('API Error')));
    
    (CalendarEventService.getInstance as jest.Mock).mockReturnValue({
      fetchEvents: mockFetchEvents,
      cancelRequest: jest.fn(),
    });
    
    render(
      <CalendarEventsProvider>
        <TestComponent />
      </CalendarEventsProvider>
    );
    
    // Click the fetch button to trigger loading
    const fetchButton = screen.getByText('Fetch Events');
    act(() => {
      fetchButton.click();
    });
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('API Error');
    });
  });
}); 