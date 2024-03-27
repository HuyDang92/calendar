interface IAppointmentClient {
  avatar: string;
  linkProfile: string;
}

interface IEvent {
  id: string;
  title: string;
  type: 'Appointment' | 'Event';
  client: IAppointmentClient | null;
  thumbnail: string | null;
  linkMeeting: string;
  address: string | null;
  description: string;
  date: string;
  startTime: any;
  endTime: string;
  createAt: string;
  updateAt: string;
  theme: 'darkBlue' | 'lightBlue' | 'darkOrange' | 'lightOrange';
}
