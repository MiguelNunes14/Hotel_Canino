<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.pet.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.pet.list.title"
        ></app-i18n>
      </h1>

      <app-pet-list-toolbar></app-pet-list-toolbar>
      <app-pet-list-filter></app-pet-list-filter>
      <app-pet-list-table></app-pet-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import PetListFilter from '@/modules/pet/components/pet-list-filter.vue';
import PetListTable from '@/modules/pet/components/pet-list-table.vue';
import PetListToolbar from '@/modules/pet/components/pet-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-pet-list-page',

  components: {
    'app-pet-list-filter': PetListFilter,
    'app-pet-list-table': PetListTable,
    'app-pet-list-toolbar': PetListToolbar,
  },
});
</script>

<style></style>
