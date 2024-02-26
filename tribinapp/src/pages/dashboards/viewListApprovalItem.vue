<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
    persistent
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">Review Item List</div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="height: 70vh; overflow: auto">
        <q-table
          title="Item List"
          :rows="dataHasil.dataItem"
          :columns="columnsItem"
          row-key="name"
          dense
          v-if="props.typeCD == 'quotation'"
        />
      </q-card-section>

      <q-card-actions align="center">
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
import { api_web } from "boot/axios";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  cd: String,
  typeCD: String,
});

const loading = ref(false);
const columnsItem = ref([
    { name: 'MITM_ITMNM', label: 'Item Name', field: 'MITM_ITMNM', sortable: true },
    { name: 'TQUODETA_USAGE_DESCRIPTION', label: 'Usage', field: 'TQUODETA_USAGE_DESCRIPTION', sortable: true },
    { name: 'TQUODETA_PRC', label: 'Price', field: 'TQUODETA_PRC', sortable: true },
    { name: 'TQUODETA_OPRPRC', label: 'Operator', field: 'TQUODETA_OPRPRC', sortable: true },
    { name: 'TQUODETA_MOBDEMOB', label: 'MOB DEMOB', field: 'TQUODETA_MOBDEMOB', sortable: true },
    { name: 'SUBTOT', label: 'MOB DEMOB', sortable: true, field: row => row.TQUODETA_PRC + row.TQUODETA_OPRPRC + row.TQUODETA_MOBDEMOB },
]);
const dataHasil = ref([]);

onMounted(() => {
  getData();
});

const getData = async () => {
  await api_web
    .get(`${props.typeCD}/${btoa(props.cd)}`)
    .then((response) => {
      loading.value = false;
      dataHasil.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};
</script>
