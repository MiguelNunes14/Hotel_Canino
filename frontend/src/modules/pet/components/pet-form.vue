<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item
        :label="fields.owner.label"
        :prop="fields.owner.name"
        :required="fields.owner.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.owner.fetchFn"
            :mapperFn="fields.owner.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.owner.name]"
            :placeholder="fields.owner.placeholder"
            mode="single"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.owner.hint"
            class="app-form-hint"
          >
            {{ fields.owner.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.name.label"
        :prop="fields.name.name"
        :required="fields.name.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.name.name]" :placeholder="fields.name.placeholder" />

          <div
            v-if="fields.name.hint"
            class="app-form-hint"
          >
            {{ fields.name.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.type.label"
        :prop="fields.type.name"
        :required="fields.type.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.type.name]" :placeholder="fields.type.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.type.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.type.hint"
            class="app-form-hint"
          >
            {{ fields.type.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.breed.label"
        :prop="fields.breed.name"
        :required="fields.breed.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.breed.name]" :placeholder="fields.breed.placeholder" />

          <div
            v-if="fields.breed.hint"
            class="app-form-hint"
          >
            {{ fields.breed.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.size.label"
        :prop="fields.size.name"
        :required="fields.size.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.size.name]" :placeholder="fields.size.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.size.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.size.hint"
            class="app-form-hint"
          >
            {{ fields.size.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.bookings.label"
        :prop="fields.bookings.name"
        :required="fields.bookings.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-booking-autocomplete-input
            :fetchFn="fields.bookings.fetchFn"
            :mapperFn="fields.bookings.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.bookings.name]"
            :placeholder="fields.bookings.placeholder"
            mode="multiple"
          ></app-booking-autocomplete-input>

          <div
            v-if="fields.bookings.hint"
            class="app-form-hint"
          >
            {{ fields.bookings.hint }}
          </div>
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

          <el-button
            :disabled="saveLoading"
            @click="doCancel"
            icon="el-icon-fa-close"
          >
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { PetModel } from '@/modules/pet/pet-model';

const { fields } = PetModel;
const formSchema = new FormSchema([
  fields.owner,
  fields.name,
  fields.type,
  fields.breed,
  fields.size,
  fields.bookings,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-pet-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      return this.$emit('submit', {
        id: this.record && this.record.id,
        values: formSchema.cast(this.model),
      });
    },
  },
});
</script>

<style></style>
