import React, { useContext, useEffect, useState } from 'react';
import { format, parseISO, setMonth, setYear } from 'date-fns';
import { motion } from 'framer-motion';
import GlobalContext from '~/context/GlobalContext';
import DialogAction from '~/components/DialogAction/DialogAction';
import { data } from '~/data';

type DayProps = {
  day: Date;
  rowIndex: number;
};
enum Theme {
  darkBlue = 'darkBlue',
  lightBlue = 'lightBlue',
  darkOrange = 'darkOrange',
  lightOrange = 'lightOrange',
}
const switchThemeBackground = (theme: string) => {
  switch (theme) {
    case Theme.lightBlue:
      return 'bg-lightBlue border-darkOrange';
    case Theme.lightOrange:
      return 'bg-lightOrange border-darkBlue';
    default:
      return 'bg-darkOrange border-lightBlue';
  }
};
const Day: React.FC<DayProps> = ({ day, rowIndex }) => {
  // get day of month
  const dayOfMonth = day.getDate();
  const [dataCover, setDataCover] = useState<IEvent[]>(data);
  const { monthIndex, fullYear } = useContext(GlobalContext);

  // get current day return highlight color
  const currentDay = () => {
    const formattedDay = format(day, 'dd-MM-yyyy');
    const formattedToday = format(new Date(), 'dd-MM-yyyy');

    return formattedDay === formattedToday ? 'bg-darkBlue text-white' : '';
  };

  // get day in month return highlight text
  const dayInMonth = () => {
    const formattedDay = format(day, 'MM-yyyy');
    // get format month and year
    const formattedDate = format(setYear(setMonth(new Date(), monthIndex), fullYear), 'MM-yyyy');
    return formattedDay === formattedDate && currentDay() === '' ? 'text-[#222831]' : 'text-[#DDDDDD]';
  };

  useEffect(() => {
    if (day !== null) {
      const formattedSelectedDay = format(day, 'dd-MM-yyyy');
      const filteredData = data.filter((item) => {
        const formattedDate = format(parseISO(item.date), 'dd-MM-yyyy');
        return formattedDate === formattedSelectedDay;
      });
      console.log(filteredData);
      setDataCover(filteredData);
    }
  }, [day]);

  return (
    <DialogAction>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1 * rowIndex,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className={`flex h-[13.3vh]  cursor-pointer items-start justify-center overflow-hidden border-r border-t  `}
      >
        <div>
          <div
            className={` relative left-1/2 mt-2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-sm font-medium ${dayInMonth()} ${currentDay()}`}
          >
            {dayOfMonth}
          </div>
          <div>
            {dataCover.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className={`${switchThemeBackground(item.theme)} mt-1 line-clamp-1 rounded-md border-l-4 p-1 text-xs`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DialogAction>
  );
};

export default Day;
