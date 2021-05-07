const router = require('express').Router();
const { Events } = require('../../models');
const axios = require('axios');
const util = require('util');

const { google } = require('googleapis');
const googleAuth = require('google-auth-library');
const { CronJob } = require('cron');
const cron = require('node-cron');
const { Console } = require('console');

const auth = new googleAuth.GoogleAuth({
  keyFile: 'calendar/quickstart/credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// set auth as a global default
google.options({
    auth: auth
});

const calendar = google.calendar({version: 'v3', auth});

calendar.events.insert = util.promisify(calendar.events.insert);

// Cron job is scheduled to run at midnight on the start of the 10th of every month
cron.schedule('0 0 07 * *', function () {
  console.log('---------------------');
  console.log('\nRunning Cron Job');

  //This pulls data from the next 6 months of SpaceX from their api
  axios.get('https://api.spacexdata.com/v4/launches/upcoming')
    .then(async function (response) {

      //iterates over the received data to create an 'event' formatted for Google calendar API
      //then passes that event to a promisify'd function
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
              { 'method': 'email', 'minutes': 24 * 60 },
              { 'method': 'popup', 'minutes': 10 },
            ],
          },
        };



        // setTimeout(sampleEvent, 3000, auth);


        await sampleEvent(event);
      }

    })
})



  
//Promisify'd google calendar API call to create event passed into the function
async function sampleEvent(newEvent) {
  try {
    const event = await calendar.events.insert({
    auth: auth,
    calendarId: 'space.eventhandler@gmail.com',
    resource: newEvent
  });
  
    console.log('Event created: %s', event);
} catch(err) {
  console.log('There was an error contacting the Calendar service: ' + err);
}

  // await calendar.events.insert({
  //   auth: auth,
  //   calendarId: 'space.eventhandler@gmail.com',
  //   resource: newEvent,
  // }, function(err, event) {
  //   if (err) {
  //   console.log('There was an error contacting the Calendar service: ' + err);
  //   return;
  //   }
  //   console.log('Event created: %s', event.summary);
        
  //   });
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
