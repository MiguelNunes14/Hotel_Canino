import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const PetListPage = () =>
  import(
    '@/modules/pet/components/pet-list-page.vue'
  );
const PetFormPage = () =>
  import(
    '@/modules/pet/components/pet-form-page.vue'
  );
const PetViewPage = () =>
  import(
    '@/modules/pet/components/pet-view-page.vue'
  );
const PetImporterPage = () =>
  import(
    '@/modules/pet/components/pet-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'pet',
        path: '/pet',
        component: PetListPage,
        meta: {
          auth: true,
          permission: Permissions.values.petRead,
        },
      },
      {
        name: 'petNew',
        path: '/pet/new',
        component: PetFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.petCreate,
        },
      },
      {
        name: 'petImporter',
        path: '/pet/import',
        component: PetImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.petImport,
        },
      },
      {
        name: 'petEdit',
        path: '/pet/:id/edit',
        component: PetFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.petEdit,
        },
        props: true,
      },
      {
        name: 'petView',
        path: '/pet/:id',
        component: PetViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.petRead,
        },
        props: true,
      },
    ],
  },
];
