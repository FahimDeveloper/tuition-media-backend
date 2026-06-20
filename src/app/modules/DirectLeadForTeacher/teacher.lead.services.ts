import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { IDirectLeadForTeacher } from './teacher.lead.interfaces';
import { DirectLeadForTeacher } from './teacher.lead.model';

const makeLeadForTeacherIntoDB = async (payload: IDirectLeadForTeacher) => {
  const result = await DirectLeadForTeacher.create(payload);
  return result;
};

const getLeadsFromDB = async (query: Record<string, unknown>) => {
  const leadQuery = new GlobalQueryBuilder(DirectLeadForTeacher.find().populate('teacher'), query)
    .search(['name', 'contact'])
    .filter()
    .paginate();
  const result = await leadQuery?.modelQuery;
  const count = await leadQuery?.countTotal();
  return { result, count };
};

export const TeacherLeadServices = {
  makeLeadForTeacherIntoDB,
  getLeadsFromDB,
};
