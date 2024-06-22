<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Incoming</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Delivery</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Outgoing List"
          :rows="rows"
          :columns="cols"
          row-key="TDLVORD_DLVCD"
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
              :options="columns"
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
                  color="orange"
                  icon="edit"
                  @click="onClickNew(props.row)"
                  dense
                  :disable="props.row.TRCV_SUBMITTED_AT"
                >
                  <q-tooltip>Edit Data</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="red"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                  dense
                  :disable="props.row.TRCV_SUBMITTED_AT"
                >
                  <q-tooltip>Delete Data</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="indigo"
                  icon="check"
                  @click="onConfirmation(props.row)"
                  dense
                >
                  <q-tooltip>Confirm Data</q-tooltip>
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

import incomingCreate from "./incomingCreate.vue";
import incomingConfirmDet from "./incomingConfirmDet.vue"

const $q = useQuasar()

const rows = ref([]);
const cols = ref([
  {
    name: "TRCV_RCVCD",
    label: "Receive ID",
    field: "TRCV_RCVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MSUP_SUPNM",
    label: "Supplier Name",
    field: "MSUP_SUPNM",
    sortable: true,
    align: "left",
  },
  {
    name: "TOT_RCV",
    label: "Total Qty",
    field: "TOT_RCV",
    sortable: true,
    align: "left",
    format: val => `${val.toLocaleString()}`,
  },
  {
    name: "MSUP_CURCD",
    label: "Currency",
    field: "MSUP_CURCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TOT_AMT",
    label: "Total Amount",
    field: "TOT_AMT",
    sortable: true,
    align: "left",
    format: val => `${val.toLocaleString()}`,
  },
])

const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getIncomingData()
})

const getIncomingData = async () => {
    loading.value = true;
  await api_web
    .post(`receive/searchAPI`, {
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
    component: incomingCreate,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getOutgoingData();
  });
}

const onConfirmation = (data = []) => {
  $q.dialog({
    component: incomingConfirmDet,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getOutgoingData();
  });
}

const onDelete = (data) => {

}
</script>
