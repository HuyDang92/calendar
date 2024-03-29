import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useContext } from 'react';
import Icon from '~/components/customs/Icon';
import { setYear, setMonth, format, getMonth } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import DialogSetting from '~/components/DialogSetting';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';

type SideBarProps = {
  month: Date[][];
};

const CalendarHeader = ({ month }: SideBarProps) => {
  const navigate = useNavigate();
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

  const handleNavigate = (link: string) => {
    navigate(link);
  };
  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center gap-2 sm:gap-5">
        <Link to={'/'} className="sm:hidden">
          <Icon name="arrow-back-outline" className="me-5 text-2xl" />
        </Link>
        <Button
          variant={'ghost'}
          className="h-9 rounded-xl border border-lightBlue bg-transparent text-lightBlue"
          onClick={resetMonth}
        >
          Today
        </Button>
        <div className="flex gap-2">
          <Icon
            name="chevron-back-outline"
            onClick={decrementMonth}
            className="cursor-pointer rounded-full p-2 transition-all hover:bg-lightBlue"
          />
          <Icon
            onClick={incrementMonth}
            name="chevron-forward-outline"
            className="cursor-pointer rounded-full p-2 transition-all hover:bg-lightBlue"
          />
        </div>
        <div className="text-xl font-bold text-darkBlue">{formattedDate}</div>
      </div>
      <div className="hidden items-center gap-5 sm:flex">
        <DialogSetting>
          <Icon name="settings-outline" className="rounded-full p-2 text-xl transition-all hover:bg-lightBlue" />
        </DialogSetting>
        <Select>
          <SelectTrigger className="h-9 w-[100px] rounded-xl border-none bg-lightBlue text-white outline-none">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="text-white">
            <SelectItem value="Day">Day</SelectItem>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default CalendarHeader;
