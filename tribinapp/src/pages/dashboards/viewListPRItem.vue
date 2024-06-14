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
          <div class="text-h6">PR Review</div>
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
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="items">
              <div class="row q-pb-md">
                <div class="col">
                  <q-input
                    dense
                    filled
                    label="Purpose"
                    v-model="headerData.APP_SBJCT"
                    readonly
                  ></q-input>
                </div>
              </div>

              <div class="row q-pb-md">
                <div class="col">
                  <q-input
                    dense
                    filled
                    label="Supplier"
                    v-model="headerData.MSUP_SUPNM"
                    readonly
                  ></q-input>
                </div>
                <div class="col q-pl-md">
                  <q-input
                    dense
                    filled
                    label="Created Date"
                    v-model="headerData.CREATED_AT"
                    readonly
                  ></q-input>
                </div>
              </div>

              <q-table
                v-if="dataHasil.dataItem"
                title="Item List"
                :rows="dataHasil.dataItem"
                :columns="columnsItem"
                row-key="name"
                dense
                :loading="loading"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn-group>
            <q-btn
              color="primary"
              icon="print"
              :disable="dataHasil.length === 0"
              @click="printPR()"
              flat
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
    conn: String,
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
      name: "TPCHREQDETA_REMARK",
      label: "Remark",
      field: "TPCHREQDETA_REMARK",
      sortable: true,
      align: "left",
    },
    {
      name: "TPCHREQDETA_REQDT",
      label: "Request Date",
      field: "TPCHREQDETA_REQDT",
      sortable: true,
      align: "left",
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
      .post(`${props.typeCD}`, {
        id: btoa(props.cd),
        TPCHREQDETA_BRANCH: props.dataHeader.TPCHREQ_BRANCH,
        conn: props.conn
      })
      .then((response) => {
        console.log(response.data.dataItem)
        loading.value = false;
        dataHasil.value = response.data;
      })
      .catch((e) => {
        loading.value = false;
      });
  };

  const onApprove = () => {
    $q.dialog({
      title: "Confirm",
      message: "Are you sure want to Approve this quotation ?",
      cancel: true,
      persistent: true,
    }).onOk(async (datas) => {
      loading.value = true;
        await api_web
          .put(`approve/purchase-request/${btoa(props.cd)}`,{
            TPCHREQ_BRANCH: props.dataHeader.TPCHREQ_BRANCH,
            conn: props.conn,
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
          .put(`revise/purchase-request/${btoa(props.cd)}`,{
            remark: datas,
            TPCHREQ_BRANCH: props.dataHeader.TPCHREQ_BRANCH,
            conn: props.conn,
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

  const printPR = () => {
    window.open(process.env.API_WEB + 'PDF/purchase/pr/' + btoa(props.cd) + '/' + btoa(props.conn), '_blank').focus();
  };
  </script>
