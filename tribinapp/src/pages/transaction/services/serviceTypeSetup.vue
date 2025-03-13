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
          <div class="col text-right">
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
            v-if="listType.length === 0"
          >
            <q-item-section> No items added </q-item-section>
          </q-item>
          <q-item
            v-for="(typeData, idx) in listType"
            :key="idx"
            class="q-my-sm"
            clickable
            v-ripple
            v-else
          >
            <q-item-section>
              <q-item-label>
                <q-select
                  dense
                  filled
                  label="Type"
                  v-model="typeData.OPRTYPE"
                  :options="listType"
                  :loading="loading"
                  emit-value
                  option-label="MGECD_DESC"
                  option-value="MGECD_VALUE"
                >
                </q-select>
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-input
                  label="Mekanik / Operator"
                  dense
                  v-model="typeData.OPRNAME"
                  filled
                  v-if="isNewType"
                >
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      :icon="isNewType ? 'list' : 'add'"
                      @click="isNewType = !isNewType"
                    >
                      <q-tooltip>{{
                        !isNewType
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
                  v-model="typeData.OPRNAME"
                  :options="listCat"
                  :loading="loading"
                  v-else-if="!isNewType"
                >
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      :icon="isNewType ? 'list' : 'add'"
                      @click="isNewType = !isNewType"
                    >
                      <q-tooltip>{{
                        isNewType
                          ? "Choose existing operator / mekanik"
                          : "Insert new operator / mekanik"
                      }}</q-tooltip>
                    </q-btn>
                  </template>
                </q-select>
              </q-item-label>
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
  detail: Array,
});

const listType = ref([]);
const isNewType = ref(false);
const loading = ref(false);

onMounted(() => {
  if (props.detail && props.detail.length > 0) {
    listType.value = props.detail
  }
  getTypeListOPR();
});

const getTypeListOPR = async () => {
  await api_web.get(`gencode/get/${btoa("SRV_OPR_TYPE")}`).then((response) => {
    listType.value = response.data;
  });
  // listType
};

const onClickAddItem = () => {
  listType.value.push({
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
      onDialogOK(listType.value);
    });
};
</script>
