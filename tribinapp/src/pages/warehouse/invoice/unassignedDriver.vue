<template>
  <q-card class="bg-white q-pa-sm">
    <q-card-section>
      <q-btn-toggle
        v-model="toggleApprove"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="white"
        :options="[
          { label: 'Unapproved', value: 'unapproved', color: 'orange' },
          { label: 'Approved', value: 'approved', color: 'green' },
        ]"
        @update:model-value="getUnassignedDriver(pagination)"
      />
    </q-card-section>

    <q-card-section class="q-pa-sm" style="overflow: auto">
      <q-table
        grid
        flat
        bordered
        :card-container-class="cardContainerClass"
        title="Unassigned Driver List"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        :rows-per-page-options="rowsPerPageOptions"
        :key="keyRefresh"
        :loading="loading"
        @request="(val) => getUnassignedDriver(val.pagination)"
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
            @update:model-value="getUnassignedDriver(pagination)"
            debounce="1000"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            outline
            color="primary"
            label="Refresh"
            @click="getUnassignedDriver(pagination)"
          />
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-card-section
                :class="`text-center ${
                  props.row.spk.length > 0
                    ? props.row.spk.some((spk) => !spk.submitted_at)
                      ? 'bg-orange'
                      : 'bg-green'
                    : 'bg-red'
                } text-white`"
              >
                <div class="text-h5 text-bold">
                  {{ props.row.TDLVORD_DLVCD }}
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-h6 text-bold">{{ props.row.MCUS_CUSNM }}</div>
                <div class="text-subtitle2">{{ props.row.MCUS_ADDR1 }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-body2 text-bold bg-orange-2 q-pa-xs">
                  Unapproved SPK :
                  {{ props.row.spk.filter((spk) => !spk.submitted_at).length }}
                </div>
                <div class="text-body2 text-bold bg-green-2 q-pa-xs">
                  Approved SPK :
                  {{ props.row.spk.filter((spk) => spk.submitted_at).length }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col">
                    <q-btn
                      label="Preview"
                      color="primary"
                      outline
                      @click="onClickPreview(props.row)"
                    />
                  </div>
                  <div class="col text-right">
                    {{
                      getDateUntilNow(props.row.created_at) < 30
                        ? `${getDateUntilNow(props.row.created_at)} Days Ago`
                        : `${getDateUntilNow(
                            props.row.created_at,
                            "months"
                          )} Month ago`
                    }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { date, useQuasar } from "quasar";
import { api_web } from "boot/axios";

import UnassignedDriverManage from "./unassignedDriverManage.vue";

const $q = useQuasar();
// const props = defineProps({
//   listApprv: Array,
//   typeAPI: String,
//   conn: String,
// });

const toggleApprove = ref("unapproved");

const filterCol = ref("");
const columns = ref([
  { name: "TDLVORD_DLVCD", label: "ID", field: "TDLVORD_DLVCD", align: "left" },
  {
    name: "MCUS_CUSNM",
    label: "Customer Name",
    field: "MCUS_CUSNM",
    align: "left",
  },
  { name: "MCUS_ADDR1", label: "Address", field: "MCUS_ADDR1", align: "left" },
  {
    name: "created_at",
    label: "Created At",
    field: "created_at",
    align: "left",
  },
]);
const filter = ref("");
const keyRefresh = ref(0);
const rows = ref([]);
const loading = ref(false);
const pagination = ref({
  rowsNumber: 1,
  page: 1,
  rowsPerPage: 20,
  sortBy: "TDLVORD_DLVCD",
  descending: false,
});

onMounted(() => {
  getUnassignedDriver(pagination.value);
});

const getUnassignedDriver = async (paginate = {}) => {
  loading.value = true;
  try {
    const res = await api_web.post("assignment-driver/data/unassign-driver", {
      searchBy: filterCol.value,
      searchValue: filter.value,
      pagination: paginate,
      status: toggleApprove.value,
    });

    console.log(res.data.data);
    const dataRows = res.data.data;

    // rows.value = dataRows.data;
    rows.value = dataRows.data;
    pagination.value.rowsNumber = dataRows.total;
    pagination.value.page = dataRows.current_page;
    pagination.value.rowsPerPage = dataRows.per_page;
    pagination.value.sortBy = dataRows.sortBy;
    pagination.value.descending = dataRows.descending;

    console.log(pagination.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const getDateUntilNow = (dates, unit = "days") => {
  const date1 = new Date();
  const date2 = new Date(dates);

  const diff = date.getDateDiff(date1, date2, unit);
  return diff;
};

const onClickPreview = (data) => {
  $q.dialog({
    component: UnassignedDriverManage,
    componentProps: {
      data,
    },
  }).onOk((data) => {
    console.log("Dialog OK with data:", data);
    getUnassignedDriver(pagination.value);
  });
};
</script>
