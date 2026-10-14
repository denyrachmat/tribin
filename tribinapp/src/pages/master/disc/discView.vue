<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Master Discount</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Discount</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Discount List"
          :rows="rows"
          :columns="cols"
          row-key="MDISC_CODE"
          :loading="loading"
          dense
          :pagination="{ rowsPerPage: 20 }"
          class="my-sticky-header-column-table"
        >
          <template v-slot:top-right>
            <q-select
              outlined
              v-model="filterCol"
              :options="searchableCols"
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
              @update:model-value="getDiscData()"
              debounce="1000"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width>Action</q-th>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  flat
                  color="orange"
                  icon="edit"
                  @click="onClickNew(props.row)"
                  dense
                >
                  <q-tooltip>Edit Data</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  color="red"
                  icon="delete"
                  @click="onDelete(props.row.MDISC_CODE)"
                  dense
                >
                  <q-tooltip>Delete Data</q-tooltip>
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
import { onMounted, ref, computed } from "vue";
import { api_web } from "boot/axios";
import { useQuasar } from "quasar";

import discCreate from "./discCreate.vue";

const $q = useQuasar();

const rows = ref([]);
const loading = ref(false);
const filterCol = ref("");
const filter = ref("");

const cols = ref([
  {
    name: "MDISC_CODE",
    label: "Code",
    field: "MDISC_CODE",
    sortable: true,
    align: "left",
  },
  {
    name: "MDISC_DESC",
    label: "Description",
    field: "MDISC_DESC",
    sortable: true,
    align: "left",
  },
  {
    name: "MDISC_PERCENT",
    label: "Percent (%)",
    field: "MDISC_PERCENT",
    sortable: true,
    align: "left",
  },
  {
    name: "MDISC_AMT",
    label: "Amount (Rp)",
    field: "MDISC_AMT",
    sortable: true,
    align: "left",
  },
]);

// The API only accepts these two as filters, so keep the picker in step with it.
const searchableCols = computed(() =>
  cols.value.filter((c) => ["MDISC_CODE", "MDISC_DESC"].includes(c.name))
);

onMounted(() => {
  getDiscData();
});

const getDiscData = async () => {
  loading.value = true;
  await api_web
    .post("disc/searchAPI", {
      searchBy: filterCol.value,
      searchValue: filter.value,
    })
    .then((response) => {
      loading.value = false;
      rows.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
      rows.value = [];
    });
};

const onClickNew = (data = []) => {
  $q.dialog({
    component: discCreate,
    componentProps: {
      dataHeader: data,
    },
  }).onOk(() => {
    getDiscData();
  });
};

const onDelete = (id) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete discount master (${id})?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .delete(`disc/${id}`)
      .then(() => {
        loading.value = false;
        getDiscData();
      })
      .catch((e) => {
        loading.value = false;
        $q.notify({
          type: "negative",
          message: e?.response?.data?.error?.[0] ?? "Failed to delete.",
        });
      });
  });
};
</script>
