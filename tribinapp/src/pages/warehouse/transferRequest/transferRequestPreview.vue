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
        <div class="text-h6">Request Part</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <q-inner-loading :showing="loading" dark>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                label="Doc No"
                dense
                filled
                v-model="header.TLOCREQ_DOCNO"
                :readonly="true"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Barcode Scan"
                dense
                filled
                v-model="BC"
                ref="barcodeScanRef"
                @update:model-value="onScanBarcode"
              />
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

          <template v-if="listDet.length > 0">
            <div
              class="row q-col-gutter-md q-pt-md"
              v-for="(list, idx) in listDet"
              :key="idx"
              style="font-size: 10px"
            >
              <div class="col-12 col-sm-3">
                <q-select
                  dense
                  filled
                  label="Item Name"
                  v-model="list.TLOCREQ_ITMCD"
                  use-input
                  input-debounce="500"
                  :options="listItems"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'item')
                  "
                  behavior="dialog"
                  option-label="MITM_ITMNM"
                  option-value="MITM_ITMCD"
                  emit-value
                  map-options
                  :loading="loading"
                  :readonly="true"
                  input-style="font-size:11px"
                >
                </q-select>
              </div>

              <div class="col-12 col-sm-3">
                <q-select
                  dense
                  filled
                  label="Transfer From"
                  v-model="list.TLOCREQ_FRLOC"
                  use-input
                  input-debounce="500"
                  :options="listLoc"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'loc')
                  "
                  behavior="dialog"
                  option-label="MLOC_LOCNM"
                  option-value="MLOC_LOCCD"
                  emit-value
                  map-options
                  :loading="loading"
                  :readonly="true"
                />
              </div>
              <div class="col-12 col-sm-3">
                <q-select
                  dense
                  filled
                  label="Transfer To"
                  v-model="list.TLOCREQ_TOLOC"
                  use-input
                  input-debounce="500"
                  :options="listLoc"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'loc')
                  "
                  behavior="dialog"
                  option-label="MLOC_LOCNM"
                  option-value="MLOC_LOCCD"
                  emit-value
                  map-options
                  :loading="loading"
                  :readonly="true"
                />
              </div>

              <div class="col-12 col-sm-1">
                <q-input
                  label="Qty"
                  dense
                  filled
                  v-model="list.TLOCREQ_QTY"
                  :rules="[
                    (val) =>
                      val <= checkItemList(list.TLOCREQ_ITMCD) ||
                      `Scanned Qty only ${checkItemList(list.TLOCREQ_ITMCD)}`,
                  ]"
                  :hint="`Scanned Qty is ${checkItemList(list.TLOCREQ_ITMCD)}`"
                  :readonly="true"
                />
              </div>

              <div class="col-12 col-sm-1">
                <q-checkbox
                  v-model="list.TLOCREQ_ISREP"
                  label="Is replacement ?"
                  color="teal"
                  :true-value="1"
                  :false-value="0"
                  :disable="true"
                />
              </div>
            </div>
          </template>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="approve"
          color="primary"
          @click="onSubmitData()"
          :loading="loading"
          :disable="checkIsValidData()"
        />
        <q-btn flat label="Cancel" color="red" @click="onClickCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

import scanBarcodeStock from "./scanBarcodeStock.vue";

const $q = useQuasar();

const props = defineProps({
  dataHeader: Array,
  dataDet: Array,
  qtyOnly: Boolean,
});

const header = ref({
  TLOCREQ_DOCNO: "",
  TLOCREQ_FRLOC: "",
  TLOCREQ_TOLOC: "",
});

const BC = ref("");
const scannedBarcode = ref([]);
const barcodeScanRef = ref(null);

const listItems = ref([]);
const listLoc = ref([]);

const listDet = ref([]);
const loading = ref(false);
const addMoreItems = ref(false);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    barcodeScanRef.value?.focus();
  }, 100);

  await getLocation("");

  header.value = props.dataHeader;
  props.dataDet.map(async (val) => {
    await getItem(val.TLOCREQ_ITMCD, 1);
    listDet.value.push({
      ...val,
      // REQ_QTY: val.TLOCREQ_QTY,
      TLOCREQ_QTY: val.TLOCREQ_QTY,
      // TLOCREQ_QTY: 0,
      IS_STOCK_EX: checkItemList(val.TLOCREQ_ITMCD) >= val.TLOCREQ_QTY,
    });
  });
});

