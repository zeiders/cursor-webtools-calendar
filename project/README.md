# Calendar Events React Application

A React application for displaying calendar events from the University of Illinois Calendar API.

## Features

- Fetch and display calendar events from the XML API
- Search events by various criteria (calendar ID, date range, keywords, event type)
- Responsive design with Tailwind CSS
- Asynchronous data fetching with cancellation support
- Type-safe code with TypeScript

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm 7 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build the application:

```bash
npm run build
```

This will generate production-ready files in the `dist` directory.

## Integration

### Including in an HTML Page

1. After building the application, copy the generated CSS and JavaScript files from the `dist` directory.

2. Add the following HTML to your existing page:

```html
<!-- Include the CSS file -->
<link rel="stylesheet" href="[path-to-css-file]">

<!-- Create a container element -->
<div id="calendar-root"></div>

<!-- Include the JavaScript file -->
<script src="[path-to-js-file]"></script>

<!-- Initialize the calendar with optional configuration -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.initCalendarEvents) {
      window.initCalendarEvents({
        // Optional configuration
        defaultCalendarId: 8230
      });
    }
  });
</script>
```

### Configuration Options

The `initCalendarEvents` function accepts an optional configuration object:

- `defaultCalendarId`: (number) The default calendar ID to use for searches

## Testing

Run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
