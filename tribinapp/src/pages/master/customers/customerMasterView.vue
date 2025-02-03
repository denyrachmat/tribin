<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Customer Master</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Customer</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Customer Master List"
          :rows="rows"
          :columns="cols"
          row-key="MCUS_CUSCD"
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
              @update:model-value="getCust()"
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
                  @click="onDelete(props.row.MCUS_CUSCD)"
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

// import itemCreate from "./itemCreate.vue";

import customerView from "./customerView.vue";

const $q = useQuasar()

const rows = ref([]);
const cols = ref([
  {
    name: "MCUS_CUSCD",
    label: "Cust. Code",
    field: "MCUS_CUSCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Cust. Name",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CURCD",
    label: "Curr",
    field: "MCUS_CURCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_ADDR1",
    label: "Address",
    field: "MCUS_ADDR1",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_TELNO",
    label: "Cust. Telno",
    field: "MCUS_TELNO",
    sortable: true,
    align: "left",
  },
])

const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
  getCust()
})

const getCust = async () => {
  loading.value = true;
  await api_web
    .post(`customer/searchAPIMaster`, {
      searchBy: filterCol.value,
      searchValue: filter.value
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
    component: customerView,
    componentProps: {
      headerData: data
    },
    // persistent: true,
  }).onDismiss(async (val) => {
    getCust();
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
        getCust()
      }).catch((e) => {
        console.log(e)
        loading.value = false;
        getCust()
      })
    })
}
</script>