const checkIsValidData = () => {
  let nValidData = [];

  listDet.value.map((valMap) => {
    if (checkItemList(valMap.TLOCREQ_ITMCD) < valMap.TLOCREQ_QTY) {
      nValidData.push(valMap);
    }
  });

  return nValidData.length > 0;
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "loc") {
      await getLocation(val);
    }

    if (fun === "item") {
      await getItem(val);
    }
  });
};

const getLocation = async (val, cols = "MSUP_SUPNM") => {
  loading.value = true;
  await api_web
    .post(`location/searchAPI`, {
      searchBy: cols,
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listLoc.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getItem = async (val, withStock = 0) => {
  loading.value = true;
  await api_web
    .post("item/searchAPITBL", {
      searchValue: val,
      withStock: withStock,
    })
    .then((response) => {
      loading.value = false;
      // Merge response.data.data into listItems.value, avoiding duplicates by MITM_ITMCD
      const newItems = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      newItems.forEach((item) => {
        if (!listItems.value.some((i) => i.MITM_ITMCD === item.MITM_ITMCD)) {
          listItems.value.push(item);
        }
      });

      console.log(listItems.value);
    })
    .catch(() => {
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
    listDet.value.splice(idx, 1);
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to approve all this request ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    console.log(listDet.value);

    await api_web
      .post(`inventory/transferRequest`, {
        data: listDet.value.map((val) => ({
          ...val,
          listBarcode: scannedBarcode.value.filter(
            (fil) => fil.MITM_ITMCD === val.TLOCREQ_ITMCD
          ),
        })),
      })
      .then(async (response) => {
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

const checkItemList = (item) =>
  scannedBarcode.value.filter((fil) => fil.MITM_ITMCD == item)[0]?.STOCK || 0;

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const onScanBarcode = async (value) => {
  if (!value) return;

  if (scannedBarcode.value.filter((fil) => fil.TSRVF_BC === value).length > 0) {
    $q.notify({
      color: "negative",
      message: `Barcode ${value} already scanned !!`,
    });
    BC.value = "";
    barcodeScanRef.value?.focus();
    return;
  }

  loading.value = true;
  await api_web
    .get(`inventory/findStockByBarcode/${value}`)
    .then((response) => {
      loading.value = false;
      if (response.data.length > 0) {
        console.log("Found item:", response.data[0]);

        let dataItem = response.data[0];

        if (dataItem) {
          if (dataItem.STOCK <= 0) {
            $q.notify({
              color: "negative",
              message: `Barcode ${value} has stock 0 !!`,
            });
            BC.value = "";
            barcodeScanRef.value?.focus();
            return;
          }

          let checkItemExists = listDet.value.filter(
            (fil) => fil.TLOCREQ_ITMCD === dataItem.MITM_ITMCD
          );

          if (checkItemExists.length > 0) {
            // checkItemExists[0].TLOCREQ_QTY += 1;
            scannedBarcode.value.push(dataItem);
            $q.notify({
              color: "positive",
              message: `Item quantity updated. Current qty: ${checkItemExists[0].TLOCREQ_QTY}`,
            });
            BC.value = "";
            barcodeScanRef.value?.focus();

            // if (!checkIsValidData()) {
            //   onSubmitData();
            // }

            console.log(
              "Updated item in listDet:",
              listDet.value.map((item) => ({
                ...item,
                listBarcode: scannedBarcode.value.filter(
                  (fil) => fil.MITM_ITMCD === item.TLOCREQ_ITMCD
                ),
              }))
            );
          } else {
            $q.notify({
              color: "negative",
              message: `Barcode ${value} item is not match with the existing items !!`,
            });
            BC.value = "";
            barcodeScanRef.value?.focus();
          }
        } else {
          $q.notify({
            color: "negative",
            message: `Barcode ${value} not found !!`,
          });
          BC.value = "";
          barcodeScanRef.value?.focus();
        }
      }
    });
};

const onClickCancel = () => {
  if (scannedBarcode.value.length > 0) {
    $q.dialog({
      title: "Confirmation",
      message: `Some item already scanned, are you sure want to cancel this request ? All scanned data will be lost !!`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      onDialogCancel();
    });
  } else {
    onDialogCancel();
  }
};
</script>
