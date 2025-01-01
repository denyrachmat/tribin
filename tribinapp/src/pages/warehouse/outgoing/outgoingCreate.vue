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
        <div class="text-h6">Create Outgoing Delivery</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <q-inner-loading :showing="loading" dark>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <div class="row">
            <div class="col">
              <q-input
                label="Code"
                readonly
                dense
                filled
                v-model="TDLVORD_DLVCD"
              />
            </div>
            <div class="col q-pl-md">
              <q-input filled v-model="TDLVORD_ISSUDT" dense label="Issue Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="TDLVORD_ISSUDT" mask="YYYY-MM-DD">
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

          <div class="row q-pt-md">
            <div class="col">
              <q-input
                v-model="TDLVORDDETA_SLOCD"
                label="Sales Order"
                dense
                readonly
                v-if="typeOutgoing === 1"
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="search" @click="onSearchSO" />
                </template>
              </q-input>
              <q-select
                v-else
                dense
                filled
                label="DO Choose"
                v-model="TDLVORDDETA_SLOCD"
                use-input
                input-debounce="500"
                :options="listInvoice"
                @filter="
                  (val, update, abort) =>
                    filterFn(val, update, abort, 'invoice')
                "
                behavior="dialog"
                option-label="LABEL"
                option-value="TDLVORD_DLVCD"
                emit-value
                map-options
                :loading="loading"
                :readonly="TDLVORDDETA_SLOCD != ''"
                @update:model-value="(value) => onChooseDO(value)"
              ></q-select>
            </div>
            <div class="col q-pl-md">
              <!-- <q-input v-model="MCUS_CUSNM" label="Customer" dense readonly /> -->
              <q-select
                dense
                filled
                label="Customer Choose"
                v-model="MCUS_CUSNM"
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
                :readonly="TDLVORDDETA_SLOCD != ''"
              >
                <template v-slot:after>
                  <q-btn
                    round
                    dense
                    flat
                    icon="person_add"
                    @click="onAddCustClick()"
                    color="cyan"
                  >
                    <q-tooltip>Add new customer</q-tooltip>
                  </q-btn>
                </template>
              </q-select>
            </div>
          </div>

          <div class="row q-pt-md">
            <div class="col">
              <q-input v-model="TDLVORD_REMARK" label="Remarks" dense>
              </q-input>
            </div>
          </div>
        </fieldset>

        <div class="row q-py-md">
          <div class="col">
            <q-btn-toggle
              v-model="typeOutgoing"
              spread
              no-caps
              toggle-color="purple"
              color="white"
              text-color="black"
              :options="[
                { label: 'From SO', value: 1 },
                { label: 'Send Following DO', value: 2 },
              ]"
              @update:model-value="(val) => clearForm()"
              :disable="TDLVORD_DLVCD != ''"
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

          <div class="row">
            <div class="col">
              <q-checkbox
                v-model="splitInvoice"
                label="Item Split Invoice ?"
                color="teal"
              />
            </div>
            <div class="col">
              <q-checkbox
                v-model="splitSJ"
                label="Split SJ ?"
                color="teal"
                :disable="!TDLVORDDETA_SLOCD"
                @update:model-value="(value) => onChangeSplitSJ(value)"
                :true-value="1"
                :false-value="0"
              />
            </div>
            <div class="colq-pb-sm text-right" v-if="typeOutgoing == 2">
              <q-btn
                icon="add"
                dense
                outline
                @click="onAddItems()"
                color="primary"
                :disable="!TDLVORDDETA_SLOCD"
              />
            </div>
          </div>

          <q-list bordered dense>
            <template v-if="listItems.length > 0">
              <q-item
                v-for="(items, idx) in listItems"
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
                <!-- <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Item Code"
                      filled
                      v-model="items.TSLODETA_ITMCD"
                      readonly
                    />
                  </q-item-label>
                </q-item-section> -->
                <q-item-section>
                  <q-item-label>
                    <!-- <q-input
                      dense
                      label="Item Name"
                      filled
                      v-model="items.MITM_ITMNM"
                      :readonly="TDLVORDDETA_SLOCD != ''"
                    /> -->
                    <q-select
                      dense
                      filled
                      label="Item Name"
                      v-model="items.TSLODETA_ITMCD"
                      use-input
                      input-debounce="500"
                      :options="listItem"
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
                      :readonly="TDLVORDDETA_SLOCD != '' && typeOutgoing == 1"
                      v-on:update:model-value="
                        (value) => onChangeItem(idx, value)
                      "
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Qty"
                      filled
                      v-model="items.BALQT"
                      :readonly="!splitSJ"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Rp"
                      filled
                      v-model="items.TSLODETA_PRC"
                      v-if="typeOutgoing == 2"
                    />
                    <span v-else>
                      Rp. {{ items.TSLODETA_PRC.toLocaleString() }}
                    </span>
                  </q-item-label>
                  <q-item-label caption> Price </q-item-label>
                </q-item-section>
                <q-item-section side v-if="splitSJ == 1">
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
                <q-item-label>
                  Choose sales order first to access item list or Add by click +
                  button above
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </fieldset>
      </q-card-section>

      <q-card-actions>
        <div class="row">
          <div :class="getSumAllDetail.length > 0 ? 'col-4' : 'col'">
            <q-btn
              label="OK"
              color="primary"
              @click="onSubmitData()"
              :loading="loading"
              :disable="getSumAllDetail.length > 0"
            />
            <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
          </div>
          <div class="col" v-for="(sums, idx) in getSumAllDetail" :key="idx">
            <q-chip outline color="red" text-color="white" icon="warning">
              Stock item&nbsp;<b>{{ sums.item }}</b
              >&nbsp;with price Rp &nbsp;<b>{{ sums.prc }}</b
              >&nbsp; only:&nbsp;<b>{{ sums.tot }}</b
              >, total updated Qty is :&nbsp;<b>{{ sums.totList }}</b
              >.
            </q-chip>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

