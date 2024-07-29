<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Transfer Request</span>
      </div>
      <div class="col text-right"></div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Transfer Request List"
          :rows="rows"
          :columns="columns"
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
                  :color="
                    props.row.TLOCREQ_APPRVBY !== null ? 'grey' : 'indigo'
                  "
                  icon="done_all"
                  @click="onClickApprove(props.row)"
                  dense
                  :disable="props.row.TLOCREQ_APPRVBY !== null"
                >
                  <q-tooltip>{{
                    props.row.TLOCREQ_APPRVBY !== null
                      ? "Request has been approved"
                      : "Approve All Data"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.TLOCREQ_APPRVBY !== null ? 'cyan' : 'grey'"
                  icon="print"
                  @click="onClickPrint(props.row.TLOCREQ_DOCNO)"
                  dense
                  :disable="props.row.TLOCREQ_APPRVBY === null"
                >
                  <q-tooltip>{{
                    props.row.TLOCREQ_APPRVBY === null
                      ? "Please Aprove first"
                      : "Print handover request"
                  }}</q-tooltip>
                </q-btn>
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
import transferRequestPreview from "./transferRequestPreview.vue";

const $q = useQuasar();

const rows = ref([]);
const columns = ref([
  {
    name: "TLOCREQ_DOCNO",
    label: "Doc Np",
    field: "TLOCREQ_DOCNO",
    sortable: true,
    align: "left",
  },
  {
    name: "TLOCREQ_FRLOC",
    label: "From Location",
    field: "TLOCREQ_FRLOC",
    sortable: true,
    align: "left",
  },
  {
    name: "TLOCREQ_TOLOC",
    label: "To Location",
    field: "TLOCREQ_TOLOC",
    sortable: true,
    align: "left",
  },
  {
    name: "OS_TF",
    label: "Qty Need to Transfer",
    field: "OS_TF",
    sortable: true,
    align: "left",
  },
  {
    name: "TLOCREQ_ISREP",
    label: "Is Replacement ?",
    field: "TLOCREQ_ISREP",
    sortable: true,
    format: (val) => `${val == 1 ? "Yes" : "No"}`,
    align: "left",
  },
]);
const loading = ref(false);
const filterCol = ref("");
const filter = ref("");

onMounted(() => {
  getTFRequest();
});

const getTFRequest = async () => {
  loading.value = true;
  await api_web
    .post(`inventory/transferRequest/searchAPI`, {
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

const onClickApprove = (val) => {
  $q.dialog({
    component: transferRequestPreview,
    componentProps: {
      dataHeader: val,
      dataDet: val.detail,
    },
    // persistent: true,
  }).onOk(async (res) => {
    loading.value = false;
    onDialogOK();
  });
};

const onClickPrint = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this transfer ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`inventory/printHandoverPDF`, {
        data: btoa(val),
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
      .catch((e) => {
        loading.value = false;
      });
  });
};
</script>
