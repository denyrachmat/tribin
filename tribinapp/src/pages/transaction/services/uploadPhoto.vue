<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="bg-white">
      <div class="row" style="min-height: 50vh; max-width: 80vh">
        <div class="col">
          <q-card v-if="uploadedPhoto">
            <q-card-section>
              <div class="text-h6">Preview Photo</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-img :src="uploadedPhoto" style="width: 80vh;"/>
            </q-card-section>

            <q-card-actions vertical>
              <q-btn flat @click="removePhoto()">Change Photo</q-btn>
            </q-card-actions>
          </q-card>
          <q-uploader
            class="full-height"
            :url="(files) => onSelectPhoto(files)"
            label="Upload Photo"
            color="amber"
            text-color="black"
            accept="image/*"
            style="min-width: 500px"
            :max-files="1"
            auto-upload
            send-raw
            v-else
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
const uploadedPhoto = ref("");

const props = defineProps({
  photo: String,
});

onMounted(() => {
  if (props.photo !== '') {
    uploadedPhoto.value = props.photo
  }
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const factoryFn = (val) => {
  // dataLoading.value = true;
  return new Promise((resolve, reject) => {
    resolve((val) => onDialogOK(val));
  });
};

const removePhoto = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to remove this photo ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    onDialogOK('')
  })
}

const onSelectPhoto = async (file) => {
  const convBase64 = await getBase64(file[0])

  if (convBase64) {
    console.log(convBase64)

    onDialogOK(convBase64)
  }
  // console.log(file[0])
}

function getBase64(file) {
    var fileReader = new FileReader();
    if (file) {
        fileReader.readAsDataURL(file);
    }
    return new Promise((resolve, reject) => {
      fileReader.onload = function(event) {
        resolve(event.target.result);
      };
    })
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
