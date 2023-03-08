export type ScheduleType = {
  _id: string;
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
  bgColor: string;
};

export type HolidayJsonType = {
  dateKind: number;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
  remarks?: string;
};
