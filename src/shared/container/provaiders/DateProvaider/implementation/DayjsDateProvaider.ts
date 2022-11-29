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


}

export { DayjsDateProvaider };