Campus Webtools has a calendar webapi that returns an XML collection of calendar events.

Request Format:

base URL: `https://xml.calendars.illinois.edu/{schemaId}/{calendarId}.xml`

baseURL parameters:

- schemaId: string, default = 'eventXML16'
- calendarId: number

search args:

- `startDate`: date
- `endDate`: date, optional
- `keywords`: string, optional
- `search`: string, optional
- `eventType`: string or string[], optional
- `pageNumber`: int, optional, default = 0

the full URL looks like this
GET baseUrl
    + `?pageNumber={pageNumber}`
    + `&startDate={startDate:mm/dd/yyyy}`
    + `&endDate={endDate:mm/dd/yyyy}`
    + `&keywords={keywords}`
    + `&search={search}`
    + `&eventType={eventType}`

pageNumber is required in the URL.  The others parameters should be excluded from the query string if they are a null or blank.
If eventType is an array, each value should reporesent a new key-value pair, for example `eventType=["A","B"]`  should yield the URL parameters `&eventType=A&eventType=B`


