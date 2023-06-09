<template>
  <div class="filter">
    <app-filter-preview
      :values="model"
      :fields="fields"
      :expanded="expanded"
      @click="doToggleExpanded()"
      @remove="doRemove($event)"
    ></app-filter-preview>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthFilter"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doFilter"
      ref="form"
      v-if="expanded"
    >
      <el-row type="flex">
        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.email.label"
            :prop="fields.email.name"
          >
            <el-input v-model="model[fields.email.name]" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.fullName.label"
            :prop="fields.fullName.name"
          >
            <el-input
              v-model="model[fields.fullName.name]"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.status.label"
            :prop="fields.status.name"
          >
            <el-select
              placeholder
              v-model="model[fields.status.name]"
            >
              <el-option :value="undefined">--</el-option>
              <el-option
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-for="option in fields.status.options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.role.label"
            :prop="fields.role.name"
          >
            <el-select
              placeholder
              v-model="model[fields.role.name]"
            >
              <el-option :value="undefined">--</el-option>
              <el-option
                :key="option.value"
                :label="option.label"
                :value="option.value"
                v-for="option in fields.role.options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="filter-buttons">
        <el-button
          :disabled="loading"
          @click="doFilter"
          icon="el-icon-fa-search"
          type="primary"
        >
          <app-i18n code="common.search"></app-i18n>
        </el-button>

        <el-button
          :disabled="loading"
          @click="doResetFilter"
          icon="el-icon-fa-undo"
        >
          <app-i18n code="common.reset"></app-i18n>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { FilterSchema } from '@/shared/form/filter-schema';
import { i18n } from '@/i18n';
import { UserModel } from '@/modules/user/user-model';

const { fields } = UserModel;

const filterSchema = new FilterSchema([
  fields.email,
  fields.fullName,
  fields.status,
  fields.role,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-user-list-filter',

  data() {
    return {
      rules: filterSchema.rules(),
      model: {},
      expanded: false,
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthFilter: 'layout/labelWidthFilter',
      loading: 'user/list/loading',
      rawFilter: 'user/list/rawFilter',
    }),

    fields() {
      return fields;
    },
  },

  async mounted() {
    this.model = filterSchema.initialValues(
      this.rawFilter,
      this.$route.query,
    );

    const rawFilter = this.model;
    const filter = filterSchema.cast(this.model);
    return this.doFetch({
      filter,
      rawFilter,
    });
  },

  methods: {
    ...mapActions({
      doReset: 'user/list/doReset',
      doFetch: 'user/list/doFetch',
    }),

    doToggleExpanded() {
      this.expanded = !this.expanded;
    },

    doRemove(field) {
      this.model[field] = null;
      this.expanded = false;
      const rawFilter = this.model;
      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
        rawFilter,
      });
    },

    async doResetFilter() {
      this.expanded = false;
      this.model = filterSchema.initialValues();
      this.$refs.form.clearValidate();
      return this.doReset();
    },

    async doFilter() {
      try {
        await this.$refs.form.validate();
        this.$refs.form.clearValidate();
      } catch (error) {
        return;
      }

      this.expanded = false;
      const rawFilter = this.model;
      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
        rawFilter,
      });
    },

    i18n(code) {
      return i18n(code);
    },
  },
});
</script>

<style></style>
