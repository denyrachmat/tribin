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
                  <q-item-label>{{ itm.STOCK_BC }}</q-item-label>
                  <q-item-label caption>Barcoded</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ itm.STOCK_NOBC }}</q-item-label>
                  <q-item-label caption>Unbarcoded</q-item-label>
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

      <!-- Cross-company transfers move barcoded stock only. Shown BEFORE saving
           so the operator sees why an item cannot move. -->
      <q-card-section class="q-pa-sm" v-if="blocked.length > 0">
        <q-banner rounded class="bg-red-1 text-red-9">
          <template v-slot:avatar>
            <q-icon name="error" color="negative" />
          </template>
          <div class="text-weight-medium">
            Cannot transfer — barcoded stock required
          </div>
          <div v-for="(b, i) in blocked" :key="'b' + i" class="q-mt-xs">
            {{ b.item_code }}: {{ b.reason }}
            <span v-if="b.unbarcoded !== undefined">
              (unbarcoded {{ b.unbarcoded }}<span v-if="b.barcoded !== undefined">, barcoded {{ b.barcoded }}</span>,
              requested {{ b.requested }})
            </span>
          </div>
        </q-banner>
      </q-card-section>

      <!-- The destination company already knows these barcodes. Confirm to
           proceed; the receiving stock is then registered under a NEW barcode. -->
      <q-card-section class="q-pa-sm" v-if="conflicts.length > 0">
        <q-banner rounded class="bg-orange-1 text-orange-10">
          <template v-slot:avatar>
            <q-icon name="warning" color="warning" />
          </template>
          <div class="text-weight-medium">
            Barcode already exists in the destination company
          </div>
          <div v-for="(c, i) in conflicts" :key="'c' + i" class="q-mt-xs">
            <div><b>{{ c.barcode }}</b> — from {{ c.item_code }}</div>
            <div v-for="(e, j) in c.existing" :key="'e' + i + j" class="q-pl-md">
              already on item {{ e.item_code }}<span v-if="e.item_name"> ({{ e.item_name }})</span>,
              qty {{ e.qty }}<span v-if="e.docno">, doc {{ e.docno }}</span>
            </div>
          </div>
          <div class="q-mt-sm">
            Choose <b>Yes</b> to continue. The transferred stock will be saved under
            a <b>new barcode</b> in the destination company.
          </div>
        </q-banner>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="needsConfirm"
          label="Yes, continue"
          color="primary"
          :loading="loading"
          :disable="blocked.length > 0 || anyQtyZero"
          @click="onSavedata(true)"
        />
        <q-btn
          v-else
          label="OK"
          color="primary"
          :loading="loading"
          :disable="blocked.length > 0 || anyQtyZero"
          @click="onSavedata(false)"
        />
        <q-btn flat label="Cancel" color="red" :loading="loading" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  datas: Array,
});

const dataTRF = ref([]);
const loading = ref(false);
const conflicts = ref([]);
const blocked = ref([]);
const confirmed = ref(false);

// Only a real cross-company move needs the barcode check / new-barcode flow.
const isCgTransfer = computed(
  () =>
    dataTRF.value.TRFTYPE === "cg" &&
    !!dataTRF.value.CGTO &&
    dataTRF.value.CGTO !== dataTRF.value.CGFROM
);

const needsConfirm = computed(
  () => isCgTransfer.value && conflicts.value.length > 0 && !confirmed.value
);

const anyQtyZero = computed(
  () =>
    !dataTRF.value.ITMCD ||
    dataTRF.value.ITMCD.filter((f) => !f.QTY || Number(f.QTY) === 0).length > 0
);

const buildConflictRows = (raw) => {
  const out = [];
  Object.keys(raw || {}).forEach((bc) => {
    const info = raw[bc];
    out.push({
      barcode: bc,
      item_code: info.item_code,
      existing: info.existing || [],
    });
  });
  return out;
};

onMounted(async () => {
  if (props.datas) {
    dataTRF.value = props.datas;
    dataTRF.value.ITMCD.map((valITM) => {
      valITM.QTY = 0;
    });

    if (isCgTransfer.value) {
      await checkBarcodes();
    }
  }
});

// The barcode warning depends on the requested quantity (an item can be short of
// barcoded stock for the qty typed), so re-check as the operator edits quantities
// instead of only when the dialog opens. Debounced: a burst of keystrokes triggers
// one request.
let recheckTimer = null;
watch(
  () => (dataTRF.value.ITMCD || []).map((i) => i.QTY).join(","),
  () => {
    if (!isCgTransfer.value) return;
    clearTimeout(recheckTimer);
    recheckTimer = setTimeout(() => checkBarcodes(), 500);
  }
);

// Dry run: which barcodes already live in the destination company, and which
// items have no barcoded stock to move.
const checkBarcodes = async () => {
  loading.value = true;
  await api_web
    .post(`inventory/previewTransferBarcodes`, {
      CGFROM: dataTRF.value.CGFROM,
      CGTO: dataTRF.value.CGTO,
      ITMCD: dataTRF.value.ITMCD,
    })
    .then((response) => {
      loading.value = false;
      conflicts.value = buildConflictRows(response.data.conflicts);
      blocked.value = response.data.blocked || [];
    })
    .catch((err) => {
      loading.value = false;
      $q.notify({
        color: "red",
        message:
          err?.response?.data?.error ||
          "Could not check barcodes in the destination company.",
      });
    });
};

const onSavedata = (withConfirm) => {
  const proceed = async () => {
    loading.value = true;
    await api_web
      .post(`inventory/transferLoc`, {
        ...dataTRF.value,
        CONFIRM_NEW_BC: withConfirm ? 1 : 0,
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
        // A 409 means the destination knows these barcodes; surface it here so
        // the operator can confirm without redoing the form.
        const data = err?.response?.data;
        if (err?.response?.status === 409 && data?.need_confirm) {
          conflicts.value = buildConflictRows(data.conflicts);
          confirmed.value = false;
          $q.notify({
            color: "orange",
            message: "Barcode already exists in the destination company.",
          });
          return;
        }
        if (data?.blocked) {
          blocked.value = data.blocked;
        }
        $q.notify({
          color: "red",
          message: data?.error || "Transfer failed.",
        });
      });
  };

  if (!withConfirm) {
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
    }).onOk(proceed);
    return;
  }

  confirmed.value = true;
  proceed();
};
</script>
