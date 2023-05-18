import routes from '@/modules/booking/booking-routes';
import store from '@/modules/booking/booking-store';
import BookingAutocompleteInput from '@/modules/booking/components/booking-autocomplete-input.vue';

export default {
  components: {
    'app-booking-autocomplete-input': BookingAutocompleteInput,
  },
  routes,
  store,
};
