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

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-6">
              <q-input
                filled
                label="Doc Reference"
                v-model="forms.GLHIST_DOC"
                readonly
                dense
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input filled v-model="forms.GLHIST_EFFDT" label="Eff Date" dense>
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

        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Detail</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-12 text-right">
              <q-btn flat color="primary" icon="add" @click="onAddItemLine" />
            </div>
          </div>

          <template v-if="formsDet.length > 0">
            <div class="row q-col-gutter-sm q-pt-sm" v-for="(form, idx) in formsDet" :key="idx">
              <div class="col-12 col-sm-3">
                <q-btn-toggle
                  v-model="form.MCOA_TYPE"
                  spread
                  class="my-custom-toggle"
                  no-caps
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  :options="[
                    { label: 'Income', value: 'INC' },
                    { label: 'Expense', value: 'OUT' },
                  ]"
                  disable
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
                    (val, update, abort) => filterFn(val, update, abort, 'coa')
                  "
                  behavior="dialog"
                  option-label="MCOA_COANM_COMB"
                  option-value="MCOA_COACD"
                  emit-value
                  map-options
                  :loading="loading"
                  dense
                  @update:model-value="(value) => onChooseCOA(value, idx)"
                >
                </q-select>
              </div>
              <div class="col-12 col-sm-2">
                <q-input filled label="Valuta" v-model="form.GLHIST_CURR" dense/>
              </div>
              <div class="col-12 col-sm-2">
                <q-input
                  filled
                  label="Description"
                  v-model="form.GLHIST_DESC"
                  dense
                />
              </div>
              <div class="col-12 col-sm-2">
                <q-input filled label="Amount" v-model="form.GLHIST_AMT" dense/>
              </div>
              <div class="col-12 col-sm-1" v-if="form.MCOA_TYPE === 'OUT'">
                <q-btn icon="delete" @click="onClickDeleteLines(idx)" flat color="red"/>
              </div>
            </div>
          </template>
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
  GLHIST_DOC: "",
  GLHIST_EFFDT: "",
  MCOA_TYPE: "INC",
});

const formsDet = ref([]);
const loading = ref(false);
const listCOA = ref([]);

const props = defineProps({
  header: String,
});

onMounted(async () => {
  if (props.header && props.header !== "") {
    await getCOA('');

    forms.value.GLHIST_DOC = props.header.GLHIST_DOC
    forms.value.GLHIST_EFFDT = props.header.GLHIST_EFFDT
    // forms.value.MCOA_TYPE = props.header.MCOA_TYPE

    formsDet.value = props.header.det
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
    GLHIST_ACC: '',
    GLHIST_DOC: forms.value.GLHIST_DOC,
    GLHIST_AMT: 0,
    GLHIST_DESC: "",
    GLHIST_EFFDT: forms.value.GLHIST_EFFDT,
    MCOA_TYPE: 'OUT',
  });

  formsDet.value.push({
    GLHIST_ACC: '',
    GLHIST_DOC: forms.value.GLHIST_DOC,
    GLHIST_AMT: 0,
    GLHIST_DESC: "",
    GLHIST_EFFDT: forms.value.GLHIST_EFFDT,
    MCOA_TYPE: 'INC',
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

const onChooseCOA = (value, idx) => {
  let cekExists = listCOA.value.filter(fil => fil.MCOA_COACD === value)

  if (cekExists.length > 0) {
    formsDet.value[idx].GLHIST_CURR = cekExists[0].MCOA_CURR
    // formsDet.value[idx].MCOA_TYPE = cekExists[0].MCOA_TYPE && cekExists[0].MCOA_TYPE !== '' ? cekExists[0].MCOA_TYPE : 'INC'
  }
}

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this journal ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`${forms.value.GLHIST_DOC ? `acc/journal/${btoa(forms.value.GLHIST_DOC)}` : 'acc/journal'}`, {
        ...forms.value,
        det: formsDet.value
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
