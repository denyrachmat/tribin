<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Transfer Location</span>
      </div>
      <div class="col text-right">
        <q-radio v-model="transferType" val="loc" label="Location" @update:model-value="LOCFROM = ''; LOCTO = ''"/>
        <q-radio v-model="transferType" val="cg" label="CG" @update:model-value="LOCFROM = ''; LOCTO = ''"/>
      </div>
    </div>

    <q-separator />
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-12">
        <q-input label="Doc Code" dense filled v-model="DOC" />
      </div>
    </div>

    <!-- <div class="row q-col-gutter-md q-pt-md">
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
          @update:model-value="(value) => onChooseItem(value)"
          multiple
        >
        </q-select>
      </div>
    </div> -->

    <div class="row q-col-gutter-md q-pt-md" v-if="transferType === 'cg'">
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
          @update:model-value="onChooseCGTo"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-pt-md">
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
          @update:model-value="onChooseLocation"
          :disable="loading"
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
          :options="listLocTo"
          @filter="(val, update, abort) => filterFn(val, update, abort, 'locto')"
          behavior="dialog"
          option-label="MLOC_LOCNM"
          option-value="MLOC_LOCCD"
          emit-value
          map-options
          :loading="loading"
          :disable="loading"
        />
      </div>
    </div>

    <q-separator spaced />

    <q-table
      title="Item Master List"
      :rows="listItems"
      :columns="cols"
      row-key="MITM_ITMNM"
      :loading="loading"
      dense
      :pagination="{
        rowsPerPage: 20,
      }"
      class="my-sticky-header-column-table"
      v-model:selected="ITMCD"
      selection="multiple"
    >
      <template v-slot:top-right>
        <q-select
          outlined
          v-model="filterCol"
          :options="cols"
          label="Search Columns"
          option-value="name"
          option-label="label"
          emit-value
          dense
          map-options
        />
        <q-input
          borderless
          dense
          v-model="filter"
          placeholder="Search"
          outlined
          @update:model-value="getItem()"
          debounce="1000"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

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
import transferConfirmation from "./transferConfirmation.vue";

const $q = useQuasar();
const DOC = ref("");
const LOCFROM = ref("");
const LOCTO = ref("");
const CGFROM = ref("");
const CGTO = ref("");
const ITMCD = ref([]);
const QTY = ref(0);
const loading = ref(false);
const transferType = ref("loc");
const filterCol = ref('')
const filter = ref('')

const listItems = ref([]);
const listCG = ref([]);
const listLoc = ref([]);
const listLocTo = ref([]);

const cols = ref([
  {
    name: "MITM_ITMNM",
    align: "left",
    label: "Item Code",
    field: "MITM_ITMNM",
    sortable: true,
  },
  {
    name: "MITM_ITMNMREAL",
    align: "left",
    label: "Item Name",
    field: "MITM_ITMNMREAL",
    sortable: true,
  },
  {
    name: "MITM_STKUOM",
    align: "left",
    label: "Item Unit",
    field: "MITM_STKUOM",
    sortable: true,
  },
  {
    name: "STOCK",
    align: "left",
    label: "Stock",
    field: "STOCK",
    sortable: true,
  },
]);

const rows = ref([])
onMounted(async () => {
  await getLocation("");
  await getCG();
  await getNowCG();

  if (transferType.value === "cg") {
    await getItem([]);
  }
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "loc") {
      await getLocation(val);
    }

    if (fun === "locto") {
      await getLocationTo(val);
    }

    if (fun === "item") {
      await getItem([
        {
          cols: filterCol.value,
          param: "like",
          value: filter.value,
        },
      ]);
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
      listLocTo.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onChooseCGTo = async (value) => {
  CGTO.value = value;
  await getLocationTo("", "MLOC_LOCNM");
};

const getLocationTo = async (val, cols = "MSUP_SUPNM") => {
  loading.value = true;
  await api_web
    .post(`location/searchAPI/${CGTO.value}`, {
      searchBy: cols,
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listLocTo.value = response.data.data;
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
      filter: [
        {
          cols: "IS_ITMCD",
          param: "=",
          value: 1,
        },
        {
          cols: "STOCK",
          param: ">",
          value: 0,
        },
        ...col,
      ],
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
    component: transferConfirmation,
    componentProps: {
      datas: {
        TRFTYPE: transferType.value,
        DOC: DOC.value,
        LOCFROM: transferType.value == "loc" ? LOCFROM.value : 'WH1',
        LOCTO: transferType.value == "loc" ? LOCTO.value : 'WH1',
        CGFROM: CGFROM.value,
        CGTO: transferType.value == "loc" ? CGFROM.value : CGTO.value,
        ITMCD: ITMCD.value,
      }
    },
    // persistent: true,
  }).onOk(async (val) => {
    // getItem();
    onClearData()
  });
};

const onClearData = () => {
  DOC.value = "";
  LOCFROM.value = "";
  LOCTO.value = "";
  ITMCD.value = [];
  listItems.value = []
};

const onChooseItem = (data) => {
  QTY.value = data.STOCK;
};

const onChooseLocation = async (data) => {
  loading.value = true;
  await api_web
    .post("item/seatchItemByLoc", {
      filter: [
        {
          cols: "CITRN_LOCCD",
          param: "=",
          value: data,
        },
      ],
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data;
      console.log(response.data);
    })
    .catch(() => {
      loading.value = false;
    });
}
</script>
