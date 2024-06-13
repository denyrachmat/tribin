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
        <div class="text-h6">Create Incoming</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <q-inner-loading :showing="loading" dark>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <div class="row">
            <div class="col">
              <q-input
                label="Code"
                readonly
                dense
                filled
                v-model="header.TRCV_RCVCD"
              />
            </div>
            <div class="col">
              <q-input
                label="Code"
                readonly
                dense
                filled
                v-model="header.TRCV_RCVCD"
              />
            </div>
          </div>
        </fieldset>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  dataHeader: Array,
});

const header = ref({
  TRCV_RCVCD: '',
  TRCV_SUPCD: '',
  TRCV_ISSUDT: '',
})

const loading = ref(false)
</script>
