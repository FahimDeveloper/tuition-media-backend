import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { IAppliedApplication } from './applied.interface';
import { AppliedApplication } from './applied.model';

const applyForJobIntoDB = async (payload: IAppliedApplication) => {
  const result = await AppliedApplication.create(payload);
  return result;
};

const getApplicationsByJobIdFromDB = async (query: Record<string, unknown>) => {
  const applicationQuery = new GlobalQueryBuilder(AppliedApplication.find(), query);
  applicationQuery.paginate();
  const result = await applicationQuery.modelQuery.populate('applicant');
  const count = await applicationQuery.countTotal();
  return { result, count };
};

const getApplicationsByApplicantIdFromDB = async (query: Record<string, unknown>) => {
  const applicationQuery = new GlobalQueryBuilder(AppliedApplication.find(), query);
  applicationQuery.paginate();
  const result = await applicationQuery.modelQuery.populate('job');
  const count = await applicationQuery.countTotal();
  return { result, count };
};

export const AppliedApplicationServices = {
  applyForJobIntoDB,
  getApplicationsByJobIdFromDB,
  getApplicationsByApplicantIdFromDB,
};
