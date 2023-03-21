import { ObjectId } from 'mongodb';

export interface ScheduleType {
  _id: ObjectId | string;
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
  bgColor: string;
  userId?: string;
}

export interface HolidayJsonType {
  dateKind: number;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
  remarks?: string;
}
