<template>
    <q-dialog
      ref="dialogRef"
      @hide="onDialogHide"
      transition-show="slide-up"
      transition-hide="slide-down"
      full-width
      persistent
    >
      <q-card class="q-dialog-plugin bg-white q-pa-sm">
        <q-card-section>
          <div class="text-h6">Quotation Review</div>
        </q-card-section>
  
        <q-card-section class="q-pa-sm" style="height: 70vh; overflow: auto">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="items" label="Items" />
            <q-tab name="conditions" label="Conditions" />
            <q-tab name="histCond" label="Approval History" />
          </q-tabs>
  
          <q-separator />
  
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="items">
              <div class="row q-py-md">
                <div class="col">
                  <q-input
                    dense
                    filled
                    label="Customer Name"
                    v-model="headerData.APP_CUSNM"
                    readonly
                  ></q-input>
                </div>
                <div class="col q-pl-md">
                  <q-input
                    dense
                    filled
                    label="Attn."
                    v-model="headerData.APP_ATTN"
                    readonly
                  ></q-input>
                </div>
              </div>
  
              <div class="row q-pb-md">
                <div class="col">
                  <q-input
                    dense
                    filled
                    label="Subject"
                    v-model="headerData.APP_SBJCT"
                    readonly
                  ></q-input>
                </div>
              </div>
  
              <q-table
                title="Item List"
                :rows="dataHasil.dataItem"
                :columns="columnsItem"
                row-key="name"
                dense
                :loading="loading"
                v-if="props.typeCD == 'quotation'"
              />
            </q-tab-panel>
  
            <q-tab-panel name="conditions">
              <q-list bordered dense>
                <q-item
                  clickable
                  v-ripple
                  v-for="(cond, idx) in dataHasil.dataCondition"
                  :key="idx"
                >
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white" size="sm">
                      {{ idx + 1 }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{ cond.TQUOCOND_CONDI }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
  
            <q-tab-panel name="histCond">
              <q-list bordered separator>
                <q-item
                  clickable
                  v-ripple
                  v-for="(hist, idx2) in dataHasil.approvalHistories"
                  :key="idx2"
                >
                  <q-item-section>
                    <q-item-label>{{
                      date.formatDate(hist.created_at, "DD MMM YYYY HH:mm")
                    }}</q-item-label>
                    <q-item-label caption>Time</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      hist.type == 2 ? "Rejected" : "Approved"
                    }}</q-item-label>
                    <q-item-label caption>Status</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ hist.remark }}</q-item-label>
                    <q-item-label caption>Remarks</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon
                      :name="hist.type == 2 ? 'cancel' : 'check_circle'"
                      :color="hist.type == 2 ? 'red' : 'green'"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
  
        <q-card-actions align="center">
          <q-btn-group>
            <q-btn
              color="primary"
              icon="print"
              :disable="dataHasil.length === 0"
              @click="printQuot()"
            />
            <q-btn
              color="primary"
              icon="check"
              label="Approve"
              :disable="dataHasil.length === 0"
              @click="onApprove()"
            />
            <q-btn
              color="red"
              icon="cancel"
              label="Reject"
              :disable="dataHasil.length === 0"
              @click="onReject()"
            />
            <q-btn color="orange" flat label="cancel" @click="onDialogCancel" />
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { date, useDialogPluginComponent, useQuasar } from "quasar";
  import { api_web } from "boot/axios";
  
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();
  
  const $q = useQuasar();
  
  const props = defineProps({
    dataHeader: Array,
    cd: String,
    typeCD: String,
  });
  
  onMounted(() => {
    headerData.value = props.dataHeader;
  });
  
  const loading = ref(false);
  const columnsItem = ref([
    {
      name: "MITM_ITMNM",
      label: "Item Name",
      field: "MITM_ITMNM",
      sortable: true,
      align: "left",
    },
    {
      name: "TQUODETA_USAGE_DESCRIPTION",
      label: "Usage",
      field: "TQUODETA_USAGE_DESCRIPTION",
      sortable: true,
      align: "left",
    },
    {
      name: "TQUODETA_PRC",
      label: "Price",
      field: "TQUODETA_PRC",
      sortable: true,
      align: "left",
      format: (val) => val.toLocaleString(),
    },
    {
      name: "TQUODETA_OPRPRC",
      label: "Operator",
      field: "TQUODETA_OPRPRC",
      sortable: true,
      align: "left",
      format: (val) => val.toLocaleString(),
    },
    {
      name: "TQUODETA_MOBDEMOB",
      label: "MOB DEMOB",
      field: "TQUODETA_MOBDEMOB",
      sortable: true,
      align: "left",
      format: (val) => val.toLocaleString(),
    },
    {
      name: "SUBTOT",
      label: "SUBTOTAL",
      sortable: true,
      field: (row) =>
        row.TQUODETA_PRC + row.TQUODETA_OPRPRC + row.TQUODETA_MOBDEMOB,
      align: "left",
      format: (val) => val.toLocaleString(),
    },
  ]);
  const dataHasil = ref([]);
  const tab = ref("items");
  const headerData = ref({
    MCUS_CUSNM: "",
    TQUO_ATTN: "",
    TQUO_SBJCT: "",
  });
  
  onMounted(() => {
    getData();
  });
  
  const getData = async () => {
    loading.value = true;
    await api_web
      .get(`${props.typeCD}/${btoa(props.cd)}`)
      .then((response) => {
        loading.value = false;
        dataHasil.value = response.data;
      })
      .catch((e) => {
        loading.value = false;
      });
  };
  
  const onApprove = () => {
    q.dialog({
      title: "Confirm",
      message: "Are you sure want to Approve this quotation ?",
      cancel: true,
      persistent: true,
    }).onOk(async (datas) => {
      loading.value = true;
        await api_web
          .put(`approve/quotations/${btoa(props.cd)}`,{
            TQUO_BRANCH: props.dataHeader.TQUO_BRANCH
          })
          .then((response) => {
            loading.value = false;
            getData();
          })
          .catch((e) => {
            loading.value = false;
          });
    })
  };
  
  const onReject = () => {
    $q.dialog({
      title: "Confirm",
      message: "Are you sure want to Reject this quotation ?",
      cancel: true,
      persistent: true,
    }).onOk(async (datas) => {
      $q.dialog({
        title: "Prompt",
        message: "Input reject reason.",
        prompt: {
          model: "",
          isValid: (val) => val.length > 2, // << here is the magic
          type: "text", // optional
        },
        cancel: true,
        persistent: true,
      }).onOk(async (datas) => {
        loading.value = true;
        await api_web
          .put(`revise/quotations/${btoa(props.cd)}`,{
            remark: datas,
            TQUO_BRANCH: props.dataHeader.TQUO_BRANCH
          })
          .then((response) => {
            loading.value = false;
            getData();
          })
          .catch((e) => {
            loading.value = false;
          });
      });
    });
  };
  
  const printQuot = () => {
    window.open(process.env.API_WEB + 'PDF/quotation/' + btoa(props.cd), '_blank').focus();
  };
  </script>
  