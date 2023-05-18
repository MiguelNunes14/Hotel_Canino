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
          code="entities.pet.importer.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.pet.importer.title"
        ></app-i18n>
      </h1>

      <app-importer
        storePath="pet/importer"
      ></app-importer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'app-pet-importer-page',
});
</script>

<style></style>
