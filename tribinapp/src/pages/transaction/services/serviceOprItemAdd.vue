<!-- eslint-disable vue/no-mutating-props -->
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
        <div class="row">
          <div class="col">
            <div class="text-h6">Update Used Item</div>
          </div>
          <div class="col text-right" v-if="props.mode !== 'view'">
            <q-input
              filled
              dense
              label="Barcode Scan"
              v-model="ScannedBC"
              @update:model-value="(value) => onScanBarcode(value)"
              ref="barcodeScanRef"
            >
              <template v-slot:append>
                <q-btn
                  icon="add"
                  outline
                  color="blue"
                  @click="onClickAddItem"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="max-height: 50vh">
        <q-list bordered>
          <q-item
            class="q-my-sm"
            clickable
            v-ripple
            v-if="listItemsSel.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(items, idx) in listItemsSel"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ idx + 1 }}
              </q-avatar>
            </q-item-section>

            <!-- Barcode section -->
            <q-item-section>
              <q-item-label>
                <q-input
                  label="Barcode"
                  v-model="items.TSRVF_BC"
                  filled
                  dense
                  readonly
                >
                </q-input>
              </q-item-label>
            </q-item-section>

            <!-- Item Section -->

            <q-item-section>
              <q-item-label>
                <div v-if="props.mode === 'view'">
                  <q-item-label v-if="!loading">
                    {{
                      items.MITM_ITMNM
                        ? items.MITM_ITMNM
                        : listItems.filter(
                            (fil) => fil.MITM_ITMCD == items.TSRVF_ITMCD
                          )[0].MITM_ITMNM
                    }}
                  </q-item-label>
                  <q-item-label v-else>
                    Please wait, loading item description
                  </q-item-label>
                  <q-item-label caption> Item </q-item-label>
                </div>
                <q-select
                  dense
                  filled
                  label="Item Name"
                  v-model="items.TSRVF_ITMCD"
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
                  :readonly="props.mode === 'view' || items.TSRVF_BC"
                  @update:model-value="(value) => onSelectItem(value, idx)"
                  @virtual-scroll="onScroll"
                  v-else
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <!-- Jika bukan service internal -->
            <q-item-section>
              <div v-if="props.mode === 'view'">
                <q-item-label>
                  {{ items.TSRVF_PRC.toLocaleString() }}
                </q-item-label>
                <q-item-label caption> Price </q-item-label>
              </div>
              <q-input
                label="Price"
                v-model="items.TSRVF_PRC"
                filled
                dense
                :readonly="props.mode === 'view'"
                v-else
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    icon="search"
                    @click="onClickSearchPrice(items.TSRVF_ITMCD, idx)"
                    :disable="!items.TSRVF_ITMCD"
                  >
                    <q-tooltip>Search Price</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </q-item-section>

            <q-item-section>
              <div v-if="props.mode === 'view'">
                <q-item-label>
                  {{ items.TSRVF_QTY.toLocaleString() }}
                </q-item-label>
                <q-item-label caption> Qty </q-item-label>
              </div>
              <q-input
                label="Qty"
                v-model="items.TSRVF_QTY"
                filled
                dense
                :readonly="props.mode === 'view'"
                v-else
                @update:model-value="(value) => onInputQty(value, idx)"
              />
            </q-item-section>

            <q-item-section v-if="props.mode === 'view'">
              <q-item-label>
                Rp
                {{
                  (
                    parseInt(items.TSRVF_PRC) * parseInt(items.TSRVF_QTY)
                  ).toLocaleString()
                }}
              </q-item-label>
              <q-item-label caption> Total Price </q-item-label>
            </q-item-section>

            <q-item-section side v-if="mode !== 'view'">
              <q-btn
                icon="delete"
                flat
                color="red"
                @click="onClickDeleteLine(idx)"
              />
            </q-item-section>
          </q-item>

          <q-item class="q-my-sm" clickable v-ripple v-if="mode === 'view'">
            <q-item-section> </q-item-section>
            <q-item-section> </q-item-section>
            <q-item-section> </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="text-h5 text-bold">
                  Rp {{ getTotal(listItemsSel) }}
                </span>
              </q-item-label>
              <q-item-label caption> Total Price </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="loading"
          :loading="loading"
        />
        <q-btn
          flat
          label="Cancel"
          color="red"
          @click="onDialogCancel"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { onMounted, ref, nextTick } from "vue";
import { date, useQuasar, useDialogPluginComponent } from "quasar";

import priceChooser from "../../master/price/priceChooser.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  mode: String,
  dataItem: Array,
  header: Object,
});

const paginate = ref({
  page: 1,
  rowsPerPage: 50,
  sortBy: "MITM_ITMCD",
  descending: false,
});
const ScannedBC = ref("");
const barcodeScanRef = ref(null);

const listItems = ref([]);
const listItemsSel = ref([]);
const loading = ref(false);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    barcodeScanRef.value?.focus();
  }, 100);

  getItem("");
  if (props.dataItem.listFixDet) {
    listItemsSel.value = props.dataItem.listFixDet;

    console.log(listItemsSel.value);
    listItemsSel.value.map(async (valDet) => {
      await getItem(valDet.TSRVF_ITMCD);
    });
  }
});

