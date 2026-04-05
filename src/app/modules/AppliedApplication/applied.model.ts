import mongoose, { Schema } from 'mongoose';
import { IAppliedApplication } from './applied.interface';

const AppliedApplicationSchema: Schema<IAppliedApplication> = new Schema(
  {
    job: { type: Schema.Types.ObjectId, required: true, ref: 'TuitionJob' },
    applicant: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'hired'],
      default: 'applied',
    },
  },
  {
    timestamps: true,
  },
);

export const AppliedApplication = mongoose.model<IAppliedApplication>(
  'AppliedApplication',
  AppliedApplicationSchema,
);
