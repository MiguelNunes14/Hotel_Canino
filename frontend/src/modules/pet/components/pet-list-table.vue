<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column :label="fields.owner.label" :prop="fields.owner.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.owner.label"
            :permission="fields.owner.readPermission"
            :url="fields.owner.viewUrl"
            :value="presenter(scope.row, 'owner')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.name.label"
        :prop="fields.name.name"
        sortable="user"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'name') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.type.label"
        :prop="fields.type.name"
        sortable="user"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'type') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.breed.label"
        :prop="fields.breed.name"
        sortable="user"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'breed') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.size.label"
        :prop="fields.size.name"
        sortable="user"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'size') }}</template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/pet/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/pet/${scope.row.id}/edit`"
              v-if="hasPermissionToEdit"
            >
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { PetModel } from '@/modules/pet/pet-model';
import { mapGetters, mapActions } from 'vuex';
import { PetPermissions } from '@/modules/pet/pet-permissions';
import { i18n } from '@/i18n';

const { fields } = PetModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-pet-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'pet/list/rows',
      count: 'pet/list/count',
      loading: 'pet/list/loading',
      pagination: 'pet/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'pet/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new PetPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new PetPermissions(
        this.currentTenant,
        this.currentUser,
      ).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'pet/list/doChangeSort',
      doChangePaginationCurrentPage:
        'pet/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'pet/list/doChangePaginationPageSize',
      doMountTable: 'pet/list/doMountTable',
      doDestroy: 'pet/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return PetModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
});
</script>

<style></style>
