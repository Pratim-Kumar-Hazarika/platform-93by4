import { daysInMonth } from '../../data/calendar/months'

const LEAP_YEAR_DAYS = 366

const ORDINARY_YEAR_DAYS = 365

const NUM = 400

const ODD_DAYS_IN_A_CENTURY = 5

// program to check leap year
function isLeapYear(year: number): boolean {
  //  three conditions to find out the leap year
  return Boolean(!(year % 400) || (!(year % 4) && year % 100))
}

function getTotalNoOfDays(month: number, year: number): number {
  if (month - 2 < 0) {
    return 0
  }
  return isLeapYear(year) && month > 2
    ? daysInMonth[month - 2].totalDays + 1
    : daysInMonth[month - 2].totalDays
}

function predictDay(date: number, month: number, year: number): number {
  const oddYearsLeft = (year - 1) % NUM

  const noOfCenturies = Math.floor(oddYearsLeft / 100)

  const noOfYearsLeft = oddYearsLeft - noOfCenturies * 100

  const leapyears = Math.floor(noOfYearsLeft / 4)

  const ordinaryYears = noOfYearsLeft - leapyears

  const oddDaysInCenturies = noOfCenturies * ODD_DAYS_IN_A_CENTURY

  const totalDays =
    leapyears * LEAP_YEAR_DAYS +
    ordinaryYears * ORDINARY_YEAR_DAYS +
    getTotalNoOfDays(month, year) +
    date +
    oddDaysInCenturies
  const dayPredicted = totalDays % 7
  return dayPredicted || 7
}

export { isLeapYear, getTotalNoOfDays, predictDay }
