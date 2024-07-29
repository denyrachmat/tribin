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
        <div class="text-h6">View Usage Service Part</div>
      </q-card-section>

      <q-card-section class="q-pa-sm" v-if="dataApi">

      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="
            loading ||
            submitedItems.filter((fil) => fil.listFixDet).length === 0 ||
            submitedItems.filter((fil) => fil.TSRVD_REMARK).length === 0
          "
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

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  header: Array,
  detail: Array,
  mode: String,
});

const dataApi = ref({
  SRVH_DOCNO: "",
  SRVH_ISSDT: date.formatDate(Date.now(), "YYYY-MM-DD"),
  SRVH_CUSCD: "",
});
const submitedItems = ref([]);
const loading = ref(false);

onMounted(async () => {
  if (props.header) {
    // await getCustomer();
    // await getItem();
    dataApi.value = props.header;
    submitedItems.value = props.detail;
  }
});
</script>
