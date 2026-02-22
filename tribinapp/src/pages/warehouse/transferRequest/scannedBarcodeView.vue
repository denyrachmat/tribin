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
        <div class="row">
          <div class="col">
            <div class="text-h6">
              Scanned Barcode for Item {{ props.dataHeader.TLOCREQ_ITMCD }}
            </div>
          </div>
          <div class="col text-right text-h6">
            Required Qty: {{ props.dataHeader.TLOCREQ_QTY }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row full-width">
          <div class="col-12" v-if="listBarcode.length > 0">
            <q-list bordered separator>
              <q-item v-for="(item, index) in listBarcode" :key="index">
                <q-item-section>
                    <q-item-label class="text-bold">{{ item.TSRVF_BC }}</q-item-label>
                    <q-item-label caption>Barcode</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-bold">{{ item.STOCK }}</q-item-label>
                    <q-item-label caption>Qty</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-btn
                    color="negative"
                    label="Remove"
                    @click="listBarcode.splice(index, 1)"
                    icon="delete"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 text-center q-pa-md" v-else>
            No barcode scanned yet.
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Save"
          @click="onDialogOK(listBarcode.value)"
          class="q-mr-sm"
        />
        <q-btn color="secondary" label="Close" @click="onDialogCancel()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { list } from "postcss";

const $q = useQuasar();

const props = defineProps({
  dataHeader: Object,
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const listBarcode = ref([]);

onMounted(() => {
  listBarcode.value = props.dataHeader.listBarcode || [];
});
</script>
