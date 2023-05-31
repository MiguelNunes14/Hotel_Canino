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

      <el-table-column :label="fields.pet.label" :prop="fields.pet.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.pet.label"
            :permission="fields.pet.readPermission"
            :url="fields.pet.viewUrl"
            :value="presenter(scope.row, 'pet')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.arrival.label"
        :prop="fields.arrival.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'arrival') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.departure.label"
        :prop="fields.departure.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'departure') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.status.label"
        :prop="fields.status.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'status') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.fee.label"
        :prop="fields.fee.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'fee') }}</template>
      </el-table-column>

      <el-table-column :label="fields.receipt.label" :prop="fields.receipt.name" align="center">
        <template slot-scope="scope">
          <app-list-item-file :value="presenter(scope.row, 'receipt')"></app-list-item-file>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.approval.label"
        :prop="fields.approval.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'approval') }}</template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/booking/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/booking/${scope.row.id}/edit`"
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
import { BookingModel } from '@/modules/booking/booking-model';
import { mapGetters, mapActions } from 'vuex';
import { BookingPermissions } from '@/modules/booking/booking-permissions';
import { i18n } from '@/i18n';

const { fields } = BookingModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-booking-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'booking/list/rows',
      count: 'booking/list/count',
      loading: 'booking/list/loading',
      pagination: 'booking/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'booking/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new BookingPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new BookingPermissions(
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
      doChangeSort: 'booking/list/doChangeSort',
      doChangePaginationCurrentPage:
        'booking/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'booking/list/doChangePaginationPageSize',
      doMountTable: 'booking/list/doMountTable',
      doDestroy: 'booking/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return BookingModel.presenter(row, fieldName);
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
