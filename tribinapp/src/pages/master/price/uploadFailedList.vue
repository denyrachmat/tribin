<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-white q-pa-sm" style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Price Maintenance</div>
      </q-card-section>

      <q-card-section class="q-pa-sm no-wrap">
        <div class="row q-gutter-md">
          <div class="col-12">
            <q-table
              title="Price List"
              :rows="props.failedData"
              :columns="props.cols"
              row-key="id"
              :loading="loading"
              :pagination="{
                rowsPerPage: 0,
              }"
              class="my-sticky-header-column-table"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Close"
          @click="onDialogOK()"
          icon-right="close"
          outline
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  failedData: Array,
  cols: Array,
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
