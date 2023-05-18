import importerStore from '@/shared/importer/importer-store';
import { BookingService } from '@/modules/booking/booking-service';
import bookingImporterFields from '@/modules/booking/booking-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  BookingService.import,
  bookingImporterFields,
  i18n('entities.booking.importer.fileName'),
  i18n('entities.booking.importer.hint'),
);
