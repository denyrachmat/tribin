<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Receive Order </span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew">
          <q-tooltip>Create New Order</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Created Order"
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
                  color="orange"
                  icon="edit"
                  @click="onClickEdit(props.row)"
                  dense
                  :disable="
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                      .length > 0
                  "
                >
                  <q-tooltip>Edit this Order</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="indigo"
                  icon="print"
                  @click="onClickPrint(props.row.SRVH_DOCNO)"
                  dense
                  :disable="
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                      .length !== props.row.detail.length
                  "
                >
                  <q-tooltip>Print this order</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="red"
                  icon="delete"
                  @click="onClickDelete(props.row.SRVH_DOCNO)"
                  dense
                  :disable="
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                      .length > 0
                  "
                >
                  <q-tooltip>
                    {{
                      props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                        .length > 0
                        ? "Cannot delete processed order"
                        : "Delete this Order"
                    }}</q-tooltip
                  >
                </q-btn>
                <q-btn
                  flat
                  color="cyan"
                  icon="visibility"
                  @click="onClickView(props.row)"
                  dense
                  :disable="
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                      .length === 0
                  "
                >
                  <q-tooltip>View this Order</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="indigo"
                  icon="check"
                  @click="onClickProceed(props.row.SRVH_DOCNO)"
                  dense
                  :disable="
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS === 1)
                      .length === 0 ||
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS >= 2)
                      .length > 0
                  "
                >
                  <q-tooltip>{{
                    props.row.detail.filter((fil) => fil.TSRVD_FLGSTS > 0)
                      .length !== props.row.detail.length
                      ? "Please wait until all item checked"
                      : "Proceed to service"
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
import { useQuasar, date } from "quasar";
import { api, api_web } from "boot/axios";

import serviceCreateOrder from "./serviceCreateOrder.vue";
import serviceOprUpdateOrder from "./serviceOprUpdateOrder.vue";

const $q = useQuasar();

const filterCol = ref("SRVH_DOCNO");
const filter = ref("");
const rows = ref([]);
const columns = ref([
  {
    name: "SRVH_DOCNO",
    label: "SPK No",
    field: "SRVH_DOCNO",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Cust",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Status",
    field: row => row.detail.filter(fil => fil.TSRVD_FLGSTS === 1).length === 0
      ? 'On Draft'
      : (row.detail.filter(fil => fil.TSRVD_FLGSTS === 2).length > 0
        ? 'On Working'
        : 'On Check Price'
      ),
    sortable: true,
    align: "left",
  },
  {
    name: "created_at",
    label: "Created Date",
    field: "created_at",
    sortable: true,
    align: "left",
    format: (val) => date.formatDate(new Date(val), "DD MMM YYYY"),
  },
]);
const loading = ref(false);
const interval = ref(null);

onMounted(() => {
  dataSrv();

  interval.value = setInterval(() => {
    dataSrv();
  }, 10000);
});

const dataSrv = async () => {
  loading.value = true;
  await api_web
    .post("servicesAdmin/search", {
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
    component: serviceCreateOrder,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    dataSrv();
  });
};

const onClickView = (val) => {
  const header = {
    SRVH_DOCNO: val.SRVH_DOCNO,
    SRVH_ISSDT: date.formatDate(val.SRVH_ISSDT, "YYYY-MM-DD"),
    SRVH_CUSCD: val.MCUS_CUSCD,
  };

  let detail = [];
  val.detail.map((valMap) => {
    detail.push({
      TSRVD_ITMCD: valMap.TSRVD_ITMCD,
      TSRVD_LINE: valMap.TSRVD_LINE,
      TSRVD_QTY: valMap.TSRVD_QTY,
      TSRVD_CUSTRMK: valMap.TSRVD_CUSTRMK,
      TSRVD_REMARK: valMap.TSRVD_REMARK,
      TSRVD_FLGSTS: valMap.TSRVD_FLGSTS,
      listFixDet: valMap.list_fix_det,
    });
  });

  $q.dialog({
    component: serviceOprUpdateOrder,
    componentProps: {
      header: header,
      detail: detail,
      mode: "view",
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataSrv();
  });
};
const onClickPrint = (val) => {
  window
    .open(
      process.env.API_WEB + "servicesAdmin/printInvoice/" + btoa(val),
      "_blank"
    )
    .focus();
};
const onClickEdit = (val) => {
  const header = {
    SRVH_DOCNO: val.SRVH_DOCNO,
    SRVH_ISSDT: date.formatDate(val.SRVH_ISSDT, "YYYY-MM-DD"),
    SRVH_CUSCD: val.MCUS_CUSCD,
  };

  let detail = [];
  val.detail.map((valMap) => {
    detail.push({
      TSRVD_ITMCD: valMap.TSRVD_ITMCD,
      TSRVD_LINE: valMap.TSRVD_LINE,
      TSRVD_QTY: valMap.TSRVD_QTY,
      TSRVD_CUSTRMK: valMap.TSRVD_CUSTRMK,
    });
  });

  $q.dialog({
    component: serviceCreateOrder,
    componentProps: {
      header: header,
      detail: detail,
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataSrv();
  });
};
const onClickProceed = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to proceed to service ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`servicesAdmin/${btoa(val.SRVH_DOCNO)}`, {
        TSRVD_FLGSTS: 2,
      })
      .then((response) => {
        loading.value = false;
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};
const onClickDelete = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this order ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .delete(`servicesAdmin/${btoa(val.SRVH_DOCNO)}`)
      .then((response) => {
        loading.value = false;
      })
      .catch((e) => {
        loading.value = false;
      });
  });
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
