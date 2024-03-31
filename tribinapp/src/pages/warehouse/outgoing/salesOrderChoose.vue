<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
    persistent
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">Sales Order Choose</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
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
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <!-- <q-th auto-width>Action</q-th> -->
                </q-tr>
              </template>

              <!-- For Body -->
              <template v-slot:body="props">
                <q-tr :props="props" @click="onChooseSO(props.row)">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                  <!-- <q-td auto-width>
                    <q-btn
                      flat
                      color="orange"
                      icon="edit"
                      @click="onEdit()"
                      dense
                    >
                      <q-tooltip>Edit Data</q-tooltip>
                    </q-btn>
                  </q-td> -->
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <!-- <q-btn label="OK" color="primary" @click="onSubmitData()" /> -->
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const rows = ref([]);
const columns = ref([
  {
    name: "TSLO_SLOCD",
    label: "Sales Ord Code",
    field: "TSLO_SLOCD",
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
    name: "TSLO_PLAN_DLVDT",
    label: "DLV Plan Date",
    field: "TSLO_PLAN_DLVDT",
    sortable: true,
    align: "left",
  }
]);
const loading = ref(false);
const filterCol = ref('')
const filter = ref('')

onMounted(() => {
    getSOData()
})

const getSOData = async () => {
  loading.value = true;
  await api_web
    .post(`delivery/outstanding-warehouse-api`, {
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
const onChooseSO = (row) => {
    onDialogOK(row)
}

const onSubmitData = () => {};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
