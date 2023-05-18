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
          code="entities.pet.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.pet.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-pet-view-toolbar
        v-if="record"
      ></app-pet-view-toolbar>

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

        <app-view-item-text :label="fields.name.label" :value="presenter(record, 'name')"></app-view-item-text>

        <app-view-item-text :label="fields.type.label" :value="presenter(record, 'type')"></app-view-item-text>

        <app-view-item-text :label="fields.breed.label" :value="presenter(record, 'breed')"></app-view-item-text>

        <app-view-item-text :label="fields.size.label" :value="presenter(record, 'size')"></app-view-item-text>

        <app-view-item-relation-to-many
          :label="fields.bookings.label"
          :permission="fields.bookings.readPermission"
          :url="fields.bookings.viewUrl"
          :value="presenter(record, 'bookings')"
        ></app-view-item-relation-to-many>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import PetViewToolbar from '@/modules/pet/components/pet-view-toolbar.vue';
import { PetModel } from '@/modules/pet/pet-model';

const { fields } = PetModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-pet-view-page',

  props: ['id'],

  components: {
    'app-pet-view-toolbar': PetViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'pet/view/record',
      loading: 'pet/view/loading',
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
      doFind: 'pet/view/doFind',
    }),

    presenter(record, fieldName) {
      return PetModel.presenter(record, fieldName);
    },
  },
});
</script>
