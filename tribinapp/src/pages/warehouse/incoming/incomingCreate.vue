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
          <div class="row q-col-gutter-sm">
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

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-select
                dense
                filled
                label="Supplier Name"
                v-model="header.TRCV_SUPCD"
                use-input
                input-debounce="500"
                :options="listSupplier"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'cust')
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
            <div class="col-12 col-sm-6">
              <q-select
                dense
                filled
                label="PO Number"
                v-model="header.PO_NO"
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
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Item Code"
                      filled
                      v-model="items.item_code"
                      readonly
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      dense
                      label="Item Name"
                      filled
                      v-model="items.MITM_ITMNM"
                      readonly
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
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Rp. {{ items.unit_price.toLocaleString() }}
                  </q-item-label>
                  <q-item-label caption> Price </q-item-label>
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
                <q-item-label>
                  Choose sales order first to access item list
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </fieldset>
      </q-card-section>
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
});

const inctype = ref(1);

const listItems = ref([]);

const loading = ref(false);
const listSupplier = ref([]);
const listPO = ref([]);

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cust") {
      getSupplier(val);
    }

    if (fun === "item") {
      await getItem(val);
    }

    if (fun === "po") {
      await getPO(val);
    }
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
      listCustomers.value = response.data.data;
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
    listItems.value.splice(idx, 1);
  });
};

const onAddItemLine = () => {
  listItems.value.push({
    item_code: "",
    MITM_ITMNM: "",
    quantity: "",
    unit_price: "",
  });
};
</script>
