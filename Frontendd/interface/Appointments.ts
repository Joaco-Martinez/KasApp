
export interface IAppointments {
  id: number;
  day: string; 
  time: string; 
  name: string; 
  surname: string; 
  email: string; 
  phone: string; 
}

export interface ICreateAppointments {
  day: string;
  time: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}