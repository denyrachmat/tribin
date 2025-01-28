<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="text-h6 col">Payment Account</div>
      <div class="col text-right">
        <q-btn
          color="primary"
          icon="add"
          @click="onClickAdd()"
          :loading="loading"
        ></q-btn>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Account List"
          :rows="rows"
          :columns="cols"
          row-key="bank_account_number"
          :loading="loading"
          dense
          :pagination="{
            rowsPerPage: 20,
          }"
          class="my-sticky-header-column-table"
        >
          <template v-slot:top-right>
            <q-select
              outlined
              v-model="filterCol"
              :options="cols"
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
              @update:model-value="getPaymentList()"
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
              <q-th auto-width>Action</q-th>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  flat
                  :color="'red'"
                  icon="delete"
                  @click="onClickDeleteLines(props.row)"
                  dense
                >
                  <q-tooltip>Delete Account</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'orange'"
                  icon="edit"
                  @click="onClickAdd(props.row)"
                  dense
                >
                  <q-tooltip>Edit Account</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'indigo'"
                  icon="send"
                  @click="onClickSendCOA(props.row)"
                  dense
                  :disable="props.row.coa !== null"
                >
                  <q-tooltip>Use Account as COA</q-tooltip>
                </q-btn>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web } from "boot/axios";
import { useQuasar } from "quasar";

import paymentAccCreate from "./paymentAccCreate.vue";

const $q = useQuasar();

const loading = ref(false);
const rows = ref([]);
const cols = ref([
  {
    name: "bank_account_name",
    label: "Account Name",
    field: "bank_account_name",
    sortable: true,
    align: "left",
  },
  {
    name: "bank_account_number",
    label: "Account No",
    field: "bank_account_number",
    sortable: true,
    align: "left",
  },
  {
    name: "bank_name",
    label: "Bank Origin",
    field: "bank_name",
    sortable: true,
    align: "left",
  },
]);

onMounted(() => {
  getPaymentList();
});

const getPaymentList = async () => {
  loading.value = true;
  await api_web
    .get(`payment-account`)
    .then((response) => {
      loading.value = false;
      const datanya = response.data;

      rows.value = datanya.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickAdd = (datas = null) => {
  $q.dialog({
    component: paymentAccCreate,
    componentProps: {
      dataHeader: datas,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getPaymentList();
  });
};

const onClickDeleteLines = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete ${val.bank_account_name} ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .delete(`payment-account/form/${val.id}`)
      .then((response) => {
        loading.value = false;
        getPaymentList()
      })
      .catch((e) => {
        loading.value = false;
      });
  });
};

const onClickSendCOA = (val) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to send ${val.bank_account_name} as COA?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`payment-account/sendAccToCOA`, {
        ...val
      })
      .then((response) => {
        loading.value = false;
        getPaymentList()
      })
      .catch((e) => {
        loading.value = false;
      });
  })
}
</script>