import salesOrderChoose from "./salesOrderChoose.vue";
import { data } from "autoprefixer";

const $q = useQuasar();

const props = defineProps({
  dataHeader: Array,
});

onMounted(async () => {
  await getCustomer(props.dataHeader.TDLVORD_CUSCD);
  if (Object.values(props.dataHeader).length > 0) {
    console.log(props.dataHeader);
    TDLVORD_DLVCD.value = props.dataHeader.TDLVORD_DLVCD;
    TDLVORD_INVCD.value = props.dataHeader.TDLVORD_INVCD;
    TDLVORD_CUSCD.value = props.dataHeader.TDLVORD_CUSCD;
    TDLVORD_ISSUDT.value = props.dataHeader.TDLVORD_ISSUDT;
    TDLVORDDETA_SLOCD.value = props.dataHeader.TDLVORDDETA_SLOCD;
    MCUS_CUSNM.value = props.dataHeader.MCUS_CUSNM;
    TDLVORD_REMARK.value = props.dataHeader.TDLVORD_REMARK;
    listItems.value = props.dataHeader.listItems;
    listItemBackUp.value = props.dataHeader.listItems;
    splitSJ.value = parseInt(props.dataHeader.TDLVOR_ISSPLITSJ);
  }
});

const loading = ref(false);
const TDLVORD_DLVCD = ref("");
const TDLVORD_INVCD = ref("");
const TDLVORD_CUSCD = ref("");
const TDLVORD_ISSUDT = ref("");
const TDLVORDDETA_SLOCD = ref("");
const MCUS_CUSNM = ref("");
const TDLVORD_REMARK = ref("");
const listItems = ref([]);
const listCustomers = ref([]);
const listItem = ref([]);
const listItemBackUp = ref([]);
const splitInvoice = ref(false);
const splitSJ = ref(0);
const typeOutgoing = ref(1);
const listInvoice = ref([]);

const getSumAllDetail = computed(() => {
  let hasilLess = [];
  const itemsMap = new Map();

  listItemBackUp.value.forEach((item) => {
    const totalItem =
      itemsMap.get(item.TSLODETA_ITMCD + item.TSLODETA_PRC) || 0;
    itemsMap.set(
      item.TSLODETA_ITMCD + item.TSLODETA_PRC,
      totalItem + parseInt(item.BALQT)
    );
  });

  console.log(itemsMap);

  listItemBackUp.value.forEach((item) => {
    const totalItem = itemsMap.get(item.TSLODETA_ITMCD + item.TSLODETA_PRC);
    const totalItemOnList = listItems.value
      .filter(
        (fil) =>
          fil.TSLODETA_ITMCD + fil.TSLODETA_PRC ==
          item.TSLODETA_ITMCD + item.TSLODETA_PRC
      )
      .reduce((acc, val) => acc + parseInt(val.BALQT), 0);

    if (totalItem < totalItemOnList) {
      hasilLess.push({
        item: item.TSLODETA_ITMCD,
        prc: item.TSLODETA_PRC,
        status: item.BALQT < totalItem,
        tot: totalItem,
        totList: totalItemOnList,
      });
    }
  });

  return hasilLess;
});

