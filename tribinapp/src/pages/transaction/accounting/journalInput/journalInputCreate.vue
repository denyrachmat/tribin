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
        <div class="text-h6">Input Journal</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col">
              <q-select
                filled
                label="Group Account Code"
                v-model="forms.GRP_ACC"
                use-input
                input-debounce="500"
                :options="listCOAGRP"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'coagrp')
                "
                behavior="dialog"
                option-label="MCOA_COANM_COMB"
                option-value="MCOA_COACD"
                emit-value
                map-options
                :loading="loading"
                dense
                @update:model-value="(value) => onChooseCOAGRP(value)"
              >
              </q-select>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-6">
              <q-input
                filled
                label="Doc Reference"
                v-model="forms.GLHIST_DOC"
                dense
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                filled
                v-model="forms.GLHIST_EFFDT"
                label="Eff Date"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="forms.GLHIST_EFFDT" mask="YYYY-MM-DD">
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
        </fieldset>

        <fieldset
          style="border: 1px black solid; border-radius: 10px; max-height: 80vh"
          v-if="forms.GRP_ACC !== ''"
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Input Amount</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-6 col-sm-12 text-left">
              <q-input
                v-model="forms.GRP_CURR"
                filled
                label="Currency"
                dense
                @update:model-value="(value) => fillCurr(value)"
              />
            </div>
            <div class="col-6 col-sm-12 text-left">
              <q-input
                v-model="forms.GRP_QTY"
                filled
                label="Amount"
                dense
                @update:model-value="(value) => fillQty(value)"
              />
            </div>
            <div class="col-6 col-sm-12 text-right">
              <q-input
                v-model="forms.GRP_DESC"
                filled
                label="Description"
                dense
                @update:model-value="(value) => fillDesc(value)"
              />
            </div>
          </div>
        </fieldset>

        <fieldset
          style="border: 1px black solid; border-radius: 10px; max-height: 80vh"
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Detail</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-6 col-sm-12 text-left">
              <span class="text-h4 text-bold">Total : {{ totalJournal }}</span>
            </div>
            <div class="col-6 col-sm-12 text-right">
              <q-btn
                flat
                color="primary"
                icon="add"
                @click="onAddItemLine"
                :disable="forms.GRP_ACC !== ''"
              />
              <q-btn icon="delete" color="red" @click="onDeleteAll"></q-btn>
            </div>
          </div>

          <div
            v-if="formsDet.length > 0"
            style="max-height: 80vh; overflow: auto"
          >
            <template v-for="(form, idx) in formsDet">
              <div
                class="row q-col-gutter-sm q-pt-sm"
                :key="idx"
                v-if="form.GLHIST_DESC !== 'BEGIN_STOCK'"
              >
                <div class="col-12 col-sm-3">
                  <q-btn-toggle
                    v-model="form.MCOA_TYPE"
                    spread
                    class="my-custom-toggle"
                    no-caps
                    rounded
                    unelevated
                    color="white"
                    text-color="primary"
                    :options="[
                      { label: 'Income', value: 'INC', toggleColor: 'blue' },
                      { label: 'Expense', value: 'OUT', toggleColor: 'orange' },
                    ]"
                    :disable="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-select
                    filled
                    label="Account Code"
                    v-model="form.GLHIST_ACC"
                    use-input
                    input-debounce="500"
                    :options="listCOA"
                    @filter="
                      (val, update, abort) =>
                        filterFn(val, update, abort, 'coa')
                    "
                    behavior="dialog"
                    option-label="MCOA_COANM_COMB"
                    option-value="MCOA_COACD"
                    emit-value
                    map-options
                    :loading="loading"
                    dense
                    @update:model-value="(value) => onChooseCOA(value, idx)"
                    :readonly="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  >
                  </q-select>
                </div>
                <div class="col-12 col-sm-2">
                  <q-input
                    filled
                    label="Valuta"
                    v-model="form.GLHIST_CURR"
                    dense
                    :readonly="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-input
                    filled
                    label="Description"
                    v-model="form.GLHIST_DESC"
                    dense
                    :readonly="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-input
                    filled
                    label="Amount"
                    v-model="form.GLHIST_AMT"
                    dense
                    :readonly="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  />
                </div>
                <div class="col-12 col-sm-1">
                  <q-btn
                    icon="delete"
                    @click="onClickDeleteLines(idx)"
                    flat
                    :color="forms.GRP_ACC !== '' ? 'grey' : red"
                    :readonly="
                      forms.GRP_ACC !== '' || form.GLHIST_DESC == 'BEGIN_AMOUNT'
                    "
                  />
                </div>
              </div>
            </template>
          </div>
          <template v-else>
            <div class="row q-col-gutter-sm q-pt-sm">
              <div class="col-12 text-center">
                Click + button to add
                {{ forms.MCOA_TYPE === "INC" ? "Income" : "Expense" }}
              </div>
            </div>
          </template>
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

