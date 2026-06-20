import mongoose from 'mongoose';

export interface IDirectLeadForTeacher {
  teacher: mongoose.Types.ObjectId;
  name: string;
  contact: string;
  details: string;
}
