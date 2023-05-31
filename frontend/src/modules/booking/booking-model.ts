import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import DecimalRangeField from '@/shared/fields/decimal-range-field';
import DecimalField from '@/shared/fields/decimal-field';
import { PetField } from '@/modules/pet/pet-field';
import { UserField } from '@/modules/user/user-field';
import FilesField from '@/shared/fields/files-field';
import Storage from '@/security/storage';
import ImagesField from '@/shared/fields/images-field';

function label(name) {
  return i18n(`entities.booking.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.booking.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: UserField.relationToOne('owner', label('owner'), {
    "required": true
  }),
  pet: PetField.relationToOne('pet', label('pet'), {
    "required": true
  }),
  arrival: new DateTimeField('arrival', label('arrival'), {
    "required": true
  }),
  departure: new DateTimeField('departure', label('departure'), {
    "required": true
  }),
  clientNotes: new StringField('clientNotes', label('clientNotes'), {
    "max": 20000
  }),
  employeeNotes: new StringField('employeeNotes', label('employeeNotes'), {
    "max": 20000
  }),
  photos: new ImagesField('photos', label('photos'), Storage.values.bookingPhotos, {}),
  status: new EnumeratorField('status', label('status'), [
    { id: 'booked', label: enumeratorLabel('status', 'booked') },
    { id: 'cancelled', label: enumeratorLabel('status', 'cancelled') },
    { id: 'completed', label: enumeratorLabel('status', 'completed') },
    { id: 'progress', label: enumeratorLabel('status', 'progress') },
  ],{
    "required": true
  }),
  cancellationNotes: new StringField('cancellationNotes', label('cancellationNotes'), {
    "max": 20000
  }),
  fee: new DecimalField('fee', label('fee'), {
    "scale": 2
  }),
  receipt: new FilesField('receipt', label('receipt'), Storage.values.bookingReceipt, {}),
  approval: new EnumeratorField('approval', label('approval'), [
    { id: 'pending', label: enumeratorLabel('approval', 'pending') },
    { id: 'approved', label: enumeratorLabel('approval', 'approved') },
    { id: 'denied', label: enumeratorLabel('approval', 'denied') },
  ],{
    "required": true
  }),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  arrivalRange: new DateTimeRangeField(
    'arrivalRange',
    label('arrivalRange'),
  ),
  departureRange: new DateTimeRangeField(
    'departureRange',
    label('departureRange'),
  ),
  feeRange: new DecimalRangeField(
    'feeRange',
    label('feeRange'),
  ),
};

export class BookingModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
