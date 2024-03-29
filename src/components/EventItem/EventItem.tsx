import { format } from 'date-fns';
import React from 'react';
import Icon from '~/components/customs/Icon';
import DialogAction from '~/components/DialogAction';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

type EventItemProps = {
  data: IEvent;
  type?: string;
};
enum Theme {
  darkBlue = 'darkBlue',
  lightBlue = 'lightBlue',
  darkOrange = 'darkOrange',
  lightOrange = 'lightOrange',
}

const commonStyleWrapper = 'overflow-hidden rounded-xl border-l-[6px] p-3 text-left';
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

const EventItemForType = (data: IEvent, type: any) => {
  switch (data.type) {
    case 'Appointment':
      return (
        <DialogAction date={new Date(data.date)} action="view" data={data}>
          <div className={`flex justify-between ${commonStyleWrapper} ${switchThemeBackground(data.theme)}`}>
            <div className="space-y-2">
              {type === 'view' && (
                <p className={`"font-bold ${switchThemeTitle(data.theme)}`}>
                  {format(new Date(data.date), 'dd-MM-yyyy')}
                </p>
              )}
              <h4 className={`${switchThemeTitle(data.theme)} ${commonStyleTitle} `}>{data.title}</h4>
              <span className="text-sm font-normal text-[#A9A9A9]">
                <span>
                  {data.startTime} - {data.endTime}
                </span>
              </span>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
            {type === 'view' && (
              <p className={`"font-bold ${switchThemeTitle(data.theme)}`}>
                {format(new Date(data.date), 'dd-MM-yyyy')}
              </p>
            )}
            <div className="">
              <h4 className={`${switchThemeTitle(data.theme)} ${commonStyleTitle}`}>{data.title}</h4>
            </div>
            <span className="text-sm font-normal text-[#A9A9A9]">
              {data.startTime} - {data.endTime}
            </span>
          </div>
        </DialogAction>
      );
  }
};
const EventItem = ({ data, type }: EventItemProps) => {
  return <>{EventItemForType(data, type)}</>;
};

export default React.memo(EventItem);
