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
        <div class="text-h6">Create Outgoing Delivery</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>
          <div class="row">
            <div class="col">
              <q-input
                label="Code"
                readonly
                dense
                filled
                v-model="TDLVORD_CUSCD"
              />
            </div>
            <div class="col q-pl-md">
              <q-input filled v-model="TDLVORD_ISSUDT" dense>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="TDLVORD_ISSUDT" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-pt-md">
            <div class="col">
              <q-input
                v-model="TDLVORDDETA_SLOCD"
                label="Sales Order"
                dense
                readonly
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="search" @click="onSearchSO" />
                </template>
              </q-input>
            </div>
            <div class="col q-pl-md">
              <q-input v-model="MCUS_CUSNM" label="Customer" dense readonly />
            </div>
          </div>

          <div class="row q-pt-md">
            <div class="col">
              <q-input v-model="TDLVORD_REMARK" label="Remarks" dense>
              </q-input>
            </div>
          </div>
        </fieldset>

        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>List Of Items</b>
          </legend>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onSubmitData()" />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

import salesOrderChoose from "./salesOrderChoose.vue";

const $q = useQuasar();

const loading = ref(false);
const TDLVORD_CUSCD = ref("");
const TDLVORD_ISSUDT = ref("");
const TDLVORDDETA_SLOCD = ref("");
const MCUS_CUSNM = ref("");
const TDLVORD_REMARK = ref("");

const onSubmitData = () => {};

const onSearchSO = () => {
  $q.dialog({
    component: salesOrderChoose,
  }).onOk(async (val) => {
    console.log(val);
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
