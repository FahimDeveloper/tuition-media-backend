import mongoose, { Schema } from 'mongoose';
import { ITuitionJob } from './tuitionJob.interface';

const TuitionJobSchema: Schema<ITuitionJob> = new Schema(
  {
    lead_from: { type: Schema.Types.ObjectId, required: true, ref: 'Lead' },
    posted_by: { type: Schema.Types.ObjectId, required: true, ref: 'Admin' },

    title: { type: String, required: true },

    student_gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    class_level: { type: String, required: true },
    subjects: { type: [String], required: true },

    number_of_students: { type: Number, required: true },
    tutoring_type: { type: String, enum: ['home', 'online', 'batch'], required: true },
    medium: { type: String, enum: ['bangla', 'english', 'both'], required: true },

    location: {
      address: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      postal_code: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },

    days_per_week: { type: Number, required: true },
    preferred_days: { type: [String] },
    preferred_time: { type: String, required: true },

    salary: {
      amount: { type: Number, required: true },
      type: { type: String, enum: ['monthly', 'per_class'], required: true },
      negotiable: { type: Boolean, default: true },
    },

    tutor_gender: { type: String, enum: ['male', 'female'] },
    tutor_qualification: { type: String },
    tutor_experience_years: { type: Number },

    special_requirements: { type: String },

    status: { type: String, enum: ['open', 'assigned', 'closed'], default: 'open' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// TuitionJobSchema.index({ 'location.city': 1 });
// TuitionJobSchema.index({ subjects: 1 });
// TuitionJobSchema.index({ 'salary.amount': 1 });

export const TuitionJob = mongoose.model<ITuitionJob>('TuitionJob', TuitionJobSchema);
