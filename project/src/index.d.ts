// Global type definitions

interface Window {
  initCalendarEvents?: (config?: CalendarConfig) => void;
  calendarConfig?: CalendarConfig;
}

interface CalendarConfig {
  defaultCalendarId?: number;
  // Add more configuration options as needed
} 