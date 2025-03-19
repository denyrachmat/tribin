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

      <q-card-section class="q-pa-sm" v-if="dataApi">
        <q-list bordered>
          <q-item
            v-for="(items, idx) in submitedItems"
            :key="idx"
            :class="`q-my-sm`"
          >
            <q-item-section avatar>
              <q-avatar
                :color="items.TSRVD_FLGSTS == 0 ? 'red' : 'primary'"
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

            <!-- Customer Remarks -->
            <q-item-section>
              <q-item-label>
                {{ items.TSRVD_CUSTRMK }}
              </q-item-label>
              <q-item-label caption lines="1">Customer Remarks</q-item-label>
            </q-item-section>

            <!-- Operator Remarks -->
            <q-item-section>
              <q-item-label>
                <div class="cursor-pointer">
                  <span v-if="!items.TSRVD_REMARK" class="bg-orange">
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
                      @keyup.ctrl.enter="scope.set"
                      @keyup.enter.stop
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
                    <span>Press ctrl + enter to save the comments</span>
                  </q-popup-edit>
                </div>
              </q-item-label>
              <q-item-label caption lines="1">Operator Remarks</q-item-label>
            </q-item-section>

            <!-- Location Remarks -->
            <q-item-section>
              <q-item-label>
                <div class="cursor-pointer">
                  <span v-if="!items.TSRVD_LOC" class="bg-orange">
                    No location yet !, Click here to add location.
                  </span>
                  <span v-else>
                    <div v-html="items.TSRVD_LOC"></div>
                  </span>

                  <q-popup-edit
                    v-model="items.TSRVD_LOC"
                    auto-save
                    v-slot="scope"
                    v-if="props.mode !== 'view'"
                  >
                    <q-editor
                      @keyup.ctrl.enter="scope.set"
                      @keyup.enter.stop
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
                    <span>Press ctrl + enter to save the location</span>
                  </q-popup-edit>
                </div>
              </q-item-label>
              <q-item-label caption lines="1">Location</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn-group outline>

                <!-- Manage service items -->
                <q-btn
                  icon="construction"
                  color="green"
                  outline
                  @click="onClickAddItem(idx, 'add')"
                  v-if="props.mode === 'edit' && items.TSRVD_FLGSTS < 2"
                >
                  <q-tooltip>Add part to fix problem</q-tooltip>
                </q-btn>

                <!-- View service part list-->
                <q-btn
                  icon="visibility"
                  color="cyan"
                  outline
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

                <!-- Approve from Customer -->
                <q-btn
                  icon="how_to_reg"
                  color="green"
                  outline
                  @click="onClickApprove(idx)"
                  v-if="props.mode === 'approvecust'"
                >
                  <q-tooltip>Approve this as customer</q-tooltip>
                </q-btn>

                <!-- Reject from Customer -->
                <q-btn
                  icon="cancel"
                  color="red"
                  outline
                  @click="onClickReject(idx)"
                  v-if="props.mode === 'approvecust'"
                >
                  <q-tooltip>Reject this as customer</q-tooltip>
                </q-btn>

                <!-- Manage use the requested items and confirm fix -->
                <q-btn
                  icon="task"
                  :color="
                    submitedItems[idx].listFixDet.filter(
                      (fil) => fil.STOCK_BENGKEL > 0
                    ).length !== submitedItems[idx].listFixDet.length
                      ? 'grey'
                      : 'indigo'
                  "
                  outline
                  @click="onClickDone(idx)"
                  :disable="
                    submitedItems[idx].listFixDet.filter(
                      (fil) => fil.STOCK_BENGKEL > 0
                    ).length !== submitedItems[idx].listFixDet.length
                  "
                  v-if="props.mode === 'edit' && items.TSRVD_FLGSTS == 2"
                >
                  <q-tooltip>
                    {{
                      submitedItems[idx].listFixDet.filter(
                        (fil) => fil.STOCK_BENGKEL > 0
                      ).length !== submitedItems[idx].listFixDet.length
                        ? "No stock on service location, please request stock to warehouse."
                        : "Mark this problem as done"
                    }}
                  </q-tooltip>
                  <q-badge
                    color="red"
                    floating
                    v-if="
                      submitedItems[idx].listFixDet.filter(
                        (fil) => fil.TSRVF_ISCONF == 0
                      ).length > 0
                    "
                    >{{
                      submitedItems[idx].listFixDet.filter(
                        (fil) => fil.TSRVF_ISCONF == 0
                      ).length
                    }}</q-badge
                  >
                </q-btn>

                <!-- Add / View type Service -->
                <q-btn
                  icon="category"
                  :color="
                    items.type && items.type.length > 0 ? 'indigo' : 'red'
                  "
                  outline
                  @click="onClickAddType(items)"
                >
                  <q-tooltip>Add Type Service</q-tooltip>
                </q-btn>

                <!-- Add / View operator -->
                <q-btn
                  icon="person"
                  :color="items.opr && items.opr.length > 0 ? 'indigo' : 'red'"
                  outline
                  @click="onClickAddOpr(items, idx)"
                >
                  <q-tooltip>Add Operator</q-tooltip>
                </q-btn>

                <!-- Part request list -->
                <q-btn
                  icon="compare_arrows"
                  :color="
                    items.TSRVD_FLGSTS != 2 ||
                    (items.partReq && items.partReq.length > 0)
                      ? 'grey'
                      : 'orange'
                  "
                  outline
                  @click="onClickRequest(idx)"
                  :disable="
                    items.TSRVD_FLGSTS != 2 ||
                    (items.partReq && items.partReq.length > 0)
                  "
                  v-if="
                    props.mode === 'edit' &&
                    items.TSRVD_FLGSTS == 2 &&
                    !(items.partReq && items.partReq.length > 0)
                  "
                >
                  <q-tooltip>{{
                    items.partReq && items.partReq.length > 0
                      ? "Already send request to warehouse, please wait till request fullfiled. Or not approved customer yet"
                      : items.TSRVD_FLGSTS !== 2
                      ? "Please wait until customer has approve the service."
                      : "Request Part to Warehouse"
                  }}</q-tooltip>
                </q-btn>

                <!-- Print Part Request -->
                <q-btn
                  icon="print"
                  :color="
                    items.TSRVD_FLGSTS !== 2 ||
                    items.partReq.filter((fil) => fil.TLOCREQ_APPRVDT !== null)
                      .length > 0
                      ? 'grey'
                      : 'cyan'
                  "
                  outline
                  @click="
                    onClickPrintRequest(
                      `${dataApi.SRVH_DOCNO}-${items.TSRVD_LINE}`
                    )
                  "
                  :disable="
                    items.TSRVD_FLGSTS !== 2 ||
                    items.partReq.filter((fil) => fil.TLOCREQ_APPRVDT !== null)
                      .length > 0
                  "
                  v-if="
                    props.mode === 'edit' &&
                    items.TSRVD_FLGSTS === 2 &&
                    (items.partReq && items.partReq.length > 0)
                  "
                >
                  <q-tooltip>Print Part Request</q-tooltip>
                </q-btn>
              </q-btn-group>
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
        >
          <q-tooltip>
            {{
              loading
                ? "Please wait on loading"
                : submitedItems.filter((fil) => fil.listFixDet).length === 0 ||
                  submitedItems.filter((fil) => fil.TSRVD_REMARK).length === 0
                ? "Please make sure Used Qty not more bigger than Requested Qty"
                : "Submit Service"
            }}
          </q-tooltip>
        </q-btn>
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
import itemRequestIndex from "../../warehouse/itemRequest/itemRequestIndex.vue";
import serviceUsageView from "./serviceUsageView.vue";
import serviceOperatorSetup from "./serviceOperatorSetup.vue";
import serviceTypeSetup from "./serviceTypeSetup.vue";

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
const listType = ref([]);
const listOpr = ref([]);

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
      header: props.header,
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
      message: `Do you want to confirmed this data ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      loading.value = true;

      for (let index = 0; index < submitedItems.value.length; index++) {
        const element = submitedItems.value[index];
        if (element.TSRVD_FLGSTS === 0) {
          element.TSRVD_FLGSTS = 5;
        }
      }

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
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to approve this price ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .put(`servicesAdmins/updateByDet/${btoa(submitedItems.value[idx].id)}`, {
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
      .put(`servicesAdmins/updateByDet/${btoa(submitedItems.value[idx].id)}`, {
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

const onClickDone = (val) => {
  $q.dialog({
    component: serviceUsageView,
    componentProps: {
      idDetail: submitedItems.value[val].id,
      detail: submitedItems.value[val].listFixDet.filter(
        (fil) => fil.TSRVF_ISCONF == 0
      ),
    },
  }).onOk(async (res) => {
    onDialogOK();
  });
};

// serviceUsageView
const onClickRequest = (idx) => {
  console.log(submitedItems.value[idx]);
  let listDet = [];
  submitedItems.value[idx].listFixDet.map((valMap) => {
    listDet.push({
      TLOCREQ_ITMCD: valMap.TSRVF_ITMCD,
      TLOCREQ_QTY: valMap.TSRVF_QTY,
      TLOCREQ_PRC: valMap.TSRVF_PRC,
      TLOCREQ_ISREP: 0,
      SAVED_DATA: valMap.SAVED_DATA,
    });
  });
  $q.dialog({
    component: itemRequestIndex,
    componentProps: {
      dataHeader: {
        TLOCREQ_DOCNO:
          dataApi.value.SRVH_DOCNO + "-" + submitedItems.value[idx].TSRVD_LINE,
        TLOCREQ_FRLOC: "WH1",
        TLOCREQ_TOLOC: "WH-SRV",
      },
      dataDet: listDet,
      qtyOnly: true,
    },
    // persistent: true,
  }).onOk(async (res) => {
    loading.value = false;
    onDialogOK();
  });
};

const onClickPrintRequest = (val) => {
  window
    .open(
      process.env.API_WEB + "servicesAdmins/printPartRequest/" + btoa(val),
      "_blank"
    )
    .focus();
};

const onClickAddOpr = (data, idx) => {
  $q.dialog({
    component: serviceOperatorSetup,
    componentProps: {
      detail: data.opr,
      isView:
        data.TSRVD_FLGSTS > 1 ||
        props.mode == "view" ||
        props.mode == "approvecust",
    },
    // persistent: true,
  }).onOk(async (res) => {
    console.log(res);
    data.opr = res;
  });
};

const onClickAddType = (data) => {
  $q.dialog({
    component: serviceTypeSetup,
    componentProps: {
      detail: data.type,
      isView:
        data.TSRVD_FLGSTS > 1 ||
        props.mode == "view" ||
        props.mode == "approvecust",
    },
    // persistent: true,
  }).onOk(async (res) => {
    console.log(res);
    data.type = res;
  });
};
</script>
