<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Item Master</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Item</q-tooltip>
        </q-btn>
        <q-btn icon="add" color="blue" @click="onExportData()" flat>
          <q-tooltip>Export to Excel</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Item Master List"
          :rows="rows"
          :columns="cols"
          row-key="MITM_ITMCD"
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
                  <q-tooltip>Edit Data</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'red'"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                  dense
                >
                  <q-tooltip>Delete Data</q-tooltip>
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

import itemCreate from "./itemCreate.vue";

const $q = useQuasar()

const rows = ref([]);
const cols = ref([
  {
    name: "MITM_ITMCD",
    label: "Item Code",
    field: "MITM_ITMCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_ITMNM",
    label: "Item Name",
    field: "MITM_ITMNM",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_ITMTYPE",
    label: "Item Type",
    field: "MITM_ITMTYPE",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_STKUOM",
    label: "UOM",
    field: "MITM_STKUOM",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_ITMCAT",
    label: "Category",
    field: "MITM_ITMCAT",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_BRANCH",
    label: "Category",
    field: "MITM_BRANCH",
    sortable: true,
    align: "left",
  },
])

const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getItem()
})

const getItem = async () => {
    loading.value = true;
  await api_web
    .post(`item/searchAPITBL`, {
      searchBy: filterCol.value,
      searchValue: filter.value,
      isITMCD: 1
    })
    .then((response) => {
      loading.value = false;
      rows.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
}

const onClickNew = (data = null) => {
  $q.dialog({
    component: itemCreate,
    componentProps: {
      ItemCat: '',
      ItemType: '',
      isAutoCD: false,
      listOpenField: [],
      dataForUpdate: data
    },
    // persistent: true,
  }).onOk(async (val) => {
    getItem();
  });
}

const onExportData = () => {

}

const onDelete = (data) => {

}
</script>
