<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4"> Condition Master </span>
      </div>
      <div class="col text-right">
        <q-btn-group outline>
          <q-btn
            outline
            color="blue"
            label="Assign Condition Group"
            @click="onOpenAssignGroup"
          ></q-btn>
          <q-btn outline color="blue" icon="description" @click="newData">
            <q-tooltip>New</q-tooltip>
          </q-btn>
          <q-btn outline color="blue" icon="save" @click="saveData">
            <q-tooltip>Save</q-tooltip>
          </q-btn>
          <q-btn outline color="blue" icon="send">
            <q-tooltip>Import Data</q-tooltip>
          </q-btn>
          <q-btn
            outline
            color="red"
            icon="delete"
            :disable="!id"
            @click="onDeleteCondition"
          >
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-input label="Condition Code" dense outlined v-model="id" disable>
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
      <div class="col q-pl-md">
        <q-input
          label="Condition Name"
          dense
          outlined
          v-model="MCONDITION_DESCRIPTION"
          type="textarea"
        ></q-input>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import chooseConditions from "./chooseConditions.vue";
import assignConditions from "./assignConditions.vue";

const $q = useQuasar();

const id = ref("");
const MCONDITION_DESCRIPTION = ref("");

const saveData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    if (id.value) {
      await api_web
        .put(`condition/${btoa(id.value)}`, {
          MCONDITION_DESCRIPTION: MCONDITION_DESCRIPTION.value,
          MCONDITION_ORDER_NUMBER: null,
        })
        .then((response) => {
          newData();
        });
    } else {
      await api_web
        .post("condition", {
          MCONDITION_DESCRIPTION: MCONDITION_DESCRIPTION.value,
          MCONDITION_ORDER_NUMBER: null,
        })
        .then((response) => {
          newData();
        });
    }
  });
};

const newData = () => {
  id.value = "";
  MCONDITION_DESCRIPTION.value = "";
};

const onOpenCondition = () => {
  $q.dialog({
    component: chooseConditions,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    id.value = val.id;
    MCONDITION_DESCRIPTION.value = val.MCONDITION_DESCRIPTION;
  });
};

const onDeleteCondition = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await api_web
      .delete(`condition/${btoa(id.value)}`)
      .then((response) => {
        newData();
      });
  });
};

const onOpenAssignGroup = () => {
  $q.dialog({
    component: assignConditions,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    console.log(val);
  });
};
</script>
