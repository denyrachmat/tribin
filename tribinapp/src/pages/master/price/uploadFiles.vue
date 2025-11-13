<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" style="height: 50vh">
    <div class="bg-white">
      <div class="row">
        <div class="col">
          <q-uploader
            class="full-height"
            :label="props.label"
            color="amber"
            text-color="black"
            accept=".xlsx, .xls"
            style="min-width: 500px"
            :max-files="1"
            auto-upload
            :factory="factoryFn"
            :form-fields="
              (files) => [
                { name: 'file', value: files[0] },
                { name: 'cg', value: props.conn },
                {
                  name: 'branch',
                  value: props.branch || '',
                },
                { name: 'is_preview', value: props.is_preview },
              ]
            "
            @factory-failed="(error, files) => failedUpload(error, files)"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import uploadFailedList from "./uploadFailedList.vue";

const $q = useQuasar();
const props = defineProps({
  url: String,
  label: String,
  id: String,
  storeCols: String,
  valueCols: String,
  users: Object,
  conn: String,
  isCloseAfterUpload: {
    type: Boolean,
    default: true,
  },
  is_preview: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: String,
    default: "",
  },
  failedCols: {
    type: Array,
    default: () => [],
  },
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const factoryFn = (val) => {
  const formData = new FormData();
  formData.append("file", val[0]);
  formData.append("cg", props.conn);
  formData.append("branch", props.branch || "");
  formData.append("is_preview", props.is_preview ? "true" : "false");

  return api_web.post(props.url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    validateStatus: (s) => s < 500,
  })
  .then((response) => {
    if (response.status === 422) {
      $q.dialog({
        title: "Upload Failed",
        message: `An error occurred while uploading the file. Would you like to see more details ?`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          const failedData = response.data.data?.map((item) => item.row_data) || [];
          console.log("Failed Data:", failedData);
          $q.dialog({
            component: uploadFailedList,
            componentProps: {
              failedData: failedData,
              cols: props.failedCols,
            },
            persistent: true,
          });
        })
        .onCancel(() => {
          console.log("User cancelled retry");
        });
      throw new Error("Upload validation failed");
    }

    console.log("Upload response:", response.data);
    return val; // Return the files to indicate successful upload
  })
  .catch((error) => {
    console.error("Upload failed:", error);
    throw error;
  });
};

const failedUpload = (error, files) => {
  console.log(error, files);
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