const onClickAddItem = () => {
  listItemsSel.value.push({
    TSRVD_ID: props.dataItem.id,
    TSRVF_ITMCD: "",
    TSRVF_PRC: 0,
    TSRVF_QTY: 1,
  });
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "item") {
      await getItem(val);
    }
  });
};

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPITBL", {
      searchValue: val,
      isITMCD: 1,
      paginate: paginate.value,
    })
    .then((response) => {
      loading.value = false;

      if (val) {
        listItems.value = response.data.data;
      } else {
        listItems.value = [...listItems.value, ...response.data.data];
      }

      paginate.value.rowsNumber = response.data.total;
      paginate.value.page = response.data.current_page;
      paginate.value.rowsPerPage = response.data.per_page;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSubmitData = () => {
  if (props.mode === "view") {
    onDialogCancel();
  } else {
    $q.dialog({
      title: "Confirmation",
      message: `Are you sure want to save this items ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      onDialogOK(listItemsSel.value);
    });
  }
};

const onClickDeleteLine = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listItemsSel.value.splice(idx, 1);
  });
};

const getTotal = (data) => {
  let hasil = 0;
  data.map((items) => {
    hasil += parseInt(items.TSRVF_PRC) * parseInt(items.TSRVF_QTY);
  });

  return hasil.toLocaleString();
};

const onSelectItem = async (val, idx) => {
  const getItemData = listItems.value.filter((fil) => fil.MITM_ITMCD === val);
  if (getItemData.length > 0) {
    const checkStock = await checkStockItem(val);
    if (checkStock && checkStock > 0) {
      listItemsSel.value[idx].TSRVF_PRC = getItemData[0].LATEST_PRC;
      listItemsSel.value[idx].STOCK = checkStock;
    } else {
      // listItemsSel.value[idx].TSRVF_ITMCD = ''

      $q.notify({
        color: "warning",
        message: `Stock item ${val} (${getItemData[0].MITM_ITMNM}) is 0, You might be can't use this item !`,
      });
    }

    const getPriceList = async () => {
      loading.value = true;
      const itemcd = await val;
      console.log("Item Code:", itemcd);

      if (!itemcd) {
        return Promise.resolve(0);
      }

      return api_web
        .post(
          "/price/search",
          itemcd
            ? {
                cg:
                  document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("CGID="))
                    ?.split("=")[1] || "",
                filter: {
                  MITMBPRC_ITMCD: itemcd,
                  MITMSPRC_TYPE: "RTL",
                },
              }
            : {
                cg:
                  document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("CGID="))
                    ?.split("=")[1] || "",
              }
        )
        .then((response) =>
          response.data.data ? response.data.data[0].MITMSPRC_PRC : 0
        )
        .finally(() => {
          loading.value = false;
        });
    };

    getPriceList().then((res) => {
      listItemsSel.value[idx].TSRVF_PRC = res ?? 0;
    });
  }
};

const checkStockItem = async (item) => {
  loading.value = true;
  return await api_web
    .get(`inventory/viewStockByItemLoc/${btoa(item)}`)
    .then((response) => {
      loading.value = false;
      return response.data;
    })
    .catch(() => {
      loading.value = false;

      return false;
    });
};

const onInputQty = (val, idx) => {
  if (val > listItemsSel.value[idx].STOCK) {
    $q.notify({
      color: "warning",
      message: `Stock item ${listItemsSel.value[idx].TSRVF_ITMCD} is 0, You might be can't use this item !`,
    });

    // listItemsSel.value[idx].TSRVF_QTY = 0
  }
};

const onScroll = async ({ to, ref }) => {
  console.log(to, ref);
  const scrollElement = ref.$el || ref;
  console.log(scrollElement);

  if (to === paginate.value.page * paginate.value.rowsPerPage - 1) {
    // Reached the bottom
    console.log("Reached the bottom");

    paginate.value.page += 1;
    await getItem("");
    // You can load more data here
  }
};

const onClickSearchPrice = async (item, idx) => {
  const getUsersDet =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_det="))
      ?.split("=")[1] || "";
  const userDet = getUsersDet
    ? JSON.parse(decodeURIComponent(getUsersDet))
    : {};

  $q.dialog({
    component: priceChooser,
    componentProps: {
      branch: userDet ? userDet.branch : "",
      selectedItemName: item,
      searchPriceParam: {
        MITMSPRC_TYPE: "RTL",
      },
    },
    // persistent: true,
  }).onOk(async (val) => {
    console.log(val);
    listItemsSel.value[idx].TSRVF_PRC = val.MITMSPRC_PRC;
  });
};

const onScanBarcode = async (value) => {
  if (!value) return;

  if (listItemsSel.value.filter((fil) => fil.TSRVF_BC === value).length > 0) {
    $q.notify({
      color: "negative",
      message: `Barcode ${value} already scanned !!`,
    });
    ScannedBC.value = "";
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

        if (dataItem.STOCK <= 0) {
          $q.notify({
            color: "negative",
            message: `Barcode ${value} has stock 0 !!`,
          });
          ScannedBC.value = "";
          barcodeScanRef.value?.focus();
          return;
        }

        listItemsSel.value.push({
          TSRVF_BC: value,
          TSRVD_ID: props.dataItem.id,
          TSRVF_ITMCD: dataItem.MITM_ITMCD,
          TSRVF_PRC: dataItem.MITMSPRC_PRC,
          TSRVF_QTY: dataItem.STOCK,
        });

        ScannedBC.value = "";
        barcodeScanRef.value?.focus();
      } else {
        $q.notify({
          color: "negative",
          message: `Barcode ${value} not found in stock !!`,
        });
        ScannedBC.value = "";
        barcodeScanRef.value?.focus();
      }
    });
};
</script>
