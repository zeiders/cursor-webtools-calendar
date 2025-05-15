import { CalendarEventsProvider } from './contexts/CalendarEventsContext';
import CalendarEventSearch from './components/CalendarEventSearch';
import CalendarEventList from './components/CalendarEventList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Calendar Events</h1>
          <p className="text-center text-gray-600 mt-2">
            Search for and view calendar events from the Illinois Calendar API
          </p>
        </header>
        
        <main>
          <CalendarEventsProvider>
            <CalendarEventSearch />
            <CalendarEventList />
          </CalendarEventsProvider>
        </main>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Calendar data provided by the University of Illinois Calendar API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
