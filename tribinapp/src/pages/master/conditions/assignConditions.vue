<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <div class="text-h6">Assign Condition Group</div>
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col">
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
              <q-btn
                outline
                color="blue"
                icon="save"
                @click="onOKClick"
                :disable="!groupName || selected.length === 0"
              >
                <q-tooltip>Save Conditions</q-tooltip>
              </q-btn>
              <q-btn
                outline
                color="red"
                icon="delete"
                @click="deleteData"
                :disable="!groupName"
              >
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col" style="max-height: 80vh; overflow: auto">
            <q-list bordered>
              <q-item
                class="q-my-sm"
                clickable
                v-ripple
                tag="label"
                v-if="rows.length === 0"
              >
                <q-item-section v-if="loading">
                  Data is loading, please wait.
                </q-item-section>
                <q-item-section v-else> No Data Available ! </q-item-section>
              </q-item>
              <q-item
                v-for="(cond, idx) in rows"
                :key="idx"
                class="q-my-sm"
                clickable
                v-ripple
                tag="label"
                v-else
              >
                <!-- <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ contact.letter }}
                  </q-avatar>
                </q-item-section> -->
                <q-item-section side top>
                  <q-checkbox v-model="selected" :val="cond.id" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ cond.MCONDITION_DESCRIPTION }}</q-item-label>
                  <q-item-label caption lines="1">Description</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn
                    name="delete"
                    color="red"
                    flat
                    @click="onDeleteCondition(idx)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent, QSpinnerFacebook } from "quasar";
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
const loading = ref(false);

const $q = useQuasar();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

onMounted(() => {
  getData();
});

const newData = () => {
  selected.value = [];
  groupName.value = "";
  mode.value = "new";
};

const deleteData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this group ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Save your information, Hang on...",
      messageColor: "black",
    });
    await api
      .delete(`/master/conditions/deleteDataGroup/${btoa(groupName.value)}`)
      .then((response) => {
        $q.loading.hide()
        newData();
      });
  });
};

const getData = async () => {
  loading.value = true;
  await api
    .get("/master/conditions/getdata")
    .then((response) => {
      console.log(response);
      loading.value = false;
      rows.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
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
    groupName.value = val.MCONDITION_RPT_STAT;
    selected.value = val.group.map((valmap) => valmap.id);
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
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Save your information, Hang on...",
      messageColor: "black",
    });
    await api
      .post(`/master/conditions/assignGroup`, {
        data: selected.value,
        MCONDITION_RPT_STAT: groupName.value,
      })
      .then((response) => {
        $q.loading.hide()
        newData();
      }).catch((e) => {
        $q.loading.hide()
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
