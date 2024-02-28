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
        <div class="text-h6">Create Item Master</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input
              label="Item Code"
              dense
              v-model="itemData.MITM_ITMCD"
              filled
            />
          </div>
          <div class="col q-pl-md">
            <q-input
              label="Item Name"
              dense
              v-model="itemData.MITM_ITMNM"
              filled
            />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-select
              dense
              filled
              label="UOM"
              v-model="itemData.MITM_STKUOM"
              :options="listUOM"
              behavior="dialog"
              option-label="MUOM_UOMNM"
              option-value="MUOM_UOMCD"
              emit-value
              map-options
              :loading="loading"
            />
          </div>
          <div class="col q-pl-md">
            <q-input
              label="Item Brand"
              dense
              v-model="itemData.MITM_BRAND"
              filled
            />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-input
              label="Item Model"
              dense
              v-model="itemData.MITM_MODEL"
              filled
            />
          </div>
          <div class="col q-pl-md">
            <q-input
              label="Item Specification"
              dense
              v-model="itemData.MITM_SPEC"
              filled
            />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-select
              dense
              filled
              label="COA"
              v-model="itemData.MITM_COACD"
              :options="listCOA"
              use-input
              behavior="dialog"
              option-label="MCOA_COANM"
              option-value="MCOA_COACD"
              @filter="
                (val, update, abort) => filterFn(val, update, abort)
              "
              emit-value
              map-options
              :loading="loading"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onSubmitData()" />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
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

const $q = useQuasar();
const itemData = ref({
  MITM_ITMCD: "",
  MITM_ITMNM: "",
  MITM_STKUOM: "",
  MITM_ITMTYPE: 1,
  MITM_BRAND: "",
  MITM_MODEL: "",
  MITM_SPEC: "",
  MITM_ITMCAT: "",
  MITM_COACD: "",
  MITM_ITMCAT: ""
});
const loading = ref(false);
const listUOM = ref([]);
const listCOA = ref([]);

const props = defineProps({
  ItemCat: String,
});

onMounted(() => {
  getDataIndex();
  itemData.value.MITM_ITMCAT = props.ItemCat
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    await api_web
      .post("item/getListCoasAPI", {
        search: val,
      })
      .then((datas) => {
        listCOA.value = datas.data;
      });
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save this item ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await api_web.post("item", itemData.value).then((val) => {
      onDialogOK(val.data.data.value);
    });
  });
};

const getDataIndex = async () => {
  loading.value = true;
  await api_web
    .get("item/formAPI")
    .then((response) => {
      loading.value = false;
      listUOM.value = response.data.uoms;
      listCOA.value = response.data.coas;
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
