import { Box, Button, Dialog, Flex, Tabs, Text, TextField } from '@radix-ui/themes';
import { useContext, useEffect, useId, useState } from 'react';
import { setYear, setMonth, format, getMonth } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import Icon from '~/components/customs/Icon';
import { useForm } from 'react-hook-form';
import EventItem from '~/components/EventItem';

type DialogProps = {
  children: React.ReactNode;
  date: Date;
  action: string;
  data?: IEvent;
};

const DialogAction = ({ children, date, action, data }: DialogProps) => {
  const selectedDay = format(date, 'EEEE, dd MMMM yyyy');
  const { dataEvent, setDataEvent } = useContext(GlobalContext);
  const [type, setType] = useState<string>('Event');
  const [theme, setTheme] = useState<string>(data?.theme ?? 'lightBlue');
  const colors = ['lightBlue', 'lightOrange', 'darkOrange'];

  const appointment = useForm<IEvent>({
    defaultValues: {
      title: data?.title,
      client: data?.client,
      thumbnail: data?.thumbnail,
      linkMeeting: data?.linkMeeting,
      startTime: data?.startTime,
      endTime: data?.endTime,
      date: data?.date ?? date.toISOString(),
      address: data?.address,
      description: data?.description,
      theme: data?.theme ?? 'lightBlue',
    },
  });
  const { handleSubmit, register, reset, setValue } = useForm<any>({
    defaultValues: {
      title: data?.title,
      client: data?.client,
      thumbnail: data?.thumbnail,
      linkMeeting: data?.linkMeeting,
      startTime: data?.startTime,
      endTime: data?.endTime,
      date: data?.date ?? date.toISOString(),
      address: data?.address,
      description: data?.description,
      theme: data?.theme ?? 'lightBlue',
    },
  });
  const handleSubmitForm = (values: IEvent) => {
    const newEvent = {
      ...values,
      id: data?.id ?? Math.random().toString(36).substr(2, 9),
      type: data?.type ?? type,
      createAt: data?.createAt ?? new Date().toISOString(),
      updateAt: data?.updateAt ?? new Date().toISOString(),
      theme: theme,
    };
    if (!data) {
      setDataEvent((prevDataEvent: IEvent[]) => [newEvent, ...prevDataEvent]);
    } else {
      const index = dataEvent.findIndex((item: any) => item.id === newEvent.id);
      console.log(index);
      // make a copy of the data
      const newArrData: any = [...dataEvent];
      // Change the value of the copied data
      newArrData[index] = newEvent;
      // Cập nhật state với bản sao mới
      setDataEvent(newArrData);
    }
    reset();
    appointment.reset();
    setTheme('lightBlue');
  };
  const resetForm = () => {
    setType('Event');
    reset();
    appointment.reset();
    setTheme('lightBlue');
  };
  const removeEvent = (idEvent?: string) => {
    const newArray = dataEvent.filter((item) => item.id !== idEvent);
    setDataEvent(newArray);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger onClick={resetForm}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Event</Dialog.Title>
        <div className="flex gap-3">
          <Icon name="time-outline" className="text-2xl" />
          <p>{selectedDay}</p>
        </div>
        <div className="my-3 flex gap-2">
          {colors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                hidden
                value={color}
                checked={theme === color}
                onChange={(e) => setTheme(e.target.value)}
              />
              <span className={`bg-${color} relative rounded-md px-8 py-1`}>
                {theme === color && (
                  <Icon
                    name="chevron-down-circle-outline"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-white"
                  />
                )}
              </span>
            </label>
          ))}
        </div>
        <Tabs.Root defaultValue={data?.type === 'Appointment' ? 'Appointment' : 'Event'}>
          <Tabs.List>
            {!data && (
              <Tabs.Trigger value="Event" onClick={() => setType('Event')}>
                Event
              </Tabs.Trigger>
            )}
            {!data && (
              <Tabs.Trigger value="Appointment" onClick={() => setType('Appointment')}>
                Appointment
              </Tabs.Trigger>
            )}
            {data?.type === 'Event' && (
              <Tabs.Trigger value="Event" onClick={() => setType('Event')}>
                Event
              </Tabs.Trigger>
            )}
            {data?.type === 'Appointment' && (
              <Tabs.Trigger value="Appointment" onClick={() => setType('Appointment')}>
                Appointment
              </Tabs.Trigger>
            )}
          </Tabs.List>

          <div className="py-3">
            <Tabs.Content value="Event">
              <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Add title
                  </Text>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full rounded-md border-2 p-2"
                    placeholder="Enter title"
                  />
                </label>
                <div className="flex justify-between gap-3">
                  <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Add start time
                    </Text>
                    <input
                      type="time"
                      {...register('startTime', { required: true })}
                      className="w-full rounded-md border-2 p-2"
                      placeholder="Enter title"
                    />
                  </label>
                  <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Add end time
                    </Text>
                    <input
                      type="time"
                      {...register('endTime', { required: true })}
                      className="w-full rounded-md border-2 p-2"
                      placeholder="Enter title"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  {...register('address', { required: true })}
                  className="w-full rounded-md border-2 p-2"
                  placeholder="Add address"
                />
                <textarea
                  className="w-full rounded-md border-2 p-2"
                  {...register('description', { required: true })}
                  rows={3}
                  defaultValue={''}
                  placeholder="Add description"
                />
                <div className="float-end flex gap-4">
                  {!data ? (
                    <Button
                      onClick={() => reset()}
                      variant="outline"
                      className="float-end flex rounded-lg text-lightBlue"
                    >
                      Reset
                    </Button>
                  ) : (
                    <Dialog.Close>
                      <Button
                        onClick={() => removeEvent(data?.id)}
                        className="float-end flex rounded-lg bg-red-500 text-white"
                      >
                        Remove
                      </Button>
                    </Dialog.Close>
                  )}
                  <Dialog.Close>
                    <Button type="submit" className=" flex rounded-lg bg-lightBlue">
                      {data ? 'Update' : 'Save'}
                    </Button>
                  </Dialog.Close>
                </div>
              </form>
            </Tabs.Content>

            <Tabs.Content value="Appointment">
              <form onSubmit={appointment.handleSubmit(handleSubmitForm)} className="space-y-3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Add title
                  </Text>
                  <input
                    type="text"
                    {...appointment.register('title', { required: true })}
                    className="w-full rounded-md border-2 p-2"
                    placeholder="Enter title"
                  />
                </label>
                <div className="flex justify-between gap-3">
                  <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Add start time
                    </Text>
                    <input
                      type="time"
                      {...appointment.register('startTime', { required: true })}
                      className="w-full rounded-md border-2 p-2"
                      placeholder="Enter title"
                    />
                  </label>
                  <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Add end time
                    </Text>
                    <input
                      type="time"
                      {...appointment.register('endTime', { required: true })}
                      className="w-full rounded-md border-2 p-2"
                      placeholder="Enter title"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  {...appointment.register('linkMeeting', { required: true })}
                  className="w-full rounded-md border-2 p-2"
                  placeholder="Add link meeting"
                />
                <textarea
                  className="w-full rounded-md border-2 p-2"
                  {...appointment.register('description', { required: true })}
                  rows={3}
                  defaultValue={''}
                  placeholder="Add description"
                />
                <div className="float-end flex gap-4">
                  {!data ? (
                    <Button
                      onClick={() => reset()}
                      variant="outline"
                      className="float-end flex rounded-lg text-lightBlue"
                    >
                      Reset
                    </Button>
                  ) : (
                    <Dialog.Close>
                      <Button
                        onClick={() => removeEvent(data?.id)}
                        className="float-end flex rounded-lg bg-red-500 text-white"
                      >
                        Remove
                      </Button>
                    </Dialog.Close>
                  )}
                  <Dialog.Close>
                    <Button type="submit" className=" flex rounded-lg bg-lightBlue">
                      {data ? 'Update' : 'Save'}
                    </Button>
                  </Dialog.Close>
                </div>
              </form>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogAction;
