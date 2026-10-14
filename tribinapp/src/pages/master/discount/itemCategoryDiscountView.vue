<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Item Category Discount</span>
        <div class="text-caption text-grey-7">
          Diskon per kategori item. Berlaku untuk semua item dalam kategori tersebut.
        </div>
      </div>
    </div>

    <q-separator />

    <!-- existing category rules -->
    <div class="row q-pt-md">
      <div class="col-12 col-md-5">
        <q-select
          dense
          filled
          label="Kategori Item"
          v-model="category"
          :options="categories"
          option-value="MITM_ITMCAT"
          option-label="MITM_ITMCAT"
          emit-value
          map-options
          :loading="loadingRows"
          @update:model-value="loadFor"
        />
      </div>
    </div>

    <div class="row q-pt-md" v-if="category">
      <div class="col">
        <div class="row q-pb-sm items-center">
          <div class="col">
            <div class="text-subtitle1">
              Diskon untuk kategori <b>{{ category }}</b>
            </div>
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
              <q-td class="text-right">{{ describe(props.row) }}</q-td>
              <q-td>
                <q-select dense filled v-model="props.row.MDIC_MODE" :options="modeOptions" emit-value map-options />
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

    <!-- all rules at a glance -->
    <div class="row q-pt-lg">
      <div class="col">
        <div class="text-subtitle1 q-pb-sm">Semua diskon kategori</div>
        <q-table
          :rows="allRows"
          :columns="allCols"
          row-key="id"
          dense
          :pagination="{ rowsPerPage: 15 }"
          :loading="loadingAll"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api_web } from "boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

const category = ref(null);
const categories = ref([]);
const rows = ref([]);
const allRows = ref([]);
const discOptions = ref([]);
const loadingRows = ref(false);
const loadingAll = ref(false);
const saving = ref(false);

let uid = 0;

const modeOptions = [
  { label: "Stack (menambah)", value: "STACK" },
  { label: "Replace (mengganti)", value: "REPLACE" },
];

const cols = ref([
  { name: "seq", label: "#", field: "seq", align: "center" },
  { name: "disc", label: "Kode Diskon", field: "MDISC_CODE", align: "left" },
  { name: "value", label: "Nilai", field: "value", align: "right" },
  { name: "mode", label: "Mode", field: "MDIC_MODE", align: "left" },
  { name: "action", label: "Aksi", field: "action", align: "center" },
]);

const allCols = ref([
  { name: "MDIC_ITMCAT", label: "Kategori", field: "MDIC_ITMCAT", sortable: true, align: "left" },
  { name: "MDIC_SEQ", label: "#", field: "MDIC_SEQ", align: "center" },
  { name: "MDISC_CODE", label: "Kode", field: "MDISC_CODE", sortable: true, align: "left" },
  { name: "MDISC_DESC", label: "Keterangan", field: "MDISC_DESC", align: "left" },
  { name: "value", label: "Nilai", field: "value", align: "right" },
  { name: "MDIC_MODE", label: "Mode", field: "MDIC_MODE", align: "left" },
]);

onMounted(async () => {
  await getCatalogue();
  await loadAll();
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

const describe = (row) => {
  const d = discOptions.value.find((x) => x.MDISC_CODE === row.MDISC_CODE);
  if (!d) return "";
  return d.type === "PERCENT" ? `${d.value} %` : `Rp ${Number(d.value).toLocaleString("id-ID")}`;
};

const addRow = () => {
  rows.value.push({ uid: ++uid, MDISC_CODE: null, MDIC_MODE: "STACK" });
};

const move = (index, delta) => {
  const to = index + delta;
  if (to < 0 || to >= rows.value.length) return;
  const [item] = rows.value.splice(index, 1);
  rows.value.splice(to, 0, item);
};

const loadAll = async () => {
  loadingAll.value = true;
  await api_web
    .post("discount/item-category/list", {})
    .then((r) => {
      categories.value = r.data?.categories ?? [];
      allRows.value = (r.data?.data ?? []).map((d) => ({
        ...d,
        value: d.type === "PERCENT" ? `${d.value} %` : `Rp ${Number(d.value).toLocaleString("id-ID")}`,
      }));
    })
    .catch(() => {
      categories.value = [];
      allRows.value = [];
    })
    .finally(() => {
      loadingAll.value = false;
    });
};

const loadFor = async (cat) => {
  if (!cat) {
    rows.value = [];
    return;
  }
  loadingRows.value = true;
  await api_web
    .post("discount/item-category/list", {})
    .then((r) => {
      rows.value = (r.data?.data ?? [])
        .filter((d) => d.MDIC_ITMCAT === cat)
        .map((d) => ({ uid: ++uid, MDISC_CODE: d.MDISC_CODE, MDIC_MODE: d.MDIC_MODE }));
    })
    .catch(() => {
      rows.value = [];
    })
    .finally(() => {
      loadingRows.value = false;
    });
};

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
    .post("discount/item-category/save", {
      MDIC_ITMCAT: category.value,
      rows: rows.value.map((r) => ({ MDISC_CODE: r.MDISC_CODE, MDIC_MODE: r.MDIC_MODE })),
    })
    .then((r) => {
      $q.notify({ color: "green", message: r.data?.msg ?? "Saved" });
      loadAll();
      loadFor(category.value);
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
