<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <app-pet-form
        :modal="true"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PetForm from '@/modules/pet/components/pet-form.vue';
import { PetService } from '@/modules/pet/pet-service';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';

export default Vue.extend({
  name: 'app-pet-form-modal',

  props: ['visible'],

  components: {
    'app-pet-form': PetForm,
  },

  data() {
    return {
      record: null,
      saveLoading: false,
    };
  },

  computed: {
    dialogVisible: {
      get: function () {
        return this.visible;
      },

      set: function (value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },

    title() {
      return i18n('entities.pet.new.title');
    },
  },

  methods: {
    async doSubmit(payload) {
      try {
        // @ts-ignore
        this.saveLoading = true;
        const { id } = await PetService.create(
          payload.values,
        );
        const record = await PetService.find(id);
        this.$emit('success', record);
      } catch (error) {
        Errors.handle(error);
      } finally {
        // @ts-ignore
        this.saveLoading = false;
      }
    },

    doCancel() {
      // @ts-ignore
      this.dialogVisible = false;
    },
  },
});
</script>

<style></style>
