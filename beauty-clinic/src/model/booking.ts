export interface Booking {
  ID: string;
  clinicianID: number;
  clientID: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  comments?: string;
}