<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="auth.profile.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="auth.profile.title"></app-i18n>
      </h1>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        :model="model"
        :rules="rules"
        @submit.native.prevent="doSubmit"
        class="form"
        ref="form"
      >
        <el-form-item
          :label="fields.firstName.label"
          :prop="fields.firstName.name"
          :required="fields.firstName.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input
              ref="focus"
              v-model="model[fields.firstName.name]"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.lastName.label"
          :prop="fields.lastName.name"
          :required="fields.lastName.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input
              v-model="model[fields.lastName.name]"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.phoneNumber.label"
          :prop="fields.phoneNumber.name"
          :required="fields.phoneNumber.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input
              prefix-icon="el-icon-fa-plus"
              v-model="model[fields.phoneNumber.name]"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.avatars.label"
          :prop="fields.avatars.name"
          :required="fields.avatars.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-image-upload
              :max="fields.avatars.max"
              :storage="fields.avatars.storage"
              v-model="model[fields.avatars.name]"
            ></app-image-upload>
          </el-col>
        </el-form-item>

        <el-form-item>
          <div class="form-buttons">
            <el-button
              :disabled="saveLoading"
              @click="doSubmit"
              icon="el-icon-fa-floppy-o"
              type="primary"
            >
              <app-i18n code="common.save"></app-i18n>
            </el-button>

            <el-button
              :disabled="saveLoading"
              @click="doReset"
              icon="el-icon-fa-undo"
            >
              <app-i18n code="common.reset"></app-i18n>
            </el-button>

            <router-link :to="{ path: '/' }">
              <el-button
                :disabled="saveLoading"
                icon="el-icon-fa-close"
              >
                <app-i18n code="common.cancel"></app-i18n>
              </el-button>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { UserModel } from '@/modules/user/user-model';
import { mapGetters, mapActions } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';

const { fields } = UserModel;

const formSchema = new FormSchema([
  fields.firstName,
  fields.lastName,
  fields.phoneNumber,
  fields.avatars,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-profile-form-page',

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      currentUser: 'auth/currentUser',
      saveLoading: 'auth/loadingUpdateProfile',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    this.model = formSchema.initialValues(this.currentUser);
  },

  methods: {
    ...mapActions({
      doUpdateProfile: 'auth/doUpdateProfile',
    }),

    doReset() {
      this.model = formSchema.initialValues(
        this.currentUser,
      );
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const values = formSchema.cast(this.model);
      this.doUpdateProfile(values);
    },
  },
});
</script>
