<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Company Information</span>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="company" label="Company Profile" icon="apartment" />
          <q-tab name="payment" label="Payment Acc" icon="payments" />
          <q-tab
            name="acc"
            label="Accounting Setup"
            icon="account_balance_wallet"
          />
          <q-tab
            name="gencode"
            label="Generate Code"
            icon="format_list_numbered"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="company">
            <companyProfilePanel />
          </q-tab-panel>

          <q-tab-panel name="payment">
            <paymentAccPanel />
          </q-tab-panel>

          <q-tab-panel name="acc">
            <accIFSetupPanel />
          </q-tab-panel>

          <q-tab-panel name="gencode">
            <gencodeSetup />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent, date } from "quasar";
import { api, api_web } from "boot/axios";

import companyProfilePanel from "./companyProfilePanel.vue";
import paymentAccPanel from "./paymentAccPanel.vue";
import accIFSetupPanel from "./accIFSetupPanel.vue";
import gencodeSetup from "./gencodeSetup.vue";

const $q = useQuasar();

const tab = ref("company");
</script>
