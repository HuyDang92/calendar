import { useContext } from 'react';
import Icon from '~/components/customs/Icon';
import GlobalContext from '~/context/GlobalContext';
import EventItem from '~/components/EventItem';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

type DialogProps = {
  children: React.ReactNode;
  data: IEvent[];
  viewDate: string;
};

const DialogView = ({ children, data, viewDate }: DialogProps) => {
  const { dataEvent, setDataEvent } = useContext(GlobalContext);

  const removeEvent = (idEvent?: string) => {
    const newArray = dataEvent.filter((item) => item.id !== idEvent);
    setDataEvent(newArray);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg border-none bg-[#fff]/50 text-white backdrop-blur-lg">
        <DialogTitle>All Events</DialogTitle>
        {data.length === 0 && <p className="flex justify-center py-20 text-white">There are no events today</p>}
        <ul className="space-y-3 pe-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-[95%]">
                <EventItem data={item} />
              </div>
              <Icon
                onClick={() => removeEvent(item.id)}
                name="trash-outline"
                className="cursor-pointer rounded-full p-2 text-darkBlue hover:bg-[#eee]"
              />
            </div>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;
