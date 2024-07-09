<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Incoming Barcode</span>
      </div>
      <div class="col text-right">
        <!-- <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Incoming</q-tooltip>
        </q-btn> -->
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Barcoded Incoming List"
          :rows="rows"
          :columns="cols"
          row-key="TRCVBC_BCCD"
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
                  :color="'red'"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                  dense
                  :disable="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV"
                >
                  <q-tooltip>{{parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV ? 'All qty already confirmed' : 'Cancel Barcode'}}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'indigo'"
                  icon="print"
                  @click="onPrint(props.row)"
                  dense
                  :disable="parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV"
                >
                  <q-tooltip>Print Barcode</q-tooltip>
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

const $q = useQuasar()

const rows = ref([]);
const cols = ref([
  {
    name: "TRCVBC_BCCD",
    label: "Barcode ID",
    field: "TRCVBC_BCCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TRCV_RCVCD",
    label: "Doc No",
    field: "TRCV_RCVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MSUP_SUPNM",
    label: "Supplier",
    field: "MSUP_SUPNM",
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
    name: "TRCVBC_BCQT",
    label: "Qty",
    field: "TRCVBC_BCQT",
    sortable: true,
    align: "right",
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
    .post(`receiveBarcode/searchAPI`, {
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

const onPrint = (data) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
  loading.value = true;
  await api_web
    .post(`receiveBarcode/printBarcode`, {
      data: [data]
    })
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    })
  })
}

// const onClickNew = (data = []) => {
//   $q.dialog({
//     component: incomingCreate,
//     componentProps: {
//       dataHeader: data,
//     },
//     // persistent: true,
//   }).onOk(async (val) => {
//     getOutgoingData();
//   });
// }

// const onConfirmation = (data = []) => {
//   $q.dialog({
//     component: incomingConfirmDet,
//     componentProps: {
//       dataHeader: data,
//     },
//     // persistent: true,
//   }).onOk(async (val) => {
//     getOutgoingData();
//   });
// }
</script>
