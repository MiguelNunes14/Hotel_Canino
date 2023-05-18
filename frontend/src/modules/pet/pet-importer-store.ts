import importerStore from '@/shared/importer/importer-store';
import { PetService } from '@/modules/pet/pet-service';
import petImporterFields from '@/modules/pet/pet-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  PetService.import,
  petImporterFields,
  i18n('entities.pet.importer.fileName'),
  i18n('entities.pet.importer.hint'),
);
