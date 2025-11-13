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
        <div class="text-h6">Price Type Maintenance</div>
      </q-card-section>

      <q-card-section>
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
              @update:model-value="getPaymentList()"
              debounce="1000"
              :disable="!selectedBranch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Add New Type"
              @click="onClickAdd()"
              icon-right="add"
              outline
              :disable="!selectedBranch"
            />
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
                {{ col.format ? col.format(col.value) : col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
        <q-btn label="Ok" color="primary" @click="onClickSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

import multiplePromptDialog from "src/components/multiplePromptDialog.vue";

const $q = useQuasar();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  dataHeader: Array,
  branch: String,
});

onMounted(async () => {
  selectedBranch.value = props.branch;
  getPriceTypeList();
});

const loading = ref(false);
const rows = ref([]);
const filter = ref("");
const filterCol = ref("desc");
const selectedBranch = ref(null);
const cols = ref([
  {
    name: "code",
    label: "Price Type Name",
    align: "left",
    field: (row) => row.code,
    sortable: true,
  },
  {
    name: "desc",
    label: "Description",
    align: "left",
    field: (row) => row.desc,
    sortable: true,
  },
]);

const getPriceTypeList = async () => {
  loading.value = true;
  try {
    const response = await api_web.post(
      `/gencode/getGencodeList/${selectedBranch.value}`,
      {
        code: "MPRC_TYPE",
        cg:
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("CGID="))
            ?.split("=")[1] || "",
      }
    );

    if (response.data.data) {
      console.log("Gencode Data:", response.data.data);

      rows.value = response.data.data;
      // Process the gencode data
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load gencode data : " + error.message,
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
      unique: ["MGECD_VALUE"],
    };

    const response = await api_web.post("/gencode/storeGencodeData", payload);

    if (response.data.success) {
      $q.notify({
        color: "positive",
        message: "Gencode data saved successfully",
        icon: "check_circle",
      });
      // Optionally refresh data
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
    getPriceTypeList();
  }
};

const onClickAdd = (datas) => {
  $q.dialog({
    component: multiplePromptDialog,
    componentProps: {
      title: "Global Price Settings",
      initialFields: [
        {
          name: "code",
          label: "Code Price Type",
          type: "text",
          default: datas?.code || "",
          rules: [(val) => !!val || "Field is required"],
        },
        {
          name: "desc",
          label: "Description",
          type: "textarea",
          default: datas?.desc || "",
          rules: [(val) => !!val || "Field is required"],
        },
      ],
    },
    cancel: true,
    persistent: true,
  }).onOk((result) => {
    console.log("Global Price Settings Result:", result);
    onClickSave(
      [
        {
          id: "MPRC_TYPE",
          code: result.code,
          desc: result.desc,
          desc2: selectedBranch.value,
        },
      ]
    );
    // Handle the result of global settings here
  });
};

const onClickDeleteLines = (row) => {
  $q.dialog({
    title: "Confirm",
    message: `Are you sure you want to delete price type "${row.desc}"?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    try {
      const payload = {
        code: "MPRC_TYPE",
        cg: document.cookie
                .split("; ")
                .find((row) => row.startsWith("CGID="))
                ?.split("=")[1] || "",
        cols: [
          {
            col: "MGECD_VALUE",
            value: row.code,
            props: "and",
          },
          {
            col: "MGECD_DESC2",
            value: selectedBranch.value,
            props: "and",
          },
        ],
      };

      const response = await api_web.post(
        "/gencode/deleteGencodeData",
        payload
      );

      if (response.data.success) {
        $q.notify({
          color: "positive",
          message: "Gencode data deleted successfully",
          icon: "check_circle",
        });
        // Refresh data
        getPriceTypeList();
      } else {
        throw new Error(response.data.message || "Failed to delete data");
      }
    } catch (error) {
      $q.notify({
        color: "negative",
        message: error.message || "Failed to delete gencode data",
        icon: "report_problem",
      });
    } finally {
      getPriceTypeList();
      loading.value = false;
    }
  });
};
</script>
