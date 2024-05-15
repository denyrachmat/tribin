<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Quotation </span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew">
          <q-tooltip>Create New Quotation</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Created Quotation"
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
              @update:model-value="dataQuo()"
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
                  :color="props.row.TQUO_APPRVDT !== null ? 'grey' : 'orange'"
                  icon="edit"
                  @click="onClickEdit(props.row.TQUO_QUOCD)"
                  dense
                  :disable="props.row.TQUO_APPRVDT !== null"
                >
                  <q-tooltip>{{
                    !props.row.TQUO_APPRVDT
                      ? "Edit this quotation"
                      : "Quotation already approved, cannot edit !"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.TQUO_APPRVDT !== null ? 'grey' : 'red'"
                  icon="delete"
                  @click="onClickDelete(props.row.TQUO_QUOCD)"
                  dense
                  :disable="props.row.TQUO_APPRVDT !== null"
                >
                  <q-tooltip>{{
                    !props.row.TQUO_APPRVDT
                      ? "Delete this quotation"
                      : "Quotation already approved, cannot delete !"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="indigo"
                  icon="print"
                  @click="onClickPrint(props.row.TQUO_QUOCD)"
                  dense
                >
                  <q-tooltip>Print this quotation</q-tooltip>
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
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import quotationCreate from "./quotationCreate.vue";

const $q = useQuasar();

const filterCol = ref("TQUO_QUOCD");
const filter = ref("");
const rows = ref([]);
const columns = ref([
  {
    name: "TQUO_QUOCD",
    label: "Quot. Code",
    field: "TQUO_QUOCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TQUO_SBJCT",
    label: "Quot. Subject",
    field: "TQUO_SBJCT",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Customer Name",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
  {
    name: "TQUO_ATTN",
    label: "Customer Attn",
    field: "TQUO_ATTN",
    sortable: true,
    align: "left",
  },
  {
    name: "TQUO_CUSCD",
    label: "Customer Code",
    field: "TQUO_CUSCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TQUO_ISSUDT",
    label: "Issue Date",
    field: "TQUO_ISSUDT",
    sortable: true,
    align: "left",
  },
  {
    name: "TQUO_PROJECT_LOCATION",
    label: "Proj. Loc",
    field: "TQUO_PROJECT_LOCATION",
    sortable: true,
    align: "left",
  },
]);
const loading = ref(false);

onMounted(() => {
  dataQuo();
});

const dataQuo = async () => {
  loading.value = true;
  await api_web
    .post("quotation/search", {
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

const onClickNew = () => {
  $q.dialog({
    component: quotationCreate,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    dataQuo();
  });
};

const onClickEdit = (val) => {
  console.log(val);
  $q.dialog({
    component: quotationCreate,
    componentProps: {
      quoHeader: val,
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataQuo();
  });
};

const onClickDelete = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web.delete(`quotationNew/${btoa(val)}`).then((res) => {
      loading.value = false;
      dataQuo();
    });
  });
};

const onClickPrint = (val) => {
  window
    .open(process.env.API_WEB + "PDF/quotation/" + btoa(val), "_blank")
    .focus();
};
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
