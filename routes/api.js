const express = require('express');
const router = express.Router();
const GoogleCalendar = require('../modules/GoogleCalendar');
const timeslots = require('../modules/timeslots');
const {DateTime} = require('luxon');

const googleCalendar = new GoogleCalendar(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
    process.env.API_KEY,
    process.env.REFRESH_TOKEN,
    process.env.TIMEZONE,
);

router.get('/timeslots', async (req, res) => {

    // Validate that worker ID is specified and is a positive integer
    if (!req.query.worker || !req.query.worker.match(/^[1-9]\d*$/)) {
        res.status(400).send('Bad Request');
        return;
    }

    const selectedDate = req.query.date || DateTime.local().toISODate();
    const selectedWorker = parseInt(req.query.worker);
    const calendarId = selectedWorker === 1 ? process.env.WORKER1_CALENDAR_ID : process.env.WORKER2_CALENDAR_ID;

    try {

        const existingEvents = await googleCalendar.fetchEventsForDate(selectedDate, calendarId);

        return res.json(timeslots.createSlotsForDate(
            selectedDate,
            existingEvents,
            parseInt(process.env.START_WORKING_HOUR),
            parseInt(process.env.END_WORKING_HOUR)));

    } catch (error) {
        // Print stack trace
        console.error(error.stack);

        console.error('Error fetching slots:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
