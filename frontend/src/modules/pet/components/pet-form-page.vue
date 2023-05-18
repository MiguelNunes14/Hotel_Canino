<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pet' }">
        <app-i18n code="entities.pet.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.pet.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.pet.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.pet.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.pet.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-pet-form
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
import PetForm from '@/modules/pet/components/pet-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-pet-form-page',

  props: ['id'],

  components: {
    'app-pet-form': PetForm,
  },

  computed: {
    ...mapGetters({
      record: 'pet/form/record',
      initLoading: 'pet/form/initLoading',
      saveLoading: 'pet/form/saveLoading',
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
      doInit: 'pet/form/doInit',
      doUpdate: 'pet/form/doUpdate',
      doCreate: 'pet/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/pet');
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
