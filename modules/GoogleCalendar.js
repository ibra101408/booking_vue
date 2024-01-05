const {google} = require('googleapis');
const {DateTime} = require('luxon');

//const timers = require('timers');

/**
 * GoogleCalendar class for interacting with Google Calendar API.
 * Allows fetching events for a specific date from a specified Google Calendar.
 *
 * Constructor parameters allow for flexible configuration, including credentials and timezone.
 */
class GoogleCalendar {
    static CALENDAR_ID_REGEX = /^([\w.+-]+@gmail\.com|[\da-f]{64}@group\.calendar\.google\.com|primary)$/i;

    /**
     * Creates an instance of GoogleCalendar.
     *
     * @param {string} clientId - OAuth 2.0 Client ID.
     * @param {string} clientSecret - OAuth 2.0 Client Secret.
     * @param {string} redirectUri - OAuth 2.0 Redirect URI.
     * @param {string} apiKey - API Key for Google Calendar API.
     * @param {string} refreshToken - OAuth 2.0 Refresh Token.
     * @param {string} [timezone='Europe/Tallinn'] - Timezone to be used for date calculations. Default is 'Europe/Tallinn'.
     */
    constructor(clientId, clientSecret, redirectUri, apiKey, refreshToken, timezone = 'Europe/Tallinn') {
        this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri, apiKey);
        this.oauth2Client.setCredentials({refresh_token: refreshToken});
        this.oauth2Client.forceRefreshOnFailure = true;

        this.calendar = google.calendar({version: 'v3', auth: this.oauth2Client});
        this.timezone = timezone;
    }

    /**
     * Validates the provided date string.
     * Throws an error if the date is not in a valid ISO format.
     *
     * @param {string} date - The date string in ISO format.
     * @throws {Error} If the date is invalid.
     */
    validateDate(date) {
        if (!DateTime.fromISO(date).isValid) {
            throw new Error('Invalid date format');
        }
    }

    /**
     * Validates the provided calendar ID against a regular expression.
     * Throws an error if the calendar ID does not match the expected format.
     *
     * @param {string} calendarId - The calendar ID to validate.
     * @throws {Error} If the calendar ID is invalid.
     */
    validateCalendarId(calendarId) {
        console.log('calendarId', calendarId);
        if (!calendarId.match(GoogleCalendar.CALENDAR_ID_REGEX)) {
            throw new Error('Invalid calendar ID format');
        }
    }

    /**
     * Schedules an event in the specified calendar.
     *
     * @param {string} start - The start time of the event.
     * @param {string} end - The end time of the event.
     * //@param {string} clientId - The client ID.
     * @param {string} clientName - The client's name.
     * @param {string} clientTel - The client's telephone number.
     * @param {string} clientEmail - The client's email address.
     * @param {string} clientAdditionalInfo - The client's additional info.
     * @param {string} calendarId - The ID of the calendar in which to schedule the event.
     * @param {array} selectedServices - The array of selected services.
     * @returns {Promise<Object>} A promise that resolves to the scheduled event data.
     * @throws {Error} If there's an error in scheduling the event.
     */
    async scheduleEvent(start, end, clientName, clientTel, clientEmail, clientAdditionalInfo, selectedServices, calendarId) {
        // Validate input parameters if necessary
        const startDateTimeLocal = DateTime.fromISO(start, {zone: this.timezone});
        const endDateTimeLocal = DateTime.fromISO(end, {zone: this.timezone});

        // Fetch existing events for the specified time range
        await this.checkEventConflicts(start, end, calendarId);

        // Convert array to a comma-separated string
        const selectedServicesString = selectedServices.map(service => service.name).join(', ');

        return await this.calendar.events.insert({
            calendarId,
            auth: this.oauth2Client,
            requestBody: {
                start: {
                    dateTime: startDateTimeLocal.toUTC().toISO(),
                    timeZone: this.timezone,
                },
                end: {
                    dateTime: endDateTimeLocal.toUTC().toISO(),
                    timeZone: this.timezone,
                },
                summary: `${clientName}, ${clientTel}, ${selectedServicesString}` +
                    (clientAdditionalInfo ? `, ${clientAdditionalInfo}` : ''),
                extendedProperties: {
                    private: {
                        clientName,
                        clientTel,
                        clientEmail,
                        clientAdditionalInfo,
                        selectedServices: selectedServicesString
                    },
                }
            },
        });
        // return googleApiResponse; // Return the scheduled event data

    }

    async checkEventConflicts(start, end, calendarId) {
        // Fetch existing events for the specified time range
        const existingEvents = await this.fetchEventsForDateRange(start, end, calendarId);
        console.log('existingEvents', existingEvents);
        // Check for conflicts
        if (existingEvents.length > 0) {
            // There is a conflict, throw an error
            throw new Error('409');
        }
        return true;
    }

    async fetchEventsForDateRange(start, end, calendarId) {
        this.validateDate(start);
        this.validateDate(end);
        this.validateCalendarId(calendarId);
        const startDateTime = DateTime.fromISO(start).toISO();
        const endDateTime = DateTime.fromISO(end).toISO();

        try {
            const response = await this.calendar.events.list({
                calendarId,
                timeMin: startDateTime,
                timeMax: endDateTime,
                singleEvents: true,
                orderBy: 'startTime',
            });
            return response.data.items;
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            throw error;
        }
    }

}

module.exports = GoogleCalendar;
