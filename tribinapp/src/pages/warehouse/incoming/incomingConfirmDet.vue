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
        <div class="text-h6">Confirm Incoming</div>
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
                v-model="header.TRCV_RCVCD"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                filled
                v-model="header.TRCV_ISSUDT"
                dense
                label="Receive Date"
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="header.TRCV_ISSUDT" mask="YYYY-MM-DD">
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

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-6" v-if="inctype == 1">
              <q-select
                dense
                filled
                label="Supplier Name"
                v-model="header.TRCV_SUPCD"
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
                readonly
              />
            </div>
            <div class="col-12 col-sm-6" v-else>
              <q-select
                dense
                filled
                label="Customer Name"
                v-model="header.TRCV_SUPCD"
                use-input
                input-debounce="500"
                :options="listCustomer"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'cust')
                "
                behavior="dialog"
                option-label="MCUS_CUSNM"
                option-value="MCUS_CUSCD"
                emit-value
                map-options
                :loading="loading"
                readonly
              />
            </div>
            <div class="col-12 col-sm-6" v-if="inctype == 1">
              <q-select
                dense
                filled
                label="PO Number"
                v-model="header.TRCV_REFFNO"
                use-input
                input-debounce="500"
                :options="listPO"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'po')
                "
                behavior="dialog"
                option-label="PO_CUSTDESC"
                option-value="TPCHORD_PCHCD"
                emit-value
                map-options
                :loading="loading"
                readonly
              />
            </div>
            <div class="col-12 col-sm-6" v-else>
              <q-select
                dense
                filled
                label="JAT Invoice No"
                v-model="header.TRCV_REFFNO"
                use-input
                input-debounce="500"
                :options="listInvoice"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'inv')
                "
                behavior="dialog"
                option-label="LABEL"
                option-value="TDLVORD_DLVCD"
                emit-value
                map-options
                :loading="loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-md">
            <div class="col">
              <q-input
                label="Doc Supplier No"
                dense
                filled
                v-model="header.TRCV_DOCNO"
                readonly
              />
            </div>
          </div>
        </fieldset>

        <div class="row q-py-md">
          <div class="col">
            <q-btn-toggle
              v-model="inctype"
              spread
              no-caps
              toggle-color="purple"
              color="white"
              text-color="black"
              :options="[
                { label: 'From PO', value: 1 },
                { label: 'Return', value: 2 },
              ]"
              readonly
              @update:model-value="(val) => clearForm()"
            />
          </div>
        </div>

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
              :class="`row q-col-gutter-md ${idx > 0 ? 'q-pt-md' : null}`"
              v-for="(items, idx) in listDet"
              :key="idx"
            >
              <div class="col-12 col-sm-1 text-center">
                <q-avatar text-color="blue">
                  {{ idx + 1 }}
                </q-avatar>
              </div>
              <div class="col-12 col-sm-3">
                <q-select
                  dense
                  filled
                  label="Item Code"
                  v-model="items.item_code"
                  use-input
                  input-debounce="500"
                  :options="listItems"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'item')
                  "
                  behavior="dialog"
                  option-label="MITM_ITMNMREAL"
                  option-value="MITM_ITMNM"
                  emit-value
                  map-options
                  :loading="loading"
                  readonly
                />
              </div>
              <div class="col-12 col-sm-2">
                <q-input
                  dense
                  label="Qty"
                  filled
                  v-model="items.quantity"
                  readonly
                />
              </div>
              <div class="col-12 col-sm-2">
                <q-input
                  dense
                  label="Confirmed Qty"
                  filled
                  v-model="items.CONFIRMED_QTY"
                  readonly
                />
              </div>
              <div class="col-12 col-sm-3">
                <q-input
                  dense
                  label="Price"
                  filled
                  v-model="items.unit_price"
                  readonly
                />
              </div>
              <div class="col-12 col-sm-1 text-center">
                <q-btn
                    icon="check"
                    :color="items.IS_CONFIRMED == 1 ? 'grey' : 'indigo'"
                    flat
                    @click="onConfirmation(idx)"
                    :disable="items.IS_CONFIRMED == 1"
                  >
                    <q-tooltip>{{
                      items.IS_CONFIRMED == 1
                        ? "Already confirmed"
                        : "Not confirmed yet, click to confirm."
                    }}</q-tooltip>
                  </q-btn>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="row">
              <div class="col-12 text-center">
                Choose incoming first to access item list
              </div>
            </div>
          </template>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Save"
          color="primary"
          @click="onSubmitData()"
          :disable="listDet.filter((fil) => fil.CONFIRMED_QTY > 0).length == 0"
          :loading="loading"
        />
        <q-btn
          label="Confirm All"
          color="indigo"
          @click="onConfirmAll()"
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
});

