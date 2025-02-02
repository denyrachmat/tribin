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
            <div class="text-h6">Create New Customer Data</div>
          </div>
          <div class="col text-right">
            <q-btn-group outline>
              <q-btn
                @click="
                  onClickPreviewFile(
                    custData.MCUS_KTP_FILE,
                    custData.MCUS_CUSCD,
                    'KTP Upload',
                    'MCUS_KTP_FILE',
                    custData.users
                  )
                "
                :color="custData.MCUS_KTP_FILE ? 'blue' : 'grey'"
                outline
                icon="badge"
              >
                <q-tooltip> Upload KTP </q-tooltip>
              </q-btn>
              <q-btn
                @click="
                  onClickPreviewFile(
                    custData.MCUS_NPWP_FILE,
                    custData.MCUS_CUSCD,
                    'NPWP Upload',
                    'MCUS_NPWP_FILE'
                  )
                "
                :color="custData.MCUS_NPWP_FILE ? 'green' : 'grey'"
                outline
                icon="account_balance"
              >
                <q-tooltip> Upload NPWP </q-tooltip>
              </q-btn>
              <q-btn
                @click="
                  onClickPreviewFile(
                    custData.MCUS_NIB_FILE,
                    custData.MCUS_CUSCD,
                    'NIB Upload',
                    'MCUS_NIB_FILE'
                  )
                "
                :color="custData.MCUS_NIB_FILE ? 'orange' : 'grey'"
                outline
                icon="apartment"
              >
                <q-tooltip> Upload NIB </q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row q-pb-md">
          <div class="col">
            <q-input
              label="Customer Name"
              dense
              v-model="custData.MCUS_CUSCD"
              filled
              :disable="isEdit"
            />
          </div>
          <div class="col q-pl-sm">
            <q-input
              label="Customer Name"
              dense
              v-model="custData.MCUS_CUSNM"
              filled
            />
          </div>
          <div class="col q-pl-sm">
            <q-input
              label="Attn."
              dense
              v-model="custData.MCUS_PIC_NAME"
              filled
            />
          </div>
          <div class="col q-pl-sm">
            <q-input
              label="Attn. Phone"
              dense
              v-model="custData.MCUS_PIC_TELNO"
              filled
            />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col">
            <q-input
              label="Tax Reg"
              dense
              v-model="custData.MCUS_TAXREG"
              filled
            />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col">
            <q-input
              label="Customer Email"
              dense
              v-model="custData.MCUS_EMAIL"
              filled
            />
          </div>
          <div class="col q-pl-md">
            <q-input
              label="Customer Phone"
              dense
              v-model="custData.MCUS_TELNO"
              filled
              mask="####-####-####"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              label="Customer Address"
              dense
              v-model="custData.MCUS_ADDR1"
              filled
              type="textarea"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
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
import { ref, onMounted } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

import viewUploadedFiles from "./viewUploadedFiles.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  headerData: Object,
});

onMounted(() => {
  if (props.headerData) {
    custData.value = props.headerData;
    isEdit.value = true;
  }
});

const custData = ref({
  MCUS_CUSCD: "",
  MCUS_CUSNM: "",
  MCUS_CURCD: "",
  MCUS_TAXREG: "-",
  MCUS_ADDR1: "",
  MCUS_TELNO: "",
  MCUS_PIC_NAME: "-",
  MCUS_PIC_TELNO: "-",
  MCUS_TYPE: "",
  MCUS_GROUP: "",
  MCUS_EMAIL: "",
  MCUS_KTP_FILE: "",
  MCUS_NPWP_FILE: "",
  MCUS_NIB_FILE: "",
});
const isEdit = ref(false);

const loading = ref(false);

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save this customer ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("customer", custData.value)
      .then((val) => {
        loading.value = false;
        onDialogOK(val.data);
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const onClickPreviewFile = (fileName, id, labelForUpload, cols, users) => {
  $q.dialog({
    component: viewUploadedFiles,
    componentProps: {
      fileName: fileName,
      label: labelForUpload,
      url: `${process.env.API}master/customer/uploadAPI`,
      id: id,
      storeCols: cols,
      valueCols: fileName,
      users: users
    },
    // persistent: true,
  }).onDismiss(async (val) => {

  });
};
</script>
