export interface ScheduleType {
  _id: string;
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
