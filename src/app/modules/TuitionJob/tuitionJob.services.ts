import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { ITuitionJob } from './tuitionJob.interface';
import { TuitionJob } from './tuitionJob.model';

const createTuitionJobIntoDB = async (payload: ITuitionJob) => {
  const result = await TuitionJob.create(payload);
  return result;
};

const getAllTuitionJobsForUserFromDB = async (query: Record<string, unknown>) => {
  const jobQuery = new GlobalQueryBuilder(TuitionJob.find(), query);
  jobQuery.search(['title', 'subjects']);
  jobQuery.filter();
  jobQuery.salaryFilter();
  jobQuery.paginate();
  const result = await jobQuery.modelQuery;
  const count = await jobQuery.countTotal();
  return { result, count };
};

const getAllTuitionJobsForAdminFromDB = async (query: Record<string, unknown>) => {
  const jobQuery = new GlobalQueryBuilder(TuitionJob.find(), query);
  jobQuery.search(['title']);
  jobQuery.filter();
  jobQuery.paginate();
  const result = await jobQuery.modelQuery;
  const count = await jobQuery.countTotal();
  return { result, count };
};

const getTuitionJobByIdFromDB = async (id: string) => {
  const result = await TuitionJob.findById(id);
  return result;
};

const updateTuitionJobByIntoDB = async (id: string, payload: Partial<ITuitionJob>) => {
  const result = await TuitionJob.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const TuitionJobServices = {
  createTuitionJobIntoDB,
  getAllTuitionJobsForUserFromDB,
  getAllTuitionJobsForAdminFromDB,
  getTuitionJobByIdFromDB,
  updateTuitionJobByIntoDB,
};
