import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { ITeacher } from './teacher.interface';
import { Teacher } from './teacher.model';

const getAllTeachersFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new GlobalQueryBuilder(Teacher.find(), query)
    .search(['email', 'first_name', 'last_name', 'phone'])
    .filter()
    .paginate();
  const result = await teacherQuery?.modelQuery;
  const count = await teacherQuery?.countTotal();
  return { result, count };
};

const getSingleTeacherFromDB = async (id: string) => {
  const result = await Teacher.findById(id);
  return result;
};

const updateTeacherIntoDB = async (id: string, payload: Partial<ITeacher>) => {
  const result = await Teacher.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const TeacherServices = {
  getAllTeachersFromDB,
  getSingleTeacherFromDB,
  updateTeacherIntoDB,
};
