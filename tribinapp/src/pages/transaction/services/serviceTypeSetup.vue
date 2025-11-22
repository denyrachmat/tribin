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
            <div class="text-h6">Service Type Setup</div>
          </div>
          <div class="col text-right" v-if="!props.isView">
            <q-btn icon="add" outline color="blue" @click="onClickAddItem()" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm" style="max-height: 50vh">
        <q-list bordered>
          <q-item
            class="q-my-sm"
            clickable
            v-ripple
            v-if="listTypes.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(typeData, idx) in listTypes"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
            v-else
          >
            <!-- Choose Type -->
            <q-item-section>
              <q-item-label>
                <q-select
                  dense
                  filled
                  label="Choose Type Service"
                  v-model="typeData.OPRNAME"
                  :options="listCat"
                  :loading="loading"
                  option-label="desc"
                  option-value="code"
                  emit-value
                  map-options
                  :readonly="props.isView"
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <!-- delete -->
            <q-item-section side v-if="!props.isView">
              <q-btn
                icon="delete"
                color="red"
                flat
                @click="onClickDeleteLines(idx)"
                dense
              >
                <q-tooltip>Delete line</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="props.isView ? onDialogCancel() : onSubmitData()"
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
  detail: Array,
  isView: Boolean,
});

const listCat = ref([]);
const listTypes = ref([]);
const isNewType = ref(false);
const loading = ref(false);
const isViewData = ref(false);

onMounted(() => {
  if (props.detail && props.detail.length > 0) {
    listTypes.value = props.detail;
  }
  getTypeListOPR();
  isViewData.value = props.isView;
});

const getTypeListOPR = async () => {
  const getUsersDet =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_det="))
        ?.split("=")[1] || "";
  const userDet = getUsersDet ? JSON.parse(decodeURIComponent(getUsersDet)) : {};

  await api_web.post(`gencode/getGencodeList/${userDet.branch ?? '0'}`, {
    code: 'SRV_TYPE',
    cg: document.cookie
        .split("; ")
        .find((row) => row.startsWith("CGID="))
        ?.split("=")[1] || "",
    exactSearch: true,
  }).then((response) => {
    listCat.value = response.data.data;
  });
  // listType
};

const onClickAddItem = () => {
  listTypes.value.push({
    OPRNAME: "",
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to add this service type ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    onDialogOK(listTypes.value);
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to remove line ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listTypes.value.splice(idx, 1);
  });
};
</script>
