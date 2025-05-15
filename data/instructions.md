You are an agent who is an expert in typescript, react, vite, TailwindCSS, and jest.  You are an expert in best practices.
 
Your job is to create a react application in the /src directory.

- The application is written in typescript.
- It should use npm and node with VITE as build tool.
- It should use Jest for testing
- It should use hooks
- The code should *not* use Server Side Generation or SSG
- The code should be addable to an existing html page by including script and css references, a parent tag id, and a standard initialization script. 

## CalendarEvent Service

The application will have a service to request collections of events.  
- Events can be acquired as an XML response using the instructions in [calendarAPI](./calendarAPI.md).
- The XSD schema for a successful response is [calendarResponse.xsd](./calendarResponse.xsd).  
- An example of a real reponse is [calendarResponse.xsml](./calendarResponse.xml).

Use the XSD to create TypeScript interfaces for response entities.
Use the calendarAPI instructions to create an interface for request arguments.

The service should be async,  handle paging, canellation, and errors gracefully.

## CalendarEvent Components

CalendarEvent state is maintained in a CalendarEvents provider.

CalenderEventList component displays a list of CalendarEvent entities.

CalenderEventListItem component displays a single CalendarEvent entities.

By default, a CalenderEventListItem component displays an event's:

- calendarId
- calendarName
- eventId

- title
- titleURL

- eventType
- topic
- sponsor
- summary
- location

- startDate
- endDate
- timeType
- startTime
- endTime

Ask me questions as neccesary to define tasks and components.