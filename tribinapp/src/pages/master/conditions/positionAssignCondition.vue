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
        <div class="text-h6">Position Assign</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <span class="text-h5">{{ props.groups }}</span>
        <q-list bordered>
          <q-item
            v-for="(cond, idx) in listCondSaved"
            :key="cond.id"
            class="q-my-sm"
            clickable
            v-ripple
            dense
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ idx + 1 }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ cond.MCONDITION_DESCRIPTION }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                icon="arrow_upward"
                color="green"
                flat
                :disable="idx === 0"
                @click="onClickPromote(idx)"
              >
                <q-tooltip>Promote Positions</q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="arrow_downward"
                color="green"
                flat
                :disable="idx === listCondSaved.length - 1"
                @click="onClickDemote(idx)"
              >
                <q-tooltip>Demote Positions</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="loading"
          :loading="loading"
        />
        <q-btn
          flat
          label="Cancel"
          color="red"
          @click="onDialogCancel"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent, QSpinnerFacebook } from "quasar";
import { api, api_web } from "boot/axios";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  groups: String,
  listCond: Array,
});

const listCondSaved = ref([]);

onMounted(() => {
  listCondSaved.value = props.listCond;
  listCondSaved.value = listCondSaved.value.sort((a, b) => a.MCONDITION_ORDER_NUMBER - b.MCONDITION_ORDER_NUMBER)
});

const onClickPromote = (idx) => {
  swapElements(listCondSaved.value, idx, idx - 1);
};

const onClickDemote = (idx) => {
  swapElements(listCondSaved.value, idx, idx + 1);
};

const swapElements = (array, index1, index2) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const onSubmitData = () => {
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
    const postingData = listCondSaved.value.map((valMap) => valMap.id);

    await api
      .post(`/master/conditions/assignGroup`, {
        data: postingData,
        MCONDITION_RPT_STAT: props.groups,
      })
      .then(async (response) => {
        $q.loading.hide();
        onDialogOK();
      })
      .catch((e) => {
        $q.loading.hide();
      });
  });
};
</script>
