import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const BookingListPage = () =>
  import(
    '@/modules/booking/components/booking-list-page.vue'
  );
const BookingFormPage = () =>
  import(
    '@/modules/booking/components/booking-form-page.vue'
  );
const BookingViewPage = () =>
  import(
    '@/modules/booking/components/booking-view-page.vue'
  );
const BookingImporterPage = () =>
  import(
    '@/modules/booking/components/booking-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'booking',
        path: '/booking',
        component: BookingListPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookingRead,
        },
      },
      {
        name: 'bookingNew',
        path: '/booking/new',
        component: BookingFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookingCreate,
        },
      },
      {
        name: 'bookingImporter',
        path: '/booking/import',
        component: BookingImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookingImport,
        },
      },
      {
        name: 'bookingEdit',
        path: '/booking/:id/edit',
        component: BookingFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookingEdit,
        },
        props: true,
      },
      {
        name: 'bookingView',
        path: '/booking/:id',
        component: BookingViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookingRead,
        },
        props: true,
      },
    ],
  },
];
