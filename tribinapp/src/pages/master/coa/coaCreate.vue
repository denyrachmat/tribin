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
        <div class="text-h6">Closing Period</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-input
                filled
                label="COA Number"
                v-model="forms.MCOA_COACD"
                dense
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input filled v-model="forms.MCOA_COANM" label="COA Name" dense>
              </q-input>
            </div>
          </div>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-6">
              <q-input filled label="Valuta" v-model="forms.MCOA_CURR" dense />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                filled
                v-model="forms.MCOA_TYPE"
                :options="listType"
                label="Filled"
                dense
                @update:model-value="(value) => onChooseCOAType(value)"
                emit-value
                map-options
              />
            </div>
          </div>
        </fieldset>

        <fieldset
          style="border: 1px black solid; border-radius: 10px"
          v-if="forms.MCOA_TYPE === 'group'"
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>COA Mapping</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-12 text-right">
              <q-btn flat color="primary" icon="add" @click="onAddItemLine" />
            </div>
          </div>

          <template v-if="formsDet.length > 0">
            <div
              class="row q-col-gutter-sm q-pt-sm"
              v-for="(form, idx) in formsDet"
              :key="idx"
            >
              <div class="col-12 col-sm-4">
                <q-select
                  filled
                  label="Account Code Credit"
                  v-model="form.MCOAM_CR_COACD"
                  use-input
                  input-debounce="500"
                  :options="listCOA"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'coa')
                  "
                  behavior="dialog"
                  option-label="MCOA_COANM_COMB"
                  option-value="MCOA_COACD"
                  emit-value
                  map-options
                  :loading="loading"
                  dense
                >
                </q-select>
              </div>
              <div class="col-12 col-sm-3">
                <q-select
                  filled
                  label="Account Code Debit"
                  v-model="form.MCOAM_DB_COACD"
                  use-input
                  input-debounce="500"
                  :options="listCOA"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'coa')
                  "
                  behavior="dialog"
                  option-label="MCOA_COANM_COMB"
                  option-value="MCOA_COACD"
                  emit-value
                  map-options
                  :loading="loading"
                  dense
                >
                </q-select>
              </div>
              <div class="col-12 col-sm-4">
                <q-input
                  filled
                  label="Description"
                  v-model="form.MCOAM_DESC"
                  dense
                />
              </div>
              <div class="col-12 col-sm-1">
                <q-btn
                  icon="delete"
                  @click="onClickDeleteLines(idx)"
                  flat
                  color="red"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="row q-col-gutter-sm q-pt-sm">
              <div class="col-12 text-center">Click + button to add</div>
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
  MCOA_COACD: "",
  MCOA_COANM: "",
  MCOA_CURR: "",
  MCOA_TYPE: "INC",
});

const formsDet = ref([]);
const loading = ref(false);
const listCOA = ref([]);
const listType = ref([
  {
    label: "Income",
    value: "INC",
  },
  {
    label: "Expense",
    value: "OUT",
  },
  {
    label: "Account Group",
    value: "group",
  },
]);

const props = defineProps({
  header: String,
});

onMounted(async () => {
  if (props.header && props.header !== "") {
    await getCOA("");
    forms.value.MCOA_COACD = props.header.MCOA_COACD;
    forms.value.MCOA_COANM = props.header.MCOA_COANM;
    forms.value.MCOA_CURR = props.header.MCOA_CURR;
    forms.value.MCOA_TYPE = props.header.MCOA_TYPE;
    formsDet.value = props.header.det;
  }
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "coa") {
      await getCOA(val);
    }
  });
};

const getCOA = async (val, cols = "MCOA_COACD") => {
  loading.value = true;
  await api_web
    .post("coa/searchAPI", {
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

const onAddItemLine = () => {
  formsDet.value.push({
    MCOAM_H_COACD: forms.value.MCOA_COACD,
    MCOAM_CR_COACD: "",
    MCOAM_DB_COACD: "",
    MCOAM_DESC: "",
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

const onChooseCOAType = (value) => {
  formsDet.value = [];
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this COA ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("coa", {
        ...forms.value,
        det: formsDet.value,
      })
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
</script>
