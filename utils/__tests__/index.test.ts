import { describe, expect, it } from 'vitest'
import { convertValueInDollars, convertISOStringToReadableDate, roundToDecimals } from '..'

describe('utils', () => {
  describe('convertValueInDollars', () => {
    it('should convert a positive number to a dollar-formatted string', () => {
      expect(convertValueInDollars(1234)).toEqual('$1,234.00')
    })

    it('should handle zero correctly, returning a formatted string of $0.00', () => {
      expect(convertValueInDollars(0)).toEqual('$0.00')
    })

    it('should handle decimal numbers, rounding to the nearest cent', () => {
      expect(convertValueInDollars(1234.567)).toEqual('$1,234.57')
    })

    it('should handle very large numbers, including those in the billions, with comma separators', () => {
      expect(convertValueInDollars(1234567890)).toEqual('$1,234,567,890.00')
    })
  })

  describe('convertISOStringToReadableDate', () => {
    it('should return a string based on the UTC time, not the local time', () => {
      // The date string is in UTC time, so the output should be in UTC time as well
      expect(convertISOStringToReadableDate('2023-06-05T15:45:00.000Z')).toEqual('Monday 5 June, 3:45 PM')
    })
    it('should convert an ISO string to a readable date format for a morning time', () => {
    // Assuming WEEKDAYS and MONTHS are correctly defined and match the expected output
      expect(convertISOStringToReadableDate('2023-06-05T09:45:00.000Z')).toEqual('Monday 5 June, 9:45 AM')
    })

    it('should convert an ISO string to a readable date format for an afternoon time', () => {
      expect(convertISOStringToReadableDate('2023-06-05T15:45:00.000Z')).toEqual('Monday 5 June, 3:45 PM')
    })

    it('should handle midnight correctly, showing 12 AM instead of 0 AM', () => {
      expect(convertISOStringToReadableDate('2023-06-05T00:00:00.000Z')).toEqual('Monday 5 June, 12:00 AM')
    })

    it('should handle noon correctly, showing 12 PM instead of 0 PM', () => {
      expect(convertISOStringToReadableDate('2023-06-05T12:00:00.000Z')).toEqual('Monday 5 June, 12:00 PM')
    })

    it('should correctly pad single-digit minutes to maintain the MM format', () => {
      expect(convertISOStringToReadableDate('2023-06-05T12:05:00.000Z')).toEqual('Monday 5 June, 12:05 PM')
    })
  })

  describe('roundToDecimals', () => {
    it('should round a number to 2 decimal places', () => {
      expect(roundToDecimals(3.14159, 2)).toBe(3.14)
    })

    it('should round a number to 0 decimal places', () => {
      expect(roundToDecimals(3.5, 0)).toBe(4)
    })

    it('should handle rounding for negative numbers', () => {
      expect(roundToDecimals(-3.14159, 2)).toBe(-3.14)
    })

    it('should return the same number if decimals is 0 and no rounding is needed', () => {
      expect(roundToDecimals(5, 0)).toBe(5)
    })

    it('should handle rounding to more decimal places than the number has', () => {
      expect(roundToDecimals(3.1, 5)).toBe(3.1)
    })

    it('should correctly round numbers that are halfway between two intervals', () => {
      expect(roundToDecimals(2.675, 2)).toBe(2.68)
    })
  })
})
