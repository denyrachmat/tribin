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
        <div class="text-h6">Scan for Request Part</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-select
              dense
              filled
              label="Item Name"
              v-model="itemName"
              :options="props.dataDet"
              option-label="ITEMNAME"
              option-value="ITEMCODE"
              @update:model-value="onSelectItemName"
            />
          </div>
          <div class="col-12">
            <q-input
              label="Scan Barcode"
              dense
              filled
              v-model="barcode"
              @keyup.enter="onScanBarcode"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Close"
          @click="onDialogOK()"
          class="q-mr-sm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  dataHeader: Array,
  dataDet: Array,
  qtyOnly: Boolean,
});

onMounted(() => {
  console.log(props);
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
