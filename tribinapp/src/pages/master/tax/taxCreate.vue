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
        <div class="text-h6">Create Tax Master</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <q-inner-loading :showing="loading" dark>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input label="Code" dense filled v-model="header.MTAX_CODE" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Tax Desc"
                dense
                filled
                v-model="header.MTAX_DESC"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-12">
              <q-input filled v-model="header.MTAX_EFFDT" dense>
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="header.MTAX_EFFDT" mask="YYYY-MM-DD">
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

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-6">
              <q-select
                dense
                filled
                label="Task Type"
                v-model="header.MTAX_TYPE"
                :options="listTax"
                behavior="dialog"
                option-label="MGECD_DESC"
                option-value="MGECD_VALUE"
                emit-value
                map-options
                :loading="loading"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Amount"
                type="number"
                dense
                filled
                v-model="header.MTAX_AMT"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-6">
              <q-input
                label="Tax. Trigger Min"
                type="number"
                dense
                filled
                v-model="header.MTAX_TAXMIN"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Tax. Trigger Max"
                type="number"
                dense
                filled
                v-model="header.MTAX_TAXMAX"
              />
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

const $q = useQuasar();

const props = defineProps({
  dataHeader: Array,
});

const header = ref({
  MTAX_CODE: "",
  MTAX_DESC: "",
  MTAX_EFFDT: "",
  MTAX_TYPE: "AMT",
  MTAX_AMT: "",
  MTAX_TAXMIN: "0",
  MTAX_TAXMAX: "9999999999",
});

const loading = ref(false);
const listTax = ref([]);

onMounted(async () => {
  await getTaxes();

  if (props.dataHeader && Object.values(props.dataHeader).length > 0) {
    header.value = {
      MTAX_CODE: props.dataHeader.MTAX_CODE,
      MTAX_DESC: props.dataHeader.MTAX_DESC,
      MTAX_EFFDT: props.dataHeader.MTAX_EFFDT,
      MTAX_TYPE: props.dataHeader.MTAX_TYPE,
      MTAX_AMT: props.dataHeader.MTAX_AMT,
      MTAX_TAXMIN: props.dataHeader.MTAX_TAXMIN,
      MTAX_TAXMAX: props.dataHeader.MTAX_TAXMAX,
    };
  }
});

const clearForm = () => {
  header.value = {
    MTAX_CODE: "",
    MTAX_DESC: "",
    MTAX_EFFDT: "",
    MTAX_TYPE: "AMT",
    MTAX_AMT: "",
    MTAX_TAXMIN: "0",
    MTAX_TAXMAX: "9999999999",
  };
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "type") {
      await getTaxes(val);
    }
  });
};

const getTaxes = async (val = "TAX_TYPE", cols = "mg.MGECD_CODE") => {
  loading.value = true;
  const whereNya = [
    {
      col: cols,
      opr: "=",
      val: val,
    },
  ];

  await api_web
    .post(`gencode/getDynamicsGencode`, {
      select: ["mg.MGECD_VALUE", "mg.MGECD_DESC"],
      where: whereNya,
      group: ["mg.MGECD_VALUE", "mg.MGECD_DESC"],
    })
    .then((response) => {
      loading.value = false;
      listTax.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this tax master ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`tax`, {
        ...header.value,
      })
      .then((response) => {
        loading.value = false;

        $q.notify({
          color: "green",
          message: `${response.data.msg}`,
        });

        onDialogOK();
      })
      .catch(() => {
        loading.value = false;
      });
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
