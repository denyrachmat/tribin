<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <div class="text-h6">Sales Report by Category</div>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col">
        <q-select
          dense
          filled
          label="Choose Item Category"
          v-model="itmCat"
          :options="itmCatList"
          :loading="loading"
          multiple
        >
        </q-select>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col">
        <q-input filled v-model="dateFrom" label="Date From" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateFrom" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col q-pl-md">
        <q-input filled v-model="dateTo" label="Date To" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateTo" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col text-right">
        <q-btn
          color="green"
          label="Submit"
          @click="onClickSubmit()"
          :loading="loading"
        />
        <q-btn
          flat
          color="orange"
          label="clear"
          @click="onClickClear()"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const dateFrom = ref("");
const dateTo = ref("");
const itmCat = ref([]);
const itmCatList = ref([]);
const loading = ref(false);

onMounted(() => {
  getItemCat();
});

const onClickSubmit = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this report ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("receive-order/marketingReport", {
        fdate: dateFrom.value,
        ldate: dateTo.value,
        itmCat: itmCat.value,
      })
      .then((response) => {
        loading.value = false;
        let pdfWindow = window.open("");
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(response.data) +
            "'></iframe>"
        );
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "itemCat") {
      await getItemCat(val);
    }
  });
};

const onClickClear = () => {
  dateFrom.value = "";
  dateTo.value = "";
};

const getItemCat = async () => {
  loading.value = true;
  await api_web
    .get("item/getCategory")
    .then((response) => {
      console.log(response);
      loading.value = false;
      itmCatList.value = response.data;
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
