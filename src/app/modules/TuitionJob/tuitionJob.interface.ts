import { Types } from 'mongoose';

export interface ITuitionJob {
  lead_from: Types.ObjectId;
  posted_by: Types.ObjectId;

  title: string;

  student_gender: 'male' | 'female' | 'other';
  class_level: string;
  subjects: string[];

  number_of_students: number;
  tutoring_type: 'home' | 'online' | 'batch';
  medium: 'bangla' | 'english' | 'both';

  location: {
    address: string;
    area: string;
    city: string;
    postal_code?: string;
    latitude?: number;
    longitude?: number;
  };

  days_per_week: number;
  preferred_days?: string[];
  preferred_time: string;

  salary: {
    amount: number;
    type: 'monthly' | 'per_class';
    negotiable: boolean;
  };

  tutor_gender?: 'male' | 'female';
  tutor_qualification?: string;
  tutor_experience_years?: number;

  special_requirements?: string;

  status: 'open' | 'assigned' | 'closed';
}