const clearForm = () => {
  TDLVORD_DLVCD.value = "";
  TDLVORD_INVCD.value = "";
  TDLVORD_CUSCD.value = "";
  TDLVORD_ISSUDT.value = "";
  TDLVORDDETA_SLOCD.value = "";
  MCUS_CUSNM.value = "";
  TDLVORD_REMARK.value = "";
  listItems.value = [];
  listItemBackUp.value = [];
  splitInvoice.value = false;
  splitSJ.value = 0;
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cust") {
      getCustomer(val);
    }

    if (fun === "item") {
      await getItem(val);
    }

    if (fun === "invoice") {
      await getInvoice(val);
    }
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
      listCustomers.value = response.data.data;
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

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this outgoing ? ${
      splitInvoice.value
        ? "Split invoice has been checked, this will splitting your item to different invoice."
        : null
    }`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    if (splitInvoice.value) {
      for (let index = 0; index < listItems.value.length; index++) {
        await submitedForm([listItems.value[index]]);
      }
      onDialogOK();
    } else {
      await submitedForm();
      onDialogOK();
    }
  });
};

const submitedForm = async (det = []) => {
  loading.value = true;
  return await api_web
    .post(`delivery`, {
      TDLVORD_DLVCD: TDLVORD_DLVCD.value,
      TDLVORD_CUSCD: TDLVORD_CUSCD.value,
      TDLVORD_ISSUDT: TDLVORD_ISSUDT.value,
      TDLVORDDETA_SLOCD: TDLVORDDETA_SLOCD.value,
      TDLVORD_INVCD: TDLVORD_INVCD.value,
      TDLVORD_REMARK: TDLVORD_REMARK.value,
      SO_DET: det.length > 0 ? det : listItems.value,
      splitInvoice: splitInvoice.value,
      splitSJ: splitSJ.value,
      typeOutgoing: typeOutgoing.value,
    })
    .then((response) => {
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onSearchSO = () => {
  $q.dialog({
    component: salesOrderChoose,
  }).onOk(async (val) => {
    TDLVORDDETA_SLOCD.value = val.TSLO_SLOCD;
    MCUS_CUSNM.value = val.MCUS_CUSNM;
    TDLVORD_CUSCD.value = val.TSLO_CUSCD;
    getListItemCode(val.TSLO_SLOCD);
  });
};

const getListItemCode = async (val) => {
  loading.value = true;
  await api_web
    .get(`delivery/outstanding-warehouse/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
      listItemBackUp.value = response.data.data;
    })
    .catch((e) => {
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
    listItems.value.splice(idx, 1);
  });
};

const onAddItems = () => {
  listItems.value.push({
    MITM_ITMNM: "",
    BALQT: 0,
    TSLODETA_PRC: 0,
  });
};

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPINameOnly", {
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listItem.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onChangeSplitSJ = (state) => {
  if (state) {
    const listItemCheck = [...listItems.value];

    listItems.value = [];
    listItemCheck.map((valMap) => {
      for (let index = 0; index < valMap.BALQT; index++) {
        listItems.value.push({
          ...valMap,
          BALQT: 1,
        });
      }
    });
  } else {
    listItems.value = [...listItemBackUp.value];
  }
};

const onChooseDO = (val) => {
  const getDataDO = listInvoice.value.filter((fil) => fil.TDLVORD_DLVCD == val);

  if (getDataDO.length > 0) {
    const dataDO = getDataDO[0];
    TDLVORDDETA_SLOCD.value = dataDO.TDLVORDDETA_SLOCD;
    MCUS_CUSNM.value = dataDO.MCUS_CUSNM;
    TDLVORD_CUSCD.value = dataDO.TDLVORD_CUSCD;
    TDLVORD_ISSUDT.value = dataDO.TDLVORD_ISSUDT;
    TDLVORD_REMARK.value = dataDO.TDLVORD_REMARK;
    TDLVORD_INVCD.value = dataDO.TDLVORD_INVCD;
    TDLVORD_DLVCD.value = dataDO.TDLVORD_DLVCD;
    splitSJ.value = dataDO.TDLVOR_ISSPLITSJ;
    // typeOutgoing.value = dataDO.TDLVORD_TYPE

    // listItems.value = []
    // dataDO.dlvdet.map(valMap => {
    //   listItems.value.push({
    //     ...valMap,
    //     BALQT: valMap.TDLVORDDETA_ITMQT,
    //     TSLODETA_PRC: valMap.TDLVORDDETA_PRC
    //   })
    // })
    // getListItemCode(dataDO.TDLVORDDETA_SLOCD);
  } else {
    $q.notify({
      color: "red",
      message: "Cannot found the data DO.",
    });
  }
  console.log(getDataDO);
};

const onChangeItem = (idx, value) => {
  const getDataItem = listItem.value.filter((fil) => fil.MITM_ITMNM == value);

  if (getDataItem.length > 0) {
    const dataItem = getDataItem[0];
    listItems.value[idx].TSLODETA_PRC = dataItem.LATEST_PRC;
  } else {
    $q.notify({
      color: "red",
      message: "Cannot found the data Items.",
    });
  }
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
<style>
.wrap-text {
  white-space: normal;
  word-wrap: break-word;
}
</style>
