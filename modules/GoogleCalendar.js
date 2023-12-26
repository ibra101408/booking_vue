const { google } = require('googleapis');
const { DateTime } = require('luxon');

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
        this.oauth2Client.setCredentials({ refresh_token: refreshToken });
        this.oauth2Client.forceRefreshOnFailure = true;

        this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
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
        if (!calendarId.match(GoogleCalendar.CALENDAR_ID_REGEX)) {
            throw new Error('Invalid calendar ID format');
        }
    }

    /**
     * Fetches events for a specific date from the specified calendar.
     *
     * @param {string} date - The date for which to fetch events (in ISO format).
     * @param {string} calendarId - The ID of the calendar from which to fetch events.
     * @returns {Promise<Array>} A promise that resolves to an array of events.
     * @throws {Error} If there's an error in fetching events from the calendar.
     */
    async fetchEventsForDate(date, calendarId) {
        this.validateDate(date);
        this.validateCalendarId(calendarId);

        const dateWithTz = DateTime.fromISO(date, { zone: this.timezone });
        const startTime = dateWithTz.startOf('day').toISO();
        const endTime = dateWithTz.endOf('day').toISO();

        try {
            const response = await this.calendar.events.list({
                calendarId,
                timeMin: startTime,
                timeMax: endTime,
                singleEvents: true,
                orderBy: 'startTime',
            });
            return response.data.items;
        } catch (error) {
            console.error(`Error fetching events: ${error.message}`);
            throw error;
        }
    }
}

module.exports = GoogleCalendar;
