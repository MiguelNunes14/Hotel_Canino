import routes from '@/modules/pet/pet-routes';
import store from '@/modules/pet/pet-store';
import PetAutocompleteInput from '@/modules/pet/components/pet-autocomplete-input.vue';

export default {
  components: {
    'app-pet-autocomplete-input': PetAutocompleteInput,
  },
  routes,
  store,
};
