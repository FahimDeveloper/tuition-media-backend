import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdminIntoDB = async (payload: IAdmin) => {
  const admin = await Admin.create(payload);
  return admin;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new GlobalQueryBuilder(Admin.find(), query)
    .search(['email', 'full_name', 'phone'])
    .filter()
    .paginate();
  const result = await adminQuery?.modelQuery;
  const count = await adminQuery?.countTotal();
  return { result, count };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

const restoreAdminFromDB = async (id: string) => {
  const result = await Admin.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
  return result;
};

export const AdminServices = {
  createAdminIntoDB,
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  restoreAdminFromDB,
};
