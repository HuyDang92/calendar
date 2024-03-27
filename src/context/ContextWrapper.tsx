import { useEffect, useState } from 'react';
import GlobalContext from '~/context/GlobalContext';
import { getMonth, getYear } from 'date-fns';

function ContextWrapper(props: any) {
  const [monthIndex, setMonthIndex] = useState<number>(getMonth(new Date()));
  const [monthIndexSmall, setMonthIndexSmall] = useState<any>(null);
  const [daySelected, setDaySelected] = useState<any>(new Date());
  const [fullYear, setFullYear] = useState<number>(getYear(new Date()));

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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
