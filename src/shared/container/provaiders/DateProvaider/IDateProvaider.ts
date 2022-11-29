interface IDateProvaider {

  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
}

export { IDateProvaider };