const $q = useQuasar();

const forms = ref({
  GRP_ACC: "",
  GRP_CURR: "",
  GRP_QTY: 0,
  GRP_DESC: "",
  GLHIST_DOC: "",
  GLHIST_EFFDT: "",
  MCOA_TYPE: "INC",
});

const formsDet = ref([]);
const loading = ref(false);
const listCOA = ref([]);
const listCOAGRP = ref([]);

const props = defineProps({
  header: String,
});

onMounted(async () => {
  await getCOA("");
  if (props.header && props.header !== "") {
    forms.value.GLHIST_DOC = props.header.GLHIST_DOC;
    forms.value.GLHIST_EFFDT = props.header.GLHIST_EFFDT;

    formsDet.value = props.header.det;
  }
});

const totalJournal = computed(() =>
  formsDet.value.length > 0
    ? parseInt(
        formsDet.value.reduce((sum, item, idx) => {
          console.log(formsDet.value[0].GLHIST_ACC);
          if (item.GLHIST_ACC == formsDet.value[0].GLHIST_ACC) {
            return item.MCOA_TYPE === "INC"
              ? sum + parseInt(item.GLHIST_AMT)
              : sum - parseInt(item.GLHIST_AMT);
          } else {
            return sum;
          }
        }, 0)
      ).toLocaleString()
    : 0
);

const stateSubmit = computed(
  () =>
    !forms.value.GLHIST_DOC ||
    !forms.value.GLHIST_EFFDT ||
    formsDet.value.filter((fil) => !fil.GLHIST_ACC || !fil.GLHIST_CURR).length >
      0
);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "coa") {
      await getCOA(val);
    }

    if (fun === "coagrp") {
      await getCOAGroup(val);
    }
  });
};

