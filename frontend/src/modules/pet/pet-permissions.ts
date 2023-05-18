import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class PetPermissions {
  read: boolean;
  import: boolean;
  petAutocomplete: boolean;
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
      Permissions.values.petRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.petImport,
    );
    this.petAutocomplete = permissionChecker.match(
      Permissions.values.petAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.petCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.petEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.petDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.petRead,
    );
  }
}
