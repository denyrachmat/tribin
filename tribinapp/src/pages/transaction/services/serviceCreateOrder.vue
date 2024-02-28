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
        <div class="text-h6">Create Order</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>
          <div class="row">
            <div class="col">
              <q-input
                label="SPK No"
                readonly
                dense
                v-model="dataApi.SRVH_DOCNO"
                filled
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                filled
                v-model="dataApi.SRVH_ISSDT"
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
                      <q-date v-model="dataApi.SRVH_ISSDT" mask="YYYY-MM-DD">
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
                label="Customer Choose"
                v-model="dataApi.SRVH_CUSCD"
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
              >
              </q-select>
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
            <b>Detail Items</b>
          </legend>

          <div class="row q-pb-sm">
            <div class="col text-right">
              <q-btn flat icon="add" color="blue" @click="addItemLine()">
                <q-tooltip>Add lines</q-tooltip>
              </q-btn>
            </div>
          </div>

          <q-list bordered dense>
            <template v-if="submitedItems.length > 0">
              <q-item
                v-for="(items, idx) in submitedItems"
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
                      v-model="items.TSRVD_ITMCD"
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
                <q-item-section>
                  <q-input label="Qty" filled dense v-model="items.TSRVD_QTY" />
                </q-item-section>
                <q-item-section>
                  <q-input
                    label="Problem"
                    filled
                    dense
                    v-model="items.TSRVD_CUSTRMK"
                  />
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="delete"
                    color="red"
                    flat
                    @click="onClickDeleteLines(idx)"
                  >
                    <q-tooltip>Delete line</q-tooltip>
                  </q-btn>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="library_add"
                    color="indigo"
                    flat
                    @click="onClickAddItem(idx)"
                  >
                    <q-tooltip>Add new item</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>

            <q-item class="q-my-sm" clickable v-ripple v-else>
              <q-item-section>
                <q-item-label> No Items Added </q-item-label>
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
import { onMounted, ref } from "vue";
import { date, useQuasar, useDialogPluginComponent } from "quasar";

import itemCreate from "src/pages/master/items/itemCreate.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  header: Array,
  detail: Array,
});

onMounted(async () => {
  if (props.header) {
    await getCustomer()
    await getItem()
    dataApi.value = props.header;
    submitedItems.value = props.detail
  }
});

const dataApi = ref({
  SRVH_DOCNO: "",
  SRVH_ISSDT: date.formatDate(Date.now(), "YYYY-MM-DD"),
  SRVH_CUSCD: "",
});
const listItems = ref([]);
const listCustomers = ref([]);
const submitedItems = ref([]);
const loading = ref(false);
const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cust") {
      await getCustomer(val);
    }

    if (fun === "item") {
      await getItem(val);
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

const addItemLine = () => {
  submitedItems.value.push({
    TSRVD_ITMCD: "",
    TSRVD_LINE: submitedItems.value.length + 1,
    TSRVD_QTY: 1,
    TSRVD_CUSTRMK: "",
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    submitedItems.value.splice(idx, 1);
  });
};

const onClickAddItem = (idx) => {
  $q.dialog({
    component: itemCreate,
    componentProps: {
      ItemCat: "SERVICE_ITEMM",
    },
    // persistent: true,
  }).onOk(async (val) => {
    await getItem("");
    submitedItems.value[idx].TSRVD_ITMCD = val.MITM_ITMNM;
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to submit this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("servicesAdmin", {
        header: dataApi.value,
        detail: submitedItems.value,
      })
      .then((val) => {
        loading.value = false;
        onDialogOK();
      });
  });
};
</script>
