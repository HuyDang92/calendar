import { useContext, useEffect, useState } from 'react';
import CalendarHeader from '~/components/CalendarHeader';
import Month from '~/components/Month';
import SideBar from '~/components/SideBar';
import { GetMonth } from '~/util';
import GlobalContext from '~/context/GlobalContext';

function CalenderMobile() {
  const [currentMonth, setCurrentMonth] = useState<Date[][]>(GetMonth());
  const { monthIndex, fullYear } = useContext(GlobalContext);
  // get GetMonth from monthIndex
  useEffect(() => {
    setCurrentMonth(GetMonth(monthIndex, fullYear));
  }, [monthIndex]);

  return (
    <div className="justify-between gap-5 sm:flex ">
      <main className=" w-[100%] overflow-hidden rounded-xl bg-[#fff]/30 shadow-border-light backdrop-blur-lg">
        <CalendarHeader month={currentMonth} />
        <Month month={currentMonth} />
      </main>
    </div>
  );
}

export default CalenderMobile;
