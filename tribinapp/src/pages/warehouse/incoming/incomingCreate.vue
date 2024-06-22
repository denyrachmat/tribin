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
        <div class="text-h6">Create Incoming</div>
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
                :disable="header.TRCV_RCVCD !== '' || inctype == 1"
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
                :disable="header.TRCV_RCVCD !== '' || inctype == 1"
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
                :disable="header.TRCV_RCVCD !== ''"
                @update:model-value="(value) => onSelectPO(value)"
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
                :disable="header.TRCV_RCVCD !== ''"
                @update:model-value="(value) => onSelectDN(value)"
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
              :disable="header.TRCV_RCVCD !== ''"
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

          <div class="row q-pb-sm">
            <div class="col text-right">
              <q-btn
                flat
                icon="add"
                color="blue"
                label="Add Lines"
                @click="onAddItemLine"
                :loading="loading"
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
                      v-model="items.item_code"
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
                      :disable="items.IS_CONFIRMED == 1 || header.TRCV_RCVCD !== ''"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Qty"
                      filled
                      v-model="items.quantity"
                      :disable="items.IS_CONFIRMED == 1"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Price"
                      filled
                      v-model="items.unit_price"
                      :disable="items.IS_CONFIRMED == 1"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="delete"
                    color="red"
                    flat
                    @click="onClickDeleteLines(idx)"
                    :disable="items.IS_CONFIRMED == 1"
                  >
                    <q-tooltip>{{ items.IS_CONFIRMED == 1 ? 'Cannot delete, already confirmed line' : 'Delete line' }}</q-tooltip>
                  </q-btn>
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
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
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

    inctype.value = props.dataHeader.RCV_STATE

    props.dataHeader.det.map(val => {
      listDet.value.push({
        item_code: val.item_code,
        quantity: val.quantity,
        unit_price: val.unit_price,
      })
    })
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

const onAddItemLine = () => {
  listDet.value.push({
    item_code: "",
    quantity: "",
    unit_price: "",
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

const onSelectPO = (val) => {
  let selPO = listPO.value.filter((fil) => fil.TPCHORD_PCHCD == val);

  listDet.value = [];
  if (selPO.length > 0) {
    header.value.TRCV_SUPCD = selPO[0].TPCHORD_SUPCD;
    selPO[0].det.map((valMap) => {
      listDet.value.push({
        item_code: valMap.TPCHORDDETA_ITMCD,
        quantity: valMap.TPCHORDDETA_ITMQT,
        unit_price: valMap.TPCHORDDETA_ITMPRC_PER,
      });
    });
  }
};

const onSelectDN = (val) => {
  let selDN = listInvoice.value.filter((fil) => fil.TDLVORD_DLVCD == val);

  listDet.value = [];
  if (selDN.length > 0) {
    header.value.TRCV_SUPCD = selDN[0].TDLVORD_CUSCD;

    // Accesories
    selDN[0].dlvacc.map((accVal) => {
      listDet.value.push({
        item_code: accVal.TDLVACCESSORY_ITMCD,
        quantity: accVal.TDLVACCESSORY_ITMQT,
        unit_price: 0,
      });
    });

    // Item Detail
    selDN[0].dlvdet.map((detVal) => {
      listDet.value.push({
        item_code: detVal.TDLVORDDETA_ITMCD,
        quantity: detVal.TDLVORDDETA_ITMQT,
        unit_price: detVal.TDLVORDDETA_PRC,
      });
    });
  }
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
      .post(`receive/saveAPI`, {
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
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
