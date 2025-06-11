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
          :loading="loading"
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
          :loading="loading"
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
          :loading="loading"
        ></q-input>
      </div>
      <div class="col q-pl-sm">
        <q-input
          v-model="forms.fax"
          label="Fax"
          dense
          filled
          :loading="loading"
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
          :loading="loading"
        ></q-input>
      </div>
    </div>
    <div class="row q-pt-sm" v-for="(appr, idx) in forms.approval" :key="idx">
      <div class="col">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>{{ safeCapitalize(idx) }} Approval</b>
          </legend>
          <div class="row">
            <div class="col text-right q-px-md">
              <q-btn
                icon="add"
                color="primary"
                @click="
                  appr.push({
                    isOwnApproval: false,
                    isOwnApproval: false,
                    username: '',
                  })
                "
              />
            </div>
          </div>
          <div class="row q-gutter-sm" v-if="appr.length > 0">
            <div
              class="col"
              v-for="(quo, idxQuo) in appr"
              :key="idxQuo"
            >
              <div class="row">
                <div class="col">
                  <q-toggle
                    v-model="quo.isOwnApproval"
                    color="green"
                    label="Own Approve ?"
                  />
                </div>
                <div class="col text-right q-pa-sm">
                  <div>
                    <q-btn
                      flat
                      icon="delete"
                      color="red"
                      @click="
                        appr.splice(idxQuo, 1)
                      "
                    />
                  </div>
                </div>
              </div>
              <q-select
                dense
                filled
                :label="`Approval ${idxQuo + 1}`"
                v-model="quo.username"
                :options="listUsername"
                :loading="loading"
                emit-value
                map-options
                :disable="quo.isOwnApproval"
                option-value="id"
                option-label="name"
              >
              </q-select>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col text-center">No data, please add first on upper right</div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col text-right">
        <q-btn
          color="primary"
          label="save"
          @click="onClickSave()"
          :loading="loading"
        ></q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar } from "quasar";

const forms = ref({
  id: "-",
  name: "",
  address: "",
  phone: "",
  fax: "",
  letter_head: "",
  approval: {
    quotation: [],
    proforma_invoice: [],
    invoice: [],
    receipt: [],
    sj: [],
  },
});
const loading = ref(false);
const listUsername = ref([]);

onMounted(() => {
  getProfileData();
  getUsersList();
});

const safeCapitalize = (str) =>
  str ? str.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : "";

const onClickSave = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to update the profile ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`company/management-form/${forms.value.id}`, {
        ...forms.value,
      })
      .then((response) => {
        loading.value = false;

        getProfileData();
      })
      .catch((e) => {
        loading.value = false;
      });
    // management-form
  });
};

const getProfileData = async () => {
  loading.value = true;
  await api_web
    .get(`company/management-form-api`)
    .then((response) => {
      loading.value = false;
      const datanya = response.data;

      console.log(forms.value)
      forms.value = {...forms.value, ...datanya};
      console.log(forms.value)
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getUsersList = async () => {
  loading.value = true;
  await api_web
    .get(`user`)
    .then((response) => {
      loading.value = false;
      listUsername.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};
</script>
