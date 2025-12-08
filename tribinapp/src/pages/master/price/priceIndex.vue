<template>
  <div class="q-pa-md no-wrap">
    <div class="row">
      <div class="col text-center text-h6">Price Management</div>
    </div>

    <div class="row q-pt-md items-center">
      <div class="col">
        <q-select
          v-model="selectedBranch"
          :options="branchOptions"
          label="Select Branch"
          outlined
          clearable
          option-label="MBRANCH_NM"
          option-value="BRANCH"
          emit-value
          map-options
          :loading="loading"
          dense
          @update:model-value="getGencodeData"
        />
      </div>
      <div class="col-auto q-pl-md">
        <q-btn
          flat
          icon="refresh"
          color="primary"
          @click="getGencodeData(selectedBranch)"
          :loading="loading"
        />
      </div>
      <div class="col-12">
        <q-table
          title="Price List"
          :rows="rows"
          :columns="cols"
          row-key="id"
          :loading="loading"
          dense
          :pagination="{
            rowsPerPage: 20,
          }"
          class="my-sticky-header-column-table"
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
              :disable="!selectedBranch"
            />
            <q-input
              borderless
              dense
              v-model="filter"
              placeholder="Search"
              outlined
              @update:model-value="getGencodeData(selectedBranch)"
              debounce="1000"
              :disable="!selectedBranch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Add Price"
              @click="onClickAdd()"
              icon-right="add"
              outline
              :disable="!selectedBranch"
            />
            <q-btn
              color="indigo"
              @click="
                onClickSetting({
                  branch: selectedBranch,
                  margin:
                    globalSettings.length > 0 ? globalSettings[0].desc : '',
                })
              "
              icon="settings"
              outline
              :disable="!selectedBranch"
            >
              <q-tooltip>Global Price Settings</q-tooltip>
            </q-btn>
            <q-btn
              color="orange"
              @click="onClickManageType()"
              icon="attach_money"
              outline
              :disable="!selectedBranch"
            >
              <q-tooltip>Manage Price Types</q-tooltip>
            </q-btn>
            <q-btn
              color="green"
              @click="onClickUpload()"
              icon="upload"
              outline
              :disable="!selectedBranch"
            >
              <q-tooltip>Upload bulk prices</q-tooltip>
            </q-btn>
          </template>

          <!-- For header -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width>Action</q-th>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  flat
                  :color="'red'"
                  icon="delete"
                  @click="onClickDeleteLines(props.row)"
                  dense
                >
                  <q-tooltip>Delete Price</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'orange'"
                  icon="edit"
                  @click="onClickAdd(props.row)"
                  dense
                >
                  <q-tooltip>Edit Price</q-tooltip>
                </q-btn>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{
                  col.format
                    ? col.format(props.row[col.field])
                    : props.row[col.field]
                }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import priceManageIndex from "./priceManageIndex.vue";
import priceManageType from "./priceManageType.vue";
import uploadFiles from "./uploadFiles.vue";
import multiplePromptDialog from "src/components/multiplePromptDialog.vue";

const $q = useQuasar();
const loading = ref(false);
const rows = ref([]);
const cols = ref([
  {
    name: "MITMBPRC_ITMCD",
    label: "Item Code Code",
    field: "MITMBPRC_ITMCD",
    align: "left",
    sortable: true,
  },
  {
    name: "MITM_ITMNM",
    label: "Item Name",
    field: "MITM_ITMNM",
    align: "left",
    sortable: true,
  },
  {
    name: "MITMBPRC_PRC",
    label: "Buying Price",
    field: "MITMBPRC_PRC",
    align: "right",
    format: (val) => (val ? val.toLocaleString() : "0"),
    sortable: true,
  },
  {
    name: "MITMSPRC_PRC",
    label: "Selling Price",
    field: "MITMSPRC_PRC",
    align: "right",
    format: (val) => (val ? val.toLocaleString() : "0"),
    sortable: true,
  },
  {
    name: "MITMBPRC_STARTDT",
    label: "Start Date",
    field: "MITMBPRC_STARTDT",
    align: "right",
    sortable: true,
  },
  {
    name: "MITMBPRC_ENDDT",
    label: "End Date",
    field: "MITMBPRC_ENDDT",
    align: "right",
    sortable: true,
  },
  {
    name: "MITMSPRC_TYPE",
    label: "Type Price",
    field: "MITMSPRC_TYPE",
    align: "right",
    sortable: true,
  },
  {
    name: "MITMSPRC_TYPEDESC",
    label: "Type Price Desc",
    field: "MITMSPRC_TYPEDESC",
    align: "right",
    sortable: true,
  },
]);
const filter = ref("");
const filterCol = ref("");
const branchOptions = ref([]);
const globalSettings = ref([]);
const selectedBranch = ref("");

onMounted(() => {
  // getPriceList();

  fetchBranches();
  // getGlobalMargin();
});

const getGencodeData = (branch) => {
  if (!branch) {
    rows.value = [];
    return;
  }

  getGlobalMargin(branch);
  getPriceList();
};

