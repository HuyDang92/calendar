import { Button, Select } from '@radix-ui/themes';
import { useContext } from 'react';
import Icon from '~/components/customs/Icon';
import { setYear, setMonth, format, getMonth } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import DialogSetting from '~/components/DialogSetting';

type SideBarProps = {
  month: Date[][];
};

const CalendarHeader = ({ month }: SideBarProps) => {
  const { monthIndex, setMonthIndex, fullYear, setFullYear, setDaySelected } = useContext(GlobalContext);
  // get format month and year
  const formattedDate = format(setYear(setMonth(new Date(), monthIndex), fullYear), 'MMMM yyyy');

  const incrementMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0); // Thiết lập lại monthIndex thành 0
      setFullYear(fullYear + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  const decrementMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11); // Thiết lập lại monthIndex thành 11
      setFullYear(fullYear - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const resetMonth = () => {
    setMonthIndex(getMonth(new Date()));
    setDaySelected(new Date());
  };
  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <Button variant="outline" className="rounded-xl" onClick={resetMonth}>
          Today
        </Button>
        <div className="flex gap-2">
          <Icon
            name="chevron-back-outline"
            onClick={decrementMonth}
            className="cursor-pointer rounded-full p-2 transition-all hover:bg-[#eee]"
          />
          <Icon
            onClick={incrementMonth}
            name="chevron-forward-outline"
            className="cursor-pointer rounded-full p-2 transition-all hover:bg-[#eee]"
          />
        </div>
        <div className="text-xl font-bold text-darkBlue">{formattedDate}</div>
      </div>
      <div className="flex items-center gap-5">
        <DialogSetting>
          <Icon name="settings-outline" className="rounded-full p-2 text-xl transition-all hover:bg-[#eee]" />
        </DialogSetting>
        <Select.Root defaultValue="month">
          <Select.Trigger className="min-w-24 rounded-xl bg-lightBlue text-white" />
          <Select.Content className="">
            <Select.Group>
              <Select.Item value="day">Day</Select.Item>
              <Select.Item value="week">Week</Select.Item>
              <Select.Item value="month">Month</Select.Item>
              <Select.Item value="year">Year</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </header>
  );
};

export default CalendarHeader;
