



export interface IUser {
  id: string;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  password?: string;
  isAdmin: boolean;
  agencyId?: number |  null;
  profilePictureUrl: string
}

export interface ICreateUser {
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  password?: string;
  isAdmin: boolean;
  agencyId?: number | null;
}

export interface ILoginUser {
  email: string;
  password: string;
}