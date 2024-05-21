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

          <div class="row">
            <div class="col">
              <q-input
                label="RO Code"
                dense
                filled
                v-model="forms.TSLO_SLOCD"
                disable
                :loading="loading"
              />
            </div>
            <div class="col q-pl-md">
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
            <div class="col q-pl-md">
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

          <div class="row">
            <div class="col">
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
            <div class="col q-pl-md">
              <q-input
                label="PO Number"
                dense
                filled
                v-model="forms.TSLO_POCD"
                :loading="loading"
              />
            </div>
            <div class="col q-pl-md">
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
                :readonly="quotationType === 3"
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
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-checkbox
              v-model="forms.TSLO_ISCON"
              label="Is Contract ?"
              color="teal"
              :toggle-indeterminate="false"
              :true-value="1"
              :false-value="0"
              :indeterminate-value="0"
              :disable="loading"
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

          <div class="row">
            <div class="col">
              <q-list bordered dense>
                <template v-if="quotDetail.length > 0">
                  <q-item
                    v-for="(quot, idx) in quotDetail"
                    :key="idx"
                    class="q-my-sm"
                    dense
                  >
                    <q-item-section avatar>
                      <q-avatar text-color="blue">
                        {{ idx + 1 }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-center">
                        <q-select
                          dense
                          filled
                          label="Item Name"
                          v-model="quot.TSLODETA_ITMCD"
                          use-input
                          input-debounce="500"
                          :options="listItems"
                          @filter="
                            (val, update, abort) =>
                              filterFn(val, update, abort, 'item')
                          "
                          behavior="dialog"
                          option-label="MITM_ITMNM"
                          option-value="MITM_ITMNM"
                          emit-value
                          map-options
                          :loading="loading"
                        >
                        </q-select>
                      </q-item-label>
                      <q-item-label caption> Item Name </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input v-model="quot.TSLODETA_ITMQT" dense />
                      </q-item-label>
                      <q-item-label caption> Qty </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input
                          v-model="quot.TSLODETA_USAGE_DESCRIPTION"
                          dense
                        />
                      </q-item-label>
                      <q-item-label caption> Usage </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input v-model="quot.TSLODETA_PRC" dense />
                      </q-item-label>
                      <q-item-label caption> Price </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input
                          filled
                          v-model="quot.TSLODETA_PERIOD_FR"
                          dense
                          :loading="loading"
                          @click="quotationIssueDate.qDateProxy.show()"
                          mask="####-##-##"
                          fill-mask
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
                      </q-item-label>
                      <q-item-label caption> Period From </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input
                          filled
                          v-model="quot.TSLODETA_PERIOD_TO"
                          dense
                          :loading="loading"
                          @click="quotationIssueDate.qDateProxy.show()"
                          mask="####-##-##"
                          fill-mask
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
                      </q-item-label>
                      <q-item-label caption> Period To </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-btn
                        icon="delete"
                        color="red"
                        flat
                        @click="onClickDeleteLines(idx)"
                      />
                    </q-item-section>
                  </q-item>
                </template>
                <q-item class="q-my-sm" clickable v-ripple v-else>
                  <q-item-section>
                    <q-item-label> No Items Added </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
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
  TSLO_ISCON: false,
});

const filterCol = ref("");
const filter = ref("");

const listQuo = ref([]);
const listItems = ref([]);
const listCustomers = ref([]);
const loading = ref(false);
const quotationType = ref(1);

const quotDetail = ref([]);

onMounted(async () => {
  if (props.sloHeader && props.sloHeader !== "") {
    await getROData(props.sloHeader);

    console.log(forms.value);
    await getQuotation(forms.value.TSLO_QUOCD);
  }

  getCustomer();
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

const getROData = async (val) => {
  loading.value = true;
  await api_web
    .get(`receive-order/getData/${btoa(val)}`)
    .then((response) => {
      loading.value = false;

      console.log(response.data.det);
      forms.value = response.data;
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
    .then((response) => {
      loading.value = false;

      console.log(response.data.data)

      forms.value.TSLO_CUSCD = response.data.data.TQUO_CUSCD;
      forms.value.TSLO_ADDRESS_NAME = response.data.data.cust.MCUS_CUSNM;
      forms.value.TSLO_ADDRESS_DESCRIPTION =
        response.data.data.cust.TQUO_PROJECT_LOCATION;
      forms.value.TSLO_ATTN = response.data.data.TQUO_ATTN;

      quotDetail.value = [];
      response.data.data.det.map((valMap) => {
        quotDetail.value.push({
          TSLODETA_ITMCD: valMap.TQUODETA_ITMCD,
          TSLODETA_ITMQT: valMap.TQUODETA_ITMQT,
          TSLODETA_USAGE_DESCRIPTION: valMap.TQUODETA_USAGE,
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
    TSLODETA_ITMQT: "",
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
    console.log(val)
    forms.value.TSLO_CUSCD = val.TSLO_CUSCD;
    forms.value.TSLO_ATTN = val.TSLO_ATTN;
    forms.value.TSLO_ADDRESS_NAME = val.TSLO_ADDRESS_NAME;
    forms.value.TSLO_ADDRESS_DESCRIPTION = val.TSLO_ADDRESS_DESCRIPTION;
  });
};
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
