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
        <div class="text-h6">Item Check {{ val }}</div>
      </q-card-section>

      <q-card-section>
        <div
          :class="`row ${idx > 0 ? 'q-pt-md' : ''}`"
          v-for="(row, idx) in rows"
          :key="idx"
        >
          <div class="col">
            <q-input
              filled
              dense
              label="Item Request"
              v-model="row.MITM_ITMNMREAL"
              readonly
            />
          </div>
          <div class="col q-pl-md">
            <q-input
              filled
              dense
              label="Qty"
              v-model="row.TDLVORDDETA_ITMQT"
              readonly
            />
          </div>
          <div class="col q-pl-md">
            <q-select
              dense
              filled
              label="Item Name"
              v-model="row.TDLVORDDETA_ITMCD_ACT"
              use-input
              input-debounce="500"
              :options="listItems"
              @filter="
                (val, update, abort) =>
                  filterFn(val ? val : row.MITM_ITMNMREAL, update, abort, 'item')
              "
              behavior="dialog"
              option-label="MITM_ITMNM"
              option-value="MITM_ITMCD"
              emit-value
              map-options
              :loading="loading"
            >
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :loading="loading"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  idHead: String,
  dataHeader: Array,
});

const rows = ref([]);
const listItems = ref([]);
const loading = ref(false);

onMounted(() => {
  rows.value = props.dataHeader.dlvdet;

  getItem();
});

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPITBL", {
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "item") {
      await getItem(val);
    }
  });
};

const onSubmitData = () => {
  const notFillItm = rows.value.filter((fil) => !fil.TDLVORDDETA_ITMCD_ACT);
  if (notFillItm.length > 0) {
    notFillItm.map((valMap) => {
      $q.notify({
        color: "negative",
        message: `item ${valMap.MITM_ITMNMREAL} item actual not filled yet, please add it first !!`,
      });
    });
  } else {
    $q.dialog({
      title: "Confirmation",
      message: `Are you sure want to save this outgoing ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      loading.value = true;
      await api_web
        .post("delivery/confirm", {
          id: props.idHead,
          data: rows.value,
        })
        .then((response) => {
          loading.value = false;
          listItems.value = response.data.data;
        })
        .catch(() => {
          loading.value = false;
        });
    });
  }
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
