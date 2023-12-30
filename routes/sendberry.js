const cron = require('node-cron');
//const {fetchEventsForDateRange} = require('../modules/GoogleCalendar');
const GoogleCalendar = require('../modules/GoogleCalendar');
const axios = require('axios');

const googleCalendar = new GoogleCalendar(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
    process.env.API_KEY,
    process.env.REFRESH_TOKEN,
    process.env.TIMEZONE,
);
// Assume you have a function to get orders with scheduled SMS times from the database
/*const getOrdersWithScheduledSMS = async () => {
    // Implement logic to fetch orders with scheduled SMS times from the database
    // ...

    //  return orders;
};
*/
// Function to send SMS using Sendberry API
const sendSMS = async () => {
    console.log('sendSMS')
    const url = 'https://api.sendberry.com/SMS/SEND';
    const params = {
        key: process.env.SENDBERRY_API_KEY,
        name: 'Daniil',
        password: 'root',
        content: 'content1',
        to: '+37255546052',
        from: 'Sendberry',
        // Other parameters...
    };

    try {
        const response = await axios.post(url, params);
        console.log('SMS sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
};
//cron.js in routes folder

// Schedule a task to check for orders with scheduled SMS times every minute
//cron.schedule('0,15,30,45 * * * *', async () => {

const scheduleCronJob = () => {
    cron.schedule('* * * * *', async () => {
        console.log('something');

        const googleEventsStartTime = new Date();
        const googleEventsEndTime = new Date();
        googleEventsEndTime.setDate(googleEventsEndTime.getDate() + 1);
        const googleEventsStartTimeISO = googleEventsStartTime.toISOString();
        const googleEventsEndTimeISO = googleEventsEndTime.toISOString();
        console.log('googleEventsStartTimeISO', googleEventsStartTimeISO);
        console.log('googleEventsStartTimeISO', googleEventsEndTimeISO);

        const events = await googleCalendar.fetchEventsForDateRange(googleEventsStartTimeISO, googleEventsEndTimeISO, 'primary');

        console.log("event: ",events)
        // Get the current time
        const now = new Date();

        events.forEach((event) => {
            const { summary, start } = event;
            const eventStart = new Date(start.dateTime);
            const timeDiff = eventStart - now; // Time difference in milliseconds

            // Convert time difference to hours
            const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));

            if (hoursRemaining === 1) {
                console.log(`Event '${summary}' is 1 hour away.`);
            }
            if (hoursRemaining === 2) {
                console.log(`Event '${summary}' is 1 hour away.`);
            }
        });
    });
};
module.exports = { scheduleCronJob };