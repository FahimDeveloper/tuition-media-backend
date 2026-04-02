export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  full_name: string;
  email: string;
  date_of_birth: Date;
  phone: string;
  gender: 'male' | 'female';
  password: string;
}
