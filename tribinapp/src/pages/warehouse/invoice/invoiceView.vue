<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-table
          title="Invoice List"
          :rows="rows"
          :columns="columns"
          row-key="name"
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
              @update:model-value="getConfirmedData(pagination.value)"
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
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th auto-width>Action</q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <q-btn
                  flat
                  :color="'red'"
                  icon="list"
                  dense
                  @click="updateSuratJalan(props.row)"
                  :loading="props.loading"
                >
                  <q-tooltip>Update Surat Jalan</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    condButton('gensetharian', props.row) || props.loading
                      ? 'grey'
                      : 'purple'
                  "
                  icon="print"
                  dense
                  @click="printDailyGenset(props.row.TDLVORD_DLVCD)"
                  :disable="
                    condButton('gensetharian', props.row) || props.loading
                  "
                  :loading="props.loading"
                >
                  <q-tooltip>Print Form Genset Harian</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    condButton('invoice', props.row) || props.loading
                      ? 'grey'
                      : 'green'
                  "
                  icon="print"
                  dense
                  @click="printInvoice(props.row)"
                  :disable="condButton('invoice', props.row) || props.loading"
                  :loading="props.loading"
                >
                  <q-tooltip>Print Invoice</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    condButton('receipt', props.row) || props.loading
                      ? 'grey'
                      : 'indigo'
                  "
                  icon="print"
                  dense
                  @click="printKwitansi(props.row.TDLVORD_DLVCD)"
                  :disable="condButton('receipt', props.row) || props.loading"
                  :loading="props.loading"
                >
                  <q-tooltip>Print Receipt</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    condButton('sj', props.row) || props.loading
                      ? 'grey'
                      : 'orange'
                  "
                  icon="print"
                  dense
                  @click="
                    onClickPrintSJ(props.row.spk, props.row.TDLVORD_DLVCD)
                  "
                  :disable="condButton('sj', props.row) || props.loading"
                  :loading="props.loading"
                >
                  <q-tooltip>Print Surat Jalan</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.loading ? 'grey' : 'red'"
                  icon="delete"
                  dense
                  @click="onCancelInvoice(props.row.TDLVORD_DLVCD)"
                  :disable="props.loading"
                  :loading="props.loading"
                >
                  <q-tooltip>Print Surat Jalan</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>

          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
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

import updateSJ from "./updateSJ.vue";

const $q = useQuasar();

const rows = ref([]);
const columns = ref([
  {
    name: "TDLVORD_DLVCD",
    label: "DO Number",
    field: "TDLVORD_DLVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TSLO_QUOCD",
    label: "Quotation",
    field: "TSLO_QUOCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TSLO_SLOCD",
    label: "Sales Order",
    field: "TSLO_SLOCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TDLVORD_CONDGRP",
    label: "Condition Code",
    field: "TDLVORD_CONDGRP",
    sortable: true,
    align: "left",
  },
  {
    name: "TDLVORD_INVCD",
    label: "Invoice No",
    field: "TDLVORD_INVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Customer",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
  {
    name: "DLV_TYPE",
    label: "Type",
    field: "DLV_TYPE",
    sortable: true,
    align: "left",
  },
  // TDLVORD_INVCD
]);
const loading = ref(false);
const filterCol = ref("");
const filter = ref("");
const pagination = ref({
  rowsPerPage: 20,
  page: 1,
  rowsNumber: 20,
  sortBy: "TDLVORD_DLVCD",
  descending: true,
});

onMounted(() => {
  getConfirmedData(pagination.value);
});

const condButton = (btn, data) => {
  if (btn === "gensetharian") {
    return (
      !data.dlvsj ||
      !data.TDLVORD_CONDGRP ||
      !data.TDLVORD_CONDGRP.toLowerCase().includes("genset")
    );
  }

  if (btn === "invoice") {
    return data.TDLVORD_TYPE === 3 || (data.TDLVORD_TYPE !== 4 && !data.dlvsj);
  }

  if (btn === "receipt") {
    return data.TDLVORD_TYPE === 3 || (data.TDLVORD_TYPE !== 4 && !data.dlvsj);
  }

  if (btn === "sj") {
    return data.TDLVORD_TYPE !== 4 && !data.dlvsj;
  }
};

const onRequest = (props) => {
  console.log(props);
  getConfirmedData(props.pagination);
};

const getConfirmedData = async (paginate = {}) => {
  loading.value = true;
  await api_web
    .post("invoices/search", {
      searchBy: filterCol.value,
      searchValue: filter.value,
      pagination: paginate,
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
};

const printInvoice = async (val) => {
  loading.value = true;
  await api_web
    .post("invoices/printInvoice", val)
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    })
    .catch((e) => {
      loading.value = false;
    });
};

const printKwitansi = async (val) => {
  loading.value = true;
  await api_web
    .get(`invoices/printKwitansi/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    })
    .catch((e) => {
      loading.value = false;
    });
};

const printSJ = async (val) => {
  loading.value = true;
  await api_web
    .get(`invoices/printSJ/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickPrintSJ = (spk, val) => {
  if (!spk || spk.length === 0) {
    $q.dialog({
      title: "Confirmation",
      message: `SPK Not updated yet, are you sure want to print Surat Jalan ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      printSJ(val);
    });
  } else {
    printSJ(val);
  }
};

const updateSuratJalan = (val) => {
  $q.dialog({
    component: updateSJ,
    componentProps: {
      idDlv: val.TDLVORD_DLVCD,
      dataSJDB: val.dlvsj,
      payment: val.payment,
      condition: val.condition,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getConfirmedData(pagination.value);
  });
};

const printDailyGenset = async (val) => {
  loading.value = true;
  await api_web
    .get(`invoices/printGensetHarian/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onCancelInvoice = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to cancel this invoice ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    // Call your API to cancel the invoice here
    loading.value = true;
    api_web.delete(`invoices/${btoa(val)}`).then((response) => {
      loading.value = false;
      $q.notify({
        type: "positive",
        message: "Invoice cancelled successfully",
      });
      getConfirmedData(pagination.value);
      loading.value = false;
    });
  });
};
</script>
