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

const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
});

oauth2Client.scopes = ['https://www.googleapis.com/auth/calendar'];

console.log('Summary::', oauth2Client);
//let calID = '';
const worker1CalendarId = process.env.WORKER_1_CALENDAR_ID;
const worker2CalendarId = process.env.WORKER_2_CALENDAR_ID;


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

    // const selectedWorker = req.query.worker;
    let calID = selectedWorker === 1 ? worker1CalendarId : worker2CalendarId;

    // Fetch existing events for the specified time range
    try {
        const response = await calendar.events.list({
            calendarId: calID,
            auth: oauth2Client,
            timeMin: startDateTimeLocal.toISO(),
            timeMax: endDateTimeLocal.toISO(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const existingEvents = response.data.items;
        // Check for conflicts with existing events
        const hasConflicts = existingEvents.some(event => {
            const eventStart = DateTime.fromISO(event.start.dateTime);
            const eventEnd = DateTime.fromISO(event.end.dateTime);

            return (
                (startDateTimeLocal >= eventStart && startDateTimeLocal < eventEnd) ||
                (endDateTimeLocal > eventStart && endDateTimeLocal <= eventEnd) ||
                (startDateTimeLocal <= eventStart && endDateTimeLocal >= eventEnd)
            );
        });

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

router.get('/get_slots', async (req, res) => {
    const { DateTime } = require('luxon');
    const luxon = require('luxon');

    const selectedDate = req.query.date || luxon.DateTime.local().toISODate();
    const targetDate = DateTime.fromISO(selectedDate, { zone: 'Europe/Tallinn' });

    const selectedWorker = req.query.worker;
    let calID = selectedWorker === '1' ? worker1CalendarId : worker2CalendarId;

    // Calculate the start and end times for the specified day
    const startTime = targetDate.startOf('day').toISO();
    const endTime = targetDate.endOf('day').toISO();

    const startWorkingHour = process.env.START_WORKING_HOUR;
    const endWorkingHour = process.env.END_WORKING_HOUR;

    try {
        // Fetch existing events for the specified day
        const response = await calendar.events.list({
            calendarId: calID,
            auth: oauth2Client,
            timeMin: startTime,
            timeMax: endTime,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const existingEvents = response.data.items;

        const slots = [];
        let currentSlotStart = targetDate.startOf('day');

        while (currentSlotStart < targetDate.endOf('day')) {
            const currentSlotEnd = currentSlotStart.plus({ minutes: 15 });

            if (currentSlotStart.weekday !== 7 &&
                currentSlotStart.hour >= startWorkingHour &&
                currentSlotStart.hour < endWorkingHour) {
                const isAvailable = !existingEvents.some(event => {
                    const eventStart = DateTime.fromISO(event.start.dateTime);
                    const eventEnd = DateTime.fromISO(event.end.dateTime);
                    return (
                        (currentSlotStart >= eventStart && currentSlotStart < eventEnd) ||
                        (currentSlotEnd > eventStart && currentSlotEnd <= eventEnd) ||
                        (currentSlotStart <= eventStart && currentSlotEnd >= eventEnd)
                    );
                });

                slots.push({
                    start: currentSlotStart.toISO(),
                    end: currentSlotEnd.toISO(),
                    isAvailable: isAvailable,
                });
            }
            // Move to the next 15-minute interval
            currentSlotStart = currentSlotEnd;
        }

        res.json(slots);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Refreshing access token...');
        }
        console.error('Error fetching slots:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;