<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <div class="text-h6">Sales Report by Customer</div>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col">
        <q-select
          dense
          filled
          label="Choose Type"
          v-model="custType"
          :options="custTypeList"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          @update:model-value="getCustomer()"
        >
        </q-select>
      </div>
      <div class="col q-pl-md">
        <q-select
          dense
          filled
          label="Choose Customer"
          v-model="cust"
          :options="custList"
          :loading="loading"
          multiple
          option-label="MCUS_CUSNM"
          option-value="MCUS_CUSCD"
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
const cust = ref([]);
const custList = ref([]);
const loading = ref(false);
const custType = ref("all");
const custTypeList = ref([
  { label: "All", value: "all" },
  { label: "Internal", value: "3" },
  { label: "External", value: "1" },
])

onMounted(() => {
  getCustomer();
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
      .post("receive-order/marketingReportByCustomer", {
        fdate: dateFrom.value,
        ldate: dateTo.value,
        cust: cust.value,
        typeCust : custType.value
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
    if (fun === "customer") {
      await getCustomer(val);
    }
  });
};

const onClickClear = () => {
  dateFrom.value = "";
  dateTo.value = "";
};

const getCustomer = async () => {
  loading.value = true;
  await api_web
    .post("customer/searchAPIMaster", {
        searchBy : 'MCUS_TYPE',
        searchOperator : custType.value === '1' ? 'not like' : 'like',
        searchValue : custType.value === '1' ? '3' : custType.value 
    })
    .then((response) => {
      console.log(response);
      loading.value = false;
      custList.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
