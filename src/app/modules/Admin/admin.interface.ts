import { Model } from 'mongoose';

export interface IAdmin {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role: 'tele_marketing' | 'tele_sales' | 'admin' | 'super_admin';
  profile_picture?: string;
  isActive: boolean;
  isDeleted: boolean;
  allowed_ip?: string[];
  last_login?: Date;
}

export interface AdminModel extends Model<IAdmin> {
  isAdminExistsByEmail(email: string): Promise<IAdmin>;
  findByEmailAndValidate(
    email: string,
    ip_address: string,
    password: string,
  ): Promise<IAdmin | null>;
}
