import mongoose, { Model } from 'mongoose';

export interface ILead {
  name: string;
  contact: string;
  assignedTo: mongoose.Types.ObjectId;
  referredBy?: mongoose.Types.ObjectId;
  status: 'new' | 'assigned' | 'interested' | 'converted' | 'blocked';
  convertedBy?: mongoose.Types.ObjectId;
  followUps: {
    date: Date;
    note?: string;
    doneBy: mongoose.Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadModel extends Model<ILead> {
  getConvertedLeadsByAdmin(adminId: string): Promise<ILead[]>;
}
