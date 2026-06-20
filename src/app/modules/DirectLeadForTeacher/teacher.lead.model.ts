import mongoose, { Schema } from 'mongoose';
import { IDirectLeadForTeacher } from './teacher.lead.interfaces';

const directLeadForTeacherSchema = new Schema<IDirectLeadForTeacher>(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DirectLeadForTeacher = mongoose.model<IDirectLeadForTeacher>(
  'DirectLeadForTeacher',
  directLeadForTeacherSchema,
);
