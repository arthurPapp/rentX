import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvaider } from "../IDateProvaider";

dayjs.extend(utc);

class DayjsDateProvaider implements IDateProvaider {

  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const endDate = this.convertToUtc(end_date);
    const starDate = this.convertToUtc(start_date)
    return dayjs(endDate).diff(starDate, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDate = this.convertToUtc(end_date);
    const starDate = this.convertToUtc(start_date)
    return dayjs(endDate).diff(starDate, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addMinutes(minutes: number): Date {
    return dayjs().add(minutes, "minutes").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvaider };