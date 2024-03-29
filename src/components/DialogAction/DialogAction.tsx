import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import Icon from '~/components/customs/Icon';
import { useForm } from 'react-hook-form';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

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
  console.log(data?.title);

  const appointment = useForm<IEvent>({
    defaultValues: {
      title: data?.title,
      client: data?.client,
      thumbnail: data?.thumbnail,
      linkMeeting: data?.linkMeeting,
      startTime: data?.startTime ?? '00:00',
      endTime: data?.endTime ?? '00:00',
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
      startTime: data?.startTime ?? '00:00',
      endTime: data?.endTime ?? '00:00',
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
    setTheme(data?.theme ?? 'lightBlue');
    if (data?.type === 'Event') {
      setValue('title', data.title);
      setValue('client', data.client);
      setValue('thumbnail', data.thumbnail);
      setValue('linkMeeting', data.linkMeeting);
      setValue('startTime', data.startTime);
      setValue('endTime', data.endTime);
      setValue('date', data.date);
      setValue('address', data.address);
      setValue('description', data.description);
      setValue('theme', data.theme);
    }
    if (data?.type === 'Appointment') {
      appointment.setValue('title', data.title);
      appointment.setValue('client', data.client);
      appointment.setValue('thumbnail', data.thumbnail);
      appointment.setValue('linkMeeting', data.linkMeeting);
      appointment.setValue('startTime', data.startTime);
      appointment.setValue('endTime', data.endTime);
      appointment.setValue('date', data.date);
      appointment.setValue('address', data.address);
      appointment.setValue('description', data.description);
      appointment.setValue('theme', data.theme);
    }
  };
  const removeEvent = (idEvent?: string) => {
    const newArray = dataEvent.filter((item) => item.id !== idEvent);
    setDataEvent(newArray);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={resetForm}>{children}</DialogTrigger>
      <DialogContent className="bg-[#fff]/50 text-white backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="pb-3 font-bold">{data ? 'Update event' : 'Add Event'}</span>
        </div>
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
              <span className={`bg-${color} relative rounded-lg px-8 py-1`}>
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
        <Tabs defaultValue={data?.type === 'Appointment' ? 'Appointment' : 'Event'}>
          <TabsList className={`"grid  grid-cols-2 ${data ? '' : 'grid w-full grid-cols-2'}`}>
            {!data && (
              <TabsTrigger
                className=" bg-transparent p-1 text-[16px] text-[#ccc] "
                value="Event"
                onClick={() => setType('Event')}
              >
                Event
              </TabsTrigger>
            )}
            {!data && (
              <TabsTrigger
                className=" bg-transparent p-1 text-[16px] text-[#ccc] "
                value="Appointment"
                onClick={() => setType('Appointment')}
              >
                Appointment
              </TabsTrigger>
            )}
            {data?.type === 'Event' && (
              <TabsTrigger
                className="w-32  bg-transparent p-1 text-[15px]"
                value="Event"
                onClick={() => setType('Event')}
              >
                Event
              </TabsTrigger>
            )}
            {data?.type === 'Appointment' && (
              <TabsTrigger
                className="w-32  bg-transparent p-1 text-[15px]"
                value="Appointment"
                onClick={() => setType('Appointment')}
              >
                Appointment
              </TabsTrigger>
            )}
          </TabsList>

          <div className="py-3">
            <TabsContent value="Event" className="outline-none">
              <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
                <label>
                  <div className="font-semibold">Add title</div>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full rounded-lg border-2 border-[#ccc] bg-transparent  p-2 placeholder:text-white"
                    placeholder="Enter title"
                  />
                </label>
                <div className="flex justify-between gap-3">
                  <label className="w-full">
                    <div className="font-semibold">Add start time</div>
                    <input
                      type="time"
                      {...register('startTime', { required: true })}
                      className="w-full rounded-lg border-2 border-[#ccc]  bg-transparent p-2"
                    />
                  </label>
                  <label className="w-full">
                    <div className="font-semibold">Add end time</div>
                    <input
                      type="time"
                      {...register('endTime', { required: true })}
                      className="w-full rounded-lg border-2 border-[#ccc]  bg-transparent p-2"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  {...register('address', { required: false })}
                  className="w-full rounded-lg border-2 border-[#ccc] bg-transparent p-2 placeholder:text-white"
                  placeholder="Add address"
                />
                <textarea
                  className="w-full rounded-lg border-2 border-[#ccc] bg-transparent p-2 placeholder:text-white"
                  {...register('description', { required: false })}
                  rows={3}
                  defaultValue={''}
                  placeholder="Add description"
                />
                <div className="float-end flex gap-4">
                  {!data ? (
                    <Button onClick={() => reset()} variant="ghost" className="border-white bg-transparent">
                      Reset
                    </Button>
                  ) : (
                    <DialogClose>
                      <Button
                        onClick={() => removeEvent(data?.id)}
                        variant={'secondary'}
                        className="float-end flex rounded-lg bg-red-500 text-white"
                      >
                        Remove
                      </Button>
                    </DialogClose>
                  )}
                  <DialogClose>
                    <Button type="submit" variant={'secondary'} className=" flex rounded-lg bg-lightBlue text-white">
                      {data ? 'Update' : 'Save'}
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="Appointment" className="outline-none">
              <form onSubmit={appointment.handleSubmit(handleSubmitForm)} className="space-y-3">
                <label>
                  <div className="font-semibold">Add title</div>
                  <input
                    type="text"
                    {...appointment.register('title', { required: true })}
                    className="w-full rounded-lg border-2 border-[#ccc] bg-transparent  p-2 placeholder:text-white"
                    placeholder="Enter title"
                  />
                </label>
                <div className="flex justify-between gap-3">
                  <label className="w-full">
                    <div className="font-semibold">Add start time</div>
                    <input
                      type="time"
                      {...appointment.register('startTime', { required: true })}
                      className="w-full rounded-lg border-2 border-[#ccc]  bg-transparent p-2"
                    />
                  </label>
                  <label className="w-full">
                    <div className="font-semibold">Add end time</div>
                    <input
                      type="time"
                      {...appointment.register('endTime', { required: true })}
                      className="w-full rounded-lg border-2 border-[#ccc]  bg-transparent p-2"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  {...appointment.register('linkMeeting', { required: true })}
                  className="w-full rounded-lg border-2 border-[#ccc]  bg-transparent p-2 placeholder:text-white"
                  placeholder="Add link meeting"
                />
                <textarea
                  className="w-full rounded-lg border-2 border-[#ccc] bg-transparent p-2 placeholder:text-white "
                  {...appointment.register('description', { required: false })}
                  rows={3}
                  defaultValue={''}
                  placeholder="Add description"
                />
                <div className="float-end flex gap-4">
                  {!data ? (
                    <Button onClick={() => reset()} variant="ghost" className="border-white bg-transparent">
                      Reset
                    </Button>
                  ) : (
                    <DialogClose>
                      <Button
                        onClick={() => removeEvent(data?.id)}
                        variant={'secondary'}
                        className="float-end flex rounded-lg bg-red-500 text-white"
                      >
                        Remove
                      </Button>
                    </DialogClose>
                  )}
                  <DialogClose>
                    <Button type="submit" variant={'secondary'} className=" flex rounded-lg bg-lightBlue text-white">
                      {data ? 'Update' : 'Save'}
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DialogAction);
