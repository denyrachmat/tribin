<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">Import Data from another business</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-select
              standout
              v-model="fromComp"
              :options="getListCompany"
              label="From Source"
              option-value="connection"
              option-label="name"
            />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-select
              standout
              v-model="destComp"
              :options="getDestCompany"
              label="Destination Source"
              option-value="connection"
              option-label="name"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onOKClick()" />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const getListCompany = ref([]);
const getDestCompany = ref([]);
const fromComp = ref("");
const destComp = ref("");

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

onMounted(() => {
  getCompaniesData();
});

const getCompaniesData = async () => {
  await api.get(`/master/conditions/getCompaniesDetail`).then((val) => {
    getListCompany.value = val.data.companies;
    getDestCompany.value = val.data.CurrentCompanies;

    destComp.value = getDestCompany.value[0],connection
  });
};

const onOKClick = () => {
    $q.dialog({
    title: "Confirmation",
    message: `Do you want to import data from ${fromComp.value.name} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await api_web
        .post("condition/import", {
            fromConnection: fromComp.value,
        })
        .then((response) => {
          newData();
        });
    onDialogOK()
  })
}
</script>
