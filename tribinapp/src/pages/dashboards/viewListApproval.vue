<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">Approval List</div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="height: 70vh; overflow: auto;">
        <q-table
          grid
          flat
          bordered
          :card-container-class="cardContainerClass"
          title="Outstanding Approval"
          :rows="props.listApprv"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          :pagination="{ rowsPerPage: 50 }"
          :rows-per-page-options="rowsPerPageOptions"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card flat bordered>
                <q-card-section class="text-center bg-secondary text-white">
                  <div class="text-h5 text-bold">{{ props.row.APP_CUSNM }}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="text-h6 text-bold">{{ props.row.APP_CD }}</div>
                  <div class="text-subtitle2">{{ props.row.APP_SBJCT }}</div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col">
                      <q-btn label="Preview" color="primary" outline @click="onClickPreview(props.row.APP_CD, props.row)"/>
                    </div>
                    <div class="col text-right">
                      {{ getDateUntilNow(props.row.CREATED_AT) < 30 ? `${getDateUntilNow(props.row.CREATED_AT)} Days Ago` : `${getDateUntilNow(props.row.CREATED_AT, 'months')} Month ago` }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onDialogOK()"
          :disable="stateSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { date, useDialogPluginComponent, useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import viewListApprovalItemVue from './viewListApprovalItem.vue'
import viewListPRItem from "./viewListPRItem.vue";
import viewListPOItem from "./viewListPOItem.vue";

const $q = useQuasar()
const props = defineProps({
  listApprv: Array,
  typeAPI: String,
  conn: String
});

const columns = ref([
  { name: "APP_CD", label: "Doc Code", field: "APP_CD" },
  { name: "APP_CUSNM", label: "Customer", field: "APP_CUSNM" },
  { name: "APP_SBJCT", label: "Subject", field: "APP_SBJCT" },
  { name: "APP_ATTN", label: "Attn", field: "APP_ATTN" },
  { name: "CREATED_AT", label: "Created Date", field: "CREATED_AT" },
]);
const filter = ref("");

const getDateUntilNow = (dates, unit = 'days') => {
  const date1 = new Date();
  const date2 = new Date(dates);

  const diff = date.getDateDiff(date1, date2, unit);
  return diff;
};

const onClickPreview = (data, dataHeader) => {
  let typeAPI = ''
  if (props.typeAPI == 'quot') {
    typeAPI = 'quotation'

    $q.dialog({
      component: viewListApprovalItemVue,
      componentProps: {
        dataHeader: dataHeader,
        cd: data,
        typeCD: typeAPI
      },
      // persistent: true,
    }).onOk(async (val) => {
    });
  } else if (props.typeAPI == 'pr') {
    typeAPI = 'purchase-request-approval'

    $q.dialog({
      component: viewListPRItem,
      componentProps: {
        dataHeader: dataHeader,
        cd: data,
        typeCD: typeAPI,
        conn: props.conn
      },
      // persistent: true,
    }).onOk(async (val) => {
    });
  } else if (props.typeAPI == 'po') {
    typeAPI = 'purchase-order/approval-document'
    $q.dialog({
      component: viewListPOItem,
      componentProps: {
        dataHeader: dataHeader,
        cd: data,
        typeCD: typeAPI,
        conn: props.conn
      },
      // persistent: true,
    }).onOk(async (val) => {
    });
  }

};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
