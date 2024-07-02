const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const

export const convertValueInDollars = (value: number) => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export const convertISOStringToReadableDate = (dateString: string) => {
  const date = new Date(dateString)

  const weekday = WEEKDAYS[date.getDay()]
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  let hour = date.getHours()
  const minute = date.getMinutes().toString().padStart(2, '0')
  const ampm = hour >= 12 ? 'PM' : 'AM'

  hour = hour % 12
  hour = hour ? hour : 12 // the hour '0' should be '12'

  return `${weekday} ${day} ${month}, ${hour}:${minute} ${ampm}`
}
