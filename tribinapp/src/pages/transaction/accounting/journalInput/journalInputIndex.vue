<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Journal Input</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="primary" @click="onAddJournal()"></q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Journal History"
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
                  :color="'orange'"
                  icon="edit"
                  @click="onAddJournal(props.row)"
                  dense
                >
                  <q-tooltip>Journal Edit</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'red'"
                  icon="delete"
                  @click="onDeleteJournal(props.row.GLHIST_DOC)"
                  dense
                >
                  <q-tooltip>Journal Delete</q-tooltip>
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

import journalInputCreate from "./journalInputCreate.vue"

const $q = useQuasar();

const filterCol = ref("GLHIST_DOC");
const filter = ref("");
const rows = ref([]);
const columns = ref([
  {
    name: "GLHIST_DOC",
    label: "Journal Doc",
    field: "GLHIST_DOC",
    sortable: true,
    align: "left",
  },
  {
    name: "GLHIST_CURR",
    label: "Valuta",
    field: "GLHIST_CURR",
    sortable: true,
    align: "left",
  },
  {
    name: "GLHIST_AMT_DB",
    label: "Debit",
    field: "GLHIST_AMT_DB",
    sortable: true,
    format: (row) => row.toLocaleString(),
    align: "left",
  },
  {
    name: "GLHIST_AMT_CR",
    label: "Credit",
    field: "GLHIST_AMT_CR",
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
    .post("acc/journal/searchAPI", {
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

const onDeleteJournal = (doc) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this journal doc ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    api_web
      .delete(`acc/journal/${btoa(doc)}`)
      .then((response) => {
        loading.value = false;
        rows.value = response.data.data;
      })
      .catch((e) => {
        loading.value = false;
      });
  })
}

const onAddJournal = (data = null) => {
  $q.dialog({
    component: journalInputCreate,
    componentProps: {
      header: data
    }
    // persistent: true,
  }).onOk(async (val) => {
    dataAcc();
  });
}

</script>
