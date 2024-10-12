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
        <div class="text-h6">Create New Barcode</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input dense v-model="refCode" outlined label="Ref Code" />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col">
            <q-select
              dense
              filled
              label="Item Name"
              v-model="forms.items"
              use-input
              input-debounce="500"
              :options="listItems"
              @filter="
                (val, update, abort) => filterFn(val, update, abort, 'item')
              "
              behavior="dialog"
              option-label="MITM_ITMNMREAL"
              option-value="MITM_ITMNM"
              map-options
              emit-value
              :loading="loading"
              @update:model-value="value => onChooseItem(value)"
            >
            </q-select>
          </div>
          <div class="col q-pl-md">
            <q-input type="number" dense v-model="stockRef" outlined label="stock"/>
          </div>
        </div>
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
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();
const forms = ref({
  refCode: "",
  items: "",
});
const listItems = ref([]);
const loading = ref(false)

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "item") {
      await getItem(val);
    }
  });
};

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchItemDyn", {
      filter: [{
        cols: 'IS_ITMCD',
        param: '=',
        value: 1
      }],
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSubmitData =() => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this Barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;

    onDialogOK()
  })
}

const onChooseItem = (val) => {
  console.log(val)
}
</script>
