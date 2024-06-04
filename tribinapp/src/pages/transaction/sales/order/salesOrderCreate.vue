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
        <div class="text-h6">RO Maintenance</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-4">
              <q-input
                label="RO Code"
                dense
                filled
                v-model="forms.TSLO_SLOCD"
                disable
                :loading="loading"
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-input
                filled
                v-model="forms.TSLO_ISSUDT"
                dense
                label="Issue Date"
                :loading="loading"
                @click="quotationIssueDate.qDateProxy.show()"
                mask="####-##-##"
                fill-mask
                hint="Mask: YYYY-MM-DD"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="forms.TSLO_ISSUDT" mask="YYYY-MM-DD">
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
            <div class="col-12 col-sm-4">
              <q-input
                filled
                v-model="forms.TSLO_PLAN_DLVDT"
                dense
                label="Delivery Date"
                :loading="loading"
                @click="quotationIssueDate.qDateProxy.show()"
                mask="####-##-##"
                fill-mask
                hint="Mask: YYYY-MM-DD"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="forms.TSLO_PLAN_DLVDT" mask="YYYY-MM-DD">
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

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-4">
              <q-select
                dense
                filled
                label="Sales Quotation Code"
                v-model="forms.TSLO_QUOCD"
                use-input
                input-debounce="500"
                :options="listQuo"
                @filter="
                  (val, update, abort) =>
                    filterFn(val, update, abort, 'quotation')
                "
                behavior="dialog"
                option-label="DESCSEL"
                option-value="TQUO_QUOCD"
                emit-value
                map-options
                :loading="loading"
                @update:model-value="onSelectQuotation"
              >
              </q-select>
            </div>
            <div class="col-12 col-sm-4">
              <q-input
                label="PO Number"
                dense
                filled
                v-model="forms.TSLO_POCD"
                :loading="loading"
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-select
                dense
                filled
                label="Customer Name"
                v-model="forms.TSLO_CUSCD"
                use-input
                input-debounce="500"
                :options="listCustomers"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'cust')
                "
                behavior="dialog"
                option-label="MCUS_CUSNM"
                option-value="MCUS_CUSCD"
                emit-value
                map-options
                :loading="loading"
                :readonly="quotationType == 3"
              />
            </div>
          </div>
        </fieldset>

        <div class="row q-py-md">
          <div class="col">
            <q-btn-toggle
              v-model="forms.TSLO_TYPE"
              spread
              no-caps
              toggle-color="purple"
              color="white"
              text-color="black"
              :options="[
                { label: 'Rental', value: 1 },
                { label: 'Sales', value: 2 },
                { label: 'Service', value: 3 },
              ]"
              :disable="forms.TSLO_QUOCD !== ''"
            />
          </div>
        </div>

        <div class="row" v-if="forms.TSLO_TYPE != 1">
          <div class="col">
            <q-input
              prefix="Rp"
              label="Service & Transportation Price"
              v-model="forms.TSLO_SERVTRANS_COST"
              filled
              dense
              :disable="forms.TSLO_QUOCD !== ''"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <q-checkbox
              v-model="forms.TSLO_ISCON"
              label="Is Contract ?"
              color="teal"
              :toggle-indeterminate="false"
              :true-value="1"
              :false-value="0"
              :disable="loading"
            />
          </div>
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
              <q-btn
                flat
                icon="person"
                color="indigo"
                label="Customer"
                @click="onCustView"
                :loading="loading"
              >
              </q-btn>
            </div>
        </div>

        <fieldset
          style="
            border: 1px black solid;
            border-radius: 10px;
            height: 35vh;
            overflow: auto;
          "
          class="q-pa-md"
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Detail Items</b>
          </legend>
          <div class="row q-pb-md">
            <div class="col">
              <span class="text-h6">
                {{ getQuotType() }}
              </span>
            </div>
          </div>
          <template v-if="quotDetail.length > 0">
            <div class="row q-col-gutter-xs" v-for="(quot, idx) in quotDetail" :key="idx">
              <div class="col-12 col-md-1 text-center">
                <q-avatar text-color="white" color="primary">
                  {{ idx + 1 }}
                </q-avatar>
              </div>
              <div class="col-4 col-md-2">
                <q-select
                  dense
                  filled
                  label="Item Name"
                  v-model="quot.TSLODETA_ITMCD"
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
                >
                </q-select>
              </div>

              <div class="col-4 col-md-1">
                <q-input v-model="quot.TSLODETA_ITMQT" dense hint="Qty"/>
              </div>

              <div class="col-4 col-md-2" v-if="forms.TSLO_TYPE == 1">
                <q-select
                  dense
                  filled
                  label="Usage"
                  v-model="quot.TSLODETA_USAGE_DESCRIPTION"
                  use-input
                  input-debounce="500"
                  :options="listUsage"
                  @filter="
                    (val, update, abort) =>
                      filterFn(val, update, abort, 'usage')
                  "
                  behavior="dialog"
                  option-label="MUSAGE_DESCALL"
                  option-value="id"
                  emit-value
                  map-options
                  :loading="loading"
                  hint="Usage"
                />
              </div>

              <div :class="`${forms.TSLO_TYPE == 1 ? 'col-4 col-md-1' : 'col-4 col-md-3'}`">
                <q-input v-model="quot.TSLODETA_PRC" dense hint="Price"/>
              </div>

              <div :class="`${forms.TSLO_TYPE == 1 ? 'col-4 col-md-2' : 'col-6 col-md-2'}`">
                <q-input
                  filled
                  v-model="quot.TSLODETA_PERIOD_FR"
                  dense
                  :loading="loading"
                  @click="quotationIssueDate.qDateProxy.show()"
                  mask="####-##-##"
                  fill-mask
                  hint="First Period"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="quot.TSLODETA_PERIOD_FR"
                          mask="YYYY-MM-DD"
                        >
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

              <div :class="`${forms.TSLO_TYPE == 1 ? 'col-4 col-md-2' : 'col-6 col-md-2'}`">
                <q-input
                  filled
                  v-model="quot.TSLODETA_PERIOD_TO"
                  dense
                  :loading="loading"
                  @click="quotationIssueDate.qDateProxy.show()"
                  mask="####-##-##"
                  fill-mask
                  hint="Last Period"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="quot.TSLODETA_PERIOD_TO"
                          mask="YYYY-MM-DD"
                        >
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

              <div class="col-12 col-md-1 text-center">
                <q-btn
                  icon="delete"
                  color="red"
                  outline
                  @click="onClickDeleteLines(idx)"
                />
              </div>
            </div>
          </template>
          <div class="text-center" v-else>
            No Items Added
          </div>
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
import { useQuasar, useDialogPluginComponent, date } from "quasar";
import { api, api_web } from "boot/axios";
import customerView from "./customerView.vue";

