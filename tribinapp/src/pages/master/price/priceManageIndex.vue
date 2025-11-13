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
        <div class="text-h6">Price Maintenance</div>
      </q-card-section>

      <q-form ref="formRef" class="q-gutter-md">
        <q-card-section class="q-pa-sm no-wrap">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select
                v-model="header.MITMBPRC_BRANCH"
                :options="branchOptions"
                label="Select Branch"
                outlined
                clearable
                option-label="MBRANCH_NM"
                option-value="BRANCH"
                emit-value
                map-options
                :loading="loading"
                dense
                :rules="[(val) => !!val || 'Branch is required']"
                @update:model-value="getGencodeData"
                readonly
              />
            </div>
            <div class="col-12">
              <q-select
                dense
                filled
                label="Item Code"
                v-model="header.MITMBPRC_ITMCD"
                use-input
                input-debounce="500"
                :options="listItems"
                @filter="
                  (val, update, abort) => filterFn(val, update, abort, 'item')
                "
                behavior="dialog"
                option-label="MITM_ITMNMREAL"
                option-value="MITM_ITMNM"
                emit-value
                map-options
                :loading="loading"
                @update:model-value="onSelectItem"
                :rules="[(val) => !!val || 'Item Code is required']"
                :disable="!header.MITMBPRC_BRANCH"
              >
              </q-select>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model.number="header.MITMBPRC_PRC"
                label="Base Price"
                type="number"
                outlined
                dense
                :rules="[(val) => val >= 0 || 'Price must be positive']"
                :disable="!header.MITMBPRC_BRANCH"
                :loading="loading"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model.number="header.MITMSPRC_PRC"
                label="Sell Price"
                type="number"
                outlined
                dense
                :rules="[(val) => val >= 0 || 'Price must be positive']"
                :disable="!header.MITMBPRC_BRANCH"
                :loading="loading"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="header.MITMBPRC_STARTDT"
                label="Start Date"
                outlined
                dense
                :rules="[(val) => !!val || 'Start Date is required']"
                :disable="!header.MITMBPRC_BRANCH"
                :loading="loading"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="header.MITMBPRC_STARTDT"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="header.MITMBPRC_ENDDT"
                label="End Date"
                outlined
                dense
                :rules="[(val) => !!val || 'End Date is required']"
                :disable="!header.MITMBPRC_BRANCH"
                :loading="loading"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="header.MITMBPRC_ENDDT" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-select
                v-model="header.MITMSPRC_TYPE"
                :options="typeOptions"
                label="Select Price Type"
                outlined
                clearable
                option-label="desc"
                option-value="code"
                emit-value
                map-options
                :loading="loading"
                dense
                :rules="[(val) => !!val || 'Type is required']"
                :disable="!header.MITMBPRC_BRANCH"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="header.MITMBPRC_ACTIVE"
                label="Active Status"
                :options="['Y', 'N']"
                outlined
                dense
                :rules="[(val) => !!val || 'Active Status is required']"
                :disable="!header.MITMBPRC_BRANCH"
                :loading="loading"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Clear"
            color="grey"
            flat
            @click="clearForm"
            :loading="loading"
          />
          <q-btn
            label="Cancel"
            color="negative"
            flat
            @click="onDialogCancel"
            :loading="loading"
          />
          <q-btn
            label="Save"
            color="primary"
            @click="saveData"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  branch: String,
  dataHeader: Array,
});

const header = ref({
  MITMBPRC_ITMCD: "",
  MITMBPRC_PRC: 0,
  MITMSPRC_PRC: 0,
  MITMBPRC_STARTDT: "",
  MITMBPRC_ENDDT: "",
  MITMBPRC_ACTIVE: "",
  MITMBPRC_CG:
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("CGID="))
      ?.split("=")[1] || "",
  MITMBPRC_BRANCH: "",
  MITMSPRC_TYPE: "",
});

const loading = ref(false);
const listLoc = ref([]);
const listItems = ref([]);
const branchOptions = ref([]);
const typeOptions = ref([]);
const globalSettings = ref([]);

onMounted(async () => {
  if (props.branch) {
    header.value.MITMBPRC_BRANCH = props.branch;
  }

  if (props.dataHeader && Object.values(props.dataHeader).length > 0) {
    header.value = props.dataHeader;
    header.value.MITMBPRC_BRANCH = String(props.dataHeader.MITMBPRC_BRANCH);
  }

  getGencodeData(header.value.MITMBPRC_BRANCH);
  fetchBranches();
});

const clearForm = () => {
  header.value = {
    MITMBPRC_ITMCD: "",
    MITMBPRC_PRC: 0,
    MITMSPRC_PRC: 0,
    MITMBPRC_STARTDT: "",
    MITMBPRC_ENDDT: "",
    MITMBPRC_ACTIVE: "",
    MITMBPRC_CG:
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("CGID="))
        ?.split("=")[1] || "",
    MITMBPRC_BRANCH: "",
    MITMSPRC_TYPE: "",
  };
};

const fetchBranches = async () => {
  loading.value = true;
  try {
    const response = await api_web.post("/branch/showData");

    console.log(response.data.data);

    if (response.data.data) {
      branchOptions.value = response.data.data;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Failed to load branches",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "item") {
      await getItem(val);
    }
  });
};

const getGencodeData = async (val) => {
  console.log("Selected Branch ID:", val);
  await getDataTypePrice(val);
  await getGlobalMargin(val);
};

const getDataTypePrice = async (branch) => {
  try {
    const response = await api_web.post(`/gencode/getGencodeList/${branch}`, {
      code: "MPRC_TYPE",
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
    });

    if (response.data.data) {
      console.log("Gencode Data:", response.data.data);

      typeOptions.value = response.data.data;
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

const getGlobalMargin = async (branch) => {
  try {
    const response = await api_web.post(`/gencode/getGencodeList/${branch}`, {
      code: "PRICE_SET_GLOBAL",
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
    });

    if (response.data.data) {
      console.log("Gencode Data:", response.data.data);

      globalSettings.value = response.data.data ?? [];
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

const getItem = async (val) => {
  loading.value = true;
  await api_web
    .post("item/searchAPI", {
      searchValue: val,
      IS_ITMCD: 1,
    })
    .then((response) => {
      loading.value = false;
      listItems.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSelectItem = (val) => {
  const selectedItem = listItems.value.find((item) => item.MITM_ITMNM === val);

  //   Change Price using latest price from item list
  if (selectedItem) {
    console.log(globalSettings.value);
    const percentageMargin =
      globalSettings.value.find(
        (setting) => setting.code === "PERCENTAGE_MARGIN"
      )?.desc || 0;
    console.log(percentageMargin);

    header.value.MITMBPRC_PRC = selectedItem.LATEST_PRC;
    header.value.MITMSPRC_PRC = (
      selectedItem.LATEST_PRC +
      selectedItem.LATEST_PRC * (percentageMargin / 100)
    ).toFixed(2);
  }
};

const saveData = async () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to save this data?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post("/price", header.value)
      .then((response) => {
        $q.notify({
          type: "positive",
          message: "Data saved successfully",
        });

        clearForm();
      })
      .catch((e) => {
        const errorData = e.response?.data;
        let errorMessage =
          errorData?.message || e.message || "Failed to save data";

        // If there are validation errors, append them to the message
        if (errorData?.errors) {
          const validationErrors = Object.values(errorData.errors)
            .flat()
            .join(", ");
          errorMessage = validationErrors || errorMessage;
        }

        $q.notify({
          type: "negative",
          message: errorMessage,
        });
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
</script>