const getCOA = async (val, cols = "MCOA_COACD") => {
  loading.value = true;
  await api_web
    .post("coa/searchAPISingle", {
      searchValue: val,
      searchCol: cols,
    })
    .then((response) => {
      loading.value = false;
      listCOA.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getCOAGroup = async (val, cols = "MCOA_COACD") => {
  loading.value = true;
  await api_web
    .post("coa/searchAPIGroup", {
      searchValue: val,
      searchCol: cols,
    })
    .then((response) => {
      loading.value = false;
      listCOAGRP.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onAddItemLine = () => {
  formsDet.value.push({
    GLHIST_ACC: "",
    GLHIST_DOC: forms.value.GLHIST_DOC,
    GLHIST_AMT: 0,
    GLHIST_DESC: "",
    GLHIST_EFFDT: forms.value.GLHIST_EFFDT,
    MCOA_TYPE: "INC",
  });
};

const onDeleteAll = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete all line on this journal ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    forms.value.GRP_ACC = "";
    formsDet.value = [];
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    formsDet.value.splice(idx, 1);
    formsDet.value.splice(idx + 1, 1);
  });
};

const onChooseCOA = async (value, idx) => {
  let cekExists = listCOA.value.filter((fil) => fil.MCOA_COACD === value);

  if (cekExists.length > 0) {
    if (idx === 0) {
      const dataStock = await getStockCOA(value);
      if (dataStock) {
        formsDet.value = [
          {
            MCOA_TYPE: "INC",
            GLHIST_ACC: value,
            GLHIST_CURR: cekExists[0].MCOA_CURR,
            GLHIST_DESC: "BEGIN_AMOUNT",
            GLHIST_AMT: dataStock.GLHIST_AMT,
          },
          ...formsDet.value,
        ];
      }
    }
    formsDet.value[idx].GLHIST_CURR = cekExists[0].MCOA_CURR;
    formsDet.value[idx].MCOA_TYPE =
      cekExists[0].MCOA_TYPE && cekExists[0].MCOA_TYPE !== ""
        ? cekExists[0].MCOA_TYPE
        : "INC";
  }
};

const onChooseCOAGRP = (value) => {
  let cekExists = listCOAGRP.value.filter((fil) => fil.MCOA_COACD === value);

  if (cekExists.length > 0) {
    formsDet.value = [];

    cekExists[0].det.map(async (valMap, idx) => {
      formsDet.value.push(
        {
          MCOA_TYPE: "OUT",
          GLHIST_ACC: valMap.MCOAM_CR_COACD,
          GLHIST_CURR: valMap.getcoacredit.MCOA_CURR,
          GLHIST_DESC: "",
          GLHIST_AMT: 0,
        },
        {
          MCOA_TYPE: "INC",
          GLHIST_ACC: valMap.MCOAM_DB_COACD,
          GLHIST_CURR: valMap.getcoadebit.MCOA_CURR,
          GLHIST_DESC: "",
          GLHIST_AMT: 0,
        }
      );

      if (idx === 0) {
        const dataStock = await getStockCOA(valMap.MCOAM_CR_COACD);

        if (dataStock) {
          formsDet.value = [
            {
              MCOA_TYPE: "INC",
              GLHIST_ACC: valMap.MCOAM_CR_COACD,
              GLHIST_CURR: valMap.getcoacredit.MCOA_CURR,
              GLHIST_DESC: "BEGIN_AMOUNT",
              GLHIST_AMT: dataStock.GLHIST_AMT,
            },
            ...formsDet.value,
          ];
        }
      }
    });
  }
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this journal ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(
        `${
          forms.value.GLHIST_DOC
            ? `acc/journals/${btoa(forms.value.GLHIST_DOC)}`
            : "acc/journals"
        }`,
        {
          ...forms.value,
          det: formsDet.value.filter(
            (fil) => fil.GLHIST_DESC !== "BEGIN_AMOUNT"
          ),
        }
      )
      .then((response) => {
        loading.value = false;

        $q.notify({
          color: "green",
          message: `${response.data.msg}`,
        });
        onDialogOK();
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const getStockCOA = async (coa) => {
  loading.value = true;
  return await api_web
    .get(`acc/journal/getStockCOA/${btoa(coa)}`)
    .then((response) => {
      loading.value = false;
      return response.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const fillCurr = (val) => {
  // MCOA_TYPE
  // GLHIST_ACC
  // GLHIST_CURR
  // GLHIST_DESC
  // GLHIST_AMT

  formsDet.value.map((valmap, idx) => {
    if (idx > 0) {
      formsDet.value[idx].GLHIST_CURR = val;
    }
  });
};

const fillQty = (val) => {
  formsDet.value.map((valmap, idx) => {
    if (idx > 0) {
      formsDet.value[idx].GLHIST_AMT = val;
    }
  });
};
const fillDesc = (val) => {
  formsDet.value.map((valmap, idx) => {
    if (idx > 0) {
      formsDet.value[idx].GLHIST_DESC = val;
    }
  });
};

const checkTotalQty = computed(() => 0);
</script>
