import { startOfMonth, getDay } from 'date-fns';

// get day of month
export const GetMonth = (month: number = new Date().getMonth(), year: number = new Date().getFullYear()): Date[][] => {
  // Get the first day of the month
  const firstDayOfTheMonth: number = getDay(startOfMonth(new Date(year, month, 1)));
  // Get the number of days in the month
  let currentMonthCount: number = 1 - firstDayOfTheMonth;
  // Create a matrix of the days in the month
  const dayMatrix: Date[][] = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      const currentDate: Date = new Date(year, month, currentMonthCount);
      currentMonthCount++;
      return currentDate;
    });
  });
  return dayMatrix;
};
