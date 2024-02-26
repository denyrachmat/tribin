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
        <div class="row">
          <div class="col text-h6">View Condition</div>
          <div class="col">
            <q-btn
              label="Save Template"
              color="blue"
              @click="onSaveGroup"
            ></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-item
          clickable
          v-ripple
          v-for="(cond, idx) in props.listCond"
          :key="idx"
        >
          <q-item-section>
            <q-item-label>{{ cond.MCONDITION_DESCRIPTION }}</q-item-label>
            <q-item-label caption>Description</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onDialogOK" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const props = defineProps({
  listCond: Array,
});

const loading = ref(false)

const onSaveGroup = () => {
  $q.dialog({
    title: "Prompt",
    message: "Input group name conditions",
    prompt: {
      model: "",
      isValid: (val) => val.length > 2, // << here is the magic
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (datas) => {
    let listValue = []
    props.listCond.map(valMap => {
      listValue.push(valMap.MCONDITION_DESCRIPTION)
    })

    await api
      .post(`/master/conditions/assignGroup`, {
        data: listValue,
        MCONDITION_RPT_STAT: datas,
      })
      .then((response) => {
        console.log(response)
      });
    // console.log('>>>> OK, received', data)
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
