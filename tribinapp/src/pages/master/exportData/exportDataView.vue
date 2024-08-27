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
        <div class="text-h6">Transfer data to another CG</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-select
              dense
              filled
              label="From CG"
              v-model="frCG"
              :options="listCG"
              option-label="name"
              option-value="connection"
              emit-value
              map-options
              :loading="loading"
              readonly
            >
            </q-select>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-select
              dense
              filled
              label="To CG"
              v-model="toCG"
              :options="listCG"
              option-label="name"
              option-value="connection"
              emit-value
              map-options
              :loading="loading"
            >
            </q-select>
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
import { api, api_web } from "boot/axios";
import { ref, onMounted } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  table: Array,
});

const frCG = ref("");
const toCG = ref("");
const listCG = ref([]);

const loading = ref(false);

onMounted(() => {
  getCGList();
  getNowCG();
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cg") {
      await getCustomer(val);
    }
  });
};

const getCGList = async () => {
  loading.value = true;
  await api_web
    .get("company")
    .then((val) => {
      loading.value = false;
      listCG.value = val.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getNowCG = async () => {
  loading.value = true;
  await api_web
    .get("companies/nowCG")
    .then((val) => {
      loading.value = false;
      frCG.value = val.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onOKClick = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to transfer all this data ? all data on destination CG will be deleted !!`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    props.table.map(async (val) => {
      transferData(val)
    })
  })
}

const transferData = async (table) => {
  loading.value = true;
  await api_web
    .post("companies/transferData", {
      frCG: frCG.value,
      toCG: toCG.value,
      table: table,
    })
    .then((val) => {
      onDialogOK()
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
    });
}
</script>
