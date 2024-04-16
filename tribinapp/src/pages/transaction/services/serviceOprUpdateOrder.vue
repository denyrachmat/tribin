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
        <div class="text-h6">Update Order {{ dataApi.SRVH_DOCNO }}</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list bordered>
          <q-item
            v-for="(items, idx) in submitedItems"
            :key="idx"
            :class="`q-my-sm`"
          >
            <q-item-section avatar>
              <q-avatar
                :color="items.TSRVD_FLGSTS === 0 ? 'red' : 'primary'"
                text-color="white"
              >
                {{ items.TSRVD_LINE }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ items.TSRVD_ITMCD }}
              </q-item-label>
              <q-item-label caption lines="1">Item</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ items.TSRVD_CUSTRMK }}
              </q-item-label>
              <q-item-label caption lines="1">Customer Remarks</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <div class="cursor-pointer">
                  <span v-if="!items.TSRVD_REMARK">
                    No comment yet !, Click here to add comment.
                  </span>
                  <span v-else>
                    <div v-html="items.TSRVD_REMARK"></div>
                  </span>

                  <q-popup-edit
                    v-model="items.TSRVD_REMARK"
                    auto-save
                    v-slot="scope"
                    v-if="props.mode !== 'view'"
                  >
                    <q-editor
                      @keyup.enter="scope.set"
                      v-model="scope.value"
                      :dense="$q.screen.lt.md"
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify'],
                          },
                        ],

                        [
                          'bold',
                          'italic',
                          'strike',
                          'underline',
                          'subscript',
                          'superscript',
                        ],
                        ['token', 'hr', 'link', 'custom_btn'],
                        ['print', 'fullscreen'],
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                              'p',
                              'h1',
                              'h2',
                              'h3',
                              'h4',
                              'h5',
                              'h6',
                              'code',
                            ],
                          },
                          {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7',
                            ],
                          },
                          {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'default_font',
                              'arial',
                              'arial_black',
                              'comic_sans',
                              'courier_new',
                              'impact',
                              'lucida_grande',
                              'times_new_roman',
                              'verdana',
                            ],
                          },
                          'removeFormat',
                        ],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                        ['undo', 'redo'],
                        ['viewsource'],
                      ]"
                      :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana',
                      }"
                    />
                  </q-popup-edit>
                </div>
              </q-item-label>
              <q-item-label caption lines="1">Operator Remarks</q-item-label>
            </q-item-section>

            <q-item-section side v-if="props.mode === 'edit' && items.TSRVD_FLGSTS < 2">
              <q-btn
                icon="construction"
                color="green"
                flat
                @click="onClickAddItem(idx, 'add')"
              >
                <q-tooltip>Update Fix Data</q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="visibility"
                color="cyan"
                flat
                @click="onClickAddItem(idx, 'view')"
                :disable="!items.listFixDet"
              >
                <q-tooltip>View Added Item</q-tooltip>
                <q-badge
                  color="red"
                  floating
                  v-if="items.listFixDet.length > 0"
                  >{{ items.listFixDet.length }}</q-badge
                >
              </q-btn>
            </q-item-section>
            <q-item-section side v-if="props.mode === 'approvecust'">
              <q-btn
                icon="how_to_reg"
                color="green"
                outline
                @click="onClickApprove(idx)"
              >
                <q-tooltip>Approve this as customer</q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section side v-if="props.mode === 'approvecust'">
              <q-btn icon="cancel" color="red" 
                outline @click="onClickReject(idx)">
                <q-tooltip>Reject this as customer</q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section side v-if="props.mode === 'edit' && items.TSRVD_FLGSTS === 2">
              <q-btn icon="task" color="indigo" outline @click="onClickDone(idx)">
                <q-tooltip>Mark this problem as done</q-tooltip>
              </q-btn>
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
            loading ||
            submitedItems.filter((fil) => fil.listFixDet).length === 0 ||
            submitedItems.filter((fil) => fil.TSRVD_REMARK).length === 0
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

import serviceOprItemAdd from "./serviceOprItemAdd.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const $q = useQuasar();

const props = defineProps({
  header: Array,
  detail: Array,
  mode: String,
});

const dataApi = ref({
  SRVH_DOCNO: "",
  SRVH_ISSDT: date.formatDate(Date.now(), "YYYY-MM-DD"),
  SRVH_CUSCD: "",
});
const submitedItems = ref([]);
const loading = ref(false);

onMounted(async () => {
  if (props.header) {
    // await getCustomer();
    // await getItem();
    dataApi.value = props.header;
    submitedItems.value = props.detail;
  }
});

const onClickAddItem = (val, mode = "add") => {
  $q.dialog({
    component: serviceOprItemAdd,
    componentProps: {
      mode: mode,
      dataItem: submitedItems.value[val],
    },
    // persistent: true,
  }).onOk(async (res) => {
    submitedItems.value[val].TSRVD_FLGSTS = 5;
    submitedItems.value[val].listFixDet = res;
  });
};

const onSubmitData = () => {
  if (props.mode !== "edit") {
    onDialogOK();
  } else {
    $q.dialog({
      title: "Confirmation",
      message: `Do you want to submit this data ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      loading.value = true;
      await api_web
        .post("servicesOPR", {
          data: submitedItems.value,
        })
        .then((val) => {
          loading.value = false;
          onDialogOK();
        });
    });
  }
};

const onClickApprove = (idx) => {
    console.log(submitedItems.value[idx])
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to approve this price ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`servicesAdmin/updateByDet/${btoa(submitedItems.value[idx].id)}`, {
        TSRVD_FLGSTS: 2,
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


const onClickReject = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to reject this price ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`servicesAdmin/updateByDet/${btoa(submitedItems.value[idx].id)}`, {
        TSRVD_FLGSTS: 0,
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

const onClickDone = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to mark this problem as done ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`servicesAdmin/updateByDet/${btoa(submitedItems.value[idx].id)}`, {
        TSRVD_FLGSTS: 3,
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
