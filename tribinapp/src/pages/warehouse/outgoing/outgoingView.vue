<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Outgoing</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew">
          <q-tooltip>Create New Delivery</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Outgoing List"
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
                  color="orange"
                  icon="edit"
                  @click="onEdit()"
                  dense
                >
                  <q-tooltip>Edit Data</q-tooltip>
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

const $q = useQuasar()

const rows = ref([]);
const columns = ref([
  {
    name: "TDLVORD_DLVCD",
    label: "Delivery ID",
    field: "TDLVORD_DLVCD",
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
    name: "TDLVORD_ISSUDT",
    label: "Issue Date",
    field: "TDLVORD_ISSUDT",
    sortable: true,
    align: "left",
  },
  {
    name: "TDLVORD_REMARK",
    label: "Remark",
    field: "TDLVORD_REMARK",
    sortable: true,
    align: "left",
  },
]);
const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getOutgoingData()
})

const getOutgoingData = async () => {
    loading.value = true;
  await api_web
    .post(`delivery/searchAPI`, {
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
}

const onClickNew = () => {
    
}
</script>
