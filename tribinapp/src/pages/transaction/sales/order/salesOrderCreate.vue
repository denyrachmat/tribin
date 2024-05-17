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
                @filter="(val, update, abort) => filterFn(val, update, abort, 'quotation')"
                behavior="dialog"
                option-label="DESCSEL"
                option-value="TQUO_QUOCD"
                emit-value
                map-options
                :loading="loading"
              >
              </q-select>
            </div>
            <div class="col">
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const forms = ref({
  TSLO_SLOCD: "",
  TSLO_ISSUDT: "",
  TSLO_PLAN_DLVDT: "",
  TSLO_QUOCD: "",
  TSLO_POCD: ""
});

const filterCol = ref('')
const filter = ref('')

const listQuo = ref([])
const loading = ref(false)

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "quotation") {
      await getQuotation(val);
    }
  });
};

const getQuotation = async () => {
  loading.value = true;
  await api_web
    .post("quotation/search", {
      searchBy: filterCol.value,
      searchValue: filter.value,
    })
    .then((response) => {
      loading.value = false;
      listQuo.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
