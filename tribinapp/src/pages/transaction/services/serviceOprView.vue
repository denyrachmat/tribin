<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-table
          grid
          flat
          bordered
          :card-container-class="cardContainerClass"
          title="Outstanding Order"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          :pagination="{ rowsPerPage: 50 }"
          :rows-per-page-options="rowsPerPageOptions"
          :loading="loading"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card flat bordered>
                <q-card-section
                  :class="`text-center bg-${statusMaker(props.row).color} text-white`"
                >
                  <div class="text-h5 text-bold">
                    {{ props.row.SRVH_DOCNO }}
                  </div>
                  <div>{{ statusMaker(props.row).label }}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="text-h6 text-bold">
                    {{ props.row.MCUS_CUSNM }}
                  </div>
                  <div class="text-subtitle2">{{ props.row.SRVH_ISSDT }}</div>
                </q-card-section>
                <q-card-section>
                  <div class="text-h6 text-bold">
                    {{ props.row.resolve.length }} of
                    {{ props.row.detail.length }}
                  </div>
                  <div class="text-subtitle2">Resolved Items</div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col">
                      <q-btn
                        :label="props.row.detail.filter(fil => fil.TSRVD_FLGSTS === 1).length == props.row.detail.length ? 'Waiting Cust Approval' : 'Resolve'"
                        color="primary"
                        outline
                        @click="
                          onClickPreview(
                            props.row,
                            props.row.resolve.length == props.row.detail.length
                              ? 'approve'
                              : 'edit'
                          )
                        "
                        :disable="props.row.detail.filter(fil => fil.TSRVD_FLGSTS === 1).length == props.row.detail.length"
                      />
                    </div>
                    <div class="col text-right"></div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { date, useDialogPluginComponent, useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import serviceOprUpdateOrder from "./serviceOprUpdateOrder.vue";
const $q = useQuasar();

const column = ref([
  {
    name: "SRVH_DOCNO",
    label: "SPK No",
    field: "SRVH_DOCNO",
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
    name: "resolve",
    label: "Resolved Line",
    sortable: true,
    align: "left",
    field: (row) => row.resolve.length,
  },
  {
    name: "unresolve",
    label: "Unresolved Line",
    sortable: true,
    align: "left",
    field: (row) => row.unresolve.length,
  },
  {
    name: "SRVH_ISSDT",
    label: "Submited Date",
    field: "SRVH_ISSDT",
    sortable: true,
    align: "left",
  },
]);
const rows = ref([]);
const filter = ref("");
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
    .post("servicesOPR/search", {
      searchBy: "",
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

const onClickPreview = (val, mode) => {
  const header = {
    SRVH_DOCNO: val.SRVH_DOCNO,
    SRVH_ISSDT: date.formatDate(val.SRVH_ISSDT, "YYYY-MM-DD"),
    SRVH_CUSCD: val.MCUS_CUSCD,
  };

  let detail = [];
  val.detail.map((valMap) => {
    detail.push({
      id: valMap.id,
      TSRVD_ITMCD: valMap.TSRVD_ITMCD,
      TSRVD_FLGSTS: valMap.TSRVD_FLGSTS,
      TSRVD_LINE: valMap.TSRVD_LINE,
      TSRVD_QTY: valMap.TSRVD_QTY,
      TSRVD_CUSTRMK: valMap.TSRVD_CUSTRMK,
      TSRVD_REMARK: valMap.TSRVD_REMARK,
      listFixDet: valMap.list_fix_det,
    });
  });
  $q.dialog({
    component: serviceOprUpdateOrder,
    componentProps: {
      header: header,
      detail: detail,
      mode: mode,
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataSrv();
  });
};

const statusMaker = (val) => {
  const statusZero = val.detail.filter((fil) => fil.TSRVD_FLGSTS === 0);
  const statusOne = val.detail.filter((fil) => fil.TSRVD_FLGSTS === 1);
  const statusTwo = val.detail.filter((fil) => fil.TSRVD_FLGSTS === 2);
  const statusThree = val.detail.filter((fil) => fil.TSRVD_FLGSTS === 3);

  if (statusZero.length == val.detail.length) {
    return {
      color: 'red',
      label: 'No Price Added yet !',
      icon: 'edit'
    };
  } else if (statusOne.length > 0 && statusOne.length < val.detail.length) {
    return {
      color: 'warning',
      label: 'Please Add item & price',
      icon: 'payments'
    };
  } else if (statusOne.length > 0 && statusOne.length == val.detail.length) {
    return {
      color: 'green',
      label: 'Added Price Done, Waiting Cust. Confirmation',
      icon: 'price_check'
    };
  } else if (statusTwo.length > 0 && statusTwo.length >= val.detail.length) {
    return {
      color: 'cyan',
      label: 'Cust. has been approved, continue to fix.',
      icon: 'engineering'
    };
  } else if (statusThree.length > 0 && statusThree.length === val.detail.length) {
    return {
      color: 'primary',
      label: 'Fix has been done',
      icon: 'fact_check'
    };
  }
};
</script>
