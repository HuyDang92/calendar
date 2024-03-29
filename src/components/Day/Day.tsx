import React, { useContext, useEffect, useState } from 'react';
import { format, parseISO, setMonth, setYear } from 'date-fns';
import { motion } from 'framer-motion';
import GlobalContext from '~/context/GlobalContext';
import DialogAction from '~/components/DialogAction/DialogAction';

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
const switchThemeTitle = (theme: string) => {
  switch (theme) {
    case Theme.lightBlue:
      return 'text-white';
    default:
      return 'text-darkBlue';
  }
};
const Day: React.FC<DayProps> = ({ day, rowIndex }) => {
  // get day of month
  const dayOfMonth = day.getDate();
  const { monthIndex, fullYear, dataEvent } = useContext(GlobalContext);
  const [data, setDataCover] = useState<IEvent[]>([]);

  // get current day return highlight color
  const currentDay = () => {
    const formattedDay = format(day, 'dd-MM-yyyy');
    const formattedToday = format(new Date(), 'dd-MM-yyyy');

    return formattedDay === formattedToday ? 'bg-darkBlue text-white' : '';
  };

  // get day in month return highlight text
  const dayInMonth = () => {
    const formattedDay = format(day, 'MM-yyyy');
    const formattedDate = format(setYear(setMonth(new Date(), monthIndex), fullYear), 'MM-yyyy');
    return formattedDay === formattedDate && currentDay() === '' ? 'text-[#222831]' : 'text-[#DDDDDD]';
  };

  // filter data event by selected day
  useEffect(() => {
    if (day !== null) {
      const formattedSelectedDay = format(day, 'dd-MM-yyyy');
      const filteredData = dataEvent.filter((item) => {
        const formattedDate = format(parseISO(item.date), 'dd-MM-yyyy');
        return formattedDate === formattedSelectedDay;
      });
      setDataCover(filteredData);
    }
  }, [day, dataEvent]);

  const moreEvent = (day: any) => {
    const formattedSelectedDay = format(day, 'dd-MM-yyyy');
    const filteredData = dataEvent.filter((item) => {
      const formattedDate = format(parseISO(item.date), 'dd-MM-yyyy');
      return formattedDate === formattedSelectedDay;
    });
    return filteredData.length > 2 ? (
      <div className=" px-1 text-[9px] text-white">+{filteredData.length - 2} more</div>
    ) : (
      ''
    );
  };

  return (
    <DialogAction date={day} action="add">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1 * rowIndex,
        }}
        className={`flex h-[13.3vh]  cursor-pointer items-start justify-center overflow-hidden border-r border-t border-white  `}
      >
        <div className="w-full">
          <div
            className={` relative left-1/2 mt-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-sm font-medium ${dayInMonth()} ${currentDay()}`}
          >
            {dayOfMonth}
          </div>
          <div className="space-y-1">
            {data.length > 0 &&
              data.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className={`${switchThemeBackground(
                    item.theme,
                  )} line-clamp-1 rounded-md border-l-4 p-1 py-[2px] text-[10px] ${switchThemeTitle(item.theme)}`}
                >
                  {item.title}
                </div>
              ))}
            {}
            {moreEvent(day)}
          </div>
        </div>
      </motion.div>
    </DialogAction>
  );
};

export default Day;
