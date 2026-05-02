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
        <div class="text-h6">Assign Driver Form</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-tabs
          v-model="tab"
          class="bg-purple text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="items" label="Items" icon="inventory" />
          <q-tab name="costs" label="Costs" icon="price_check" />
          <q-tab name="maps" label="Maps" icon="map" />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
          class="bg-orange-1 text-dark text-center"
        >
          <q-tab-panel name="items">
            <div class="row text-left">
              <div class="col">
                <q-list bordered separator dense>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>{{ props.data.MCUS_CUSNM }}</q-item-label>
                      <q-item-label caption>Customer Name</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>{{ props.data.MCUS_ADDR1 }}</q-item-label>
                      <q-item-label caption>Customer Address</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item-label header>List Items</q-item-label>
                  <template v-if="dataDelivery.length > 0">
                    <q-item
                      clickable
                      v-ripple
                      v-for="(dlv, idx) in dataDelivery"
                      :key="idx"
                      :loading="loading"
                    >
                      <q-item-section>
                        <q-item-label>{{
                          dlv.TDLVORDDETA_ITMCD_ACT
                        }}</q-item-label>
                        <q-item-label caption>Item Code</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ dlv.TDLVORDDETA_ITMCD }}</q-item-label>
                        <q-item-label caption>Item Desc</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{
                          parseInt(dlv.TDLVORDDETA_ITMQT).toLocaleString()
                        }}</q-item-label>
                        <q-item-label caption>Item Quantity</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label
                          >Rp
                          {{
                            parseInt(dlv.TDLVORDDETA_PRC).toLocaleString()
                          }}</q-item-label
                        >
                        <q-item-label caption>Item Price</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-else>
                    <q-item>
                      <q-item-section class="text-grey">
                        {{ loading ? "Data is loading" : "No item founds" }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="costs" class="bg-grey-2 text-dark">
            <div class="text-center" v-if="loading">
              <q-spinner color="primary" />
              <div>Loading costs data...</div>
            </div>
            <template v-else>
              <q-dialog v-model="costDialog" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <dynamicForms :forms="listForms" v-model="formsData" />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn
                      flat
                      label="Submit"
                      color="primary"
                      @click="onSubmitCost()"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <q-table
                :rows="rowsSPK"
                :columns="colsSPK"
                row-key="CSPK_DOCNO"
                flat
                bordered
                title="Existing Costs Data"
              >
                <template v-slot:top-right>
                  <q-btn
                    flat
                    color="primary"
                    @click="getCostData()"
                    icon="refresh"
                    :loading="loading"
                  >
                    <q-tooltip>Refresh Costs Data</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    color="secondary"
                    @click="() => onClickNewCost()"
                    icon="add"
                  >
                    <q-tooltip>Create New Cost</q-tooltip>
                  </q-btn>
                </template>

                <template v-slot:empty>
                  <q-item>
                    <q-item-section class="text-grey">
                      No existing costs data found.
                    </q-item-section>
                  </q-item>
                </template>

                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th> Actions </q-th>
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      :class="col.name === 'CSPK_PIC_AS' ? 'text-bold' : ''"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td>
                      <q-btn
                        flat
                        :color="props.row.submitted_at || !rootData.is_allowed_approve_spk ? 'grey' : 'primary'"
                        @click="() => sendToApproval(props.row)"
                        icon="check"
                        :disable="(props.row.submitted_at || !rootData.is_allowed_approve_spk) ? true : false"
                      >
                        <q-tooltip>{{
                          rootData.is_allowed_approve_spk == true
                            ? props.row.submitted_at
                              ? "Already approved"
                              : "Approve"
                            : props.row.submitted_at
                              ? "Already approved"
                              : "Not allowed to approve"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        :color="!props.row.submitted_at ? 'grey' : 'secondary'"
                        @click="() => onPrintCost(props.row)"
                        icon="print"
                        :disable="!props.row.submitted_at ? true : false"
                      >
                        <q-tooltip>{{
                          !props.row.submitted_at
                            ? "Cannot print before submission approval"
                            : "Print Costs"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        :color="props.row.submitted_at ? 'grey' : 'secondary'"
                        @click="() => onEditCost(props.row)"
                        icon="edit"
                        :disable="props.row.submitted_at ? true : false"
                      >
                        <q-tooltip>{{ 
                          props.row.submitted_at
                            ? "Cannot edit after submission"
                            : "Edit Costs Data"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        :color="props.row.submitted_at ? 'grey' : 'negative'"
                        @click="() => onDeleteCost(props.row)"
                        icon="delete"
                        :disable="props.row.submitted_at ? true : false"
                      >
                        <q-tooltip>{{
                          props.row.submitted_at
                            ? "Cannot delete after submission"
                            : "Delete Costs Data"
                        }}</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      :class="col.name === 'CSPK_PIC_AS' ? 'text-bold' : ''"
                    >
                      {{ props.row[col.field] }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </template>
          </q-tab-panel>

          <q-tab-panel name="maps" class="bg-lime-1 text-dark">
            <div class="text-h6">Maps</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onDialogOK"
          :disable="stateSubmit"
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

import dynamicForms from "components/dynamicForms.vue";

const tab = ref("items");
const loading = ref(false);
const dataDelivery = ref([]);
const listForms = ref([]);
const formsData = ref({});
const selectedID = ref(null);
// const form = ref({});

const rowsSPK = ref([]);
const colsSPK = ref([
  {
    name: "CSPK_PIC_AS",
    label: "PIC As",
    field: "CSPK_PIC_AS",
    align: "left",
  },
  {
    name: "CSPK_PIC_NAME",
    label: "PIC Name",
    field: "CSPK_PIC_NAME",
    align: "left",
  },
  {
    name: "CSPK_KM",
    label: "KM",
    field: "CSPK_KM",
    align: "left",
  },
  {
    name: "CSPK_WHEELS",
    label: "Jumlah Roda",
    field: "CSPK_WHEELS",
    align: "left",
  },
  {
    name: "CSPK_UANG_JALAN",
    label: "Uang Jalan",
    field: "CSPK_UANG_JALAN",
    align: "left",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_SUPPLIER",
    label: "Solar Supplier",
    field: "CSPK_SUPPLIER",
    align: "left",
  },
  {
    name: "CSPK_LITER_EXISTING",
    label: "Liters Existing",
    field: "CSPK_LITER_EXISTING",
    align: "left",
    format: (val) => `${parseInt(val).toLocaleString()} L`,
  },
  {
    name: "CSPK_LITER",
    label: "Liters",
    field: "CSPK_LITER",
    format: (val) => `${parseInt(val).toLocaleString()} L`,
  },
  {
    name: "CSPK_UANG_SOLAR",
    label: "Uang Solar",
    field: "CSPK_UANG_SOLAR",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_UANG_MAKAN",
    label: "Uang Makan",
    field: "CSPK_UANG_MAKAN",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_UANG_MANDAH",
    label: "Uang Mandah",
    field: "CSPK_UANG_MANDAH",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_UANG_PENGINAPAN",
    label: "Uang Penginapan",
    field: "CSPK_UANG_PENGINAPAN",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_UANG_PENGAWALAN",
    label: "Uang Pengawalan",
    field: "CSPK_UANG_PENGAWALAN",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
  {
    name: "CSPK_UANG_LAIN2",
    label: "Uang Lain-lain",
    field: "CSPK_UANG_LAIN2",
    align: "right",
    format: (val) => `Rp ${parseInt(val).toLocaleString()}`,
  },
]);

const costDialog = ref(false);
const $q = useQuasar();
const rootData = ref({});

const props = defineProps({
  data: Object,
});

onMounted(() => {
  console.log(props.data);
  rootData.value = props.data;
  getDetailData(props.data.TDLVORD_DLVCD);
  getGencodeData(props.data);
  getCostData();
});

const getDetailData = async (dlvcd) => {
  loading.value = true;
  try {
    const response = await api_web.post("invoices/getDataDetailByDoc", {
      dlvcd: dlvcd,
      opt: {
        isDlvDet: true,
      },
    });

    if (response.data) {
      console.log("Detail Data:", response.data);
      // Process the detail data
      dataDelivery.value = response.data.dlvdet;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load detail data",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const getGencodeData = async (val) => {
  console.log("Selected Branch ID:", val);
  loading.value = true;
  try {
    const response = await api_web.post(
      `/gencode/getGencodeList/${val.TDLVORD_BRANCH}`,
      {
        code: "GEN_DLV_ASGN_FORM",
        includeChild: true,
        cg:
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("CGID="))
            ?.split("=")[1] || "",
      }
    );

    if (response.data.data) {
      listForms.value = response.data.data.map((items) => {
        const recurseArr = (arr) => {
          console.log("tester", arr);
          let options = [];
          try {
            options = JSON.parse(arr.desc2) || [];
          } catch (error) {
            console.error("Error parsing GENCODE_DESC:", error);
          }

          return {
            id: arr.idx,
            name: arr.code,
            types: arr.desc,
            options: arr.desc === "selectAPI" ? [] : options,
            apiOpt: arr.desc === "selectAPI" ? options : null,
            children:
              arr.children.length > 0
                ? arr.children.map((childMap) => recurseArr(childMap))
                : [],
            formLength: arr.desc3 ? parseInt(arr.desc3) : 12,
          };
        };

        return recurseArr(items);
      });

      console.log("Gencode Data:", listForms.value);
      // Process the gencode data
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load gencode data",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const convToSubmit = computed(() => {
  return {
    CSPK_REFF_DOC: props.data.TDLVORD_DLVCD,
    CSPK_PIC_AS: formsData.value.pic_as,
    CSPK_PIC_NAME: formsData.value.pic_name,
    CSPK_KM: parseInt(formsData.value.km) || 0,
    CSPK_WHEELS: parseInt(formsData.value.jumlah_roda) || 0,
    CSPK_SUPPLIER: formsData.value.solar_supplier,
    CSPK_LITER: parseInt(formsData.value.liters) || 0,
    CSPK_LITER_EXISTING: parseInt(formsData.value.liters_existing) || 0,
    CSPK_UANG_MAKAN: parseInt(formsData.value.makan) || 0,
    CSPK_UANG_MANDAH: parseInt(formsData.value.mandah) || 0,
    CSPK_UANG_PENGINAPAN: parseInt(formsData.value.penginapan) || 0,
    CSPK_UANG_PENGAWALAN: parseInt(formsData.value.pengawalan) || 0,
    CSPK_UANG_LAIN2: parseInt(formsData.value.lain_lain) || 0,
    CSPK_LEAVEDT: formsData.value.berangkat || "",
    CSPK_BACKDT: formsData.value.kembali || "",
    CSPK_VEHICLE_TYPE: formsData.value.jenis || "",
    CSPK_JOBDESK: formsData.value.tugas || "",
    CSPK_VEHICLE_REGNUM: formsData.value.nomor_polisi || "",
  };
});

const getCostData = () => {
  loading.value = true;
  api_web
    .get(`delivery/document/${btoa(props.data.TDLVORD_DLVCD)}`, {
      TDLVORDDETA_BRANCH: props.data.TDLVORD_BRANCH,
    })
    .then((response) => {
      console.log("Costs Data:", response.data);
      rowsSPK.value = response.data.SPK || [];
    })
    .catch((error) => {
      console.error("Error fetching costs data:", error);
      $q.notify({
        color: "negative",
        message: "Failed to load costs data",
        icon: "report_problem",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSubmitCost = () => {
  $q.dialog({
    title: "Confirm Submission",
    message: `Are you sure you want to ${selectedID.value ? "update" : "submit"} the costs data?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    console.log("Submitting costs data:", convToSubmit.value);
    let headAPI;

    if (selectedID.value) {
      headAPI = api_web.put(`SPK/${btoa(selectedID.value)}`, {
        ...convToSubmit.value,
        id: btoa(selectedID.value),
      });
    } else {
      headAPI = api_web.post("SPK", convToSubmit.value);
    }

    headAPI
      .then((response) => {
        console.log("Costs data submitted successfully:", response.data);
        $q.notify({
          color: "positive",
          message: "Costs data submitted successfully",
          icon: "check_circle",
        });
        costDialog.value = false;
        getCostData(); // Refresh the costs data after submission
      })
      .catch((error) => {
        console.error("Error submitting costs data:", error);
        $q.notify({
          color: "negative",
          message: "Failed to submit costs data",
          icon: "report_problem",
        });
      });
  });
};

const convForms = computed(() => {
  return {
    pic_as: formsData.value["CSPK_PIC_AS"] || "",
    pic_name: formsData.value["CSPK_PIC_NAME"] || "",
    km: formsData.value["CSPK_KM"] || "",
    jumlah_roda: formsData.value["CSPK_WHEELS"] || "",
    solar_supplier: formsData.value["CSPK_SUPPLIER"] || "",
    liters: formsData.value["CSPK_LITER"] || 0,
    liters_existing: formsData.value["CSPK_LITER_EXISTING"] || 0,
    makan: formsData.value["CSPK_UANG_MAKAN"] || 0,
    mandah: formsData.value["CSPK_UANG_MANDAH"] || 0,
    penginapan: formsData.value["CSPK_UANG_PENGINAPAN"] || 0,
    pengawalan: formsData.value["CSPK_UANG_PENGAWALAN"] || 0,
    lain_lain: formsData.value["CSPK_UANG_LAIN2"] || 0,
    berangkat: formsData.value["CSPK_LEAVEDT"] || "",
    kembali: formsData.value["CSPK_BACKDT"] || "",
    jenis: formsData.value["CSPK_VEHICLE_TYPE"] || "",
    tugas: formsData.value["CSPK_JOBDESK"] || "",
    nomor_polisi: formsData.value["CSPK_NOMOR_POLISI"] || "",
  };
});

const onClickNewCost = () => {
  selectedID.value = null; // Clear selected ID when creating new cost
  formsData.value = {};
  costDialog.value = true;
};

const onEditCost = (cost) => {
  console.log("Editing cost entry:", cost);

  formsData.value = {
    pic_as: cost.CSPK_PIC_AS || "",
    pic_name: cost.CSPK_PIC_NAME || "",
    km: cost.CSPK_KM || "",
    jumlah_roda: cost.CSPK_WHEELS || "",
    solar_supplier: cost.CSPK_SUPPLIER || "",
    liters: cost.CSPK_LITER || 0,
    liters_existing: cost.CSPK_LITER_EXISTING || 0,
    makan: cost.CSPK_UANG_MAKAN || 0,
    mandah: cost.CSPK_UANG_MANDAH || 0,
    penginapan: cost.CSPK_UANG_PENGINAPAN || 0,
    pengawalan: cost.CSPK_UANG_PENGAWALAN || 0,
    lain_lain: cost.CSPK_UANG_LAIN2 || 0,
    berangkat: cost.CSPK_LEAVEDT || "",
    kembali: cost.CSPK_BACKDT || "",
    jenis: cost.CSPK_VEHICLE_TYPE || "",
    tugas: cost.CSPK_JOBDESK || "",
    nomor_polisi: cost.CSPK_NOMOR_POLISI || "",
  };

  selectedID.value = cost.id; // Store the ID of the cost entry being edited

  console.log(convForms.value);

  costDialog.value = true;
  // Here you can add the logic to edit the selected cost entry, e.g., open a form dialog pre-filled with the cost data
};

const sendToApproval = (cost) => {
  $q.dialog({
    title: "Confirm Submission",
    message: "Are you sure you want to submit this cost entry for approval?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    api_web
      .put(`SPK/submit/${btoa(cost.id)}`, {
        id: btoa(cost.id),
      })
      .then((response) => {
        console.log("Cost entry submitted for approval:", response.data);
        $q.notify({
          color: "positive",
          message: "Cost entry submitted for approval",
          icon: "check_circle",
        });
        getCostData(); // Refresh the costs data after submission
      })
      .catch((error) => {
        console.error("Error submitting cost entry for approval:", error);
        $q.notify({
          color: "negative",
          message: "Failed to submit cost entry for approval",
          icon: "report_problem",
        });
      });
    // Here you can add the logic to submit the selected cost entry for approval, e.g., send an API request to update the cost status
  });
};

const onPrintCost = (cost) => {
  // Here you can add the logic to print the selected cost entry, e.g., open a print dialog or generate a PDF
  console.log("Printing cost entry:", cost);
  window.open(`${process.env.API_WEB}PDF/SPK/${btoa(cost.id)}`, "_blank");
};

const onDeleteCost = (cost) => {
  $q.dialog({
    title: "Confirm Deletion",
    message: "Are you sure you want to delete this cost entry?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    api_web
      .delete(`SPK/${cost.id}`)
      .then((response) => {
        console.log("Cost entry deleted:", response.data);
        $q.notify({
          color: "positive",
          message: "Cost entry deleted",
          icon: "check_circle",
        });
        getCostData(); // Refresh the costs data after deletion
      })
      .catch((error) => {
        console.error("Error deleting cost entry:", error);
        $q.notify({
          color: "negative",
          message: "Failed to delete cost entry",
          icon: "report_problem",
        });
      });
    // Here you can add the logic to delete the selected cost entry, e.g., send an API request to remove the cost from the database
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
