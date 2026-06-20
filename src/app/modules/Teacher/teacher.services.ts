import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { ITeacher } from './teacher.interface';
import { Teacher } from './teacher.model';

const getAllPrivateTeachersFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new GlobalQueryBuilder(Teacher.find(), query)
    .search(['email', 'first_name', 'last_name', 'phone'])
    .filter()
    .paginate();
  const result = await teacherQuery?.modelQuery;
  const count = await teacherQuery?.countTotal();
  return { result, count };
};

const getAllPublicTeachersFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new GlobalQueryBuilder(Teacher.find(), query).filter().paginate();
  const result = await teacherQuery?.modelQuery.select('-password -phone -additional_phone -email');
  const count = await teacherQuery?.countTotal();
  return { result, count };
};

const getSinglePublicTeacherFromDB = async (id: string) => {
  const result = await Teacher.findById(id).select('-password -phone -additional_phone -email');
  return result;
};

const getSinglePrivateTeacherFromDB = async (id: string) => {
  const result = await Teacher.findById(id);
  return result;
};

const updateTeacherIntoDB = async (id: string, payload: Partial<ITeacher>) => {
  const { password, ...safePayload } = payload;
  const result = await Teacher.findByIdAndUpdate(id, safePayload, {
    new: true,
  });

  return result;
};

export const TeacherServices = {
  getAllPrivateTeachersFromDB,
  getAllPublicTeachersFromDB,
  getSinglePublicTeacherFromDB,
  getSinglePrivateTeacherFromDB,
  updateTeacherIntoDB,
};