const header = ref({
  TRCV_RCVCD: "",
  TRCV_SUPCD: "",
  TRCV_ISSUDT: "",
  TRCV_REFFNO: "",
  TRCV_DOCNO: "",
});

const inctype = ref(1);

const listDet = ref([]);
const loading = ref(false);
const listSupplier = ref([]);
const listCustomer = ref([]);
const listPO = ref([]);
const listItems = ref([]);
const listInvoice = ref([]);

onMounted(async () => {
  await getItem("");
  await getSupplier("");
  await getCustomer("");

  if (props.dataHeader && Object.values(props.dataHeader).length > 0) {
    header.value = {
      TRCV_RCVCD: props.dataHeader.TRCV_RCVCD,
      TRCV_SUPCD: props.dataHeader.MSUP_SUPCD,
      TRCV_ISSUDT: props.dataHeader.TRCV_ISSUDT,
      TRCV_REFFNO: props.dataHeader.TRCV_REFFNO,
      TRCV_DOCNO: props.dataHeader.TRCV_DOCNO,
    };

    inctype.value = parseInt(props.dataHeader.RCV_STATE);

    props.dataHeader.det.map((val) => {
      listDet.value.push({
        id: val.id,
        item_code: val.item_code,
        quantity: val.quantity,
        unit_price: val.unit_price,
      });
    });
  }
});

const clearForm = () => {
  header.value = {
    TRCV_RCVCD: "",
    TRCV_SUPCD: "",
    TRCV_ISSUDT: "",
    TRCV_REFFNO: "",
    TRCV_DOCNO: "",
  };
  listDet.value = [];
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "supp") {
      await getSupplier(val);
    }

    if (fun === "cust") {
      await getCustomer(val);
    }

    if (fun === "item") {
      await getItem(val);
    }

    if (fun === "po") {
      await getPO(val);
    }

    if (fun === "inv") {
      await getInvoice(val);
    }
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

const getCustomer = async (val, cols = "MCUS_CUSNM") => {
  loading.value = true;
  await api_web
    .post("customer/searchAPI", {
      searchValue: val,
      searchCol: cols,
    })
    .then((response) => {
      loading.value = false;
      listCustomer.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getPO = async (val, cols = "TPCHORD_PCHCD") => {
  loading.value = true;
  await api_web
    .post("purchase-order/searchApprovedPO", {
      searchValue: val,
      searchCol: cols,
    })
    .then((response) => {
      loading.value = false;
      listPO.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getInvoice = async (val, cols = "TDLVORD_DLVCD") => {
  loading.value = true;
  await api_web
    .post("invoices/search", {
      searchBy: cols,
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listInvoice.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onConfirmation = (id) => {
  $q.dialog({
    dark: true,
    title: "Confirm Incoming",
    message: `Put qty to be confirmed, Total qty is (${listDet.value[id].quantity})`,
    prompt: {
      model: listDet.value[id].quantity,
      type: "number", // optional
      min: 1,
      max: listDet.value[id].quantity,
      isValid: (val) => val <= listDet.value[id].quantity,
    },
    cancel: true,
    persistent: true,
  }).onOk((datas) => {
    listDet.value[id].IS_CONFIRMED = 1;
    listDet.value[id].CONFIRMED_QTY = datas;
  });
};

const onSubmitData = async (pass = false) => {
  if (!pass) {
    $q.dialog({
      title: "Confirmation",
      message: `Are you sure want to confirm all this item ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      loading.value = true;
      await api_web
        .post(`receive/confirmIncoming`, {
          ...header.value,
          det: listDet.value,
        })
        .then((response) => {
          loading.value = false;

          $q.notify({
            color: "green",
            message: `${response.data.msg}`,
          });
          onDialogOK();
        })
        .catch(() => {
          loading.value = false;
        });
    });
  } else {
    loading.value = true;
    await api_web
      .post(`receive/confirmIncoming`, {
        ...header.value,
        det: listDet.value,
      })
      .then((response) => {
        loading.value = false;

        $q.notify({
          color: "green",
          message: `${response.data.msg}`,
        });
        onDialogOK();
      })
      .catch(() => {
        loading.value = false;
      });
  }
};

const onConfirmAll = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to confirm all incoming item and save data ? This will confirm default qty.`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listDet.value.map((val) => {
      val.IS_CONFIRMED = 1;
      val.CONFIRMED_QTY = val.quantity;
    });

    onSubmitData(true);
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
