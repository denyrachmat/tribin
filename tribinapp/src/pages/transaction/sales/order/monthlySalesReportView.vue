<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <div class="text-h6">Sales Report (Bulanan / Branch)</div>
        <div class="text-caption text-grey-7">
          Laporan per bulan, bisa difilter per cabang.
        </div>
      </div>
    </div>

    <!-- Mode -->
    <div class="row q-pt-md">
      <div class="col">
        <q-btn-toggle
          v-model="mode"
          dense
          no-caps
          toggle-color="primary"
          :options="[
            { label: 'Per Bulan', value: 'month' },
            { label: 'Rentang Tanggal', value: 'range' },
          ]"
        />
      </div>
    </div>

    <!-- Per bulan -->
    <div class="row q-pt-md" v-if="mode === 'month'">
      <div class="col-12 col-md-4">
        <q-input filled :model-value="monthLabel" label="Bulan" dense readonly>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="month"
                  mask="YYYY-MM"
                  default-view="Months"
                  emit-immediately
                  years-in-month-view
                  minimal
                  @update:model-value="onMonthPicked"
                >
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

    <!-- Rentang tanggal -->
    <div class="row q-pt-md" v-if="mode === 'range'">
      <div class="col-12 col-md-4">
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
      <div class="col-12 col-md-4 q-pl-md">
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

    <!-- Kategori -->
    <div class="row q-pt-md">
      <div class="col-12 col-md-6">
        <q-select
          dense
          filled
          label="Choose Item Category"
          v-model="itmCat"
          :options="itmCatList"
          :loading="loading"
          multiple
          use-input
          input-debounce="0"
          @filter="(val, update) => filterFn(val, update, null, 'itemCat')"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <!-- Cabang -->
    <div class="row q-pt-md">
      <div class="col-12 col-md-4">
        <q-select
          dense
          filled
          clearable
          label="Cabang (kosong = semua cabang)"
          v-model="branch"
          :options="branchOptions"
          option-value="code"
          option-label="name"
          emit-value
          map-options
          :disable="branchOptions.length <= 1"
          :hint="
            branchOptions.length <= 1
              ? 'Anda hanya punya akses satu cabang'
              : ''
          "
        />
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
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api_web } from "boot/axios";

const $q = useQuasar();
const mode = ref("month");
const month = ref(""); // YYYY-MM, consumed by q-date as "today"
const dateFrom = ref("");
const dateTo = ref("");
const itmCat = ref([]);
const itmCatList = ref([]);
const branch = ref("");
const branchOptions = ref([]);
const loading = ref(false);

const pad = (n) => String(n).padStart(2, "0");

const today = new Date();
const thisMonth = `${today.getFullYear()}-${pad(today.getMonth() + 1)}`;

const monthLabel = computed(() =>
  month.value ? new Date(`${month.value}-01`).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  }) : ""
);

onMounted(() => {
  // Default to the current month, the common case for a monthly report.
  month.value = thisMonth;
  getItemCat();
  getBranchOptions();
});

const onMonthPicked = () => {
  // q-date may hand back a string; keep only the YYYY-MM part.
  if (typeof month.value === "string" && month.value.length > 7) {
    month.value = month.value.slice(0, 7);
  }
};

const getBranchOptions = async () => {
  await api_web
    .get("receive-order/salesReportBranchOptions")
    .then((response) => {
      branchOptions.value = response.data?.data ?? [];
    })
    .catch(() => {
      branchOptions.value = [];
    });
};

const getItemCat = async (val) => {
  loading.value = true;
  try {
    const response = await api_web.get("item/getCategory");
    const all = response.data || [];
    if (val) {
      itmCatList.value = all.filter((c) =>
        String(c).toLowerCase().includes(String(val).toLowerCase())
      );
    } else {
      itmCatList.value = all;
    }
  } catch (e) {
    itmCatList.value = [];
  } finally {
    loading.value = false;
  }
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "itemCat") {
      await getItemCat(val);
    }
  });
};

const buildPayload = () => {
  const payload = {
    itmCat: itmCat.value,
    // An empty string means "every branch I may see"; the backend decides.
    branch: branch.value ?? "",
  };

  if (mode.value === "month") {
    payload.mode = "month";
    payload.month = month.value;
  } else {
    payload.mode = "range";
    payload.fdate = dateFrom.value;
    payload.ldate = dateTo.value;
  }

  return payload;
};

const validate = () => {
  if (mode.value === "month" && !month.value) {
    $q.notify({ type: "negative", message: "Pilih bulan laporan dulu." });
    return false;
  }
  if (mode.value === "range" && (!dateFrom.value || !dateTo.value)) {
    $q.notify({
      type: "negative",
      message: "Isi Date From dan Date To.",
    });
    return false;
  }
  return true;
};

const onClickSubmit = () => {
  if (!validate()) return;

  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this report ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    try {
      const response = await api_web.post(
        "receive-order/marketingReport",
        buildPayload()
      );
      const pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(response.data) +
          "'></iframe>"
      );
    } catch (e) {
      const msg =
        e?.response?.data?.error?.[0] ??
        "Gagal membuat laporan. Coba lagi atau hubungi admin.";
      $q.notify({ type: "negative", message: msg });
    } finally {
      loading.value = false;
    }
  });
};

const onClickClear = () => {
  month.value = thisMonth;
  dateFrom.value = "";
  dateTo.value = "";
  itmCat.value = [];
  branch.value = "";
};
</script>
