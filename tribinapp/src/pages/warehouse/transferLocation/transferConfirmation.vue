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
        <div class="row items-center q-col-gutter-md">
          <div class="col text-h6">Please Confirm Transfer Qty</div>
          <div class="col-auto">
            <q-input
              ref="scanRef"
              dense
              outlined
              clearable
              v-model="scanValue"
              label="Scan / type barcode"
              hint="Scanned barcode is selected on its item"
              @keyup.enter="onScanBarcode"
            >
              <template v-slot:append>
                <q-btn flat dense icon="search" @click="onScanBarcode" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-list
              bordered
              separator
              v-if="dataTRF && dataTRF.ITMCD && dataTRF.ITMCD.length > 0"
            >
              <template v-for="(itm, idx) in dataTRF.ITMCD" :key="idx">
              <q-item>
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
                    <q-input
                      type="number"
                      dense
                      filled
                      :disable="isBarcodeDriven(itm)"
                      :model-value="qtyDisplay(itm)"
                      @update:model-value="(v) => onQtyInput(itm, v)"
                    />
                  </q-item-label>
                  <q-item-label caption>
                    {{ isBarcodeDriven(itm) ? 'Transfer Qty (sum of barcodes)' : 'Transfer Qty' }}
                  </q-item-label>
                </q-item-section>

                <!-- Stock moves barcode by barcode: the total above is the sum of
                     the quantities entered against each barcode below. -->
                <q-item-section side v-if="isCgTransfer && (itm.BARCODES || []).length > 0">
                  <q-btn
                    flat
                    dense
                    no-caps
                    :label="`${(itm.BARCODES || []).filter(b => Number(b.qty) > 0).length}/${itm.BARCODES.length} barcode(s)`"
                    @click="toggleBarcodes(idx)"
                  />
                </q-item-section>
              </q-item>

              <!-- Barcode detail lives under its own item, so a scanned or edited
                   row is never confused with another item's barcodes. -->
              <q-item
                v-show="openBarcodes[idx] && (itm.BARCODES || []).length > 0"
                class="bg-grey-2"
              >
                <q-item-section>
                  <div class="full-width">
                    <div class="text-caption text-grey-7 q-mb-xs">
                      Barcodes for <b>{{ itm.MITM_ITMNM }}</b> — enter the quantity to
                      move from each barcode.
                    </div>
                    <div
                      v-for="(b, bi) in itm.BARCODES"
                      :key="b.barcode"
                      class="row items-center q-col-gutter-sm q-mb-xs"
                      :class="b.barcode === highlighted.barcode ? 'bg-yellow-2' : ''"
                    >
                      <div class="col">
                        <span :class="Number(b.remaining) <= 0 ? 'text-grey-6' : ''">
                          {{ b.barcode }}
                        </span>
                        <span v-if="Number(b.remaining) <= 0" class="text-caption text-grey-6">
                          — nothing left to move
                        </span>
                      </div>
                      <div class="col-3">
                        <q-input
                          type="number"
                          dense
                          filled
                          v-model="b.qty"
                          :disable="Number(b.remaining) <= 0"
                          :hint="`has ${b.remaining}`"
                          :rules="[val => Number(val) >= 0 || 'Must be 0 or more']"
                        />
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              </template>
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
          :disable="!canSubmit"
          @click="onSavedata(true)"
        />
        <q-btn
          v-else
          label="OK"
          color="primary"
          :loading="loading"
          :disable="!canSubmit"
          @click="onSavedata(false)"
        />
        <q-btn flat label="Cancel" color="red" :loading="loading" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { ref, onMounted, computed, watch, nextTick } from "vue";
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
const openBarcodes = ref({});
const scanValue = ref("");
const scanRef = ref(null);
const highlighted = ref({ barcode: null, at: 0 });

const toggleBarcodes = (idx) => {
  openBarcodes.value = { ...openBarcodes.value, [idx]: !openBarcodes.value[idx] };
};

// A cross-CG move is driven entirely by the per-barcode quantities, so its
// Transfer Qty is a read-only total. A same-CG (loc) move has no barcode rows to
// enter against, so there the field stays editable as it always was.
const isBarcodeDriven = (itm) =>
  isCgTransfer.value && (itm.BARCODES || []).length > 0;

const barcodeTotal = (itm) =>
  (itm.BARCODES || []).reduce((sum, b) => sum + (Number(b.qty) || 0), 0);

const qtyDisplay = (itm) =>
  isBarcodeDriven(itm) ? barcodeTotal(itm) : itm.QTY;

