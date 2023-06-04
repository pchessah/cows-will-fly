export interface INotification{
  date: Date,
  id:string,
  status:'available' | "travelled" | "unavailable"
}