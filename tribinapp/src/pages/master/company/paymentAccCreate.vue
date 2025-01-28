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
        <div class="text-h6">Manage Bank Account</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input dense v-model="forms.bank_account_name" outlined label="Account name" :loading="loading"/>
          </div>
          <div class="col q-pl-sm">
            <q-input dense v-model="forms.bank_account_number" outlined label="Account Number" :loading="loading"/>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col">
            <q-input dense v-model="forms.bank_name" outlined label="Bank name" :loading="loading"/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onSubmitData()" :loading="loading"/>
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();
const forms = ref({
  id: "",
  bank_account_name: "",
  bank_account_number: "",
  bank_name: "",
});

const loading = ref(false);

const props = defineProps({
  dataHeader: Array,
});

onMounted(() => {
  if (props.dataHeader) {
    forms.value = props.dataHeader;
  }
});

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want save this account ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`payment-account/form`, {
        ...forms.value
      })
      .then((response) => {
        loading.value = false;
        onDialogOK()
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};
</script>
