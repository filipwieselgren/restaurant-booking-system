export interface IAdminBookedProps {
  name: string;
  amountOfPeople: number;
  date: string;
  time: number;
  email: string;
  phone: number;
  _id: string;
  cancelid: number;
  tables: number;
}

export interface IAdminBookedRender {
  name: string;
  amountOfPeople: number;
  date: string;
  time: number;
  email: string;
  phone: number;
  _id: string;
}
