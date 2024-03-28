import { Box, Button, Flex, Heading, ScrollArea, Text } from '@radix-ui/themes';
import { format, parseISO } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import DialogView from '~/components/DialogView';
import EventItem from '~/components/EventItem';
import SmallCalendar from '~/components/SideBar/components/SmallCalender';
import GlobalContext from '~/context/GlobalContext';

type SideBarProps = {
  month: Date[][];
};

const SideBar = ({ month }: SideBarProps) => {
  const { daySelected, dataEvent } = useContext(GlobalContext);
  const [viewDate, setViewDate] = useState<string>(format(new Date(), 'EEEE, dd MMMM yyyy'));
  const [data, setDataCover] = useState<IEvent[]>(dataEvent);

  useEffect(() => {
    if (daySelected !== null) {
      const formattedSelectedDay = format(daySelected, 'dd-MM-yyyy');

      const filteredData = dataEvent.filter((item) => {
        const formattedDate = format(parseISO(item.date), 'dd-MM-yyyy');
        return formattedDate === formattedSelectedDay;
      });

      setDataCover(filteredData);
    }
  }, [daySelected, dataEvent]);

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
    }
  }, [daySelected]);

  return (
    <aside className="top-[12px] flex h-[calc(100vh-24px)] flex-col justify-between rounded-xl bg-[#fff]/30 p-2 shadow-border-light backdrop-blur-lg sm:sticky  sm:w-[30%]">
      <SmallCalendar />
      <div className="px-2">
        <div className="mt-5 flex items-center justify-between border-t pb-3 pt-5 ">
          <h3 className="text-xl font-bold text-darkBlue">Upcoming Events</h3>
          <DialogView data={data} viewDate={viewDate}>
            <Button className="h-7 cursor-pointer rounded-full bg-gradient-to-r from-darkBlue to-lightBlue text-xs font-normal">
              View all
            </Button>
          </DialogView>
        </div>
        <p className="font-semibold text-white">{viewDate}</p>
      </div>
      {data.length === 0 && <p className="flex justify-center py-20 text-white">There are no events today</p>}
      <ScrollArea type="always" scrollbars="vertical" className="mt-5 px-2">
        <Box>
          <ul className="space-y-3 pe-1">
            {data.map((item, index) => (
              <EventItem key={index} data={item} />
            ))}
          </ul>
        </Box>
      </ScrollArea>
    </aside>
  );
};

export default SideBar;
