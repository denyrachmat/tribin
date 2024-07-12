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
        <div class="text-h6">Create Location</div>
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
              <q-input label="Code" dense filled v-model="header.MLOC_LOCCD" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Location Name"
                dense
                filled
                v-model="header.MLOC_LOCNM"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-12">
              <q-select
                dense
                filled
                label="Parent Location"
                v-model="header.MLOC_LOCPRNTCD"
                use-input
                input-debounce="500"
                :options="listLoc"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'loc')
                "
                behavior="dialog"
                option-label="MLOC_LOCCD"
                option-value="MLOC_LOCNM"
                emit-value
                map-options
                :loading="loading"
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
  MLOC_LOCCD: "",
  MLOC_LOCNM: "",
  MLOC_LOCPRNTCD: "",
});

const loading = ref(false);
const listLoc = ref([]);

onMounted(async () => {
  await getLocation("");

  if (props.dataHeader && Object.values(props.dataHeader).length > 0) {
    header.value = {
      MLOC_LOCCD: props.dataHeader.MLOC_LOCCD,
      MLOC_LOCNM: props.dataHeader.MLOC_LOCNM,
      MLOC_LOCPRNTCD: props.dataHeader.MLOC_LOCPRNTCD,
    };
  }
});

const clearForm = () => {
  header.value = {
    MLOC_LOCCD: "",
    MLOC_LOCNM: "",
    MLOC_LOCPRNTCD: "",
  };
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "loc") {
      await getLocation(val);
    }
  });
};

const getLocation = async (val, cols = "MSUP_SUPNM") => {
    loading.value = true;
  await api_web
    .post(`location/searchAPI`, {
      searchBy: cols,
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listLoc.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
}

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this location ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`location`, {
        header: header.value,
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
