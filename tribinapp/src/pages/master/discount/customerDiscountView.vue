<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Customer Discount</span>
        <div class="text-caption text-grey-7">
          Diskon default per customer. Urutan baris menentukan urutan perhitungan.
        </div>
      </div>
    </div>

    <q-separator />

    <!-- pick a customer -->
    <div class="row q-pt-md q-col-gutter-md items-start">
      <div class="col-12 col-md-6">
        <q-select
          dense
          filled
          use-input
          input-debounce="300"
          label="Customer (ketik minimal 2 huruf)"
          v-model="customer"
          :options="customerOptions"
          option-value="MCUS_CUSCD"
          option-label="MCUS_CUSNM"
          emit-value
          map-options
          :loading="loadingCustomers"
          @filter="filterCustomers"
        >
          <template v-slot:no-option>
            <q-item><q-item-section class="text-grey">No results</q-item-section></q-item>
          </template>
          <template v-slot:selected-item="scope">
            <span v-if="scope.opt">
              {{ scope.opt.MCUS_CUSCD }} - {{ scope.opt.MCUS_CUSNM }}
            </span>
          </template>
        </q-select>
      </div>

      <div class="col-12 col-md-6" v-if="customer">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em"><b>Pengaturan</b></legend>
          <div class="row q-col-gutter-md q-pa-sm">
            <div class="col-12 col-sm-4">
              <q-select
                dense
                filled
                label="Pembulatan"
                v-model="settings.MCUS_ROUNDMODE"
                :options="roundOptions"
                emit-value
                map-options
                hint="Default: Nearest"
              />
            </div>
            <div class="col-12 col-sm-3">
              <q-input
                dense
                filled
                type="number"
                label="Desimal"
                v-model="settings.MCUS_ROUNDDP"
                :min="0"
                :max="6"
                hint="Default: 0"
              />
            </div>
            <div class="col-12 col-sm-5">
              <q-select
                dense
                filled
                label="Gabung dengan diskon kategori"
                v-model="settings.MCUS_DISCMODE"
                :options="modeOptions"
                emit-value
                map-options
                hint="Stack = menambah, Replace = mengganti"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- the discount rows -->
    <div class="row q-pt-md" v-if="customer">
      <div class="col">
        <div class="row q-pb-sm items-center">
          <div class="col">
            <div class="text-subtitle1">Diskon customer ini</div>
          </div>
          <div class="col text-right">
            <q-btn icon="add" color="blue" label="Tambah Diskon" dense no-caps @click="addRow()" />
            <q-btn
              class="q-ml-sm"
              icon="save"
              color="green"
              label="Simpan"
              dense
              no-caps
              :loading="saving"
              @click="onSave()"
            />
          </div>
        </div>

        <q-table
          :rows="rows"
          :columns="cols"
          row-key="uid"
          dense
          hide-bottom
          :pagination="{ rowsPerPage: 0 }"
          :loading="loadingRows"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width class="text-center">{{ props.rowIndex + 1 }}</q-td>

              <q-td>
                <q-select
                  dense
                  filled
                  v-model="props.row.MDISC_CODE"
                  :options="discOptions"
                  option-value="MDISC_CODE"
                  option-label="MDISC_CODE"
                  emit-value
                  map-options
                  @update:model-value="onPickCode(props.row)"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.MDISC_CODE }} - {{ scope.opt.MDISC_DESC }}</q-item-label>
                        <q-item-label caption>
                          {{ scope.opt.type === "PERCENT"
                            ? scope.opt.value + " %"
                            : "Rp " + Number(scope.opt.value).toLocaleString("id-ID") }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-td>

              <q-td class="text-right">
                {{ describe(props.row) }}
              </q-td>

              <q-td>
                <q-select
                  dense
                  filled
                  v-model="props.row.MCUSD_MODE"
                  :options="modeOptions"
                  emit-value
                  map-options
                />
              </q-td>

              <q-td auto-width class="text-center">
                <q-btn flat dense icon="arrow_upward" :disable="props.rowIndex === 0" @click="move(props.rowIndex, -1)" />
                <q-btn flat dense icon="arrow_downward" :disable="props.rowIndex === rows.length - 1" @click="move(props.rowIndex, 1)" />
                <q-btn flat dense icon="delete" color="red" @click="rows.splice(props.rowIndex, 1)" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <div class="row q-pt-md" v-if="customer">
      <div class="col">
        <q-banner dense class="bg-grey-2">
          Urutan di atas dipakai apa adanya: <b>10% lalu Rp 50.000</b> menghasilkan angka
          berbeda dari <b>Rp 50.000 lalu 10%</b>.
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api_web } from "boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

const customer = ref(null);
const customerOptions = ref([]);
const loadingCustomers = ref(false);

const rows = ref([]);
const loadingRows = ref(false);
const saving = ref(false);
const discOptions = ref([]);

const settings = ref({
  MCUS_ROUNDMODE: "NEAREST",
  MCUS_ROUNDDP: 0,
  MCUS_DISCMODE: "STACK",
});

