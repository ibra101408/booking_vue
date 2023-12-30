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
const sendSMS = async (message, to) => {


    // Add 372 to numbers starting with 5 and being 7-8 digits long
    if (to.match(/^5\d{6,7}$/)) {
        to = '372' + to;
    }

    // Remove + from numbers starting with +
    if (to.match(/^\+/)) {
        to = to.replace(/^\+/, '');
    }

    console.log(
        'Sending SMS to',
        to,
        'with message',
        message
    )


    axios.post('https://api.sendberry.com/SMS/SEND', {
        key: process.env.SENDBERRY_API_KEY,
        name: 'Daniil',
        password: 'root',
        content: message,
        to: [to],
        from: '37253311559',
        callback: function (response) { console.log(response); }, // Optional. Callback function.
        responseformat: 'JSON' // Optional. (JSON or GET)
    }).then(response => {
        // Handle the response
        console.log(response.data);
    }).catch(error => {
        // Handle the error
        console.error('Error:', error);
    });
};

const scheduleCronJob = () => {
    //cron.schedule('0,15,30,45 * * * *', async () => {
    cron.schedule('* * * * *', async () => {

        // Create a Date object with 0 milliseconds
        const now = new Date();
        now.setMilliseconds(0);

        // Get events from 59 minutes from now to 1 day and 1 minute from now (with 0 milliseconds)
        const timeMin = new Date(now.getTime() + 59 * 60000).toISOString();  // 59 minutes from now
        const timeMax = new Date(now.getTime() + (24 * 60 + 1) * 60000).toISOString();  // 1 day and 1 minute from now

        // Get appointments from Google Calendar
        const appointments = await googleCalendar.fetchEventsForDateRange(timeMin, timeMax, 'primary');

        appointments.forEach((event) => {
            const {summary, start, extendedProperties} = event;
            const appointmentStart = new Date(start.dateTime);
            const timeDiff = appointmentStart - now; // Time difference in milliseconds
            const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
            const shortDate = appointmentStart.toLocaleDateString('et-EE', {day: '2-digit', month: '2-digit'});
            const time = appointmentStart.toLocaleTimeString('et-EE', {hour: '2-digit', minute: '2-digit'});

            if (hoursRemaining === 1 || hoursRemaining === 24) {
                sendSMS(`${hoursRemaining}h kuni/until/до Explorer Studio broneeringuni/booking/бронирования: ${shortDate} ${time} (${summary})`, extendedProperties.private.clientTel);
            }

        });
    });
};
module.exports = {scheduleCronJob};
