/**
 * Utility functions for date handling
 * All dates are returned in UTC to avoid localization issues
 */

/**
 * Returns the current date and time in UTC
 * @returns Date object representing the current UTC time
 */
export function getCurrentUTCDate(): Date {
  return new Date(Date.now())
}

/**
 * Converts a date to UTC
 * @param date The date to convert
 * @returns Date object in UTC
 */
export function toUTC(date: Date): Date {
  return new Date(date.toISOString())
}
