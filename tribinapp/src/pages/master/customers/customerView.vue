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
        <div class="text-h6">Create New Customer Data</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row q-pb-md">
          <div class="col">
            <q-input
              label="Customer Name"
              dense
              v-model="custData.MCUS_CUSNM"
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
        <q-btn label="OK" color="primary" @click="onSubmitData()" :loading="loading"/>
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" :loading="loading"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { ref, onMounted } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar()

const props = defineProps({
  CustType: Number,
  Groups: String,
  Curr: String,
});

const custData = ref({
  MCUS_CUSCD : '',
  MCUS_CUSNM : '',
  MCUS_CURCD : props.Curr ? props.Curr : 'IDR',
  MCUS_TAXREG: '-',
  MCUS_ADDR1 : '',
  MCUS_TELNO : '',
  MCUS_PIC_NAME : '-',
  MCUS_PIC_TELNO : '-',
  MCUS_TYPE : props.CustType ? props.CustType : 1,
  MCUS_GROUP : props.Groups ? props.Groups : 'SERVICE',
  MCUS_EMAIL : ''
})

const loading = ref(false)

// MCUS_CUSNM
// MCUS_CURCD
// MCUS_TAXREG
// MCUS_ADDR1
// MCUS_TELNO
// MCUS_PIC_NAME
// MCUS_PIC_TELNO
// MCUS_TYPE

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save this customer ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true
    await api_web.post("customer", custData.value).then((val) => {
      loading.value = false
      onDialogOK(val.data);
    }).catch((e) => {
      loading.value = false
    });
  });
}
</script>
