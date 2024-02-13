<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">List Conditions</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list bordered class="rounded-borders">
          <q-table
            class="my-sticky-header-table"
            flat
            bordered
            title="Conditions"
            :rows="rows"
            :columns="columns"
            row-key="id"
            dense
            @row-click="(evt, row, index) => onClickTable(row)"
            :pagination="initialPagination"
          />
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onOKClick()" />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api } from "boot/axios";

const columns = ref([
  {
    name: "MCONDITION_DESCRIPTION",
    align: "left",
    label: "Description",
    field: "MCONDITION_DESCRIPTION",
    sortable: true,
  },
]);
const rows = ref([]);
const initialPagination = ref({
  sortBy: "desc",
  descending: false,
  rowsPerPage: 0,
  // rowsNumber: xx if getting data from a server
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

onMounted(() => {
  getData();
});

const getData = async () => {
  const data = await api.get("/master/conditions/getdata").then((response) => {
    console.log(response);
    rows.value = response.data;
  });
};

const onClickTable = (val) => {
  console.log(val);
  onDialogOK(val);
};

const onOKClick = () => {};
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 50vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
