interface IDateProvaider {

  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addMinutes(minutes: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvaider };