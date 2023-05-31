<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/booking' }">
        <app-i18n code="entities.booking.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.booking.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.booking.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-booking-view-toolbar
        v-if="record"
      ></app-booking-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-relation-to-one
          :label="fields.owner.label"
          :permission="fields.owner.readPermission"
          :url="fields.owner.viewUrl"
          :value="presenter(record, 'owner')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-one
          :label="fields.pet.label"
          :permission="fields.pet.readPermission"
          :url="fields.pet.viewUrl"
          :value="presenter(record, 'pet')"
        ></app-view-item-relation-to-one>

        <app-view-item-text :label="fields.arrival.label" :value="presenter(record, 'arrival')"></app-view-item-text>

        <app-view-item-text :label="fields.departure.label" :value="presenter(record, 'departure')"></app-view-item-text>

        <app-view-item-text :label="fields.clientNotes.label" :value="presenter(record, 'clientNotes')"></app-view-item-text>

        <app-view-item-text :label="fields.employeeNotes.label" :value="presenter(record, 'employeeNotes')"></app-view-item-text>

        <app-view-item-image :label="fields.photos.label" :value="presenter(record, 'photos')"></app-view-item-image>

        <app-view-item-text :label="fields.status.label" :value="presenter(record, 'status')"></app-view-item-text>

        <app-view-item-text :label="fields.cancellationNotes.label" :value="presenter(record, 'cancellationNotes')"></app-view-item-text>

        <app-view-item-text :label="fields.fee.label" :value="presenter(record, 'fee')"></app-view-item-text>

        <app-view-item-file :label="fields.receipt.label" :value="presenter(record, 'receipt')"></app-view-item-file>

        <app-view-item-text :label="fields.approval.label" :value="presenter(record, 'approval')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import BookingViewToolbar from '@/modules/booking/components/booking-view-toolbar.vue';
import { BookingModel } from '@/modules/booking/booking-model';

const { fields } = BookingModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-booking-view-page',

  props: ['id'],

  components: {
    'app-booking-view-toolbar': BookingViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'booking/view/record',
      loading: 'booking/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'booking/view/doFind',
    }),

    presenter(record, fieldName) {
      return BookingModel.presenter(record, fieldName);
    },
  },
});
</script>
