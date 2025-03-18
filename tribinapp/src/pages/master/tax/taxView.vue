<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Tax</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Tax</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Tax Code List"
          :rows="rows"
          :columns="cols"
          row-key="MLOC_LOCCD"
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
            />
            <q-input
              borderless
              dense
              v-model="filter"
              placeholder="Search"
              outlined
              @update:model-value="getOutgoingData()"
              debounce="1000"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
                  :color="'orange'"
                  icon="edit"
                  @click="onClickNew(props.row)"
                  dense
                >
                  <q-tooltip>{{ "Edit Data" }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'red'"
                  icon="delete"
                  @click="onDelete(props.row.MTAX_CODE)"
                  dense
                >
                  <q-tooltip>{{ "Delete Data" }}</q-tooltip>
                </q-btn>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar } from "quasar";

import taxCreate from "./taxCreate.vue";
const $q = useQuasar();

const rows = ref([]);

const cols = ref([
  {
    name: "MTAX_CODE",
    label: "Tax Code",
    field: "MTAX_CODE",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_DESC",
    label: "Tax Desc",
    field: "MTAX_DESC",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_TYPE",
    label: "Type",
    field: "MTAX_TYPE",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_AMT",
    label: "Amount",
    field: "MTAX_AMT",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_EFFDT",
    label: "Eff. Date",
    field: "MTAX_EFFDT",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_TAXMIN",
    label: "Min. Tax Active",
    field: "MTAX_TAXMIN",
    sortable: true,
    align: "left",
  },
  {
    name: "MTAX_TAXMAX",
    label: "Max. Tax Active",
    field: "MTAX_TAXMAX",
    sortable: true,
    align: "left",
  },
]);

const loading = ref(false);
const filterCol = ref("");
const filter = ref("");

onMounted(() => {
  getTaxData();
});

const getTaxData = async () => {
  loading.value = true;
  await api_web
    .post(`taxes/searchAPI`, {
      searchBy: filterCol.value,
      searchValue: filter.value,
    })
    .then((response) => {
      loading.value = false;
      rows.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickNew = (data = []) => {
  $q.dialog({
    component: taxCreate,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getTaxData();
  });
};

const onDelete = (id) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete tax master (${id})?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .delete(`tax/${id}`)
      .then((response) => {
        loading.value = false;
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};
</script>
