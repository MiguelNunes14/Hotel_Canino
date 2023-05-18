import Roles from '@/security/roles';
import Plans from '@/security/plans';
import Storage from '@/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      petImport: {
        id: 'petImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      petCreate: {
        id: 'petCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      petEdit: {
        id: 'petEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      petDestroy: {
        id: 'petDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      petRead: {
        id: 'petRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      petAutocomplete: {
        id: 'petAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      bookingImport: {
        id: 'bookingImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      bookingCreate: {
        id: 'bookingCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.bookingPhotos,
          storage.bookingReceipt,
        ],
      },
      bookingEdit: {
        id: 'bookingEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.bookingPhotos,
          storage.bookingReceipt,
        ],
      },
      bookingDestroy: {
        id: 'bookingDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.bookingPhotos,
          storage.bookingReceipt,
        ],
      },
      bookingRead: {
        id: 'bookingRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      bookingAutocomplete: {
        id: 'bookingAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;