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
        <div class="text-h6">
          {{ props.quoHeader ? "Edit " : "Create " }} Quotation
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row">
            <div class="col">
              <q-input
                label="Quotation Code"
                dense
                filled
                v-model="quotationCode"
                disable
                :loading="loading"
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                filled
                v-model="quotationIssueDate"
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
                      <q-date v-model="quotationIssueDate" mask="YYYY-MM-DD">
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
                label="Customer Name"
                v-model="quotationCustomerCode"
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
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                label="Attn."
                dense
                filled
                v-model="quotationAttn"
                :loading="loading"
              />
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col">
              <q-input
                label="Subject"
                dense
                filled
                v-model="quotationSubject"
                :loading="loading"
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                label="Project Location"
                dense
                filled
                v-model="quotationProjectLocation"
                :loading="loading"
              />
            </div>
          </div>
        </fieldset>

        <div class="q-pa-sm">
          <q-btn-toggle
            v-model="quotationType"
            spread
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Rental', value: 1 },
              { label: 'Sale', value: 2 },
            ]"
            dense
            @update:model-value="(value) => onChangeType(value)"
            :loading="loading"
          />
        </div>

        <div class="q-pb-md" v-if="quotationType === 2">
          <q-input
            prefix="Rp"
            label="Service & Transportation Price"
            v-model="quotationServPrice"
            filled
            dense
            :loading="loading"
          />
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
            <b>Detail Items</b>
          </legend>
          <div class="row q-pb-md">
            <div class="col">
              <q-btn
                flat
                icon="add"
                color="blue"
                label="Add Lines"
                @click="onAddItemLine"
                :disable="!quotationType"
                :loading="loading"
              >
              </q-btn>
              <q-btn
                color="red"
                @click="onClearLines"
                flat
                icon="refresh"
                :loading="loading"
              >
                <q-tooltip>Clear All Lines</q-tooltip>
              </q-btn>
            </div>
            <div class="col text-right">
              <q-btn
                color="blue"
                label="Assign Conditions"
                @click="onClickConditions"
                :loading="loading"
              >
              </q-btn>
              <q-btn
                icon="visibility"
                color="indigo"
                flat
                @click="onClickViewListConditions"
                :loading="loading"
              >
                <q-tooltip>View Conditions</q-tooltip>
                <q-badge color="red" floating>{{
                  quotationConditions.length
                }}</q-badge>
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-list bordered dense>
                <template v-if="listSavedItems.length > 0">
                  <q-item
                    v-for="(items, idx) in listSavedItems"
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
                      <q-item-label>
                        <q-select
                          dense
                          filled
                          label="Item Name"
                          v-model="items.item"
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
                    </q-item-section>
                    <q-item-section v-if="quotationType === 1">
                      <q-item-label>
                        <q-select
                          dense
                          filled
                          label="Usage"
                          v-model="items.usage"
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
                        />
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input
                          prefix="Rp"
                          dense
                          label="Price"
                          filled
                          v-model="items.price"
                        />
                      </q-item-label>
                    </q-item-section>
                    <q-item-section v-if="quotationType === 1">
                      <q-item-label>
                        <q-input
                          dense
                          label="Electricity"
                          filled
                          v-model="items.electric"
                        />
                      </q-item-label>
                    </q-item-section>
                    <q-item-section v-if="quotationType === 2">
                      <q-item-label>
                        <q-input dense label="Qty" filled v-model="items.qty" />
                      </q-item-label>
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

import { masterDataStore } from "stores/masterDataStore";

import assignConditionsView from "pages/master/conditions/assignConditionsView.vue";
import viewAssignedCond from "pages/master/conditions/viewAssignedCond.vue";

const $q = useQuasar();

const store = masterDataStore();

const props = defineProps({
  quoHeader: String,
});

onMounted(async () => {
  if (store.getCustomer.length === 0) {
    await getCustomer("");
    store.setCustomer(listCustomers.value);
  } else {
    listCustomers.value = store.getCustomer;
  }

  if (store.getItem.length === 0) {
    await getItem("");
    store.setItem(listItems.value);
  } else {
    listItems.value = store.getItem;
  }

  if (store.getUsage.length === 0) {
    await getUsage("");
    store.setUsage(listUsage.value);
  } else {
    listUsage.value = store.getUsage;
  }

  if (props.quoHeader) {
    getSavedData(props.quoHeader);
  }
});

