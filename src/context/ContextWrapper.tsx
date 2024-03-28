import { useEffect, useState } from 'react';
import GlobalContext from '~/context/GlobalContext';
import { getMonth, getYear } from 'date-fns';

function ContextWrapper(props: any) {
  const [urlBackground, setUrlBackground] = useState<string>('/bg.jpg');

  const [monthIndex, setMonthIndex] = useState<number>(getMonth(new Date()));
  const [monthIndexSmall, setMonthIndexSmall] = useState<any>(null);
  const [daySelected, setDaySelected] = useState<any>(new Date());
  const [fullYear, setFullYear] = useState<number>(getYear(new Date()));
  const [dataEvent, setDataEvent] = useState<IEvent[]>(() => {
    const storedDataEvent = localStorage.getItem('dataEvent');
    return storedDataEvent ? JSON.parse(storedDataEvent) : [];
  });

  useEffect(() => {
    // save dataEvent to localStorage
    localStorage.setItem('dataEvent', JSON.stringify(dataEvent));
  }, [dataEvent]);

  useEffect(() => {
    if (monthIndexSmall !== null) {
      setMonthIndex(monthIndexSmall);
    }
  }, [monthIndexSmall]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        monthIndexSmall,
        setMonthIndexSmall,
        daySelected,
        setDaySelected,
        fullYear,
        setFullYear,
        dataEvent,
        setDataEvent,
        urlBackground,
        setUrlBackground,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
