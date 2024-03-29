import { useContext, useEffect, useState } from 'react';
import Icon from '~/components/customs/Icon';
import GlobalContext from '~/context/GlobalContext';
import EventItem from '~/components/EventItem';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { format } from 'date-fns';
import { ScrollArea } from '~/components/ui/scroll-area';

type DialogProps = {
  children: React.ReactNode;
  data: IEvent[];
  viewDate: string;
};

const DialogView = ({ children, data, viewDate }: DialogProps) => {
  const { dataEvent, setDataEvent, daySelected } = useContext(GlobalContext);
  const [dataCover, setDataCover] = useState<IEvent[]>([]);

  const removeEvent = (idEvent?: string) => {
    const newArray = dataEvent.filter((item) => item.id !== idEvent);
    setDataEvent(newArray);
  };
  useEffect(() => {
    if (daySelected !== null) {
      const formattedSelectedDay = format(daySelected, 'MM-yyyy');

      const filteredData = dataEvent.filter((item) => {
        const formattedDate = format(new Date(item.date), 'MM-yyyy');
        return formattedDate === formattedSelectedDay;
      });

      setDataCover(filteredData);
    }
  }, [daySelected, dataEvent]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg border-none bg-[#fff]/50 text-white backdrop-blur-lg">
        <DialogTitle>All Events</DialogTitle>
        {dataCover.length === 0 && <p className="flex justify-center py-20 text-white">There are no events today</p>}
        <ScrollArea className="max-h-[80vh]">
          <ul className="space-y-3 pe-1">
            {dataCover.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-[95%]">
                  <EventItem data={item} type={'view'}/>
                </div>
                <Icon
                  onClick={() => removeEvent(item.id)}
                  name="trash-outline"
                  className="cursor-pointer rounded-full p-2 text-darkBlue hover:bg-[#eee]"
                />
              </div>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;
