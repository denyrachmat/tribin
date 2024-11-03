<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-input filled v-model="dateFrom" label="Date From" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateFrom" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col q-pl-md">
        <q-input filled v-model="dateTo" label="Date To" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateTo" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col text-right">
        <q-btn color="green" label="Submit" @click="onClickSubmit()"/>
        <q-btn flat color="orange" label="clear" @click="onClickClear()"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const dateFrom = ref("");
const dateTo = ref("");

const onClickSubmit = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this report ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {});
};

const onClickClear = () => {
  dateFrom.value = ''
  dateTo.value = ''
}
</script>
