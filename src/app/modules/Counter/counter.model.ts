import mongoose, { Schema } from 'mongoose';
import { ICounter } from './counter.interface';

const counterSchema = new Schema<ICounter>(
  {
    job_counter: {
      type: {
        key: { type: String, required: true },
        value: { type: Number, default: 0 },
      },
      required: true,
      _id: false,
    },
    teacher_counter: {
      type: {
        key: { type: String, required: true },
        value: { type: Number, default: 0 },
      },
      required: true,
      _id: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Counter = mongoose.model<ICounter>('Counter', counterSchema);
