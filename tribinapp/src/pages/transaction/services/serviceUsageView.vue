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
        <div class="text-h6">View Usage Service Part</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list bordered>
          <q-item
            class="q-my-sm"
            clickable
            v-ripple
            v-if="listItem.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(items, idx) in listItem"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
            v-else
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ idx + 1 }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <div>
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
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-input
                label="Requested Qty"
                v-model="items.STOCK"
                filled
                dense
                readonly
              />
            </q-item-section>

            <q-item-section>
              <q-input
                label="Used Qty"
                v-model="items.TSRVF_QTY"
                filled
                dense
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
          :disable="
            loading
          "
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
  idDetail: String,
  detail: Array,
});

const submitedItems = ref([]);
const listItem = ref([]);
const loading = ref(false);
const listItems = ref([]);

onMounted(async () => {
  if (props.detail.length > 0) {
    await getItem();

    props.detail.map(async (val) => {
      listItem.value.push({
        ...val,
        STOCK: await getStockList(val.TSRVF_ITMCD),
      });
    });
  }
});

const getStockList = async (item, loc = "WH-SRV") => {
  loading.value = true;
  return await api_web
    .get(`inventory/viewStockByItemLoc/${btoa(item)}/${btoa(loc)}`)
    .then((response) => {
      loading.value = false;
      return response.data;
    })
    .catch(() => {
      loading.value = false;
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
  $q.dialog({
    title: "Confirmation",
    message:
      listItem.value.filter((fil) => fil.STOCK == 0).length > 0
        ? `There are Requested qty still 0, that item wouldn't be confirmed, continue ?`
        : listItem.value.filter((fil) => fil.TSRVF_QTY > fil.STOCK).length > 0
        ? `There are used qty more than requested qty, that item wouldn't be confirmed, continue ?`
        : `Do you want to approve this price ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;

    await api_web
      .put(`servicesAdmins/confirmDoneItem/${btoa(props.idDetail)}`, {
        data: listItem.value,
      })
      .then((response) => {
        loading.value = false;
        onDialogOK();
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};
</script>
