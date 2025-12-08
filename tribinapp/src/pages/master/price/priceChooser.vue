<!-- Find price based on selected item name -->
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
        <div class="text-h6">Price Choose</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-select
              outlined
              v-model="selectedBranch"
              :options="branches"
              option-value="BRANCH"
              option-label="MBRANCH_NM"
              label="Select Branch"
              dense
              emit-value
              map-options
            />
          </div>
          <div class="col-12">
            <q-table
              :rows="listItems"
              :columns="columns"
              :loading="loading"
              selection="single"
              v-model:selected="selectedItem"
              dense
              row-key="MITM_ITMCD"
              title="Item Select"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-table
              :rows="listPrice"
              :columns="columnsPrice"
              :loading="loading"
              dense
              row-key="MITMBPRC_ID"
              v-model:selected="selectedPrice"
              selection="single"
              title="Price Select"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="onDialogCancel()" />
        <q-btn
          flat
          label="OK"
          color="primary"
          :disable="selectedItem.length === 0 || selectedPrice.length === 0"
          @click="onDialogOK(selectedPrice[0])"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  branch: String,
  selectedItemName: String,
  searchPriceParam: Object,
});

const selectedItem = ref([]);
const selectedPrice = ref([])
const columns = ref([
  {
    name: "MITM_ITMNM",
    required: true,
    label: "Item Code",
    align: "left",
    field: (row) => row.MITM_ITMNM,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "MITM_STKUOM",
    align: "left",
    label: "UOM",
    field: (row) => row.MITM_STKUOM,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "MITM_ITMCAT",
    align: "left",
    label: "Category",
    field: (row) => row.MITM_ITMCAT,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

const columnsPrice = ref([
  {
    name: "MITMBPRC_ITMCD",
    required: true,
    label: "Item Code",
    align: "left",
    field: (row) => row.MITMBPRC_ITMCD,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "MITMBPRC_TYPE",
    required: true,
    label: "Type Price",
    align: "left",
    field: (row) => row.MITMSPRC_TYPEDESC,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "MITMBPRC_PRICE",
    align: "right",
    label: "Buy Price",
    field: (row) => row.MITMBPRC_PRC,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "MITMSPRC_PRC",
    align: "right",
    label: "Sell Price",
    field: (row) => row.MITMSPRC_PRC,
    format: (val) => `${val}`,
    sortable: true,
  },
]);
const listPrice = ref([]);


onMounted(async () => {
  if (props.branch) {
    selectedBranch.value = props.branch;
  }
  await fetchBranches();
  await getItem(props.selectedItemName);
});

const listItems = ref([]);
const branches = ref([]);
const loading = ref(false);
const selectedBranch = ref(null);

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPITBL", {
      searchValue: val,
      isITMCD: 1,
    })
    .then((response) => {
      listItems.value = response.data.data;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const fetchBranches = async () => {
  loading.value = true;
  try {
    const response = await api_web.post("/branch/showData");

    console.log(response.data.data);

    if (response.data.data) {
      branches.value = response.data.data;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load branches",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const getPriceList = (val) => {
  loading.value = true;
  api_web
    .post(
      "/price/search",
      val
        ? {
            cg:
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("CGID="))
                ?.split("=")[1] || "",
            filter: {
              MITMBPRC_ITMCD: val,
              ...props.searchPriceParam,
            },
          }
        : {
            cg:
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("CGID="))
                ?.split("=")[1] || "",
          }
    )
    .then((response) => {
      listPrice.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(selectedItem, async (newVal) => {
  if (newVal) {
    await getPriceList(newVal[0].MITM_ITMCD);
  }
});
</script>