const loading = ref(false);
const quotationCode = ref("");
const quotationIssueDate = ref("");
const quotationCustomerCode = ref("");
const quotationAttn = ref("");
const quotationSubject = ref("");
const quotationProjectLocation = ref("");
const quotationGroupConditions = ref("");
const quotationConditions = ref([]);
const quotationType = ref(1);
const quotationServPrice = ref(0);

const listSavedItems = ref([]);

const listItems = ref([]);
const listCustomers = ref([]);
const listUsage = ref([]);

const stateSubmit = computed(() =>
  quotationType.value === 1
    ? listSavedItems.value.length === 0 ||
      listSavedItems.value.filter((fil) => !fil.item || !fil.price).length > 0
    : listSavedItems.value.length === 0 ||
      listSavedItems.value.filter((fil) => !fil.item || !fil.price || !fil.qty)
        .length > 0 ||
      !quotationServPrice.value
);

// Select Customer
const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cust") {
      await getCustomer(val);
    }

    if (fun === "item") {
      await getItem(val);
    }

    if (fun === "usage") {
      await getUsage(val);
    }
  });
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

const getSavedData = async (val) => {
  loading.value = true;
  await api
    .get(`transaction/quotation/view/${btoa(val)}`)
    .then((response) => {
      loading.value = false;

      const hasil = response.data.data;

      quotationCode.value = hasil.TQUO_QUOCD;
      quotationIssueDate.value = hasil.TQUO_ISSUDT;
      quotationCustomerCode.value = hasil.TQUO_CUSCD;
      quotationAttn.value = hasil.TQUO_ATTN;
      quotationSubject.value = hasil.TQUO_SBJCT;
      quotationProjectLocation.value = hasil.TQUO_PROJECT_LOCATION;
      quotationGroupConditions.value = hasil.cond;
      quotationConditions.value = hasil.condlist;
      quotationType.value = parseInt(hasil.TQUO_TYPE);
      quotationServPrice.value = hasil.TQUO_SERVTRANS_COST;

      hasil.det.map((valDet) => {
        listSavedItems.value.push({
          item: valDet.TQUODETA_ITMCD,
          usage: parseInt(valDet.TQUODETA_USAGE),
          price: valDet.TQUODETA_PRC,
          electric: valDet.TQUODETA_ELECTRICITY,
          qty: valDet.TQUODETA_ITMQT,
        });
      });
      console.log(response);
    })
    .catch(() => {
      loading.value = false;
    });
};

const onAddItemLine = () => {
  listSavedItems.value.push({
    item: "",
    usage: "",
    price: "",
    electric: "",
    qty: 1,
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listSavedItems.value.splice(idx, 1);
  });
};

const onClearLines = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to clear all this line ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listSavedItems.value = [];
  });
};

const onClickConditions = () => {
  $q.dialog({
    component: assignConditionsView,
    // componentProps: {
    //   datas: data.data,
    // },
    // persistent: true,
  }).onOk(async (val) => {
    quotationGroupConditions.value = val.MCONDITION_RPT_STAT;
    quotationConditions.value = val.group;
  });
};

const onClickViewListConditions = () => {
  $q.dialog({
    component: viewAssignedCond,
    componentProps: {
      listCond: quotationConditions.value,
    },
    // persistent: true,
  }).onOk(async (val) => {});
};

const onSubmitData = async () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to save all this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    if (quotationConditions.value.length === 0) {
      $q.dialog({
        title: "Confirmation",
        message: `You're not selecting any condition, are you sure want to continue ?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        submitingData()
      });
    } else {
      submitingData()
    }
  });
};

const submitingData = async () => {
  loading.value = true;
  await api_web
    .post("quotationNew/saveAPI", {
      TQUO_QUOCD: quotationCode.value,
      TQUO_CUSCD: quotationCustomerCode.value,
      TQUO_ATTN: quotationAttn.value,
      TQUO_SBJCT: quotationSubject.value,
      TQUO_ISSUDT: quotationIssueDate.value,
      TQUO_PROJECT_LOCATION: quotationProjectLocation.value,
      TQUO_TYPE: quotationType.value,
      TQUO_SERVTRANS_COST: quotationServPrice.value,
      DET: listSavedItems.value,
      COND: quotationGroupConditions.value,
      CONDLIST: quotationConditions.value,
    })
    .then((response) => {
      loading.value = false;
      console.log(response);
      onDialogOK();
    })
    .catch(() => {
      loading.value = false;
    });
};

const onChangeType = (value) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to change type ? This action will clear you lines !!`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    quotationGroupConditions.value = "";
    quotationConditions.value = [];
    quotationServPrice.value = 0;
    listSavedItems.value = [];
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
