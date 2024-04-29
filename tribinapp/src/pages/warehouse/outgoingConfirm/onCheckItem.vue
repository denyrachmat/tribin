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
        <div class="text-h6">Item Check {{ val }}</div>
      </q-card-section>

      <q-card-section>
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Item Checker</b>
          </legend>
          <div
            :class="`row ${idx > 0 ? 'q-pt-md' : ''}`"
            v-for="(row, idx) in rows"
            :key="idx"
          >
            <div class="col">
              <q-input
                filled
                dense
                label="Item Request"
                v-model="row.MITM_ITMNMREAL"
                readonly
              />
            </div>
            <div class="col q-pl-md">
              <q-input
                filled
                dense
                label="Qty"
                v-model="row.TDLVORDDETA_ITMQT"
                readonly
              />
            </div>
            <div class="col q-pl-md">
              <q-select
                dense
                filled
                label="Item Code Confirmation"
                v-model="row.TDLVORDDETA_ITMCD_ACT"
                use-input
                input-debounce="500"
                :options="listItems"
                @filter="
                  (val, update, abort) =>
                    filterFn(
                      val ? val : row.MITM_ITMNMREAL,
                      update,
                      abort,
                      'item'
                    )
                "
                behavior="dialog"
                option-label="MITM_ITMNM"
                option-value="MITM_ITMCD"
                emit-value
                map-options
                :loading="loading"
              >
              </q-select>
            </div>
          </div>
        </fieldset>

        <fieldset
          style="
            border: 1px black solid;
            border-radius: 10px;
            height: 35vh;
            overflow: auto;
          "
        >
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <div class="row">
              <div class="col">
                <b>Accesories</b>
              </div>
            </div>
          </legend>

          <div class="row">
            <div class="col text-right">
              <q-btn
                icon="add"
                color="indigo"
                flat
                dense
                @click="
                  listAcc.push({
                    TDLVACCESSORY_ITMCD: '',
                    TDLVACCESSORY_ITMQT: 0,
                  })
                "
              >
                <q-tooltip>Add Accesories</q-tooltip>
              </q-btn>
            </div>
          </div>

          <template v-if="listAcc.length > 0">
            <div
              :class="`row ${idx > 0 ? 'q-pt-md' : ''}`"
              v-for="(acc, idx) in listAcc"
              :key="idx"
            >
              <div class="col">
                <q-select
                  dense
                  filled
                  label="Item Code Accesories"
                  v-model="acc.TDLVACCESSORY_ITMCD"
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
                >
                </q-select>
              </div>

              <div class="col q-pl-md">
                <q-input
                  filled
                  dense
                  label="Qty"
                  v-model="acc.TDLVACCESSORY_ITMQT"
                  :readonly="!acc.TDLVACCESSORY_ITMCD"
                />
              </div>

              <div class="col-2 q-pl-md">
                <q-btn
                  icon="delete"
                  color="red"
                  flat
                  dense
                  @click="listAcc.splice(idx, 1)"
                />
              </div>
            </div>
          </template>
          <div v-else>
            <div class="row">
              <div class="col text-bold text-center">
                No accesories choose, please click + button
              </div>
            </div>
          </div>
        </fieldset>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :loading="loading"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  idHead: String,
  dataHeader: Array,
});

const rows = ref([]);
const listItems = ref([]);
const listAcc = ref([]);
const loading = ref(false);

onMounted(() => {
  rows.value = props.dataHeader.dlvdet;

  getItem();
});

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

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "item") {
      await getItem(val);
    }
  });
};

const onSubmitData = () => {
  const notFillItm = rows.value.filter((fil) => !fil.TDLVORDDETA_ITMCD_ACT);
  if (notFillItm.length > 0) {
    notFillItm.map((valMap) => {
      $q.notify({
        color: "negative",
        message: `item ${valMap.MITM_ITMNMREAL} item actual not filled yet, please add it first !!`,
      });
    });
  } else {
    $q.dialog({
      title: "Confirmation",
      message: `Are you sure want to save this outgoing ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      loading.value = true;
      await api_web
        .post("delivery/confirm", {
          id: props.idHead,
          data: rows.value,
          acc: listAcc.value,
        })
        .then((response) => {
          loading.value = false;
          listItems.value = response.data.data;
          onDialogOK();
        })
        .catch(() => {
          loading.value = false;
        });
    });
  }
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