const $q = useQuasar();

const props = defineProps({
  sloHeader: String,
});

const forms = ref({
  TSLO_SLOCD: "",
  TSLO_ISSUDT: date.formatDate(Date.now(), "YYYY-MM-DD"),
  TSLO_PLAN_DLVDT: "",
  TSLO_QUOCD: "",
  TSLO_POCD: "",
  TSLO_CUSCD: "",
  TSLO_ATTN: "",
  TSLO_TYPE: 1,
  TSLO_ADDRESS_NAME: "",
  TSLO_ADDRESS_DESCRIPTION: "",
  TSLO_SERVTRANS_COST: 0,
  TSLO_ISCON: 0,
});

const filterCol = ref("");
const filter = ref("");

const listQuo = ref([]);
const listItems = ref([]);
const listCustomers = ref([]);
const loading = ref(false);
const quotationType = ref(1);

const quotDetail = ref([]);
const listUsage = ref([]);

onMounted(async () => {
  await getUsage();
  await getCustomer();
  if (props.sloHeader && props.sloHeader !== "") {
    await getROData(props.sloHeader);

    console.log(forms.value);
    await getQuotation(forms.value.TSLO_QUOCD);
  }
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "quotation") {
      await getQuotation(val);
    }

    if (fun === "item") {
      await getItem(val);
    }

    if (fun === "cust") {
      await getCustomer(val);
    }

    if (fun === "usage") {
      await getUsage(val);
    }
  });
};

