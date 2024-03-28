import React, { useContext } from 'react';
import Icon from '~/components/customs/Icon';
import { setYear, setMonth, format, getMonth, parseISO } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import { Avatar } from '@radix-ui/themes';
import DialogAction from '~/components/DialogAction';

type EventItemProps = {
  data: IEvent;
};
enum Theme {
  darkBlue = 'darkBlue',
  lightBlue = 'lightBlue',
  darkOrange = 'darkOrange',
  lightOrange = 'lightOrange',
}

const commonStyleWrapper = 'overflow-hidden rounded-lg border-l-[6px] p-3';
const commonStyleTitle = 'text-[14px] font-medium';

const switchThemeBackground = (theme: string) => {
  switch (theme) {
    case Theme.lightBlue:
      return 'bg-lightBlue border-darkOrange';
    case Theme.lightOrange:
      return 'bg-lightOrange border-darkBlue';
    default:
      return 'bg-darkOrange border-lightBlue';
  }
};
const switchThemeTitle = (theme: string) => {
  switch (theme) {
    case Theme.lightBlue:
      return 'text-white';
    default:
      return 'text-darkBlue';
  }
};
const switchThemeIcon = (theme: string) => {
  switch (theme) {
    case Theme.lightBlue:
      return ' text-darkBlue bg-lightOrange';
    default:
      return 'text-white bg-lightBlue';
  }
};

const EventItemForType = (data: IEvent) => {
  switch (data.type) {
    case 'Appointment':
      return (
        <DialogAction date={new Date(data.date)} action="view" data={data}>
          <div className={`flex justify-between ${commonStyleWrapper} ${switchThemeBackground(data.theme)}`}>
            <div className="space-y-2">
              <h4 className={`${switchThemeTitle(data.theme)} ${commonStyleTitle} `}>{data.title}</h4>
              <span className="text-sm font-normal text-[#A9A9A9]">
                {data.startTime} - {data.endTime}
                {/* {format(parseISO(data.startTime), 'HH:mm a')} - {format(parseISO(data.endTime), 'HH:mm a')} */}
              </span>

              <div className="flex items-center gap-3">
                <Avatar src={data.client?.avatar} fallback="AVT" radius="full" size={'2'} />
                <a
                  href={data?.client?.linkProfile}
                  target="_blank"
                  className="cursor-pointer text-xs font-medium text-[#A9A9A9] underline"
                >
                  <span> View Client Profile</span>
                </a>
              </div>
            </div>
            <a href={data.linkMeeting} target="_blank">
              <Icon name="videocam-outline" className={`${switchThemeIcon(data.theme)} rounded-full  p-2 text-2xl`} />
            </a>
          </div>
        </DialogAction>
      );
    default:
      return (
        <DialogAction date={new Date(data.date)} action="view" data={data}>
          <div className={`${commonStyleWrapper} ${switchThemeBackground(data.theme)}`}>
            <div className="">
              <h4 className={`${switchThemeTitle(data.theme)} ${commonStyleTitle}`}>{data.title}</h4>
            </div>
            <span className="text-sm font-normal text-[#A9A9A9]">
              {data.startTime} - {data.endTime}
              {/* {format(parseISO(data.startTime), 'HH:mm a')} - {format(parseISO(data.endTime), 'HH:mm a')} */}
            </span>
          </div>
        </DialogAction>
      );
  }
};
const EventItem = ({ data }: EventItemProps) => {
  return <>{EventItemForType(data)}</>;
};

export default React.memo(EventItem);
