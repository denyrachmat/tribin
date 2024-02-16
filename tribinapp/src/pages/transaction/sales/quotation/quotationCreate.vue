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
        <div class="text-h6">Create New Quotation</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row q-pt-md">
            <div class="col">
              <q-input
                label="Quotation Code"
                dense
                filled
                v-model="quotationCode"
                disable
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                filled
                v-model="quotationIssueDate"
                dense
                label="Issue Date"
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
          <div class="row q-pt-md">
            <div class="col">
              <q-select
                dense
                filled
                label="Customer Name"
                v-model="quotationCustomerCode"
                fill-input
                input-debounce="500"
                :options="listCustomers"
                @filter="(val, update, abort) => filterFn(val, update, abort)"
                behavior="dialog"
                option-label="MCUS_CUSNM"
                option-value="MCUS_CUSCD"
                emit-value
                map-options
              />
            </div>
            <div class="col q-pl-md">
              <q-input label="Attn." dense filled v-model="quotationAttn" />
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col">
              <q-input
                label="Subject"
                dense
                filled
                v-model="quotationSubject"
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                label="Project Location"
                dense
                filled
                v-model="quotationProjectLocation"
              />
            </div>
          </div>
        </fieldset>

        <fieldset
          style="border: 1px black solid; border-radius: 10px"
          class="q-pt-md"
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Detail Items</b>
          </legend>
          <div class="row">
            <div class="col text-right">
              <q-btn flat icon="add" color="blue" label="Add Lines" @click="onAddItemLine"> </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-list bordered>
                <q-item
                  v-for="(items, idx) in listSavedItems"
                  :key="idx"
                  class="q-my-sm"
                  clickable
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label>
                      <q-select
                        dense
                        filled
                        label="Customer Name"
                        v-model="items.item"
                        fill-input
                        input-debounce="500"
                        :options="listItems"
                        @filter="(val, update, abort) => filterFn(val, update, abort)"
                        behavior="dialog"
                        option-label="MITM_ITMNM"
                        option-value="MITM_ITMNM"
                        emit-value
                        map-options
                      />
                    </q-item-label>
                    <q-item-label caption lines="1">Item Detail</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </fieldset>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const loading = ref("");
const quotationCode = ref("");
const quotationIssueDate = ref("");
const quotationCustomerCode = ref("");
const quotationAttn = ref("");
const quotationSubject = ref("");
const quotationProjectLocation = ref("");

const listSavedItems = ref([]);

const listItems = ref([]);
const listCustomers = ref([]);

// Select Customer
const filterFn = (val, update, abort) => {
  update(async () => {
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

const onAddItemLine = () => {
  listSavedItems.value.push({
    item: ''
  })
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
