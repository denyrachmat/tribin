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
        <div class="row">
          <div class="col">
            <div class="text-h6">View Uploaded Files</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-img :src="`https://joss.jatpowerindo.co.id/customer/file/${props.fileName}`">
              <div class="absolute-top text-center">Caption</div>
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { ref, onMounted } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  fileName: String,
});
</script>
