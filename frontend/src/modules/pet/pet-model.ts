import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import { BookingField } from '@/modules/booking/booking-field';
import { UserField } from '@/modules/user/user-field';

function label(name) {
  return i18n(`entities.pet.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.pet.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: UserField.relationToOne('owner', label('owner'), {
    "required": true
  }),
  name: new StringField('name', label('name'), {
    "required": true,
    "max": 255
  }),
  type: new EnumeratorField('type', label('type'), [
    { id: 'cat', label: enumeratorLabel('type', 'cat') },
    { id: 'dog', label: enumeratorLabel('type', 'dog') },
  ],{
    "required": true
  }),
  breed: new StringField('breed', label('breed'), {
    "required": true,
    "max": 255
  }),
  size: new EnumeratorField('size', label('size'), [
    { id: 'small', label: enumeratorLabel('size', 'small') },
    { id: 'medium', label: enumeratorLabel('size', 'medium') },
    { id: 'large', label: enumeratorLabel('size', 'large') },
  ],{
    "required": true
  }),
  bookings: BookingField.relationToMany('bookings', label('bookings'), {}),
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

};

export class PetModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
