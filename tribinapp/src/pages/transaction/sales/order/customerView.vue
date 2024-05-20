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
        <div class="text-h6">Customer Detail</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input label="Customer Code" readonly v-model="custDataPrep.TSLO_CUSCD" dense/>
          </div>
          <div class="col q-pl-md">
            <q-input label="Customer Name" readonly v-model="custDataPrep.MCUS_CUSNM" dense/>
          </div>
          <div class="col q-pl-md">
            <q-input label="Attn." v-model="custDataPrep.TSLO_ATTN" dense/>
          </div>
        </div>

        <div class="row q-pt-md">
          <div class="col">
            <q-input label="Destination Name" v-model="custDataPrep.TSLO_ADDRESS_NAME" dense/>
          </div>
        </div>

        <div class="row q-pt-md">
          <div class="col">
            <q-input label="Destination Address" v-model="custDataPrep.TSLO_ADDRESS_DESCRIPTION" dense/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="stateSubmit"
          :loading="loading"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent, date } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  custData: Array,
});

onMounted(() => {
  custDataPrep.value = props.custData
})

const custDataPrep = ref({
  TSLO_CUSCD: '',
  MCUS_CUSNM: '',
  TSLO_ATTN: '',
  TSLO_ADDRESS_NAME: '',
  TSLO_ADDRESS_DESCRIPTION: '',
})

const onSubmitData = () => {
  onDialogOK(custDataPrep.value)
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>

