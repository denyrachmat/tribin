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
        <div class="text-h6">Update Surat Jalan</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-sm">
        <div class="row q-pb-md">
          <div class="col">
            <q-option-group
              :options="options"
              type="radio"
              v-model="dataSJ.TDLVSJDETA_TYPE"
              @update:model-value="(value) => onSelectGroup(value)"
            />
          </div>
          <div class="col text-right">

            <q-btn
              color="indigo"
              label="Choose Bank Account"
              @click="onClickChooseBankAcc"
              :loading="loading"
            >
              <q-badge color="red" floating>{{
                dataSJ.payment.length
              }}</q-badge>
            </q-btn>

            <!-- <q-btn
              color="blue"
              label="Assign Conditions"
              @click="onClickConditions"
              :loading="loading"
            >
            </q-btn> -->

            <q-btn
              icon="visibility"
              color="indigo"
              flat
              @click="onClickViewListConditions"
              :loading="loading"
            >
              <q-tooltip>View Conditions</q-tooltip>
              <q-badge color="red" floating>{{
                dataSJ.condition.length
              }}</q-badge>
            </q-btn>
          </div>
        </div>

        <!-- <q-separator />
        <div class="row q-pt-md">
          <div class="col">
            <q-checkbox v-model="dataSJ.TDLVSJDETA_ISSPLITSJ" label="Split SJ ?" :true-value="1" :false-value="0"/>
          </div>
        </div> -->

        <!-- <div class="row q-pt-md">
          <div class="col">
            <q-input
              filled
              v-model="dataSJ.TDLVSJDETA_STARTDT"
              label="Jam Masuk"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dataSJ.TDLVSJDETA_STARTDT"
                      mask="YYYY-MM-DD HH:mm"
                      :options="optionsFn"
                    >
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="dataSJ.TDLVSJDETA_STARTDT"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col q-pl-md">
            <q-input
              filled
              v-model="dataSJ.TDLVSJDETA_ENDDT"
              label="Jam Keluar"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dataSJ.TDLVSJDETA_ENDDT"
                      mask="YYYY-MM-DD HH:mm"
                      :options="optionsFn"
                    >
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="dataSJ.TDLVSJDETA_ENDDT"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div> -->
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="stateSubmit()"
          :loading="loading"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar, useDialogPluginComponent, date } from "quasar";

import assignConditionsView from "pages/master/conditions/assignConditionsView.vue";
import viewAssignedCond from "pages/master/conditions/viewAssignedCond.vue";
import invoiceBankChoose from "./invoiceBankChoose.vue";

const $q = useQuasar();

const props = defineProps({
  idDlv: String,
  dataSJDB: Array,
  payment: Array,
  condition: Array
});

onMounted(() => {
  dataSJ.value.TDLVSJDETA_DLVCD = props.idDlv
  getDataCondition()

  if (props.dataSJDB) {
    dataSJ.value = props.dataSJDB;
    dataSJ.value.payment = props.payment
    dataSJ.value.condition = props.condition
    dataSJ.value.TDLVSJDETA_ISSPLITSJ = parseInt(props.dataSJDB.TDLVSJDETA_ISSPLITSJ)
  }
});

const options = ref([
  { label: "General", value: "general" },
  { label: "Forklift", value: "forklift" },
  { label: "Genset", value: "genset" },
]);

const dataSJ = ref({
  TDLVSJDETA_DLVCD: "",
  TDLVSJDETA_TYPE: "",
  TDLVSJDETA_CONDGRP: "",
  TDLVSJDETA_STARTDT: "",
  TDLVSJDETA_ENDDT: "",
  TDLVSJDETA_ISSPLITSJ: 0,
  condition: [],
  payment: []
});
const groupCond = ref([]);
const loading = ref(false);

const stateSubmit = () => {
  console.log(dataSJ.value)
  return !dataSJ.value.TDLVSJDETA_DLVCD ||
  !dataSJ.value.TDLVSJDETA_TYPE ||
  !dataSJ.value.TDLVSJDETA_CONDGRP ? true : false;
};

const onClickConditions = () => {
  $q.dialog({
    component: assignConditionsView,
    componentProps: {
      typeGroup: 'inv'
    },
    // persistent: true,
  }).onOk(async (val) => {
    dataSJ.value.TDLVSJDETA_CONDGRP = val.MCONDITION_RPT_STAT;
    dataSJ.value.condition = val.group;
  });
};

const onClickViewListConditions = () => {
  $q.dialog({
    component: viewAssignedCond,
    componentProps: {
      listCond: dataSJ.value.condition,
      typeGroup: 'inv'
    },
    // persistent: true,
  }).onOk(async (val) => {});
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save all this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("invoice", dataSJ.value)
      .then((response) => {
        onDialogOK(dataSJ.value);
        loading.value = false;
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const optionsFn = (dates) => {
  return dates >= date.formatDate(new Date(), "YYYY/MM/DD");
};

const onClickChooseBankAcc = () => {
  $q.dialog({
    component: invoiceBankChoose,
    componentProps: {
      payment: dataSJ.value.payment,
    },
    // persistent: true,
  }).onOk(async (val) => {
    console.log(val)
    let payment = []
    val.map(valMap => {
      payment.push({
        TDLVPAYDETA_DLVCD: dataSJ.value.TDLVSJDETA_DLVCD,
        TDLVPAYDETA_IDPAY: valMap.id,
      })
    })

    dataSJ.value.payment = payment;
  });
};

const getDataCondition = async () => {
  loading.value = true
  const data = await api.get(`/master/conditions/getdataGroup/inv`).then((response) => {
    loading.value = false
    console.log(response);
    options.value = [];
    response.data.data.map(val => {
      let wordSplit = val.MCONDITION_RPT_STAT.split(" - ");
      options.value.push({ label: wordSplit[1], value: val.MCONDITION_RPT_STAT, data: val })
    })
  }).catch((e) => {
    loading.value = false
  });
};

const onSelectGroup = (val) => {
  let getDataIDX = options.value.findIndex(el => el.value === val)

  dataSJ.value.condition = options.value[getDataIDX].data.group
  dataSJ.value.TDLVSJDETA_CONDGRP = options.value[getDataIDX].value
  console.log(getDataIDX)
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
