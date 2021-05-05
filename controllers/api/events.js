const router = require('express').Router();
const { Events } = require('../../models');
const axios = require('axios');

const { google } = require('googleapis');
const googleAuth = require('google-auth-library');

const auth = new googleAuth.GoogleAuth({
  keyFile: 'calendar/quickstart/credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// set auth as a global default
google.options({
    auth: auth
});

axios.get('https://api.spacexdata.com/v4/launches/upcoming')
.then(function(response) {

    for (const element in response.data) {
        // console.log(response.data[element].name);
        // console.log(response.data[element].date_local);
        // console.log(response.data[element].links.wikipedia);

        const event = {
            'summary': `${response.data[element].name}`,
            'description': `${response.data[element].links.wikipedia}`,
            'start': {
            'dateTime': `${response.data[element].date_local}`,
            'timeZone': 'America/New_York',
            },
            'end': {
            'dateTime': `${response.data[element].date_local}`,
            'timeZone': 'America/Chicago',
            },
            'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
            },
        };

        // setTimeout(sampleEvent, 3000, auth);

        sampleEvent(event, function() {
            continue
        });

    }

})

function sampleEvent(newEvent, callBack) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
        auth: auth,
        calendarId: 'space.eventhandler@gmail.com',
        resource: newEvent,
    }, function(err, event) {
        if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
        }
        console.log('Event created: %s', event.htmlLink);
        callBack()
    });
}

// router.post('/api/events', async (req, res) => {
//     try {
//       const newEvent = await Events.create({
//         ...req.body
//       });
//       res.status(200).json(newEvent);
//     } catch (err) {
//       res.status(400).json(err);
//       console.log(err);
//     }
//   });
  
  router.get('/api/events', async (req, res) => {
    try {
      const allEvents = await Events.findAll();
      res.status(200).json(allEvents);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  });
  
  router.delete('/api/events/:id', async (req, res) => {
    try {
      const deletedEvent = await Events.destroy(
        { where: { id: req.params.id, } });
  
      res.status(200).json({ message: 'The event was successfully deleted!' });
      console.log('\n', "The category was successfully deleted!", '\n')
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