// A same-CG (loc) move still takes its quantity from this field directly.
const onQtyInput = (itm, val) => {
  if (!isBarcodeDriven(itm)) itm.QTY = val;
};

// Keep the item's QTY, which the transfer request sends, equal to what the barcode
// rows add up to - the two must never disagree.
watch(
  () => (dataTRF.value.ITMCD || []).map((i) => (i.BARCODES || []).map((b) => b.qty).join("|")).join(","),
  () => {
    (dataTRF.value.ITMCD || []).forEach((itm) => {
      if (isBarcodeDriven(itm)) itm.QTY = barcodeTotal(itm);
    });
  }
);

// A barcode scanner types the code and sends Enter. Match it against the item
// list on screen (the operator picked those items) and fill that row's quantity
// with what is available. Anything not found is reported by name so the operator
// knows it belongs to another item rather than silently doing nothing.
const onScanBarcode = () => {
  const code = String(scanValue.value || "").trim();
  if (!code) return;

  for (const itm of dataTRF.value.ITMCD || []) {
    const rows = itm.BARCODES || [];
    const bi = rows.findIndex(
      (b) => String(b.barcode).toUpperCase() === code.toUpperCase()
    );
    if (bi === -1) continue;

    const row = rows[bi];
    if (Number(row.remaining) <= 0) {
      $q.notify({
        color: "orange",
        message: `Barcode ${row.barcode} has nothing left to move on ${itm.MITM_ITMNM}.`,
      });
      return;
    }

    row.qty = Number(row.remaining);
    // Open the owning item's list so the operator sees what was filled.
    openBarcodes.value = { ...openBarcodes.value, [dataTRF.value.ITMCD.indexOf(itm)]: true };
    highlighted.value = { barcode: row.barcode, at: Date.now() };
    scanValue.value = "";
    $q.notify({
      color: "green",
      message: `Barcode ${row.barcode} filled on ${itm.MITM_ITMNM} (qty ${row.qty}).`,
    });
    return;
  }

  $q.notify({
    color: "red",
    message: `Barcode ${code} is not on the selected item(s).`,
  });
};

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

// A cross-CG move is driven by the per-barcode quantities, so the request must
// carry at least one positive amount for every item on the list. Without this the
// dialog would submit zero-quantity transfers now that the fields start empty.
const missingQty = computed(() =>
  (dataTRF.value.ITMCD || []).filter(
    (itm) => isBarcodeDriven(itm) && barcodeTotal(itm) <= 0
  )
);

const canSubmit = computed(
  () => blocked.value.length === 0 && missingQty.value.length === 0 && !anyQtyZero.value
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

// Seed each item's barcode rows from the preview. Every quantity starts at 0: the
// operator enters what to move per barcode, and the Transfer Qty total above sums
// those entries. A quantity already entered survives a re-check.
const applyBarcodes = (items) => {
  Object.keys(items || {}).forEach((code) => {
    const itm = (dataTRF.value.ITMCD || []).find(
      (i) => (i.MITM_ITMCD || i.MITM_ITMNM) === code
    );
    if (!itm) return;
    const prev = {};
    (itm.BARCODES || []).forEach((b) => { prev[b.barcode] = b; });
    itm.BARCODES = (items[code].BARCODES || []).map((b) => ({
      barcode: b.barcode,
      remaining: b.remaining,
      // Quantities start at 0 - the operator enters what to move. A value already
      // typed survives a re-check of the destination barcodes.
      qty: prev[b.barcode] !== undefined ? prev[b.barcode].qty : 0,
    }));
  });
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
  // A scanner should be usable the moment the dialog opens, without a click.
  nextTick(() => {
    scanRef.value?.focus?.();
  });
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
      applyBarcodes(response.data.items);
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
  // Send only the barcodes the operator actually filled in: a row left at 0 is
  // stock that stays behind, and the backend treats the list as the selection.
  const items = (dataTRF.value.ITMCD || []).map((itm) => {
    if (!isCgTransfer.value || !(itm.BARCODES || []).length) return itm;
    return {
      ...itm,
      BARCODES: itm.BARCODES.filter((b) => Number(b.qty) > 0).map((b) => ({
        barcode: b.barcode,
        qty: Number(b.qty) || 0,
      })),
    };
  });

  const proceed = async () => {
    loading.value = true;
    await api_web
      .post(`inventory/transferLoc`, {
        ...dataTRF.value,
        ITMCD: items,
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
