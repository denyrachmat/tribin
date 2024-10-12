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
            <q-input dense v-model="refCode" outlined />
          </div>
        </div>
        <div class="row">
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
              option-label="MITM_ITMNM"
              option-value="MITM_ITMNM"
              emit-value
              map-options
              :loading="loading"
            >
            </q-select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-input dense v-model="stockRef" outlined />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar } from "quasar";

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
    .post("item/searchAPI", {
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
