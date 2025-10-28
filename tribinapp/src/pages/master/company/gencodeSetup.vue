<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <span class="text-h3">Manage Generate Code</span>
      </div>
      <div class="col text-right"></div>
    </div>

    <div class="row q-pt-md">
      <div class="col">
        <q-select
          v-model="selectedBranch"
          :options="branchOptions"
          label="Select Branch"
          outlined
          clearable
          option-label="MBRANCH_NM"
          option-value="BRANCH"
          @update:model-value="getGencodeData(selectedBranch)"
          :loading="loading"
          dense
        />
      </div>

      <div class="col-1 text-right">
        <q-btn
          @click="getGencodeData()"
          icon="refresh"
          color="primary"
          flat
          :disable="!selectedBranch"
          :loading="loading"
        ></q-btn>
        <q-btn
          @click="onClickAddCode()"
          icon="add"
          color="primary"
          :disable="!selectedBranch"
          :loading="loading"
        ></q-btn>
      </div>
    </div>

    <q-separator spaced />

    <template v-if="branchLists.length > 0">
      <div class="row" style="overflow: auto; max-height: 50vh;">
        <div class="col-12" v-for="item in branchLists" :key="item.id">
          <fieldset style="border: 1px black solid; border-radius: 10px">
            <legend
              style="
                margin-left: 1em;
                padding: 0.2em 0.8em;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(100% - 2em);
              "
            >
              <b>{{ safeCapitalize(item.desc) }}</b>
              <q-btn
                @click="branchLists.splice(branchLists.indexOf(item), 1)"
                icon="delete"
                color="negative"
                size="sm"
                dense
                round
              />
              <q-btn
                @click="onClickAddCode(item)"
                icon="edit"
                color="primary"
                size="sm"
                dense
                round
              />
            </legend>

            <div class="row q-gutter-md q-pa-md">
              <div class="col-12 text-right">
                <q-btn
                  @click="
                    item.data.push({
                      MGECD_VALUE: '',
                      MGECD_DESC: '',
                      MGECD_FLAG: false,
                    })
                  "
                  icon="add"
                  color="primary"
                ></q-btn>
              </div>
              <template v-for="(datas, idx) in item.data" :key="idx">
                <div class="col q-gutter-sm">
                  <div class="row">
                    <div class="col">
                      <q-input
                        v-model="datas.MGECD_VALUE"
                        label="Code"
                        outlined
                      />
                    </div>
                    <div class="col-1 text-right">
                      <q-btn
                        @click="item.data.splice(idx, 1)"
                        icon="remove"
                        color="negative"
                        dense
                      ></q-btn>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <q-input
                        v-model="datas.MGECD_DESC"
                        label="Separator"
                        outlined
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <q-input
                        v-model="datas.MGECD_DESC3"
                        label="Code Options"
                        outlined
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <q-toggle
                        v-model="datas.MGECD_FLAG"
                        label="Auto Increment Number"
                        color="primary"
                        left-label
                        dense
                        :true-value="1"
                        :false-value="0"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="row q-pt-md">
        <div class="col">
          <q-btn
            @click="getGencodeData(selectedBranch)"
            label="Cancel"
            color="warning"
            outlined
            :loading="loading"
          />
          <q-btn
            @click="onClickSave()"
            label="Save"
            color="primary"
            class="q-ml-sm"
            :loading="loading"
          />
        </div>
      </div>
    </template>
    <div class="row" v-else>
      <div class="col">No data available</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";
import multiplePromptDialog from "src/components/multiplePromptDialog.vue";

const $q = useQuasar();
const loading = ref(false);
const selectedBranch = ref("");
const branchOptions = ref([]);
const branchLists = ref([]);

onMounted(() => {
  fetchBranches();
});

const safeCapitalize = (str) =>
  str ? str.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()) : "";

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

const onClickAddCode = (data = null) => {
  $q.dialog({
    component: multiplePromptDialog,
    componentProps: {
      title: "Add Branch Gencode",
      initialFields: [
        {
          name: "code",
          label: "Gencode Code",
          type: "text",
          default: data?.code || "",
          rules: [
            (val) => !!val || "Field is required",
            (val) =>
              /^[A-Za-z0-9]+$/.test(val) ||
              "No spaces or special characters allowed",
          ],
        },
        {
          name: "desc",
          label: "Gencode Description",
          type: "text",
          default: data?.desc || "",
          rules: [(val) => !!val || "Field is required"],
        },
      ],
    },
    cancel: true,
    persistent: true,
  }).onOk((result) => {
    branchLists.value.push({
      code: `GEN_REF_${result.code.toUpperCase()}`,
      desc: result.desc,
      data: [
        {
          MGECD_VALUE: "",
          MGECD_DESC: "",
          MGECD_DESC2: selectedBranch.value.BRANCH,
          MGECD_FLAG: 0,
        },
      ],
    });
  });
};

const getGencodeData = async (val) => {
  console.log("Selected Branch ID:", val);
  loading.value = true;
  try {
    const response = await api_web.post(`/gencode/getGencodeList/${val.BRANCH}`, {
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
    });

    if (response.data.data) {
      console.log("Gencode Data:", response.data.data);

      branchLists.value = response.data.data;
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

const onClickSave = async () => {
  loading.value = true;
  try {
    const payload = {
      cg:
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("CGID="))
          ?.split("=")[1] || "",
      gencodeData: branchLists.value,
    };

    const response = await api_web.post("/gencode/storeGencodeData", payload);

    if (response.data.success) {
      $q.notify({
        color: "positive",
        message: "Gencode data saved successfully",
        icon: "check_circle",
      });
      // Optionally refresh data
      getGencodeData(selectedBranch.value);
    } else {
      throw new Error(response.data.message || "Failed to save data");
    }
  } catch (error) {
    $q.notify({
      color: "negative",
      message: error.message || "Failed to save gencode data",
      icon: "report_problem",
    });
  } finally {
    loading.value = false;
  }
};
</script>
