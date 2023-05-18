<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.booking.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.booking.list.title"
        ></app-i18n>
      </h1>

      <app-booking-list-toolbar></app-booking-list-toolbar>
      <app-booking-list-filter></app-booking-list-filter>
      <app-booking-list-table></app-booking-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import BookingListFilter from '@/modules/booking/components/booking-list-filter.vue';
import BookingListTable from '@/modules/booking/components/booking-list-table.vue';
import BookingListToolbar from '@/modules/booking/components/booking-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-booking-list-page',

  components: {
    'app-booking-list-filter': BookingListFilter,
    'app-booking-list-table': BookingListTable,
    'app-booking-list-toolbar': BookingListToolbar,
  },
});
</script>

<style></style>
