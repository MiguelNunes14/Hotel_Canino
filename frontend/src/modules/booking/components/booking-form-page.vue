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
          code="entities.booking.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.booking.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.booking.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.booking.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-booking-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!initLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import BookingForm from '@/modules/booking/components/booking-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-booking-form-page',

  props: ['id'],

  components: {
    'app-booking-form': BookingForm,
  },

  computed: {
    ...mapGetters({
      record: 'booking/form/record',
      initLoading: 'booking/form/initLoading',
      saveLoading: 'booking/form/saveLoading',
    }),

    isEditing() {
      return Boolean(this.id);
    },
  },

  async created() {
    await this.doInit(this.id);
  },

  methods: {
    ...mapActions({
      doInit: 'booking/form/doInit',
      doUpdate: 'booking/form/doUpdate',
      doCreate: 'booking/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/booking');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
});
</script>

<style></style>
