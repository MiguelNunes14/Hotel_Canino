import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class BookingPermissions {
  read: boolean;
  import: boolean;
  bookingAutocomplete: boolean;
  create: boolean;
  edit: boolean;
  destroy: boolean;
  lockedForCurrentPlan: boolean;

  constructor(currentTenant, currentUser) {
    const permissionChecker = new PermissionChecker(
      currentTenant,
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.bookingRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.bookingImport,
    );
    this.bookingAutocomplete = permissionChecker.match(
      Permissions.values.bookingAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.bookingCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.bookingEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.bookingDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.bookingRead,
    );
  }
}
