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
        <div class="text-h6">Review Item List</div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="height: 70vh; overflow: auto">
        <q-list dark bordered separator v-if="props.typeCD === 'quotation'">
          <q-item clickable v-ripple v-for="(hasil, idx) in dataHasil.dataItem" :key="idx">
            <q-item-section>
              <q-item-label>{{ hasil.MITM_ITMNM }}</q-item-label>
              <q-item-label caption>Item Name</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          label="OK"
          color="primary"
          @click="onDialogOK()"
          :disable="stateSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { date, useDialogPluginComponent, useQuasar } from "quasar";
import { api_web } from "boot/axios";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  cd: String,
  typeCD: String,
});

const loading = ref(false);
const dataHasil = ref([]);

onMounted(() => {
  getData();
});

const getData = async () => {
  await api_web
    .get(`${props.typeCD}/${btoa(props.cd)}`)
    .then((response) => {
      loading.value = false;
      dataHasil.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};
</script>
