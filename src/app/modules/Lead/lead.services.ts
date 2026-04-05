import GlobalQueryBuilder from '../../queryBuilder/GlobalQuaryBuilder';
import { ILead } from './lead.interface';
import { Lead } from './lead.model';

const createLeadIntoDB = async (payload: ILead) => {
  const result = await Lead.create(payload);
  return result;
};

const getNewLeadsFromBD = async (query: Record<string, unknown>) => {
  const leadsQuery = new GlobalQueryBuilder(Lead.find({ status: 'new' }), query);
  leadsQuery.search(['name', 'contact']);
  leadsQuery.filter();
  leadsQuery.paginate();
  const result = await leadsQuery.modelQuery;
  const count = await leadsQuery.countTotal();
  return { result, count };
};

const getAssignedLeadsFromBD = async (query: Record<string, unknown>) => {
  const leadsQuery = new GlobalQueryBuilder(Lead.find({ status: 'assigned' }), query);
  leadsQuery.search(['name', 'contact']);
  leadsQuery.filter();
  leadsQuery.paginate();
  const result = await leadsQuery.modelQuery.populate('assignedTo');
  const count = await leadsQuery.countTotal();
  return { result, count };
};

const getAssignedOwnLeadsFromBD = async (userId: string, query: Record<string, unknown>) => {
  const leadsQuery = new GlobalQueryBuilder(
    Lead.find({ status: 'assigned', assignedTo: userId }),
    query,
  );
  leadsQuery.search(['name', 'contact']);
  leadsQuery.filter();
  leadsQuery.paginate();
  const result = await leadsQuery.modelQuery;
  const count = await leadsQuery.countTotal();
  return { result, count };
};

const makeLeadAsAssignedIntoDB = async (
  id: string,
  payload: { assignedTo: string; reffredBy: string },
) => {
  const result = await Lead.findByIdAndUpdate(
    id,
    { status: 'assigned', assignedTo: payload.assignedTo, reffredBy: payload.reffredBy },
    { new: true },
  );
  return result;
};

const updateLeadIntoDB = async (id: string, payload: Partial<ILead>) => {
  const result = await Lead.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const LeadServices = {
  createLeadIntoDB,
  getNewLeadsFromBD,
  getAssignedLeadsFromBD,
  getAssignedOwnLeadsFromBD,
  makeLeadAsAssignedIntoDB,
  updateLeadIntoDB,
};
