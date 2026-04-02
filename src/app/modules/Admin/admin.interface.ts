import { Model } from 'mongoose';
import { AdminRole } from '../../utils/role';

export interface IAdmin {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role: AdminRole;
  profile_picture?: string;
  isActive: boolean;
  isDeleted: boolean;
  allowed_ip?: string[];
  last_login?: Date;
}

export interface AdminModel extends Model<IAdmin> {
  findByEmailAndValidate(
    email: string,
    ip_address: string,
    password: string,
  ): Promise<IAdmin | null>;
}