const roundOptions = [
  { label: "Terdekat (Nearest)", value: "NEAREST" },
  { label: "Ke bawah (Down)", value: "DOWN" },
  { label: "Ke atas (Up)", value: "UP" },
];

const modeOptions = [
  { label: "Stack (menambah)", value: "STACK" },
  { label: "Replace (mengganti)", value: "REPLACE" },
];

const cols = ref([
  { name: "seq", label: "#", field: "seq", align: "center" },
  { name: "disc", label: "Kode Diskon", field: "MDISC_CODE", align: "left" },
  { name: "value", label: "Nilai", field: "value", align: "right" },
  { name: "mode", label: "Mode", field: "MCUSD_MODE", align: "left" },
  { name: "action", label: "Aksi", field: "action", align: "center" },
]);

let uid = 0;

onMounted(async () => {
  await getCatalogue();
  // Deliberately NOT preloading the customer list: this company has ~2,700
  // customers, and feeding them all into a dropdown makes it unusable. The picker
  // searches as the user types instead.
});

const getCatalogue = async () => {
  await api_web
    .post("discount/catalogue", {})
    .then((r) => {
      discOptions.value = r.data?.data ?? [];
    })
    .catch(() => {
      discOptions.value = [];
    });
};

const searchCustomers = async (term) => {
  // Require a search term: an empty query would pull thousands of rows.
  if (!term || String(term).trim().length < 2) {
    customerOptions.value = [];
    return;
  }

  loadingCustomers.value = true;
  await api_web
    .post("customer/searchAPI", { searchValue: term })
    .then((r) => {
      const list = r.data?.data ?? [];
      // Cap what reaches the DOM; the user narrows it down by typing.
      customerOptions.value = list.slice(0, 50).map((c) => ({
        MCUS_CUSCD: c.MCUS_CUSCD,
        MCUS_CUSNM: c.MCUS_CUSNM ?? "",
      }));
    })
    .catch(() => {
      customerOptions.value = [];
    })
    .finally(() => {
      loadingCustomers.value = false;
    });
};

const filterCustomers = (val, update) => {
  update(() => searchCustomers(val));
};

const describe = (row) => {
  const d = discOptions.value.find((x) => x.MDISC_CODE === row.MDISC_CODE);
  if (!d) return "";
  return d.type === "PERCENT" ? `${d.value} %` : `Rp ${Number(d.value).toLocaleString("id-ID")}`;
};

const onPickCode = (row) => {
  row.type = discOptions.value.find((x) => x.MDISC_CODE === row.MDISC_CODE)?.type ?? null;
};

const addRow = () => {
  rows.value.push({ uid: ++uid, MDISC_CODE: null, MCUSD_MODE: "STACK" });
};

const move = (index, delta) => {
  const to = index + delta;
  if (to < 0 || to >= rows.value.length) return;
  const [item] = rows.value.splice(index, 1);
  rows.value.splice(to, 0, item);
};

const loadFor = async (cuscd) => {
  if (!cuscd) {
    rows.value = [];
    return;
  }
  loadingRows.value = true;
  await api_web
    .post("discount/customer/list", { MCUSD_CUSCD: cuscd })
    .then((r) => {
      rows.value = (r.data?.data ?? []).map((d) => ({
        uid: ++uid,
        MDISC_CODE: d.MDISC_CODE,
        MCUSD_MODE: d.MCUSD_MODE,
        missing: d.missing,
      }));
      const s = r.data?.settings ?? {};
      settings.value = {
        MCUS_ROUNDMODE: s.MCUS_ROUNDMODE || "NEAREST",
        MCUS_ROUNDDP: s.MCUS_ROUNDDP ?? 0,
        MCUS_DISCMODE: s.MCUS_DISCMODE || "STACK",
      };
    })
    .catch(() => {
      rows.value = [];
    })
    .finally(() => {
      loadingRows.value = false;
    });
};

// watch the customer selection
import { watch } from "vue";
watch(customer, (val) => loadFor(val));

const onSave = async () => {
  const codes = rows.value.map((r) => r.MDISC_CODE).filter(Boolean);
  if (codes.length !== rows.value.length) {
    $q.notify({ type: "negative", message: "Ada baris yang belum dipilih kode diskonnya." });
    return;
  }
  const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
  if (dupes.length) {
    $q.notify({ type: "negative", message: `Kode diskon duplikat: ${[...new Set(dupes)].join(", ")}` });
    return;
  }

  saving.value = true;
  await api_web
    .post("discount/customer/save", {
      MCUSD_CUSCD: customer.value,
      rows: rows.value.map((r) => ({ MDISC_CODE: r.MDISC_CODE, MCUSD_MODE: r.MCUSD_MODE })),
      settings: settings.value,
    })
    .then((r) => {
      $q.notify({ color: "green", message: r.data?.msg ?? "Saved" });
      loadFor(customer.value);
    })
    .catch((e) => {
      $q.notify({
        type: "negative",
        message: e?.response?.data?.error?.[0] ?? e?.response?.data?.message ?? "Gagal menyimpan.",
      });
    })
    .finally(() => {
      saving.value = false;
    });
};
</script>
