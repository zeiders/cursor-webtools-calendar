# Web Tools Calendar App using Cursor AI

To begin:

1. Clone this repo and open in Cursor.
2. Create and switch to a new branch.
3. You only need the data folder (populated) and the  project folder (empty).

    - `calendarResponse.xsd` is downloaded from https://xml.calendars.illinois.edu/calendarws16.xsd
    - `calendarResponse.xml` is the response from https://xml.calendars.illinois.edu/eventXML16/8230.xml

    If other files exists you can delete them.

4. In the Cursor Chat

   1. Select
        - mode = `agent`
        - model = `clause-3.7-sonnet`

   2. Add reference files

       - `data\calendarAPI.md`
       - `data\calendarResponse.xml`
       - `data\calendarResponse.xsd`
       - `data\instructions.md`
  
   3. Type:

        *Using @instructions.md, create the requested React Application in the "/projects" directory*

   4. Click `send`

   5. Monitor the chat output accepting changes, running request commands, and following instructions.

5. When the agent finish, in the cursor terminal run:

    ```sh
    cd ./projects
    run npm start
    ```
