import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarEventListItem from '../CalendarEventListItem';
import { PublicEventWS } from '../../types/calendar';

describe('CalendarEventListItem', () => {
  const mockEvent: PublicEventWS = {
    calendarId: 8230,
    calendarName: 'Test Calendar',
    eventId: 33518537,
    recurrence: false,
    recurrenceId: 0,
    originatingCalendarId: 8230,
    originatingCalendarName: 'Test Calendar',
    title: 'Test Event',
    eventType: 'Informational',
    sponsor: 'Test Sponsor',
    dateDisplay: true,
    startDate: '5/29/2025',
    endDate: '5/29/2025',
    timeType: 'START_AND_END_TIME',
    startTime: '10:00 am',
    endTime: '11:30 am',
    inPersonEvent: true,
    location: 'Test Location',
    summary: 'This is a test event summary.',
    audienceFacultyStaff: false,
    audienceStudents: false,
    audiencePublic: false,
    audienceAlumni: false,
    audienceParents: false,
    shareWithUrbanaEventsInChicagoArea: false,
    shareWithResearch: false,
    shareWithSpeakers: false,
    shareWithIllinoisMobileApp: true,
    thumbImageUploaded: false,
    largeImageUploaded: false,
    largeImageSize: 0,
    virtualEvent: true,
    virtualEventURL: 'https://example.com/event',
  };

  it('renders event title and basic info', () => {
    render(<CalendarEventListItem event={mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText(/Calendar: Test Calendar/)).toBeInTheDocument();
    expect(screen.getByText(/Event ID: 33518537/)).toBeInTheDocument();
  });

  it('renders event details', () => {
    render(<CalendarEventListItem event={mockEvent} />);
    
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('Informational')).toBeInTheDocument();
    expect(screen.getByText('Sponsor:')).toBeInTheDocument();
    expect(screen.getByText('Test Sponsor')).toBeInTheDocument();
    expect(screen.getByText('Summary:')).toBeInTheDocument();
    expect(screen.getByText('This is a test event summary.')).toBeInTheDocument();
    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('renders date and time information', () => {
    render(<CalendarEventListItem event={mockEvent} />);
    
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('5/29/2025')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('10:00 am - 11:30 am')).toBeInTheDocument();
  });

  it('renders virtual event badge when applicable', () => {
    render(<CalendarEventListItem event={mockEvent} />);
    
    expect(screen.getByText('Virtual')).toBeInTheDocument();
  });
}); 