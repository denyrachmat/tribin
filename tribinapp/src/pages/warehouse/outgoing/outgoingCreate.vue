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
                v-model="TDLVORD_DLVCD"
              />
            </div>
            <div class="col q-pl-md">
              <q-input filled v-model="TDLVORD_ISSUDT" dense label="Issue Date">
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

        <fieldset
          style="
            border: 1px black solid;
            border-radius: 10px;
            height: 35vh;
            overflow: auto;
          "
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>List Of Items</b>
          </legend>

          <q-list bordered dense>
            <template v-if="listItems.length > 0">
              <q-item
                v-for="(items, idx) in listItems"
                :key="idx"
                class="q-my-sm"
                dense
                :loading="loading"
              >
                <q-item-section avatar>
                  <q-avatar text-color="blue">
                    {{ idx + 1 }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Item Code"
                      filled
                      v-model="items.TSLODETA_ITMCD"
                      readonly
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Item Name"
                      filled
                      v-model="items.MITM_ITMNM"
                      readonly
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input dense label="Qty" filled v-model="items.BALQT" />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Rp. {{ items.TSLODETA_PRC.toLocaleString() }}
                  </q-item-label>
                  <q-item-label caption>
                    Price
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="delete"
                    color="red"
                    flat
                    @click="onClickDeleteLines(idx)"
                  />
                </q-item-section>
              </q-item>
            </template>
            <q-item class="q-my-sm" clickable v-ripple v-else>
              <q-item-section>
                <q-item-label>
                  Choose sales order first to access item list
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onSubmitData()" :loading="loading"/>
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

const props = defineProps({
  dataHeader: Array,
});

onMounted(() => {
  if (Object.values(props.dataHeader).length > 0) {
    console.log(props.dataHeader)
    TDLVORD_DLVCD.value = props.dataHeader.TDLVORD_DLVCD
    TDLVORD_INVCD.value = props.dataHeader.TDLVORD_INVCD
    TDLVORD_CUSCD.value = props.dataHeader.TDLVORD_CUSCD
    TDLVORD_ISSUDT.value = props.dataHeader.TDLVORD_ISSUDT
    TDLVORDDETA_SLOCD.value = props.dataHeader.TDLVORDDETA_SLOCD
    MCUS_CUSNM.value = props.dataHeader.MCUS_CUSNM
    TDLVORD_REMARK.value = props.dataHeader.TDLVORD_REMARK
    listItems.value = props.dataHeader.listItems
  }
})

const loading = ref(false);
const TDLVORD_DLVCD = ref("");
const TDLVORD_INVCD = ref("");
const TDLVORD_CUSCD = ref("");
const TDLVORD_ISSUDT = ref("");
const TDLVORDDETA_SLOCD = ref("");
const MCUS_CUSNM = ref("");
const TDLVORD_REMARK = ref("");
const listItems = ref([]);

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure wan to save this outgoing ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`delivery`, {
        TDLVORD_DLVCD: TDLVORD_DLVCD.value,
        TDLVORD_CUSCD: TDLVORD_CUSCD.value,
        TDLVORD_ISSUDT: TDLVORD_ISSUDT.value,
        TDLVORDDETA_SLOCD: TDLVORDDETA_SLOCD.value,
        TDLVORD_REMARK: TDLVORD_REMARK.value,
        SO_DET: listItems.value,
      })
      .then((response) => {
        loading.value = false;
        onDialogOK()
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const onSearchSO = () => {
  $q.dialog({
    component: salesOrderChoose,
  }).onOk(async (val) => {
    TDLVORDDETA_SLOCD.value = val.TSLO_SLOCD;
    MCUS_CUSNM.value = val.MCUS_CUSNM;
    TDLVORD_CUSCD.value = val.TSLO_CUSCD;
    getListItemCode(val.TSLO_SLOCD);
  });
};

const getListItemCode = async (val) => {
  loading.value = true;
  await api_web
    .get(`delivery/outstanding-warehouse/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listItems.value.splice(idx, 1);
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
