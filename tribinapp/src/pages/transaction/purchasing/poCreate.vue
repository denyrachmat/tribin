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
        <div class="text-h6">Create Purchase Order</div>
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
                label="Code"
                readonly
                dense
                filled
                v-model="header.TPCHORD_PCHCD"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                dense
                filled
                label="Supplier Name"
                v-model="header.TPCHORD_SUPCD"
                use-input
                input-debounce="500"
                :options="listSupplier"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'supp')
                "
                behavior="dialog"
                option-label="MSUP_SUPNM"
                option-value="MSUP_SUPCD"
                emit-value
                map-options
                :loading="loading"
                :readonly="props.mode === 'view'"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-sm">
            <div class="col-12 col-sm-12">
              <q-input
                label="Attn."
                dense
                filled
                v-model="header.TPCHORD_ATTN"
                :readonly="props.mode === 'view'"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-sm">
            <div class="col-12 col-sm-6">
              <q-input
                filled
                v-model="header.TPCHORD_ISSUDT"
                dense
                label="Issue Date"
                readonly
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                    :disable="props.mode === 'view'"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="header.TPCHORD_ISSUDT" mask="YYYY-MM-DD">
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
            <div class="col-12 col-sm-6">
              <q-input
                filled
                v-model="header.TPCHORD_DLVDT"
                dense
                label="Delivery Date"
                readonly
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                    :disable="props.mode === 'view'"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="header.TPCHORD_DLVDT" mask="YYYY-MM-DD">
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
          <div class="row q-col-gutter-md q-pt-sm">
            <div class="col-12 col-sm-12">
              <q-select
                dense
                filled
                label="PR No."
                v-model="header.TPCHORD_REQCD"
                use-input
                input-debounce="500"
                :options="listPR"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'pr')
                "
                behavior="dialog"
                option-label="PO_CUSTDESC"
                option-value="TPCHREQ_PCHCD"
                emit-value
                map-options
                :loading="loading"
                :readonly="props.mode === 'view'"
                @update:model-value="(value) => onSelectPR(value)"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-sm">
            <div class="col-12 col-sm-12">
              <q-input
                label="Remarks"
                type="textarea"
                dense
                filled
                v-model="header.TPCHORD_REMARK"
                :readonly="props.mode === 'view'"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-pt-sm">
            <div class="col-12 col-sm-12">
              <q-select
                dense
                filled
                label="Tax Code"
                v-model="header.TAX_CODE"
                use-input
                input-debounce="500"
                :options="listTaxes"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'tax')
                "
                behavior="dialog"
                option-label="MTAX_DESC"
                option-value="MTAX_CODE"
                emit-value
                map-options
                :loading="loading"
                :readonly="props.mode === 'view'"
                :disable="!isUsingTax"
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

          <div class="row q-pb-sm">
            <div class="col text-right">
              <q-btn
                flat
                icon="add"
                color="blue"
                label="Add Lines"
                @click="onAddItemLine"
                :loading="loading"
                :disable="props.mode === 'view'"
              >
              </q-btn>
            </div>
          </div>
          <q-list bordered dense>
            <template v-if="listDet.length > 0">
              <q-item
                v-for="(items, idx) in listDet"
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
                    <q-select
                      dense
                      filled
                      label="Item Code"
                      v-model="items.TPCHORDDETA_ITMCD"
                      use-input
                      input-debounce="500"
                      :options="listItems"
                      @filter="
                        (val, update, abort) =>
                          filterFn(val, update, abort, 'item')
                      "
                      behavior="dialog"
                      option-label="MITM_ITMNMREAL"
                      option-value="MITM_ITMNM"
                      emit-value
                      map-options
                      :loading="loading"
                      :readonly="props.mode === 'view'"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Qty"
                      filled
                      v-model="items.TPCHORDDETA_ITMQT"
                      :readonly="props.mode === 'view'"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Price"
                      filled
                      v-model="items.TPCHORDDETA_ITMPRC_PER"
                      :readonly="props.mode === 'view'"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-if="props.mode !== 'view'">
                  <q-btn
                    icon="delete"
                    color="red"
                    flat
                    @click="onClickDeleteLines(idx)"
                  >
                    <q-tooltip>{{ "Delete line" }}</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="props.mode === 'view' ? onDialogCancel : onSubmitData()"
          :disable="stateSubmit"
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
  dataHeader: Array,
  mode: String,
});

const header = ref({
  TPCHORD_PCHCD: "",
  TPCHORD_SUPCD: "",
  TPCHORD_ATTN: "",
  TPCHORD_ISSUDT: "",
  TPCHORD_REJCTDT: "",
  TPCHORD_REMARK: "",
  TPCHORD_DLVDT: "",
  TPCHORD_REQCD: "",
  TAX_CODE: "",
});

const inctype = ref(1);

