import bookingListStore from '@/modules/booking/booking-list-store';
import bookingViewStore from '@/modules/booking/booking-view-store';
import bookingImporterStore from '@/modules/booking/booking-importer-store';
import bookingFormStore from '@/modules/booking/booking-form-store';
import bookingDestroyStore from '@/modules/booking/booking-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: bookingDestroyStore,
    form: bookingFormStore,
    list: bookingListStore,
    view: bookingViewStore,
    importer: bookingImporterStore,
  },
};
