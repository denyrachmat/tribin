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
        <div class="text-h6">Assign Condition Group</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input
              label="Group Name"
              outlined
              dense
              v-model="groupName"
              :disable="mode === 'edit'"
            >
              <template v-slot:after>
                <q-btn
                  dense
                  icon="search"
                  color="blue"
                  flat
                  @click="onOpenCondition"
                />
              </template>
            </q-input>
          </div>
          <div class="col text-right">
            <q-btn-group outline>
              <q-btn outline color="blue" icon="description" @click="newData">
                <q-tooltip>New</q-tooltip>
              </q-btn>
              <q-btn outline color="red" icon="delete" @click="deleteData">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title="Conditions"
              :rows="rows"
              :columns="columns"
              row-key="id"
              dense
              :pagination="initialPagination"
              selection="multiple"
              v-model:selected="selected"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onOKClick()"
          :disable="selected.length === 0 || !groupName"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api } from "boot/axios";

import assignConditionsView from "./assignConditionsView.vue";

const columns = ref([
  {
    name: "id",
    align: "left",
    label: "ID",
    field: "id",
    sortable: true,
  },
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
const selected = ref([]);
const groupName = ref("");
const mode = ref("new");

const $q = useQuasar();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

onMounted(() => {
  getData();
});

const newData = () => {
  selected.value = []
  groupName.value = ''
  mode.value = 'new'
}

const deleteData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this group ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await api.delete(`/master/conditions/deleteDataGroup/${btoa(groupName.value)}`).then((response) => {
      newData()
    });
  })
}

const getData = async () => {
  await api.get("/master/conditions/getdata").then((response) => {
    console.log(response);
    rows.value = response.data;
  });
};

const onOpenCondition = () => {
  $q.dialog({
    component: assignConditionsView,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    groupName.value = val.MCONDITION_RPT_STAT
    selected.value = val.group;
    mode.value = "edit";
  });
};

const onOKClick = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save this group ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await api
      .post(`/master/conditions/assignGroup`, {
        data: selected.value,
        MCONDITION_RPT_STAT: groupName.value,
      })
      .then((response) => {
        newData()
      });
  });
};
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
