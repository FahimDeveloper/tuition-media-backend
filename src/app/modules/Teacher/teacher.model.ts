import mongoose, { Schema } from 'mongoose';
import { ITeacher, TeacherModel } from './teacher.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const teacherSchema = new Schema<ITeacher, TeacherModel>(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
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
      trim: true,
    },
    phone: { type: String, required: true },
    address: { type: String },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    date_of_birth: { type: Date, required: true },
    profile_picture: { type: String },
    years_of_experience: { type: Number, default: 0 },
    qualifications: [
      {
        degree: String,
        institution: String,
        graduated: Boolean,
        year_of_graduation: Number,
        certificates: [
          {
            name: String,
            file: String,
          },
        ],
      },
    ],
    nid: {
      front: String,
      back: String,
    },
    subjects: { type: [String], default: [] },
    will_teach_online: { type: Boolean, default: false },
    sections: { type: [String], default: [] },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

teacherSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
});

teacherSchema.statics.isTeacherExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password').lean();
};

teacherSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const Teacher = mongoose.model<ITeacher, TeacherModel>('Teacher', teacherSchema);
