<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Outgoing Confirmation</span>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Outstanding Confirmation"
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
                  icon="check"
                  @click="onConfirm(props.row)"
                  dense
                >
                  <q-tooltip>Confirm Delivery</q-tooltip>
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
import onCheckItem from "./onCheckItem.vue";

const $q = useQuasar()

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
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getUnconfirmData()
})

const getUnconfirmData = async () => {
    loading.value = true;
  await api_web
    .post("delivery/unconfirmed", {
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

const onConfirm = (val) => {
  console.log(val)
  $q.dialog({
    component: onCheckItem,
    componentProps: {
      idHead: val.TDLVORD_DLVCD,
      dataHeader: val,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getUnconfirmData()
  });
}
</script>
