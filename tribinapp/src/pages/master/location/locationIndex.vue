<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Location</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Location</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Location List"
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
              :options="col"
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
                  :color="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV ? 'grey' : 'orange'"
                  icon="edit"
                  @click="onClickNew(props.row)"
                  dense
                  :disable="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV"
                >
                  <q-tooltip>{{parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV ? 'All qty already confirmed' : 'Edit Data'}}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV ? 'grey' : 'red'"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                  dense
                  :disable="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV"
                >
                  <q-tooltip>{{parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV ? 'All qty already confirmed' : 'Delete Data'}}</q-tooltip>
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

import locationCreate from "./locationCreate.vue"

const $q = useQuasar()

const rows = ref([]);
const cols = ref([
  {
    name: "MLOC_LOCCD",
    label: "Location Code",
    field: "MLOC_LOCCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MLOC_LOCNM",
    label: "Location Name",
    field: "MLOC_LOCNM",
    sortable: true,
    align: "left",
  },
])

const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getLocationData()
})

const getLocationData = async () => {
    loading.value = true;
  await api_web
    .post(`location/searchAPI`, {
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
}

const onClickNew = (data = []) => {
  $q.dialog({
    component: locationCreate,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getLocationData();
  });
}

const onDelete = (data) => {

}
</script>
