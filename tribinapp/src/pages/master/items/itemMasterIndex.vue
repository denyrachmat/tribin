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
        <q-btn icon="download" color="blue" @click="onExportData()" flat>
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
          v-model:pagination="pagination"
          class="my-sticky-header-column-table"
          @request="onRequest"
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
              @update:model-value="getItem(pagination)"
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
                  :color="props.row.DLV_STAT == 1 ? 'grey' : 'red'"
                  icon="delete"
                  @click="onDelete(props.row.MITM_ITMCD)"
                  :disable="props.row.DLV_STAT == 1"
                  dense
                >
                  <q-tooltip>{{props.row.DLV_STAT == 1 ? 'This item code is used by delivery, cannot delete.' : 'Delete Data'}}</q-tooltip>
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
])

const loading = ref(false);
const filterCol = ref('')
const filter = ref('')
const pagination = ref({
  rowsPerPage: 20,
  page: 1,
  rowsNumber: 20,
  sortBy: "MITM_ITMCD",
  descending: true,
});

onMounted(() => {
    getItem(pagination.value);
})

const onRequest = (props) => {
  getItem(props.pagination);
};

const getItem = async (paginations) => {
  loading.value = true;
  await api_web
    .post(`item/searchAPITBL`, {
      searchBy: filterCol.value,
      searchValue: filter.value,
      isITMCD: 1,
      paginate: paginations
    })
    .then((response) => {
      loading.value = false;
      rows.value = response.data.data;
      pagination.value.rowsNumber = response.data.total;
      pagination.value.page = response.data.current_page;
      pagination.value.rowsPerPage = response.data.per_page;
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
    getItem(pagination.value);
  });
}

const onExportData = () => {

  $q.dialog({
    title: "Confirmation",
    message: `Do you want to export all this item ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`item/exportExcel`, null, {
        responseType: 'arraybuffer'
      })
      .then((datas) => {
        loading.value = false;
        const link = document.createElement("a");
        link.download = name;
        // const data = await fetch(datas).then((res) => res.blob());
        link.href = window.URL.createObjectURL(
          new Blob([datas.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        );
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  });
}

const onDelete = (data) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this item ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .get(`item/deleteItem/${data}`)
      .then((datas) => {
        loading.value = false;
        getItem(pagination.value)
      }).catch((e) => {
        console.log(e)
        loading.value = false;
        getItem(pagination.value)
      })
    })
}
</script>
