<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h3">
          Condition Master
        </span>
      </div>
      <div class="col text-right">
        <q-btn-group outline>
          <q-btn outline color="blue" label="Assign Condition Group"></q-btn>
          <q-btn outline color="blue" icon="description">
            <q-tooltip>New</q-tooltip>
          </q-btn>
          <q-btn outline color="blue" icon="save" @click="saveData">
            <q-tooltip>Save</q-tooltip>
            </q-btn>
          <q-btn outline color="blue" icon="send" >
            <q-tooltip>Import Data</q-tooltip>
            </q-btn>
          <q-btn outline color="red" icon="delete">
            <q-tooltip>Delete</q-tooltip>
            </q-btn>
        </q-btn-group>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-input label="Condition Code" dense outlined>
          <template v-slot:after>
          <q-btn dense icon="search" color="blue" flat @click="onOpenCondition"/>
        </template>
        </q-input>
      </div>
      <div class="col q-pl-md">
        <q-input label="Condition Name" dense outlined></q-input>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'

  import chooseConditions from './chooseConditions.vue';

  const $q = useQuasar()

  const saveData = () => {
    $q.dialog({
      title: "Confirmation",
      message: `Do you want to save this data ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {})
  }

  const onOpenCondition = () => {
    $q.dialog({
      component: chooseConditions,
      // componentProps: {
      //   datas: data.data,
      // },
      // persistent: true,
    });
  }
</script>
