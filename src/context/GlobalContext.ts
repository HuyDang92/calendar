import { createContext } from 'react';

const GlobalContext = createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},

  monthIndexSmall: null,
  setMonthIndexSmall: (index: number) => {},

  daySelected: null,
  setDaySelected: (day: Date) => {},

  fullYear: 0,
  setFullYear: (day: number) => {},
});
export default GlobalContext;
