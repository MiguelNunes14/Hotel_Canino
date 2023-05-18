import petListStore from '@/modules/pet/pet-list-store';
import petViewStore from '@/modules/pet/pet-view-store';
import petImporterStore from '@/modules/pet/pet-importer-store';
import petFormStore from '@/modules/pet/pet-form-store';
import petDestroyStore from '@/modules/pet/pet-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: petDestroyStore,
    form: petFormStore,
    list: petListStore,
    view: petViewStore,
    importer: petImporterStore,
  },
};