const listDet = ref([]);
const loading = ref(false);
const listSupplier = ref([]);
const listItems = ref([]);
const listTaxes = ref([]);
const listPR = ref([]);
const isUsingTax = ref(false);

onMounted(async () => {
  await getItem("");
  await getSupplier("");
  await getPR("");
  getDefaultTax();

  if (props.dataHeader && Object.values(props.dataHeader).length > 0) {
    header.value = {
      TPCHORD_PCHCD: props.dataHeader.TPCHORD_PCHCD,
      TPCHORD_SUPCD: props.dataHeader.TPCHORD_SUPCD,
      TPCHORD_APPRVDT: props.dataHeader.TPCHORD_APPRVDT,
      TPCHORD_BRANCH: props.dataHeader.TPCHORD_BRANCH,
      TPCHORD_ISSUDT: props.dataHeader.TPCHORD_ISSUDT,
      TPCHORD_REJCTDT: props.dataHeader.TPCHORD_REJCTDT,
      TPCHORD_REQCD: props.dataHeader.TPCHORD_REQCD,
      TPCHORD_ATTN: props.dataHeader.TPCHORD_ATTN,
      TPCHORD_REMARK: props.dataHeader.TPCHORD_REMARK,
      TPCHORD_DLVDT: props.dataHeader.TPCHORD_DLVDT,
      TAX_CODE: props.dataHeader.TAX_CODE,
    };

    await getDetailItem();
  }

  await getTaxes();
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "supp") {
      await getSupplier(val);
    }

    if (fun === "pr") {
      await getPR(val);
    }
  });
};

const getTaxes = async (val) => {
  loading.value = true;
  await api_web
    .post("taxes/searchAPI", {
      searchBy: "MTAX_DESC",
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listTaxes.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getSupplier = async (val, cols = "MSUP_SUPNM") => {
  loading.value = true;
  await api_web
    .post("supplier/searchAPI", {
      searchValue: val,
      searchCol: cols,
    })
    .then((response) => {
      loading.value = false;
      listSupplier.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPI", {
      searchValue: val,
      isITMCD: 1,
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getPR = async (val = null) => {
  loading.value = true;
  await api_web
    .get(
      `purchase-request?searchBy=${
        val ? "TPCHREQ_PCHCD" : "0"
      }&searchValue=${val}`
    )
    .then((response) => {
      loading.value = false;
      listPR.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSelectPR = async (val) => {
  console.log(val);
  const getSelectedData = listPR.value.find(
    (item) => item.TPCHREQ_PCHCD === val
  );
  console.log(getSelectedData);
  loading.value = true;
  await api_web
    .get(`purchase-request/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      header.value.TPCHORD_SUPCD = getSelectedData["TPCHREQ_SUPCD"];

      if (response.data.dataItem && response.data.dataItem.length > 0) {
        listDet.value = [];
        response.data.dataItem.map((valMap) => {
          listDet.value.push({
            TPCHORDDETA_ITMCD: valMap.TPCHREQDETA_ITMCD,
            TPCHORDDETA_ITMQT: valMap.TPCHREQDETA_ITMQT,
            TPCHORDDETA_ITMPRC_PER: 0,
          });
        });
      }
    })
    .catch(() => {
      loading.value = false;
    });
};

const onAddItemLine = () => {
  listDet.value.push({
    TPCHORDDETA_ITMCD: "",
    TPCHORDDETA_ITMQT: 0,
    TPCHORDDETA_ITMPRC_PER: 0,
  });
};

const getDetailItem = async () => {
  loading.value = true;
  await api_web
    .get(`purchase-order/document/${btoa(props.dataHeader.TPCHORD_PCHCD)}`)
    .then((response) => {
      loading.value = false;
      listDet.value = response.data.dataItem;
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
    message: `Are you sure want to save this Incoming ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`purchase-order`, {
        ...header.value,
        det: listDet.value,
      })
      .then((response) => {
        loading.value = false;
        listDet.value = response.data.dataItem;
      })
      .catch(() => {
        loading.value = false;
      });
    onDialogOK();
  });
};

const getDefaultTax = async () => {
  const getCG =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("CGID="))
      ?.split("=")[1] || "";
  loading.value = true;
  await api
    .get(
      `master/gencode/${btoa("SUPP_ACC_LIST")}/${btoa("DEF_SUPP_TAX")}/${getCG}`
    )
    .then((val) => {
      loading.value = false;
      console.log(val);
      if (val.data) {
        isUsingTax.value = true;
        if (val.data.CODE_VALUE && !header.value.TAX_CODE) {
          if (val.data.CODE_VALUE) {
            header.value.TAX_CODE = val.data.CODE_VALUE;
          } else {
            isUsingTax.value = false;
          }
        } else {
          isUsingTax.value = false;
        }
      }
    })
    .catch((e) => {});
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
