import { Box, Button, Flex, Heading, ScrollArea, Text } from '@radix-ui/themes';
import { format, parseISO } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import DialogView from '~/components/DialogView';
import EventItem from '~/components/EventItem';
import SmallCalendar from '~/components/SideBar/components/SmallCalender';
import GlobalContext from '~/context/GlobalContext';
import { data } from '~/data';

type SideBarProps = {
  month: Date[][];
};

const SideBar = ({ month }: SideBarProps) => {
  const { daySelected } = useContext(GlobalContext);
  const [viewDate, setViewDate] = useState<string>(format(new Date(), 'EEEE, dd MMMM yyyy'));
  const [dataCover, setDataCover] = useState<IEvent[]>(data);

  useEffect(() => {
    if (daySelected !== null) {
      const formattedSelectedDay = format(daySelected, 'dd-MM-yyyy');
      const filteredData = data.filter((item) => {
        const formattedDate = format(parseISO(item.date), 'dd-MM-yyyy');
        return formattedDate === formattedSelectedDay;
      });
      console.log(filteredData);

      setDataCover(filteredData);
    }
  }, [daySelected]);

  useEffect(() => {
    if (daySelected !== null) {
      const formattedSelectedDay = format(daySelected, 'dd-MM-yyyy');
      const formattedToday = format(new Date(), 'dd-MM-yyyy');
      setViewDate(
        `${formattedSelectedDay === formattedToday ? 'Today' : ''} ${format(
          daySelected,
          formattedSelectedDay === formattedToday ? 'dd MMMM yyyy' : 'EEEE, dd MMMM yyyy',
        )}`,
      );
      // setViewDate(format(daySelected, 'EEEE, dd MMMM yyyy'));
    }
  }, [daySelected]);

  return (
    <aside className="sticky top-[12px] flex h-[calc(100vh-24px)] w-[30%] flex-col justify-between rounded-xl bg-[#fff]/20 p-2 shadow-border-light  backdrop-blur-lg">
      <SmallCalendar />
      <div className="px-2">
        <div className="mt-5 flex items-center justify-between border-t pb-3 pt-5 ">
          <h3 className="text-xl font-bold text-darkBlue">Upcoming Events</h3>
          <DialogView data={dataCover} viewDate={viewDate}>
            <Button className="h-7 cursor-pointer rounded-full bg-gradient-to-r from-darkBlue to-lightBlue text-xs font-normal">
              View all
            </Button>
          </DialogView>
        </div>
        <p className="font-semibold text-white">{viewDate}</p>
      </div>
      {dataCover.length === 0 && <p className="flex justify-center py-20 text-white">There are no events today</p>}
      <ScrollArea type="always" scrollbars="vertical" className="mt-5 px-2">
        <Box>
          <ul className="space-y-3 pe-1">
            {dataCover.map((item, index) => (
              <EventItem key={index} data={item} />
            ))}
          </ul>
        </Box>
      </ScrollArea>
    </aside>
  );
};

export default SideBar;
