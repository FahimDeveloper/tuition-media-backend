import { Types } from 'mongoose';

export interface IAppliedApplication {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'rejected' | 'hired';
}
