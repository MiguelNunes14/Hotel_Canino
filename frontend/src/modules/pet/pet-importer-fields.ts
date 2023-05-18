import { PetModel } from '@/modules/pet/pet-model';

const { fields } = PetModel;

export default [
  fields.owner,
  fields.name,
  fields.type,
  fields.breed,
  fields.size,
  fields.bookings,
];
