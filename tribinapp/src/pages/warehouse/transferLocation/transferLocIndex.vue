<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Transfer Location</span>
      </div>
      <div class="col text-right">
        <q-radio v-model="transferType" val="loc" label="Location" />
        <q-radio v-model="transferType" val="cg" label="CG" />
      </div>
    </div>

    <q-separator />
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-input label="Doc Code" dense filled v-model="DOC" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-select
          dense
          filled
          label="Item Name"
          v-model="ITMCD"
          use-input
          input-debounce="500"
          :options="listItems"
          @filter="(val, update, abort) => filterFn(val, update, abort, 'item')"
          behavior="dialog"
          option-label="MITM_ITMNMREAL"
          option-value="MITM_ITMCD"
          emit-value
          map-options
          :loading="loading"
        >
        </q-select>
      </div>
    </div>
    <div class="row q-col-gutter-md q-pt-md" v-if="transferType === 'loc'">
      <div class="col-12 col-sm-6">
        <q-select
          dense
          filled
          label="Transfer From"
          v-model="LOCFROM"
          use-input
          input-debounce="500"
          :options="listLoc"
          @filter="(val, update, abort) => filterFn(val, update, abort, 'loc')"
          behavior="dialog"
          option-label="MLOC_LOCNM"
          option-value="MLOC_LOCCD"
          emit-value
          map-options
          :loading="loading"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-select
          dense
          filled
          label="Transfer To"
          v-model="LOCTO"
          use-input
          input-debounce="500"
          :options="listLoc"
          @filter="(val, update, abort) => filterFn(val, update, abort, 'loc')"
          behavior="dialog"
          option-label="MLOC_LOCNM"
          option-value="MLOC_LOCCD"
          emit-value
          map-options
          :loading="loading"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md" v-else>
      <div class="col-6">
        <q-select
          standout
          v-model="CGFROM"
          :options="listCG"
          label="From Source"
          option-value="connection"
          option-label="name"
          readonly
          emit-value
          map-options
          dense
        />
      </div>
      <div class="col-6">

        <q-select
          standout
          v-model="CGTO"
          :options="listCG"
          label="To Source"
          option-value="connection"
          option-label="name"
          emit-value
          map-options
          dense
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-input label="Qty" dense filled v-model="QTY" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-btn color="primary" label="Save" @click="onSaveData()" />
        <q-btn color="warning" label="Clear" @click="onClearData()" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const DOC = ref("");
const LOCFROM = ref("");
const LOCTO = ref("");
const CGFROM = ref("");
const CGTO = ref("");
const ITMCD = ref("");
const QTY = ref(0);
const loading = ref(false);
const transferType = ref("loc");

const listItems = ref([]);
const listCG = ref([]);
const listLoc = ref([]);
onMounted(async () => {
  await getLocation("");
  await getItem([]);
  await getCG();
  await getNowCG()
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "loc") {
      await getLocation(val);
    }

    if (fun === "item") {
      await getItem([{
        cols: 'MITM_ITMNM',
        param: '=',
        value: val
      }]);
    }
  });
};

const getLocation = async (val, cols = "MSUP_SUPNM") => {
  loading.value = true;
  await api_web
    .post(`location/searchAPI`, {
      searchBy: cols,
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listLoc.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getCG = async () => {
  loading.value = true;
  await api_web
    .get(`company`)
    .then((response) => {
      loading.value = false;
      listCG.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getNowCG = async () => {
  loading.value = true;
  await api_web
    .get(`companies/nowCG`)
    .then((response) => {
      loading.value = false;
      CGFROM.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getItem = async (col = []) => {
  loading.value = true;
  await api_web
  .post("item/searchItemDyn", {
      filter: [{
        cols: 'IS_ITMCD',
        param: '=',
        value: 1
      },{
        cols: 'STOCK',
        param: '>',
        value: 0
      }, ...col],
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSaveData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to transfer from ${(transferType.value == 'loc' ? LOCFROM.value : CGFROM.value)} to ${transferType.value == 'loc' ? LOCTO.value : CGTO.value} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`inventory/transferLoc`, {
        TRFTYPE: transferType.value,
        DOC: DOC.value,
        LOCFROM: LOCFROM.value,
        LOCTO: LOCTO.value,
        CGFROM: CGFROM.value,
        CGTO: CGTO.value,
        ITMCD: ITMCD.value,
        QTY: QTY.value,
      })
      .then((response) => {
        loading.value = false;

        $q.notify({
          color: "green",
          message: `${response.data.msg}`,
        });

        onDialogOK();
      })
      .catch((err) => {
        loading.value = false;
      });
  });
};

const onClearData = () => {
  DOC.value = "";
  LOCFROM.value = "";
  LOCTO.value = "";
  ITMCD.value = "";
  QTY.value = 0;
};
</script>
