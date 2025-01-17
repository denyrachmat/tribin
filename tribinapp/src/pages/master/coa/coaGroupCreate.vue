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
        <div class="text-h6">COA Grouping Settings</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <div class="row q-col-gutter-sm q-pt-sm">
            <div class="col-12 col-sm-6">
              <q-select
                filled
                label="Account Code"
                v-model="forms.ACCMCOAM_H_COACD"
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
          </div>
        </fieldset>

        <fieldset
          style="border: 1px black solid; border-radius: 10px"
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
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent, date } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const forms = ref({
  ACCMCOAM_H_COACD: "",
});
const loading = ref(false);
const listCOA = ref([]);

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

const onChooseCOA = async (value, idx) => {
  console.log([value, idx]);
};
</script>
