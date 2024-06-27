<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Closing Interface</span>
      </div>
      <div class="col text-right">
        <q-btn label="Closing Period" color="primary" @click="onClickClosingPeriod()"></q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">

        <q-table
          title="Outstanding Transation"
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
          <!-- For Search Header -->
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
              @update:model-value="dataAcc()"
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
              <!-- <q-th auto-width>Action</q-th> -->
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <!-- <q-td auto-width>
                <q-btn
                  flat
                  :color="'orange'"
                  icon="visibility"
                  @click="onClickView(props.row.TQUO_QUOCD)"
                  dense
                  :disable="props.row.TQUO_APPRVDT !== null"
                >
                  <q-tooltip>{{
                    !props.row.TQUO_APPRVDT
                      ? "Edit this quotation"
                      : "Quotation already approved, cannot edit !"
                  }}</q-tooltip>
                </q-btn>
              </q-td> -->
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
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import accClosingPeriod from "./accClosingPeriod.vue"

const $q = useQuasar();

const filterCol = ref("DOCCD");
const filter = ref("");
const rows = ref([]);
const columns = ref([
  {
    name: "EFFDATE",
    label: "Effective Date",
    field: "EFFDATE",
    sortable: true,
    align: "left",
  },
  {
    name: "DOCCD",
    label: "Document",
    field: "DOCCD",
    sortable: true,
    align: "left",
  },
  {
    name: "ITMCD",
    label: "Item Code",
    field: "ITMCD",
    sortable: true,
    align: "left",
  },
  {
    name: "ITMDESC",
    label: "Item Desc",
    field: "ITMDESC",
    sortable: true,
    align: "left",
  },
  {
    name: "CURR",
    label: "Valuta",
    field: "CURR",
    sortable: true,
    align: "left",
  },
  {
    name: "ITMQT",
    label: "Qty",
    field: "ITMQT",
    sortable: true,
    format: (row) => row.toLocaleString(),
    align: "left",
  },
  {
    name: "ITMPRC",
    label: "Amount",
    field: "ITMPRC",
    sortable: true,
    format: (row) => row.toLocaleString(),
    align: "left",
  },
  {
    name: "TOT",
    label: "Total Amount",
    field: (row) => row.ITMQT * row.ITMPRC,
    sortable: true,
    format: (row) => row.toLocaleString(),
    align: "left",
  },
])

const loading = ref(false);

onMounted(() => {
  dataAcc();
});

const dataAcc = async () => {
  loading.value = true;
  await api_web
    .post("acc/searchAPI", {
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

const onClickClosingPeriod = () => {
  $q.dialog({
    component: accClosingPeriod,
    // persistent: true,
  }).onOk(async (val) => {
    dataAcc();
  });
}

</script>

