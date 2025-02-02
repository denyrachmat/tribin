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
          <div class="col text-right">
            <q-btn label="Upload File" color="blue" @click="onUpload" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col text-center">
            <q-img :src="linkImg" style="height: 60%; width: 70%" :key="refresh">
              <div class="absolute-bottom text-center">
                {{ props.fileName }}
              </div>
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

import uploadFiles from "./uploadFiles.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const linkImg = ref("~assets/no-image.jpg");
const refresh = ref(0)

const props = defineProps({
  fileName: String,
  label: String,
  url: String,
  id: String,
  storeCols: String,
  valueCols: String,
  users: Object,
});

onMounted(async () => {
  if (props.id) {
    linkImg.value = `https://joss.jatpowerindo.co.id/customer/fileNew/${props.id}/${props.storeCols}`;
  }
});

const onUpload = () => {
  $q.dialog({
    component: uploadFiles,
    componentProps: {
      url: props.url,
      label: props.label,
      id: props.id,
      storeCols: props.storeCols,
      valueCols: props.valueCols,
      users: props.users,
    },
  }).onDismiss(async (val) => {
    refresh.value = refresh.value + 1
    onDialogOK();
  });
};
</script>
