import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { useContext } from 'react';
import Icon from '~/components/customs/Icon';
import { setYear, setMonth, format, getMonth } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import EventItem from '~/components/EventItem';

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
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>All Events</Dialog.Title>

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
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogView;
