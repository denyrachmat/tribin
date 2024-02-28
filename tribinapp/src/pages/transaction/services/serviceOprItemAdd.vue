<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="text-h6">Update Used Item</div>
          </div>
          <div class="col text-right" v-if="props.mode !== 'view'">
            <q-btn icon="add" outline color="blue" @click="onClickAddItem" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="max-height: 50vh">
        <q-list bordered>
          <q-item
            class="q-my-sm"
            clickable
            v-ripple
            v-if="listItemsSel.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(items, idx) in listItemsSel"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ idx + 1 }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-select
                  dense
                  filled
                  label="Item Name"
                  v-model="items.TSRVF_ITMCD"
                  use-input
                  input-debounce="500"
                  :options="listItems"
                  @filter="
                    (val, update, abort) => filterFn(val, update, abort, 'item')
                  "
                  behavior="dialog"
                  option-label="MITM_ITMNM"
                  option-value="MITM_ITMCD"
                  emit-value
                  map-options
                  :loading="loading"
                  :readonly="props.mode === 'view'"
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-input
                label="Price"
                v-model="items.TSRVF_PRC"
                filled
                dense
                :readonly="props.mode === 'view'"
              />
            </q-item-section>

            <q-item-section side>
              <q-btn
                icon="delete"
                flat
                color="red"
                @click="onClickDeleteLine(idx)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :disable="loading"
          :loading="loading"
        />
        <q-btn
          flat
          label="Cancel"
          color="red"
          @click="onDialogCancel"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api, api_web } from "boot/axios";
import { onMounted, ref } from "vue";
import { date, useQuasar, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  mode: String,
  dataItem: Array,
});

onMounted(() => {
    if (props.dataItem.listFixDet) {
        listItemsSel.value = props.dataItem.listFixDet
    }
})

const listItems = ref([]);
const listItemsSel = ref([]);
const loading = ref(false);

const onClickAddItem = () => {
  listItemsSel.value.push({
    TSRVD_ID: props.dataItem.id,
    TSRVF_ITMCD: "",
    TSRVF_PRC: 0,
  });
};

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
    .post("item/searchAPITBL", {
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

const onSubmitData = () => {
  q.dialog({
    title: "Confirmation",
    message: `Are you sure want to save this items ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    onDialogOK(listItemsSel.value);
  });
};

const onClickDeleteLine = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to delete this lines no ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listItemsSel.value.splice(idx, 1);
  });
};
</script>
