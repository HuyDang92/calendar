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

  dataEvent: [] as IEvent[],
  setDataEvent: (data: any) => {},

  urlBackground: '',
  setUrlBackground: (url: string) => {},
});
export default GlobalContext;
