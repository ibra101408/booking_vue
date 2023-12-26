/*
const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const dotenv = require('dotenv');

dotenv.config({});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
    process.env.API_KEY
);

//oauth2Client.setCredentials({refresh_token: '1//04jEP9RbgmeUqCgYIARAAGAQSNwF-L9Ireg0DP-hsZJqOmSW2MZ_R5DJQFyLbQITbkwV55wqgbMtAtvuTLBWISHH_GjtZ1BYDuyI'});
oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
oauth2Client.forceRefreshOnFailure = true;

// Event listener for token refresh
oauth2Client.on('tokens', (tokens) => {
    console.log('Tokens refreshed:', tokens);

    const expiryDate = new Date(tokens.expiry_date);
    console.log(expiryDate);
});



oauth2Client.scopes = ['https://www.googleapis.com/auth/calendar'];

console.log('Summary::', oauth2Client);
//let calID = '';



router.post('/schedule_event', async (req, res) => {

    const { DateTime } = require('luxon');
    const { start, end, clientName, selectedWorker, clientTel, selectedServices, clientId } = req.body;

    let serviceNames = '';
    for(let service of selectedServices) {
        serviceNames += service.name + ', ';
    }
    serviceNames = serviceNames.slice(0, -2);

    const startDateTimeLocal = DateTime.fromISO(start, { zone: 'Europe/Tallinn' });
    const endDateTimeLocal = DateTime.fromISO(end, { zone: 'Europe/Tallinn' });


    // Fetch existing events for the specified time range
    try {



        console.log('conflict? ',hasConflicts);
        if (hasConflicts) {
            res.status(409).send('Time slot not available for booking. Please choose a different time.');
        } else {
            // If no conflicts, proceed to schedule the new event
            const googleApiResponse = await calendar.events.insert({
                calendarId: calID,
                auth: oauth2Client,
                requestBody: {
                    start: {
                        dateTime: startDateTimeLocal.toUTC().toISO(),
                        timeZone: 'Europe/Tallinn',
                    },
                    end: {
                        dateTime: endDateTimeLocal.toUTC().toISO(),
                        timeZone: 'Europe/Tallinn',
                    },
                    summary: `Test, ${clientName}, ${clientTel}, ${serviceNames},'client Id- ', ${clientId} `,
                },

            });

            res.json({
                message: 'Event scheduled successfully!',
                googleApiResponse: googleApiResponse.data  // Include the Google Calendar API response in the JSON
            });
        }
    } catch (error) {
        console.error('Error scheduling event:', error.message);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;

* */
