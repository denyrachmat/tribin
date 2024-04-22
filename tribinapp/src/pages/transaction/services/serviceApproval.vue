<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-table
          grid
          flat
          bordered
          :card-container-class="cardContainerClass"
          title="Approve Service Pricing"
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
                  :class="`text-center bg-green text-white`"
                >
                  <div class="text-h5 text-bold">
                    {{ props.row.SRVH_DOCNO }}
                  </div>
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
                        color="primary"
                        label="View Data"
                        @click="onClickView(props.row)"
                      />
                    </div>
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

import serviceApprovalDetView from "./serviceApprovalDetView.vue"

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
    .get("servicesAdmins/listUnapproveMgr")
    .then((response) => {
      loading.value = false;
      rows.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickView = (val) => {
  $q.dialog({
    component: serviceApprovalDetView,
    componentProps: {
      idHeader: val
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataSrv();
  });
};
</script>
