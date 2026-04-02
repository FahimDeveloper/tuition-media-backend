import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AdminModel, IAdmin } from './admin.interface';
import { AdminRole } from '../../utils/role';
import AppError from '../../errors/AppError';
import status from 'http-status';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    full_name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ['tele_marketing', 'tele_sales', 'admin', 'super_admin'],
      required: true,
    },
    profile_picture: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    allowed_ip: {
      type: [String],
      default: [],
    },
    last_login: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.statics.findByEmailAndValidate = async function (
  email: string,
  password: string,
  ip_address: string,
) {
  const admin = await this.findOne({ email }).select('+password').lean();
  if (!admin) {
    throw new AppError(status.NOT_FOUND, 'Admin not found');
  }

  const rolesRequiringIPCheck: AdminRole[] = ['tele_marketing', 'tele_sales'];
  if (
    rolesRequiringIPCheck.includes(admin.role) &&
    admin.allowed_ip?.length &&
    !admin.allowed_ip.includes(ip_address)
  ) {
    throw new AppError(status.FORBIDDEN, 'Access denied, please contact the administrator!');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password!);
  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  const { password: _, ...adminWithoutPassword } = admin;

  return adminWithoutPassword;
};

export const Admin = mongoose.model<IAdmin, AdminModel>('Admin', adminSchema);
