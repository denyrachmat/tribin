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
        <div class="text-h6">Update Order {{ dataApi.SRVH_DOCNO }}</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list bordered>
          <q-item
            v-for="(items, idx) in submitedItems"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ items.TSRVD_LINE }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ items.TSRVD_ITMCD }}
              </q-item-label>
              <q-item-label caption lines="1">Item</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ items.TSRVD_CUSTRMK }}
              </q-item-label>
              <q-item-label caption lines="1">Customer Remarks</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-btn icon="construction" color="green" flat @click="onClickAddItem(idx, 'add')">
                    <q-tooltip>Update Fix Data</q-tooltip>
                </q-btn>
            </q-item-section>
            <q-item-section side>
                <q-btn icon="visibility" color="cyan" flat @click="onClickAddItem(idx, 'view')" :disable="!items.listFixDet">
                    <q-tooltip>View Added Item</q-tooltip>
                    <q-badge color="red" floating>{{ items.listFixDet.length }}</q-badge>
                </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="loading"
          :loading="loading"
        />
        <q-btn
          flat
          label="Cancel"
          color="red"
          @click="onDialogCancel"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { onMounted, ref } from "vue";
import { date, useQuasar, useDialogPluginComponent } from "quasar";

import serviceOprItemAdd from "./serviceOprItemAdd.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  header: Array,
  detail: Array,
});

const dataApi = ref({
  SRVH_DOCNO: "",
  SRVH_ISSDT: date.formatDate(Date.now(), "YYYY-MM-DD"),
  SRVH_CUSCD: "",
  
});
const submitedItems = ref([]);

onMounted(async () => {
  if (props.header) {
    // await getCustomer();
    // await getItem();
    dataApi.value = props.header;
    submitedItems.value = props.detail;
  }
});

const onClickAddItem = (val, mode = 'add') => {
  $q.dialog({
    component: serviceOprItemAdd,
    componentProps: {
        mode: mode,
        dataItem: val
    },
    // persistent: true,
  }).onOk(async (res) => {
    submitedItems.value[val].listFixDet = res
  });
};
</script>
