<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" style="height: 50vh">
    <div class="bg-white">
      <div class="row">
        <div class="col">
          <q-uploader
            class="full-height"
            url="http://localhost:4444/upload"
            :label="props.label"
            color="amber"
            text-color="black"
            accept=".jpg, image/*"
            style="min-width: 500px"
            :max-files="1"
            auto-upload
            :factory="factoryFn"
            :form-fields="(files) => [
              { name: 'file', value: files[0] },
              { name: 'id', value: props.id },
              { name: 'col_name', value: props.storeCols },
            ]"
            @factory-failed ="(err, files) => failedUpload(err, files)"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const startDate = ref("");

const props = defineProps({
  url: String,
  label: String,
  id: String,
  storeCols: String,
  valueCols: String
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const factoryFn = async (val) => {
  // dataLoading.value = true;
  // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const processed = await new Promise((resolve, reject) => {
    resolve({
      url: props.url,
      method: "POST",
      header: [
        { name: "Content-Type", value: "multipart/form-data" },
        { name: "Accept", value: "application/json, text/plain, */*" },
        // { name: "X-CSRF-TOKEN", value: csrfToken }, // Add CSRF token to headers
      ],
    });
    // dataLoading.value = false;
  });

  if (processed) {
      return processed
  }
};

const failedUpload = (err, files) => {
  console.log(err)
}

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
