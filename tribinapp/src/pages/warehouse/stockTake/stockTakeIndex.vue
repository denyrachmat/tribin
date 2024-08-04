<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Stock Taking</span>
      </div>
      <div class="col text-right">
        <!-- <q-btn icon="add" color="blue" @click="onClickNew([])">
          <q-tooltip>Create New Delivery</q-tooltip>
        </q-btn> -->
      </div>
    </div>

    <q-separator />
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-10">
        <q-input filled v-model="date" label="Eff Date" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-2 text-right">
        <q-checkbox
          name="registerItem"
          v-model="isRegisterItem"
          label="Register New Item ?"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-uploader
          class="full-height"
          url="http://localhost:4444/upload"
          label="Upload Stock Take"
          color="amber"
          text-color="black"
          accept=".xlsx, .xls"
          :max-files="date ? 1 : 0"
          style="width: 100%"
          auto-upload
          :factory="factoryFn"
          :form-fields="
            (files) => [
              { name: 'isRegItem', value : isRegisterItem},
              { name: 'file', value: files[0] },
              { name: 'date', value: date },
            ]
          "
          @factory-failed="(err, files) => failedUpload(err, files)"
          @added="file_selected"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const date = ref("");
const selected_file = ref(null);
const check_if_document_upload = ref(false);
const isRegisterItem = ref(false)

const file_selected = (file) => {
  selected_file.value = file[0];
  check_if_document_upload.value = true;
};

const factoryFn = async (val) => {
  // dataLoading.value = true;
  console.log(val);
  await new Promise((resolve, reject) => {
    let fd = new FormData();
    fd.append("file", selected_file.value);
    fd.append("date", date.value);
    fd.append("isRegItem", isRegisterItem.value);

    api_web.post("inventory/uploadStockTake", fd).then((resp) => {
      resolve(resp);
    });
  });
};

const failedUpload = (err, files) => {
  console.log(err);
};
</script>
