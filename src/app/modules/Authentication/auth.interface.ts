export interface ITeacherLogin {
  email: string;
  password: string;
}

export interface ITeacherRegistration {
  full_name: string;
  email: string;
  date_of_birth: Date;
  phone: string;
  gender: 'male' | 'female';
  password: string;
}

export interface IAdminLogin {
  email: string;
  password: string;
  ip_address: string;
}
