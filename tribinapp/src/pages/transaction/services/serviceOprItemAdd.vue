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
                <div v-if="props.mode === 'view'">
                  <q-item-label v-if="!loading">
                    {{
                      items.MITM_ITMNM
                        ? items.MITM_ITMNM
                        : listItems.filter(
                            (fil) => fil.MITM_ITMCD == items.TSRVF_ITMCD
                          )[0].MITM_ITMNM
                    }}
                  </q-item-label>
                  <q-item-label v-else>
                    Please wait, loading item description
                  </q-item-label>
                  <q-item-label caption> Item </q-item-label>
                </div>
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
                  @update:model-value="(value) => onSelectItem(value, idx)"
                  v-else
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <div v-if="props.mode === 'view'">
                <q-item-label>
                  {{ items.TSRVF_PRC.toLocaleString() }}
                </q-item-label>
                <q-item-label caption> Price </q-item-label>
              </div>
              <q-input
                label="Price"
                v-model="items.TSRVF_PRC"
                filled
                dense
                :readonly="props.mode === 'view'"
                v-else
              />
            </q-item-section>

            <q-item-section>
              <div v-if="props.mode === 'view'">
                <q-item-label>
                  {{ items.TSRVF_QTY.toLocaleString() }}
                </q-item-label>
                <q-item-label caption> Qty </q-item-label>
              </div>
              <q-input
                label="Qty"
                v-model="items.TSRVF_QTY"
                filled
                dense
                :readonly="props.mode === 'view'"
                v-else
                @update:model-value="(value) => onInputQty(value, idx)"
              />
            </q-item-section>

            <q-item-section v-if="props.mode === 'view'">
              <q-item-label>
                Rp
                {{
                  (
                    parseInt(items.TSRVF_PRC) * parseInt(items.TSRVF_QTY)
                  ).toLocaleString()
                }}
              </q-item-label>
              <q-item-label caption> Total Price </q-item-label>
            </q-item-section>

            <q-item-section side v-if="mode !== 'view'">
              <q-btn
                icon="delete"
                flat
                color="red"
                @click="onClickDeleteLine(idx)"
              />
            </q-item-section>
          </q-item>

          <q-item class="q-my-sm" clickable v-ripple v-if="mode === 'view'">
            <q-item-section> </q-item-section>
            <q-item-section> </q-item-section>
            <q-item-section> </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="text-h5 text-bold">
                  Rp {{ getTotal(listItemsSel) }}
                </span>
              </q-item-label>
              <q-item-label caption> Total Price </q-item-label>
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

onMounted(async () => {
  if (props.dataItem.listFixDet) {
    listItemsSel.value = props.dataItem.listFixDet;

    await getItem();
  }
});

const listItems = ref([]);
const listItemsSel = ref([]);
const loading = ref(false);

const onClickAddItem = () => {
  listItemsSel.value.push({
    TSRVD_ID: props.dataItem.id,
    TSRVF_ITMCD: "",
    TSRVF_PRC: 0,
    TSRVF_QTY: 1,
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
  if (props.mode === "view") {
    onDialogCancel();
  } else {
    $q.dialog({
      title: "Confirmation",
      message: `Are you sure want to save this items ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      onDialogOK(listItemsSel.value);
    });
  }
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

const getTotal = (data) => {
  let hasil = 0;
  data.map((items) => {
    hasil += parseInt(items.TSRVF_PRC) * parseInt(items.TSRVF_QTY);
  });

  return hasil.toLocaleString();
};

const onSelectItem = (val, idx) => {
  const getItemData = listItems.value.filter(fil => fil.MITM_ITMCD === val)
  if (getItemData.length > 0) {
    if (getItemData[0].STOCK > 0) {
      listItemsSel.value[idx].TSRVF_PRC = getItemData[0].LATEST_PRC
      listItemsSel.value[idx].STOCK = getItemData[0].STOCK
    } else {
      listItemsSel.value[idx].TSRVF_ITMCD = ''

      $q.notify({
        color:'red',
        message: `Stock item ${val} (${getItemData[0].MITM_ITMNM}) is 0, please check stock status !`
      })
    }
  }
}

const onInputQty = (val, idx) => {
  if(val > listItemsSel.value[idx].STOCK) {
    $q.notify({
      color:'red',
      message: `Stock item ${listItemsSel.value[idx].TSRVF_ITMCD} is 0, please check stock status !`
    })

    listItemsSel.value[idx].TSRVF_QTY = 0
  }
}

</script>
