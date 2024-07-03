const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const

export const convertValueInDollars = (value: number) => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

/**
 * Converts an ISO string to the standard date format for this application.
 *
 * @param {string} dateString - The ISO date string to be converted.
 * @returns {string} A string representing the formatted date in the format: "Weekday Day Month, Hour:Minute AM/PM".
 *
 * @example
 * // returns "Friday 5 June, 3:45 PM"
 * convertISOStringToReadableDate("2023-06-05T15:45:00.000Z");
 */
export const convertISOStringToReadableDate = (dateString: string) => {
  const date = new Date(dateString)

  const weekday = WEEKDAYS[date.getUTCDay()]
  const day = date.getUTCDate()
  const month = MONTHS[date.getUTCMonth()]
  let hour = date.getUTCHours()
  const minute = date.getUTCMinutes().toString().padStart(2, '0')
  const ampm = hour >= 12 ? 'PM' : 'AM'

  hour = hour % 12
  hour = hour ? hour : 12 // the hour '0' should be '12'

  return `${weekday} ${day} ${month}, ${hour}:${minute} ${ampm}`
}
