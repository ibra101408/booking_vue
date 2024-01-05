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
    const endDate = DateTime.fromISO(selectedDate).plus({ day: 30 }).toISODate();
    const selectedWorker = parseInt(req.query.worker);
    const calendarId = selectedWorker === 1 ? process.env.WORKER_1_CALENDAR_ID : process.env.WORKER_2_CALENDAR_ID;

    try {

        const existingEvents = await googleCalendar.fetchEventsForDateRange(
            selectedDate,
            endDate,
            calendarId
        );

        const timeSlots = [];

        for (let date = DateTime.fromISO(selectedDate); date.toISODate() <= endDate; date = date.plus({ day: 1 })) {

            const slotsForDate = timeslots.createSlotsForDate(
                date.toISODate(),
                existingEvents,
                parseInt(process.env.START_WORKING_HOUR),
                parseInt(process.env.END_WORKING_HOUR)
            );

            timeSlots.push(...slotsForDate);

        }

        return res.json(timeSlots);

    } catch (error) {

        // Print stack trace
        console.error(error.stack);
        console.error('Error fetching slots:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/schedule-event', async (req, res) => {
    const {start, end, clientName, clientTel, clientEmail, selectedServices, selectedWorker, clientAdditionalInfo} = req.body;
    const calendarId = selectedWorker === 1 ? process.env.WORKER_1_CALENDAR_ID : process.env.WORKER_2_CALENDAR_ID;

    try {
        // Call the new scheduleEvent method in the GoogleCalendar class
        await googleCalendar.scheduleEvent(
            start,
            end,
            clientName,
            clientTel,
            clientEmail,
            clientAdditionalInfo,
            selectedServices,
            calendarId,
        );

        res.status(200).json({message: 'Success'});

    } catch (error) {

        if (error.message === '409') {
            // There is a conflict, send a 409 response
            return res.status(409).json({message: 'Event conflicts with an existing event'});
        }

        console.error('Error scheduling event:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

module.exports = router;