const getPriceList = () => {
  loading.value = true;
  api_web
    .post(
      "/price/search",
      filterCol.value && filter.value
        ? {
            cg:
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("CGID="))
                ?.split("=")[1] || "",
            filter: {
              [filterCol.value]: filter.value,
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
      rows.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const onClickAdd = (row = null) => {
  $q.dialog({
    component: priceManageIndex,
    componentProps: {
      branch: selectedBranch.value,
      dataHeader: row,
    },
    persistent: true,
  }).onOk(() => {
    getPriceList();
  });
};

const onClickSetting = (datas = null) => {
  const options = branchOptions.value.map((branch) => ({
    label: branch.MBRANCH_NM,
    value: branch.BRANCH,
  }));

  $q.dialog({
    component: multiplePromptDialog,
    componentProps: {
      title: "Global Price Settings",
      initialFields: [
        {
          name: "branch",
          label: "Branch",
          type: "select",
          default: datas?.branch || "",
          options: options,
          rules: [(val) => !!val || "Field is required"],
        },
        {
          name: "margin",
          label: "Margin Percentage (%)",
          type: "number",
          default: datas?.margin || "",
          rules: [
            (val) => !!val || "Field is required",
            (val) =>
              /^[0-9]+(\.[0-9]+)?$/.test(val) || "Invalid percentage format",
          ],
        },
      ],
    },
    cancel: true,
    persistent: true,
  }).onOk((result) => {
    console.log("Global Price Settings Result:", result);
    onClickSave([
      {
        id: "PRICE_SET_GLOBAL",
        code: "PERCENTAGE_MARGIN",
        desc: result.margin,
        desc2: result.branch,
      },
    ]);
    // Handle the result of global settings here
  });
  // Navigate to global price settings page
  // Implementation depends on your routing setup
};

const fetchBranches = async () => {
  loading.value = true;
  try {
    const response = await api_web.post("/branch/showData");

    console.log(response.data.data);

    if (response.data.data) {
      branchOptions.value = response.data.data;
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

const onClickSave = async (listData) => {
  loading.value = true;
  try {
    const payload = {
      code: "PRICE_SET_GLOBAL",
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
      gencodeData: listData,
      withOutDetail: true,
      branch: selectedBranch.value,
    };

    const response = await api_web.post("/gencode/storeGencodeData", payload);

    if (response.data.success) {
      $q.notify({
        color: "positive",
        message: "Gencode data saved successfully",
        icon: "check_circle",
      });
      // Optionally refresh data
      getGencodeData(selectedBranch.value);
    } else {
      throw new Error(response.data.message || "Failed to save data");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: error.message || "Failed to save gencode data",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const getGlobalMargin = async (branch) => {
  try {
    const response = await api_web.post(`/gencode/getGencodeList/${branch}`, {
      code: "PRICE_SET_GLOBAL",
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
    });

    if (response.data.data) {
      console.log("Gencode Data:", response.data.data);

      globalSettings.value = response.data.data ?? [];
      // Process the gencode data
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load gencode data",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const onClickManageType = () => {
  // Navigate to manage price types page
  // Implementation depends on your routing setup

  $q.dialog({
    component: priceManageType,
    componentProps: {
      branch: selectedBranch.value,
    },
    persistent: true,
  }).onOk(() => {
    getPriceList();
  });
};

const onClickDeleteLines = (row) => {
  $q.dialog({
    title: "Confirm",
    message: `Are you sure you want to delete price for item code: ${row.MITMBPRC_ITMCD}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    deletePrice(row);
  });
};

const deletePrice = async (row) => {
  loading.value = true;
  try {
    const response = await api_web.delete(`/price/${row.id}`, {
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
      itemCode: row.MITMBPRC_ITMCD,
      branch: selectedBranch.value,
    });

    if (response.data) {
      $q.notify({
        color: "positive",
        message: "Price deleted successfully",
        icon: "check_circle",
      });
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: error.message || "Failed to delete price",
      icon: "report_problem",
    });
  } finally {
    getPriceList();
    loading.value = false;
  }
};

const onClickUpload = () => {
  $q.dialog({
    component: uploadFiles,
    componentProps: {
      url: "/price/bulkUpload",
      label: "Upload Price File",
      conn:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
      branch: selectedBranch.value,
      failedCols: [
        {
          name: "MITMBPRC_ITMCD",
          label: "Item Code Code (Required)",
          field: "MITMBPRC_ITMCD",
          align: "left",
          sortable: true,
        },
        {
          name: "MITMBPRC_PRC",
          label: "Buying Price (Required)",
          field: "MITMBPRC_PRC",
          align: "right",
          format: (val) => (val ? val.toLocaleString() : "0"),
          sortable: true,
        },
        {
          name: "MITMSPRC_PRC",
          label: "Selling Price (Required)",
          field: "MITMSPRC_PRC",
          align: "right",
          format: (val) => (val ? val.toLocaleString() : "0"),
          sortable: true,
        },
        {
          name: "MITMBPRC_STARTDT",
          label: "Start Date (Required)",
          field: "MITMBPRC_STARTDT",
          align: "right",
          sortable: true,
        },
        {
          name: "MITMBPRC_ENDDT",
          label: "End Date (If empty, this will set forever)",
          field: "MITMBPRC_ENDDT",
          align: "right",
          sortable: true,
        },
        {
          name: "MITMSPRC_TYPE",
          label:
            "Type Price(RTL = Retail, PRM = Promo, WHL = Wholesale / Grosir, ONL = Online, SPC = Special)",
          field: "MITMSPRC_TYPE",
          align: "right",
          sortable: true,
        },
        {
          name: "MITMBPRC_ACTIVE",
          label: "Active Status (Required, Y = Active, N = Inactive)",
          field: "MITMBPRC_ACTIVE",
          align: "right",
          sortable: true,
        },
        {
          name: "error",
          label: "Error Message",
          field: "error",
          align: "right",
          sortable: true,
        },
      ],
    },
    persistent: true,
  }).onDismiss(() => {
    getPriceList();
    // Optional: Handle dialog dismissal if needed
  });
};
</script>
