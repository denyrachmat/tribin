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
        <div class="text-h6">View List Price</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list bordered :loading="loading">
          <q-item
            class="q-my-sm"
            clickable
            v-ripple
            v-if="listItemDet.length === 0"
          >
            <q-item-section v-if="!loading"> No items added </q-item-section>
            <q-item-section v-else
              >Please wait, loading data...
            </q-item-section>
          </q-item>
          <q-item
            v-for="(items, idx) in listItemDet"
            :key="idx"
            :class="`q-my-sm`"
            v-else
          >
            <q-item-section avatar>
              <q-avatar
                :color="items.TSRVD_FLGSTS === 0 ? 'red' : 'primary'"
                text-color="white"
              >
                {{ idx + 1 }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ items.TSRVD_ITMCD }}</q-item-label>
              <q-item-label caption> Item </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ items.TSRVD_QTY }}</q-item-label>
              <q-item-label caption> Qty </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label
                ><div v-html="items.TSRVD_REMARK"></div
              ></q-item-label>
              <q-item-label caption> Tech. Remarks</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="items.TSRVD_MGRRMK">
                <div v-html="items.TSRVD_MGRRMK"></div>
              </q-item-label>
              <q-item-label v-else>
                <q-btn
                  icon="edit"
                  flat
                  color="primary"
                  @click="onClickViewDetail(items)"
                  label="Update Remarks"
                >
                </q-btn>
              </q-item-label>
              <q-item-label caption> Mgr. Remarks</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label
                >Rp.
                {{
                  getPrice(items.list_fix_det).toLocaleString()
                }}</q-item-label
              >
              <q-item-label caption> Total Fix Price </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="visibility"
                flat
                color="primary"
                @click="onClickViewDetail(items)"
              >
                <q-tooltip>View list fix items</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Approve"
          color="primary"
          @click="onApproveData(true)"
          :disable="loading"
          :loading="loading"
        />
        <q-btn
          label="Reject"
          color="red"
          @click="onApproveData()"
          :loading="loading"
        />
        <q-btn
          label="Cancel"
          color="red"
          @click="onDialogCancel"
          :disable="loading"
          :loading="loading"
          flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { date, useDialogPluginComponent, useQuasar } from "quasar";
import { api, api_web } from "boot/axios";

import serviceOprItemAdd from "./serviceOprItemAdd.vue";

const $q = useQuasar();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  idHeader: String,
});

const listItemDet = ref([]);
const loading = ref(false);

onMounted(() => {
  getData();
});

const getData = async () => {
  loading.value = true;
  await api_web
    .get(
      `servicesAdmins/viewUnapproveMgrDet/${btoa(props.idHeader.SRVH_DOCNO)}`
    )
    .then((response) => {
      loading.value = false;
      listItemDet.value = response.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const getPrice = (data) => {
  let hasil = 0;
  data.map((val) => {
    hasil += val.TSRVF_QTY * val.TSRVF_PRC;
  });

  return hasil;
};

const onClickViewDetail = (data) => {
  data.listFixDet = data.list_fix_det;

  $q.dialog({
    component: serviceOprItemAdd,
    componentProps: {
      mode: "view",
      dataItem: data,
    },
    // persistent: true,
  }).onOk(async (res) => {});
};

const onApproveData = (isApprove = false) => {
  $q.dialog({
    title: `${
      isApprove
        ? "Approval Message Confirmation"
        : "Rejection Message Confirmation"
    }`,
    message: `Please add message before ${
      isApprove ? "approve" : "reject"
    } this service.`,
    cancel: true,
    persistent: true,
    prompt: {
      model: "",
      type: "text", // optional
    },
  }).onOk(async (data) => {
    loading.value = true;
    await api_web
      .put(`servicesAdmins/updateDetByIDHead/${btoa(props.idHeader.id)}`, {
        TSRVD_FLGSTS: isApprove ? 1 : 0,
        TSRVD_MGRRMK: data,
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

const onUpdateRemarks = (dataRmk) => {

}
</script>
