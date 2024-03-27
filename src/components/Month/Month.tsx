import React from 'react';
import Day from '~/components/Day';
import { format } from 'date-fns';

type MonthProps = {
  month: Date[][];
};

const Month: React.FC<MonthProps> = ({ month }) => {
  return (
    <div className="">
      <div className="grid grid-cols-7">
        {month.map((row, rowIndex) => {
          return row.map((day, dayIndex) => {
            const weekDay = format(day, 'EEE');
            return (
              rowIndex === 0 && (
                <div key={dayIndex} className="flex justify-center pb-5 text-[#fff]">
                  {weekDay}
                </div>
              )
            );
          });
        })}
      </div>
      <div className="grid grid-cols-7 transition-all">
        {month.map((row, rowIndex) => {
          return row.map((day, dayIndex) => {
            return <Day key={dayIndex} day={day} rowIndex={rowIndex} />;
          });
        })}
      </div>
    </div>
  );
};

export default Month;
