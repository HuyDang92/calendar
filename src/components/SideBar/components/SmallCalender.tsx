import { useContext, useEffect, useState } from 'react';
import { format, getMonth, setMonth, setYear } from 'date-fns';
import { GetMonth } from '~/util';
import Icon from '~/components/customs/Icon';
import GlobalContext from '~/context/GlobalContext';

const SmallCalendar = () => {
  const [currenMonthIndex, setCurrenMonthIndex] = useState(getMonth(new Date()));
  const [currentMonth, setCurrentMonth] = useState<Date[][]>(GetMonth());
  const { monthIndex, setMonthIndexSmall, daySelected, setDaySelected, fullYear, setFullYear } =
    useContext(GlobalContext);

  // get format month and year
  const formattedDate = format(setYear(setMonth(new Date(), currenMonthIndex), fullYear), 'MMMM yyyy');

  useEffect(() => {
    setCurrentMonth(GetMonth(monthIndex, fullYear));
    setCurrenMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(GetMonth(currenMonthIndex, fullYear));
  }, [currenMonthIndex]);

  const incrementMonth = () => {
    if (currenMonthIndex === 11) {
      setCurrenMonthIndex(0); // Thiết lập lại currenMonthIndex thành 0
      setFullYear(fullYear + 1);
    } else {
      setCurrenMonthIndex(currenMonthIndex + 1);
    }
  };

  const decrementMonth = () => {
    if (currenMonthIndex === 0) {
      setCurrenMonthIndex(11); // Thiết lập lại currenMonthIndex thành 11
      setFullYear(fullYear - 1);
    } else {
      setCurrenMonthIndex(currenMonthIndex - 1);
    }
  };

  const selectedDay = (day: Date) => {
    const formattedDay = format(day, 'dd-MM-yyyy');
    const selectedDay = daySelected ? format(daySelected, 'dd-MM-yyyy') : '';
    return formattedDay === selectedDay ? 'bg-lightBlue text-white' : '';
  };

  const currentDay = (day: Date) => {
    const formattedDay = format(day, 'dd-MM-yyyy');
    const formattedToday = format(new Date(), 'dd-MM-yyyy');

    return formattedDay === formattedToday ? 'bg-darkBlue text-white' : '';
  };
  const dayInMonthSmallCalendar = (day: Date) => {
    const formattedDay = format(day, 'MM-yyyy');
    const formattedDate = format(setYear(setMonth(new Date(), currenMonthIndex), fullYear), 'MM-yyyy');
    return formattedDay === formattedDate && currentDay(day) === '' ? 'text-[#222831]' : 'text-[#DDDDDD]';
  };

  return (
    <div className="">
      <div className="flex items-center justify-center gap-5 py-4">
        <Icon
          name="chevron-back-outline"
          onClick={decrementMonth}
          className="cursor-pointer rounded-full p-2 transition-all hover:bg-[#eee]"
        />
        <div className="text-lg font-bold text-darkBlue">{formattedDate}</div>
        <Icon
          onClick={incrementMonth}
          name="chevron-forward-outline"
          className="cursor-pointer rounded-full p-2 transition-all hover:bg-[#eee]"
        />
      </div>
      <div className="grid grid-cols-7 px-5">
        {currentMonth.map((row, rowIndex) => {
          return row.map((day, dayIndex) => {
            const weekDay = format(day, 'EEE');
            return (
              rowIndex === 0 && (
                <div key={dayIndex} className="flex justify-center text-xs uppercase text-[#fff]">
                  {weekDay}
                </div>
              )
            );
          });
        })}
      </div>
      <div className="grid grid-cols-7 px-5 transition-all ">
        {currentMonth.map((row, rowIndex) => {
          return row.map((day, dayIndex) => {
            const dayOfMonth = day.getDate();
            return (
              <div key={dayIndex} className="flex justify-center">
                <button
                  onClick={() => {
                    setMonthIndexSmall(currenMonthIndex);
                    setDaySelected(day);
                  }}
                  className={` mt-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${dayInMonthSmallCalendar(
                    day,
                  )} ${currentDay(day)} ${selectedDay(day)}`}
                >
                  {dayOfMonth}
                </button>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default SmallCalendar;
