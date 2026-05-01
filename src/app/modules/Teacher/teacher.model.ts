import mongoose, { Schema } from 'mongoose';
import { ITeacher, TeacherModel } from './teacher.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const teacherSchema = new Schema<ITeacher, TeacherModel>(
  {
    full_name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },

    phone: { type: String, required: true },

    preferred_teaching_locations: {
      city: { type: String },
      country: { type: String },
      area: { type: [String] },
    },

    about_me: { type: String },

    preferred_tutoring: {
      categories: { type: [String], default: [] },
      sub_categories: { type: [String], default: [] },
      subjects: { type: [String], default: [] },
      tutoring_types: { type: [String], default: [] },
      salary_range: {
        min: { type: Number },
        max: { type: Number },
      },
    },

    education: {
      school: {
        name: { type: String },
        gpa: { type: String },
        group: { type: String },
        board: { type: String },
        curriculum: { type: String },
        year_of_passing: { type: Number },
      },

      college: {
        name: { type: String },
        gpa: { type: String },
        group: { type: String },
        board: { type: String },
        curriculum: { type: String },
        year_of_passing: { type: Number },
        status: { type: String, enum: ['graduated', 'studying'] },
      },

      university: {
        name: { type: String },
        type: { type: String },
        department: { type: String },
        study_level: { type: String },
        gpa: { type: String },
        session: { type: String },
        status: { type: String, enum: ['graduated', 'studying'] },
      },
    },

    years_of_experience: { type: Number },

    tutoring_availability: {
      days: { type: [String], default: [] },
      time_slots: [
        {
          start_time: { type: String },
          end_time: { type: String },
        },
      ],
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    date_of_birth: { type: Date, required: true },

    blood_group: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    profile_picture: { type: String },

    religion: { type: String },

    marital_status: {
      type: String,
      enum: ['unmarried', 'married'],
    },

    parents_info: {
      father_name: { type: String },
      father_phone: { type: String },
      mother_name: { type: String },
      mother_phone: { type: String },
      emergency_contact_name: { type: String },
      emergency_contact_phone: { type: String },
    },

    identification: {
      type: {
        type: String,
        enum: ['passport', 'nid', 'driving_license', 'birth_certificate'],
      },
      number: { type: String },
      front_image: { type: String },
      back_image: { type: String },
    },

    certifications: [
      {
        type: { type: String },
        certificate_url: { type: String },
      },
    ],

    is_profile_completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
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
