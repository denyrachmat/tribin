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
            <div class="text-h6">Operator / Mekanik Setup</div>
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
            v-if="listOperator.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(itemData, idx) in listOperator"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
            v-else
          >
            <!-- Jenis Operator -->
            <q-item-section>
              <q-item-label>
                <q-select
                  dense
                  filled
                  label="Type"
                  v-model="itemData.OPRTYPE"
                  :options="listType"
                  :loading="loading"
                  emit-value
                  map-options
                  option-label="MGECD_DESC"
                  option-value="MGECD_DESC"
                  :readonly="props.isView"
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <!-- Nama Mekanik / Operator -->
            <q-item-section>
              <q-item-label>
                <q-input
                  label="Mekanik / Operator"
                  dense
                  v-model="itemData.OPRNAME"
                  filled
                  v-if="isNewOpr || props.isView"
                  :readonly="props.isView"
                >
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      :icon="isNewOpr ? 'list' : 'add'"
                      @click="isNewOpr = !isNewOpr"
                      :disable="props.isView"
                    >
                      <q-tooltip>{{
                        !isNewOpr
                          ? "Choose existing operator / mekanik"
                          : "Insert new operator / mekanik"
                      }}</q-tooltip>
                    </q-btn>
                  </template>
                </q-input>
                <q-select
                  dense
                  filled
                  label="Input new Mekanik / Operator"
                  v-model="itemData.OPRNAME"
                  :options="listCat"
                  :loading="loading"
                  option-label="MGECD_DESC"
                  option-value="MGECD_DESC"
                  v-else-if="!isNewOpr"
                >
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      :icon="isNewOpr ? 'list' : 'add'"
                      @click="isNewOpr = !isNewOpr"
                    >
                      <q-tooltip>{{
                        isNewOpr
                          ? "Choose existing operator / mekanik"
                          : "Insert new operator / mekanik"
                      }}</q-tooltip>
                    </q-btn>
                  </template>
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
  isView: Boolean
});

const isViewData = ref(false)
const listType = ref([]);
const isNewOpr = ref(false);
const loading = ref(false);
const listOperator = ref([]);
const listCat = ref([])

onMounted(() => {
  if (props.detail && props.detail.length > 0) {
    listOperator.value = props.detail;
  }
  getTypeListOPR();
  getListRegisteredOPR();
  isViewData.value = props.isView
});

const getTypeListOPR = async () => {
  await api_web.get(`gencode/get/${btoa("SRV_OPR_TYPE")}`).then((response) => {
    listType.value = response.data;
  });
  // listType
};

const getListRegisteredOPR = async () => {
  await api_web.post(`gencode/getDynamicsGencode`,{
    select: [
      'mg.MGECD_DESC'
    ],
    where: [
      {
        col: 'mg.MGECD_CODE',
        opr: 'like',
        val: 'SRV_OPR_TYPE_%'
      }
    ],
    group: [
      'mg.MGECD_DESC'
    ]
  }).then((response) => {
    listCat.value = response.data;
  });
};

const onClickAddItem = () => {
  listOperator.value.push({
    OPRTYPE: "",
    OPRNAME: "",
  });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to add this operator ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    onDialogOK(listOperator.value);
  });
};

const onClickDeleteLines = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to remove line ${idx + 1} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    listOperator.value.splice(idx, 1);
  });
};
</script>
