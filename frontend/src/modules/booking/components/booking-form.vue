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
        :label="fields.pet.label"
        :prop="fields.pet.name"
        :required="fields.pet.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-pet-autocomplete-input
            :fetchFn="fields.pet.fetchFn"
            :mapperFn="fields.pet.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.pet.name]"
            :placeholder="fields.pet.placeholder"
            mode="single"
          ></app-pet-autocomplete-input>

          <div
            v-if="fields.pet.hint"
            class="app-form-hint"
          >
            {{ fields.pet.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.arrival.label"
        :prop="fields.arrival.name"
        :required="fields.arrival.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="datetime" v-model="model[fields.arrival.name]" :placeholder="fields.arrival.placeholder"></el-date-picker>

          <div
            v-if="fields.arrival.hint"
            class="app-form-hint"
          >
            {{ fields.arrival.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.departure.label"
        :prop="fields.departure.name"
        :required="fields.departure.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="datetime" v-model="model[fields.departure.name]" :placeholder="fields.departure.placeholder"></el-date-picker>

          <div
            v-if="fields.departure.hint"
            class="app-form-hint"
          >
            {{ fields.departure.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.clientNotes.label"
        :prop="fields.clientNotes.name"
        :required="fields.clientNotes.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :rows="4" type="textarea" v-model="model[fields.clientNotes.name]" :placeholder="fields.clientNotes.placeholder" />

          <div
            v-if="fields.clientNotes.hint"
            class="app-form-hint"
          >
            {{ fields.clientNotes.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.employeeNotes.label"
        :prop="fields.employeeNotes.name"
        :required="fields.employeeNotes.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :rows="4" type="textarea" v-model="model[fields.employeeNotes.name]" :placeholder="fields.employeeNotes.placeholder" />

          <div
            v-if="fields.employeeNotes.hint"
            class="app-form-hint"
          >
            {{ fields.employeeNotes.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.photos.label"
        :prop="fields.photos.name"
        :required="fields.photos.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-image-upload
            :max="fields.photos.max"
            :storage="fields.photos.storage"      
            v-model="model[fields.photos.name]"
          ></app-image-upload>

          <div
            v-if="fields.photos.hint"
            class="app-form-hint"
          >
            {{ fields.photos.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.status.label"
        :prop="fields.status.name"
        :required="fields.status.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.status.name]" :placeholder="fields.status.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.status.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.status.hint"
            class="app-form-hint"
          >
            {{ fields.status.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.cancellationNotes.label"
        :prop="fields.cancellationNotes.name"
        :required="fields.cancellationNotes.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :rows="4" type="textarea" v-model="model[fields.cancellationNotes.name]" :placeholder="fields.cancellationNotes.placeholder" />

          <div
            v-if="fields.cancellationNotes.hint"
            class="app-form-hint"
          >
            {{ fields.cancellationNotes.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.fee.label"
        :prop="fields.fee.name"
        :required="fields.fee.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="fields.fee.scale" :step="0.1" v-model="model[fields.fee.name]" :placeholder="fields.fee.placeholder" ></el-input-number>

          <div
            v-if="fields.fee.hint"
            class="app-form-hint"
          >
            {{ fields.fee.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.receipt.label"
        :prop="fields.receipt.name"
        :required="fields.receipt.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-file-upload
            :max="fields.receipt.max"
            :storage="fields.receipt.storage"
            :formats="fields.receipt.formats"
            v-model="model[fields.receipt.name]"
          ></app-file-upload>

          <div
            v-if="fields.receipt.hint"
            class="app-form-hint"
          >
            {{ fields.receipt.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.approval.label"
        :prop="fields.approval.name"
        :required="fields.approval.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.approval.name]" :placeholder="fields.approval.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.approval.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.approval.hint"
            class="app-form-hint"
          >
            {{ fields.approval.hint }}
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
import { BookingModel } from '@/modules/booking/booking-model';

const { fields } = BookingModel;
const formSchema = new FormSchema([
  fields.owner,
  fields.pet,
  fields.arrival,
  fields.departure,
  fields.clientNotes,
  fields.employeeNotes,
  fields.photos,
  fields.status,
  fields.cancellationNotes,
  fields.fee,
  fields.receipt,
  fields.approval,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-booking-form',

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