const getQuotation = async (val = "") => {
  loading.value = true;
  await api_web
    .post("quotation/search", {
      searchBy: "MCUS_CUSNM",
      searchValue: val,
      approval: 1,
    })
    .then((response) => {
      loading.value = false;
      listQuo.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPI", {
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

const getQuotType = () => {
  return forms.value.TSLO_TYPE === 1
    ? "Rental"
    : forms.value.TSLO_TYPE === 2
    ? "Sales"
    : "Service";
};

const getCustomer = async (val) => {
  loading.value = true;
  await api_web
    .post("customer/searchAPI", {
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listCustomers.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getUsage = async (val) => {
  loading.value = true;
  await api_web
    .post("usage/searchAPI", {
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listUsage.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getROData = async (val) => {
  loading.value = true;
  await api_web
    .get(`receive-order/getData/${btoa(val)}`)
    .then((response) => {
      loading.value = false;

      console.log(response.data.det);
      forms.value = response.data;
      forms.value.TSLO_TYPE = parseInt(response.data.TSLO_TYPE);

      quotDetail.value = response.data.det;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSelectQuotation = async (val) => {
  console.log(val);
  loading.value = true;
  await api
    .get(`transaction/quotation/view/${btoa(val)}`)
    .then(async (response) => {
      loading.value = false;
         
      await getUsage();
      await getItem();

      forms.value.TSLO_CUSCD = response.data.data.TQUO_CUSCD;
      forms.value.TSLO_ADDRESS_NAME = response.data.data.cust.MCUS_CUSNM;
      forms.value.TSLO_ADDRESS_DESCRIPTION =
        response.data.data.cust.TQUO_PROJECT_LOCATION;
      forms.value.TSLO_ATTN = response.data.data.TQUO_ATTN;
      forms.value.TSLO_TYPE = parseInt(response.data.data.TQUO_TYPE);
      forms.value.TSLO_SERVTRANS_COST = parseInt(
        response.data.data.TQUO_SERVTRANS_COST
      );

      quotDetail.value = [];
      response.data.data.det.map((valMap) => {
        quotDetail.value.push({
          TSLODETA_ITMCD: valMap.TQUODETA_ITMCD,
          TSLODETA_ITMQT: valMap.TQUODETA_ITMQT,
          TSLODETA_USAGE_DESCRIPTION: parseInt(valMap.TQUODETA_USAGE),
          TSLODETA_PRC: valMap.TQUODETA_PRC,
          TSLODETA_PERIOD_FR: valMap.TQUODETA_PERIOD_FR,
          TSLODETA_PERIOD_TO: valMap.TQUODETA_PERIOD_TO,
        });
      });
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onAddItemLine = () => {
  quotDetail.value.push({
    TSLODETA_ITMCD: "",
    TSLODETA_ITMQT: 0,
    TSLODETA_USAGE_DESCRIPTION: "",
    TSLODETA_PRC: 0,
    TSLODETA_PERIOD_FR: "",
    TSLODETA_PERIOD_TO: "",
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    quotDetail.value.splice(idx, 1);
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this RO ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`receive-order/saveAPI`, {
        ...forms.value,
        det: quotDetail.value,
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

const onCustView = () => {
  $q.dialog({
    component: customerView,
    componentProps: {
      custData: {
        TSLO_CUSCD: forms.value.TSLO_CUSCD,
        MCUS_CUSNM: forms.value.TSLO_ADDRESS_NAME,
        TSLO_ATTN: forms.value.TSLO_ATTN,
        TSLO_ADDRESS_NAME: forms.value.TSLO_ADDRESS_NAME,
        TSLO_ADDRESS_DESCRIPTION: forms.value.TSLO_ADDRESS_DESCRIPTION,
      },
    },
  }).onOk(async (val) => {
    console.log(val);
    forms.value.TSLO_CUSCD = val.TSLO_CUSCD;
    forms.value.TSLO_ATTN = val.TSLO_ATTN;
    forms.value.TSLO_ADDRESS_NAME = val.TSLO_ADDRESS_NAME;
    forms.value.TSLO_ADDRESS_DESCRIPTION = val.TSLO_ADDRESS_DESCRIPTION;
  });
};
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
