<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <span class="text-h4">Branch Information</span>
      </div>
      <div class="col text-right">
        <q-btn
          color="primary"
          label="Add Branch"
          icon="add"
          @click="onClickAddBranch()"
        />
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Branch List"
          :rows="branches"
          :columns="columns"
          row-key="id"
          :loading="loading"
        >
          <!-- For header -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th auto-width>Action</q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <q-btn
                  color="primary"
                  icon="edit"
                  size="sm"
                  flat
                  round
                  @click="onClickAddBranch(props.row)"
                >
                  <q-tooltip>Edit</q-tooltip>
                </q-btn>
                <q-btn
                  color="negative"
                  icon="delete"
                  size="sm"
                  flat
                  round
                  @click="onClickDeleteBranch(props.row)"
                >
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:top-right>
            <div class="row q-gutter-sm">
              <div class="col">
                <div
                  v-for="(filterItem, index) in dynamicFilters"
                  :key="index"
                  class="row q-gutter-sm items-end"
                >
                  <div class="col">
                    <q-select
                      v-model="filterItem.column"
                      :options="columnOptions"
                      label="Column"
                      dense
                      outlined
                    />
                  </div>
                  <div class="col">
                    <q-select
                      v-model="filterItem.condition"
                      :options="conditionOptions"
                      label="Condition"
                      dense
                      outlined
                    />
                  </div>
                  <div class="col">
                    <q-input
                      v-model="filterItem.value"
                      label="Value"
                      dense
                      outlined
                    />
                  </div>
                  <div class="col-6 text-right">
                    <template v-if="index === 0">
                      <q-btn color="positive" icon="add" @click="addFilter">
                        <q-tooltip>Add Filter</q-tooltip>
                      </q-btn>
                      <q-btn color="primary" icon="search" @click="applyFilter">
                        <q-tooltip>Apply Filter</q-tooltip>
                      </q-btn>
                      <q-btn
                        color="secondary"
                        icon="clear"
                        @click="clearFilter"
                      >
                        <q-tooltip>Clear Filters</q-tooltip>
                      </q-btn>
                    </template>
                    <q-btn
                      color="negative"
                      icon="remove"
                      @click="removeFilter(index)"
                      :disable="dynamicFilters.length === 1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </q-table>
      </div>
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
const branches = ref([]);
const selected = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const filter = ref([]);

// Dynamic filters
const dynamicFilters = ref([{ column: null, condition: null, value: "" }]);

// Column options for the filter dropdown
const columnOptions = [
  { label: "Branch Name", value: "MBRANCH_NM" },
  { label: "Letter Head", value: "letter_head" },
  { label: "Branch Code", value: "BRANCH" },
  { label: "Address", value: "address" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
];

// Condition options for filtering
const conditionOptions = [
  { label: "Contains", value: "like" },
  { label: "Equals", value: "=" },
  { label: "Starts with", value: "startsWith" },
  { label: "Ends with", value: "endsWith" },
];

// Table columns definition
const columns = [
  {
    name: "BRANCH",
    label: "Branch Code",
    field: "BRANCH",
    align: "left",
    sortable: true,
  },
  {
    name: "MBRANCH_NM",
    label: "Branch Name",
    field: "MBRANCH_NM",
    align: "left",
    sortable: true,
  },
  {
    name: "letter_head",
    label: "Letter Head",
    field: "letter_head",
    align: "left",
  },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "phone", label: "Phone", field: "phone", align: "left" },
  { name: "fax", label: "Fax", field: "fax", align: "left" },
  { name: "address", label: "Address", field: "address", align: "left" },
];

const addFilter = () => {
  dynamicFilters.value.push({ column: null, condition: null, value: "" });
};

const removeFilter = (index) => {
  if (dynamicFilters.value.length > 1) {
    dynamicFilters.value.splice(index, 1);
  }
};

const applyFilter = () => {
  const validFilters = dynamicFilters.value.filter(
    (f) => f.column && f.condition && f.value && f.value.toString().trim()
  );

  // Transform filters to the expected format for the backend
  filter.value = validFilters.map((f) => ({
    column: f.column.value || f.column,
    condition: f.condition.value || f.condition,
    value: f.value.toString().trim(),
  }));

  fetchBranches();
};

const clearFilter = () => {
  dynamicFilters.value = [{ column: null, condition: null, value: "" }];
  filter.value = [];
};

const onRequest = (props) => {
  // Handle pagination or sorting if needed
  pagination.value = props.pagination;
};

onMounted(() => {
  fetchBranches();
});

const fetchBranches = async () => {
  loading.value = true;
  try {
    const response = await api_web.post("/branch/showData", {
      pagination: pagination.value,
      filter: filter.value,
    });

    console.log(response.data.data);

    if (response.data.data.data) {
      branches.value = Array.isArray(response.data.data.data)
        ? response.data.data.data
        : [];
      pagination.value.rowsNumber = response.data.data.total;
      pagination.value.page = response.data.data.current_page;
      pagination.value.rowsPerPage = response.data.data.per_page;
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

const onClickAddBranch = (data) => {
  $q.dialog({
    component: multiplePromptDialog,
    componentProps: {
      title: "User Details",
      initialFields: [
        {
          name: "branchCode",
          label: "Branch Code",
          type: "text",
          default: data?.BRANCH || "",
          rules: [
            (val) => !!val || "Field is required",
            (val) =>
              /^[A-Za-z0-9]+$/.test(val) ||
              "No spaces or special characters allowed",
          ],
        },
        {
          name: "branchName",
          label: "Branch Name",
          type: "text",
          default: data?.MBRANCH_NM || "",
          rules: [(val) => !!val || "Field is required"],
        },
        {
          name: "letterHead",
          label: "Letter Head",
          type: "text",
          default: data?.letter_head || "",
          rules: [
            (val) => !!val || "Field is required",
            (val) =>
              /^[A-Za-z0-9]+$/.test(val) ||
              "No spaces or special characters allowed",
          ],
        },
        {
          name: "address",
          label: "Address",
          type: "text",
          default: data?.address || "",
        },
        {
          name: "phone",
          label: "Phone",
          type: "text",
          default: data?.phone || "",
        },
        {
          name: "fax",
          label: "Fax",
          type: "text",
          default: data?.fax || "",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          default: data?.email || "",
          rules: [
            (val) => !!val || "Field is required",
            (val) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
              "Must be a valid email address",
          ],
        },
      ],
      addable: true,
      removable: true,
    },
  }).onOk(async (payload) => {
    saveBranch(payload)
  });
};

const saveBranch = (data) => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to save this branch?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      loading.value = true;
      const response = await api_web.post("/branch/saveBranch", data);

      if (response.data.success) {
        $q.notify({
          color: "positive",
          message: "Branch saved successfully",
          icon: "check_circle",
        });
        fetchBranches();
      } else {
        throw new Error(response.data.message || "Failed to save branch");
      }
    } catch (error) {
      $q.notify({
        color: "negative",
        message: error.message || "Failed to save branch",
        icon: "report_problem",
      });
    } finally {
      loading.value = false;
    }
  });
};
</script>
