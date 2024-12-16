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
        <div class="text-h6">Please Confirm Transfer Qty</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-list
              bordered
              separator
              v-if="dataTRF && dataTRF.ITMCD && dataTRF.ITMCD.length > 0"
            >
              <q-item
                clickable
                v-ripple
                v-for="(itm, idx) in dataTRF.ITMCD"
                :key="idx"
              >
                <q-item-section>
                  <q-item-label>{{ itm.MITM_ITMNM }}</q-item-label>
                  <q-item-label caption>{{ itm.MITM_ITMNMREAL }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ itm.STOCK }}</q-item-label>
                  <q-item-label caption>Stock</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input type="number" dense filled v-model="itm.QTY"/>
                  </q-item-label>
                  <q-item-label caption>Transfer Qty</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="OK" color="primary" :loading="loading" @click="onSavedata()" :disable="dataTRF.ITMCD.filter(fil => fil.QTY === 0).length > 0"/>
        <q-btn flat label="Cancel" color="red" :loading="loading" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { ref, onMounted } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  datas: Array,
});

const dataTRF = ref([]);
const loading = ref(false)

onMounted(() => {
  if (props.datas) {
    dataTRF.value = props.datas;
    dataTRF.value.ITMCD.map(valITM => {
      valITM.QTY = 0
    })

  }
});

const onSavedata = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to transfer from ${
      dataTRF.value.TRFTYPE == "loc"
        ? dataTRF.value.LOCFROM
        : dataTRF.value.CGFROM
    } to ${
      dataTRF.value.TRFTYPE == "loc" ? dataTRF.value.LOCTO : dataTRF.value.CGTO
    } ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`inventory/transferLoc`, {
        ...dataTRF.value,
      })
      .then((response) => {
        loading.value = false;

        $q.notify({
          color: "green",
          message: `${response.data.msg}`,
        });

        onDialogOK();
      })
      .catch((err) => {
        loading.value = false;
      });
  });
};
</script>
