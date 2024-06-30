<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Journal Report</span>
      </div>
      <div class="col text-right"></div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-input filled v-model="dateFr" label="Closing Date From">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateFr" mask="YYYY-MM-DD">
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
        <q-input filled v-model="dateTo" label="Closing Date To">
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
      <div class="col">
        <q-btn
          :loading="loading"
          label="export excel"
          color="green"
          @click="onExportReport()"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const dateFr = ref("");
const dateTo = ref("");
const listCOA = ref([])
const loading = ref(false);

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

const onExportReport = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to export excel report ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`acc/exportJournalReport`, {
        dateFr: dateFr.value,
        dateTo: dateTo.value,
      }, {
        responseType: 'arraybuffer'
      })
      .then((datas) => {
        loading.value = false;
        const link = document.createElement("a");
        link.download = name;
        // const data = await fetch(datas).then((res) => res.blob());
        link.href = window.URL.createObjectURL(
          new Blob([datas.data], { type: "application/vnd.ms-excel" })
        );
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  });
};
</script>
