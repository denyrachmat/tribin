<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col text-right">
        <q-table
          title="POS List"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :loading="loading"
          dense
          v-model:pagination="pagination"
          class="my-sticky-header-column-table"
          @request="onRequest"
        >
          <template v-slot:top-right>
            <q-select
              outlined
              v-model="filterCol"
              :options="[
                ...columns,
                { name: 'TDLVORDDETA_ITMCD', label: 'Item Name' },
              ]"
              label="Search Columns"
              option-value="name"
              option-label="label"
              emit-value
              dense
              map-options
            />
            <q-input
              borderless
              dense
              v-model="filter"
              placeholder="Search"
              outlined
              @update:model-value="getListData(pagination)"
              debounce="1000"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- For header -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th auto-width>Action</q-th>
            </q-tr>
          </template>

          <!-- For body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ props.row[col.field] }}
              </q-td>
              <q-td auto-width>
                <q-btn
                  color="primary"
                  icon="print"
                  @click="onClickPrintStruk(props.row.TPOS_DOCNO)"
                  :loading="props.row.loading"
                >
                  <q-tooltip>Print Receipt</q-tooltip>
                </q-btn>
                <q-btn
                  color="secondary"
                  icon="send"
                  @click="onClickSendToDeliveryOrder(props.row.TPOS_DOCNO)"
                  :disable="props.row.has_delivery_order == 1"
                  :loading="props.row.loading"
                >
                  <q-tooltip>Send to Delivery</q-tooltip>
                </q-btn>
                <q-btn
                  color="red"
                  icon="delete"
                  @click="onClickDeleteTransaction(props.row.TPOS_DOCNO)"
                  :disable="props.row.has_delivery_order == 1"
                  :loading="props.row.loading"
                >
                  <q-tooltip>Delete Transaction</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { api_web } from "boot/axios";

const router = useRouter();
const $q = useQuasar();

const rows = ref([]);
const columns = ref([
  {
    name: "TPOS_DOCNO",
    label: "Transaction ID",
    field: "TPOS_DOCNO",
    sortable: true,
    align: "left",
  },
  {
    name: "TPOS_CUSTCD",
    label: "Customer Code",
    field: "TPOS_CUSTCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CUSNM",
    label: "Customer Name",
    field: "MCUS_CUSNM",
    sortable: true,
    align: "left",
  },
  {
    name: "MCUS_CURCD",
    label: "Currency",
    field: "MCUS_CURCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TPOS_TOTALAMT",
    label: "Total Amount",
    field: "TPOS_TOTALAMT",
    sortable: true,
    align: "right",
  },
]);
const loading = ref(false);
const filter = ref("");
const filterCol = ref("TPOS_DOCNO");
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "TPOS_DOCNO",
  descending: false,
});

onMounted(() => {
  getListData(pagination.value);
});

const getListData = async (pagination) => {
  loading.value = true;
  try {
    const response = await api_web.post("pos/searchApi", {
      pagination: pagination,
      searchBy: filterCol.value,
      searchValue: filter.value,
    });
    rows.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    $q.dialog({
      title: "Error",
      message: "Failed to fetch data. Please try again.",
      ok: "OK",
    });
  } finally {
    loading.value = false;
  }
};

const onClickPrintStruk = async (docNo) => {
  try {
    loading.value = true;
    const response = await api_web.post(
      "pos/printStruk",
      { TPOS_DOCNO: docNo },
      { responseType: "blob" }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error printing struk:", error);
    $q.dialog({
      title: "Error",
      message: "Failed to print struk. Please try again.",
      ok: "OK",
    });
  } finally {
    loading.value = false;
  }
};

const onClickSendToDeliveryOrder = (docNo) => {
  try {
    $q.dialog({
      title: "Confirm",
      message:
        "Are you sure you want to send this transaction to delivery order?",
      cancel: "Cancel",
      ok: "Yes",
    }).onOk(async () => {
      loading.value = true;
      const sendAPI = await api_web.post("posOpt/sendToDeliveryOrder", {
        TPOS_DOCNO: docNo,
        cg:
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("CGID="))
            ?.split("=")[1] || "",
      });

      if (sendAPI) {
        $q.notify({
          type: "positive",
          message: "Transaction sent to delivery order successfully!",
        });

        getListData(pagination.value); // Refresh the list after sending to delivery order
      }
    });
  } catch (error) {
    $q.dialog({
      title: "Error",
      message: "Failed to navigate to delivery order. Please try again.",
      ok: "OK",
    });
  } finally {
    loading.value = false;
  }
};

const onClickDeleteTransaction = (docNo) => {
  try {
    $q.dialog({
      title: "Confirm",
      message: "Are you sure you want to delete this transaction?",
      cancel: "Cancel",
      ok: "Yes",
    }).onOk(async () => {
      loading.value = true;
      const deleteAPI = await api_web.delete(`pos/${btoa(docNo)}`);

      if (deleteAPI) {
        $q.notify({
          type: "positive",
          message: "Transaction deleted successfully!",
        });
        getListData(pagination.value); // Refresh the list after deletion
      }
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    $q.dialog({
      title: "Error",
      message: "Failed to delete transaction. Please try again.",
      ok: "OK",
    });
  } finally {
    loading.value = false;
  }
};
</script>
