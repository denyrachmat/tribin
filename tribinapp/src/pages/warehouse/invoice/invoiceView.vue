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
              @update:model-value="dataOutstanding()"
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
                  color="green"
                  icon="print"
                  dense
                  @click="printInvoice(props.row)"
                >
                  <q-tooltip>Print Invoice</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="indigo"
                  icon="print"
                  dense
                >
                  <q-tooltip>Print Receipt</q-tooltip>
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
    name: "MCUS_CUSNM",
    label: "Customer",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
]);
const loading = ref(false);
const filterCol = ref("");
const filter = ref("");

onMounted(() => {
  getConfirmedData();
});

const getConfirmedData = async () => {
  loading.value = true;
  await api_web
    .post("invoices/search", {
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

const printInvoice = async (val) => {
  loading.value = true;
  await api_web
    .post("invoices/printInvoice", val)
    .then((response) => {
      loading.value = false;
      let pdfWindow = window.open("")
      pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) + "'></iframe>"
      )
    })
    .catch((e) => {
      loading.value = false;
    });
}
</script>
