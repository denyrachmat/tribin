<template>
  <div class="q-pa-md">
    <div class="text-h6">Company Profile</div>
    <div class="row">
      <div class="col">
        <q-input
          v-model="forms.name"
          label="Company Name"
          dense
          filled
        ></q-input>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col">
        <q-input
          v-model="forms.address"
          label="Address"
          type="textarea"
          dense
          filled
        ></q-input>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col">
        <q-input
          v-model="forms.phone"
          label="Telp"
          dense
          filled
        ></q-input>
      </div>
      <div class="col q-pl-sm">
        <q-input
          v-model="forms.fax"
          label="Fax"
          dense
          filled
        ></q-input>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col">
        <q-input
          v-model="forms.letter_head"
          label="Letter Head"
          dense
          filled
        ></q-input>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col text-right">
        <q-btn color="primary" label="save" @click="onClickSave()"></q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar } from "quasar";

const forms = ref({
  name: "",
  address: "",
  phone: "",
  fax: "",
  letter_head: ""
});
const loading = ref(false)

onMounted(() => {
  getProfileData()
})

const onClickSave = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to update the profile ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
  })
}

const getProfileData = async () => {
  loading.value = true;
  await api_web
    .get(`company/management-form-api`)
    .then((response) => {
      loading.value = false;
      const datanya = response.data;

      forms.value = datanya
    })
    .catch((e) => {
      loading.value = false;
    });
};
</script>
