import { BookingModel } from '@/modules/booking/booking-model';

const { fields } = BookingModel;

export default [
  fields.id,
  fields.owner,
  fields.pet,
  fields.arrival,
  fields.departure,
  fields.clientNotes,
  fields.employeeNotes,
  fields.status,
  fields.cancellationNotes,
  fields.fee,
  fields.receipt,
  fields.approval,
  fields.createdAt,
  fields.updatedAt
];
