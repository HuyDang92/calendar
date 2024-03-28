import { useContext, useEffect, useState } from 'react';
import CalendarHeader from '~/components/CalendarHeader';
import Month from '~/components/Month';
import SideBar from '~/components/SideBar';
import { GetMonth } from '~/util';
import GlobalContext from '~/context/GlobalContext';

function Home() {
  const [currentMonth, setCurrentMonth] = useState<Date[][]>(GetMonth());
  const { monthIndex, fullYear } = useContext(GlobalContext);
  // get GetMonth from monthIndex
  useEffect(() => {
    setCurrentMonth(GetMonth(monthIndex, fullYear));
  }, [monthIndex]);

  return (
    <div className="flex justify-between gap-5 ">
      <SideBar month={currentMonth} />
      <main className="hidden h-[calc(100vh-24px)] w-[70%] overflow-hidden rounded-xl bg-[#fff]/30 shadow-border-light backdrop-blur-lg sm:block">
        <CalendarHeader month={currentMonth} />
        <Month month={currentMonth} />
      </main>
    </div>
  );
}

export default Home;
