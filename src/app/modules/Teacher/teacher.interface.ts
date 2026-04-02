import { Model } from 'mongoose';

export interface ITeacher {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  gender: 'male' | 'female';
  date_of_birth: Date;
  profile_picture?: string;
  years_of_experience?: number;
  qualifications?: {
    degree: string;
    institution: string;
    graduated: boolean;
    year_of_graduation?: number;
    certificates: {
      name: string;
      file: string;
    }[];
  }[];
  nid?: {
    front: string;
    back: string;
  };
  subjects?: string[];
  will_teach_online?: boolean;
  sections?: string[];
  isProfileCompleted: boolean;
}

export interface TeacherModel extends Model<ITeacher> {
  isTeacherExistsByEmail(email: string): Promise<ITeacher>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
