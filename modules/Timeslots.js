const { DateTime } = require('luxon');

/**
 * Timeslots class to create and manage time slots for scheduling.
 */
class Timeslots {

    /**
     * Creates time slots for a given date with specified start and end hours.
     * Time slots are generated every 15 minutes.
     *
     * @param {string} date - The ISO date string for which to create time slots.
     * @param {Array} events - An array of events that might block available time slots.
     * @param {number} startHour - The starting hour (24-hour format) for time slots.
     * @param {number} endHour - The ending hour (24-hour format) for time slots.
     * @returns {Array} An array of time slot objects.
     */
    static createSlotsForDate(date, events, startHour = 10, endHour = 18) {
        if (!this.#isDateAndHoursValid(date, startHour, endHour)) {
            throw new Error('Invalid date or hours');
        }

        const timeslots = this.#generateQuarterHourlySlots(date, startHour, endHour, 'Europe/Tallinn');
        return this.#markSlotsUnavailableDuringEvents(timeslots, events, 'Europe/Tallinn');
    }

    /**
     * Validates the provided date and hour range.
     *
     * @param {string} date - The ISO date string to validate.
     * @param {number} startHour - The start hour to validate.
     * @param {number} endHour - The end hour to validate.
     * @returns {boolean} True if the date and hours are valid, false otherwise.
     */
    static #isDateAndHoursValid(date, startHour, endHour) {
        return DateTime.fromISO(date).isValid &&
            startHour >= 0 && startHour < 24 &&
            endHour > 0 && endHour <= 24 &&
            endHour > startHour;
    }

    /**
     * Generates time slots for a given date, start hour, and end hour.
     * Each time slot spans 15 minutes.
     *
     * @param {string} date - The ISO date string for which to create time slots.
     * @param {number} startHour - The start hour (24-hour format).
     * @param {number} endHour - The end hour (24-hour format).
     * @param {string} zone - The timezone for the time slots.
     * @returns {Array} An array of time slot objects.
     */
    static #generateQuarterHourlySlots(date, startHour, endHour, zone) {
        const slots = [];
        const startDate = DateTime.fromISO(date, { zone }).set({ hour: startHour, minute: 0 });

        for (let time = startDate; time.hour < endHour; time = time.plus({ minutes: 15 })) {
            slots.push({
                start: time,
                end: time.plus({ minutes: 15 }),
                isAvailable: true
            });
        }
        return slots;
    }

    /**
     * Marks time slots as unavailable if they overlap with existing events.
     *
     * @param {Array} slots - An array of time slot objects.
     * @param {Array} events - An array of events that might block available time slots.
     * @param {string} zone - The timezone for the time slots and events.
     * @returns {Array} An array of time slot objects with updated availability.
     */
    static #markSlotsUnavailableDuringEvents(slots, events, zone) {
        events.forEach(event => {
            const eventStart = DateTime.fromISO(event.start.dateTime, { zone });
            const eventEnd = DateTime.fromISO(event.end.dateTime, { zone });

            slots.forEach(slot => {
                if (slot.start >= eventStart && slot.start < eventEnd) {
                    slot.isAvailable = false;
                }
            });
        });
        return slots;
    }
}

module.exports = Timeslots;
