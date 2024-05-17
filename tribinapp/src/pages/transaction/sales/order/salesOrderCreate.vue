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
                        <q-input v-model="quot.TSLODETA_ITMCD" readonly dense />
                      </q-item-label>
                      <q-item-label caption> Item Name </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input v-model="quot.TSLODETA_ITMQT" readonly dense />
                      </q-item-label>
                      <q-item-label caption> Qty </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input v-model="quot.TSLODETA_USAGE" readonly dense />
                      </q-item-label>
                      <q-item-label caption> Usage </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <!-- <q-field
                          :model-value="quot.TSLODETA_PRC"
                          borderless
                          @update:modelValue="e => {$emit('update:modelValue', e)}"
                        >
                          {{ quot.TSLODETA_PRC }}
                          <template v-slot:control="{ id, emitValue }">
                            <input
                              :id="id"
                              v-money="moneyFormatForDirective"
                              class="input-1 money-input basis-medium"
                              model-value="modelValue"
                              @change.self="e => emitValue(e.target.value)"
                            >
                          </template>
                        </q-field> -->

                        <q-field
                          filled
                          v-model="quot.TSLODETA_PRC"
                          label="Price with v-money directive"
                          hint="Mask: $ #,###.00 #"
                        >
                          <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                            <input :id="id" class="q-field__input text-right" :value="modelValue" @change="e => emitValue(e.target.value)" v-money3="moneyFormatForDirective" v-show="floatingLabel">
                          </template>
                        </q-field>
                        <!-- <money3 v-model="quot.TSLODETA_PRC" v-bind="moneyFormatForDirective"></money3> {{ quot.TSLODETA_PRC }} -->
                        <!-- <q-input v-model="quot.TSLODETA_PRC" readonly dense /> -->
                      </q-item-label>
                      <q-item-label caption> Price </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input
                          filled
                          v-model="quot.TSLODETA_PERIOD_FROM"
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
                                  v-model="quot.TSLODETA_PERIOD_FROM"
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
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";
import { Money3Directive as money3 } from 'v-money3'

const $q = useQuasar();

const forms = ref({
  TSLO_SLOCD: "",
  TSLO_ISSUDT: "",
  TSLO_PLAN_DLVDT: "",
  TSLO_QUOCD: "",
  TSLO_POCD: "",
});

const filterCol = ref("");
const filter = ref("");

const listQuo = ref([]);
const loading = ref(false);
const quotationType = ref(1);

const quotDetail = ref([]);

const moneyFormatForDirective = ref({
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  // masked: false /* doesn't work with directive */
});

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "quotation") {
      await getQuotation(val);
    }
  });
};

const getQuotation = async (val = "") => {
  loading.value = true;
  await api_web
    .post("quotation/search", {
      searchBy: "MCUS_CUSNM",
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listQuo.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getQuotType = () => {
  return quotationType.value === 1
    ? "Rental"
    : quotationType.value === 2
    ? "Sales"
    : "Service";
};

const onSelectQuotation = async (val) => {
  console.log(val);
  loading.value = true;
  await api
    .get(`transaction/quotation/view/${btoa(val)}`)
    .then((response) => {
      loading.value = false;
      response.data.data.det.map((valMap) => {
        quotDetail.value.push({
          TSLODETA_ITMCD: valMap.TQUODETA_ITMCD,
          TSLODETA_ITMQT: valMap.TQUODETA_ITMQT,
          TSLODETA_USAGE: valMap.TQUODETA_USAGE,
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
    TSLODETA_USAGE: "",
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
    onDialogOK();
  });
};
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
