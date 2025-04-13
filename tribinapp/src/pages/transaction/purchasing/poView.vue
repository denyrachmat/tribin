<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Purchase Order List</div>

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="PO List"
          :rows="rows"
          :columns="columns"
          row-key="name"
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
              @update:model-value="dataPo()"
              debounce="1000"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn icon="add" color="cyan" flat @click="onAddClick()"/>
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
                  color="cyan"
                  icon="visibility"
                  @click="onClickView(props.row)"
                  dense
                >
                  <q-tooltip> View detail PO </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.TPCHORD_APPRVDT ? 'grey' : 'orange'"
                  icon="edit"
                  @click="onAddClick(props.row)"
                  dense
                  :disable="props.row.TPCHORD_APPRVDT !== null"
                >
                <q-tooltip> {{!props.row.TPCHORD_APPRVDT ? 'Edit PO' : 'PO Already approved'}} </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.TPCHORD_APPRVDT ? 'grey' : 'red'"
                  icon="delete"
                  @click="onDeleteClick(props.row)"
                  dense
                  :disable="props.row.TPCHORD_APPRVDT !== null"
                >
                  <q-tooltip> {{!props.row.TPCHORD_APPRVDT ? 'Delete PO' : 'PO Already approved'}} </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="!props.row.TPCHORD_APPRVDT ? 'grey' : 'blue'"
                  icon="print"
                  @click="onClickPrintPO(props.row.TPCHORD_PCHCD)"
                  dense
                  :disable="!props.row.TPCHORD_APPRVDT"
                >
                  <q-tooltip> {{props.row.TPCHORD_APPRVDT ? 'Print PO' : 'PO need approved first'}} </q-tooltip>
                </q-btn>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <q-badge
                  :color="
                    col.value === 'Approved'
                      ? 'green'
                      : col.value === 'Rejected'
                      ? 'red'
                      : 'orange'
                  "
                  v-if="col.name === 'status'"
                >
                  {{ col.value }}
                </q-badge>
                <q-badge
                  :color="
                    col.value === 'Received'
                      ? 'green'
                      : col.value === 'Not Received'
                      ? 'red'
                      : 'orange'
                  "
                  v-else-if="col.name === 'status_rcv'"
                >
                  {{ col.value }}
                </q-badge>
                <span v-else>
                  {{ col.value }}
                </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import poCreate from "./poCreate.vue";
import { format } from "v-money3";

const $q = useQuasar();

const columns = [
  {
    name: "TPCHORD_PCHCD",
    required: true,
    label: "PO No.",
    align: "left",
    field: "TPCHORD_PCHCD",
    sortable: true,
  },
  {
    name: "MSUP_SUPNM",
    label: "Supplier",
    align: "left",
    field: "MSUP_SUPNM",
    sortable: true,
  },
  {
    name: "TPCHORD_ISSUDT",
    label: "Issue Date",
    align: "left",
    field: "TPCHORD_ISSUDT",
    sortable: true,
  },
  {
    name: "total_qty",
    label: "Total Qty",
    align: "left",
    field: "total_qty",
    sortable: true,
  },
  {
    name: "total_rcv_qty",
    label: "Total Receive Qty",
    align: "left",
    field: (row) => row.total_rcv_qty ?? 0,
    sortable: true,
  },
  {
    name: "total_price",
    label: "Total Amount",
    align: "right",
    field: (row) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(row.total_price),
    sortable: true,
  },
];

const rows = ref([]);
const filterCol = ref("TPCHORD_PCHCD");
const filter = ref("");
const loading = ref(false);

onMounted(() => {
  dataPO();
});

const dataPO = async () => {
  loading.value = true;
  await api_web
    .post("purchase-status/searchAPI", {
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

const onClickView = (data) => {
  $q.dialog({
    component: poCreate,
    componentProps: {
      dataHeader: data,
      mode: "view",
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataPO();
  });
};

const onAddClick = (data = null) => {
  $q.dialog({
    component: poCreate,
    componentProps: {
      dataHeader: data,
      mode: "manage",
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataPO();
  });
}

const onClickPrintPO = (po) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print PO ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .get(`PDF/purchase-order/${btoa(po)}`)
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
  });
};

const onDeleteClick = (data) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this po no ${data.TPCHORD_PCHCD} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
    .delete(`purchase-order/po/${btoa(data.TPCHORD_PCHCD)}`)
    .then((response) => {
      loading.value = false;
      dataPO()
    })
    .catch((e) => {
      loading.value = false;
    });
  })
}

function exportReport() {
  console.log("Exporting report...");
  // Add export logic here
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 80vh

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fff

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
