import { Types } from 'mongoose';

export interface ITuitionJob {
  // private data
  lead_from: Types.ObjectId;
  posted_by: Types.ObjectId;
  contact: string;

  // public data
  title: string;
  student_gender: 'male' | 'female' | 'other';

  category: 'bangla' | 'english' | 'both';
  course: string;
  subjects: string[];

  number_of_students: number;

  tutoring_type: 'home' | 'online' | 'batch';

  location: {
    address: string;
    country: string;
    area: string;
    city: string;
    latitude?: number;
    longitude?: number;
  };

  days_per_week: number;
  preferred_days?: string[];
  preferred_time: string;

  salary: {
    min: number;
    max: number;
    expected: number;
    type: 'monthly' | 'per_class';
    negotiable: boolean;
  };

  tutor_gender?: 'male' | 'female';
  tutor_qualification?: string;
  tutor_experience_years?: number;

  special_requirements?: string;

  status: 'open' | 'assigned' | 'closed';
}
