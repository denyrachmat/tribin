<template>
  <div class="q-pa-md bg-grey-5 window-height">
    <div class="row">
      <div
        :class="`col-3 q-pa-sm`"
        v-for="(card, idx) in listDashboard"
        :key="idx"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h3 text-cyan">{{ card.total }}</div>
                <div class="text-subtitle2 text-cyan">{{ card.title }}</div>
              </div>
              <div class="col text-right">
                <q-icon :name="card.icon" size="4.4em" :color="card.color" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-pa-sm">
      <div class="col">
        <q-table
          flat
          bordered
          title="Approval List"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :loading="loading"
        >
          <!-- For header -->
          <template v-slot:top-right>
            <q-btn flat icon="refresh" color="cyan" @click="getDataApproval"/>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- For Body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <template
                  v-if="
                    col.name === 'quot' ||
                    col.name === 'pr' ||
                    col.name === 'po' ||
                    col.name === 'spk'
                  "
                >
                  <q-btn
                    flat
                    color="blue"
                    v-if="col.value > 0"
                    @click="
                      onClickApprovalNumber(props.row[col.name.split('_')[0]], col.name, props.row.connection)
                    "
                    ><b>{{ col.value }}</b></q-btn
                  >
                  <span v-else>{{ col.value }}</span>
                </template>
                <template v-else>
                  {{ col.value }}
                </template>
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
import { useQuasar } from "quasar";
import { api, api_web } from "src/boot/axios";

import viewListApproval from "./viewListApproval.vue";

const $q = useQuasar();
const listDashboard = ref([
  {
    total: 900,
    title: "Total Sales",
    icon: "shopping_cart",
    color: "cyan",
  },
  {
    total: 900,
    title: "Total Purchase",
    icon: "shopping_bag",
    color: "cyan",
  },
  {
    total: 900,
    title: "Total Profit",
    icon: "payments",
    color: "cyan",
  },
  {
    total: 15,
    title: "Total Customer",
    icon: "group",
    color: "cyan",
  },
  {
    total: 15,
    title: "Total Customer",
    icon: "group",
    color: "cyan",
  },
  {
    total: 15,
    title: "Total Customer",
    icon: "group",
    color: "cyan",
  },
  {
    total: 15,
    title: "Total Customer",
    icon: "group",
    color: "cyan",
  },
  {
    total: 15,
    title: "Total Customer",
    icon: "group",
    color: "cyan",
  },
]);
const columns = ref([
  {
    name: "name",
    label: "Business",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "quot",
    label: "Quotation",
    field: "quot_count",
    sortable: true,
    align: "center",
  },
  {
    name: "pr",
    label: "Purchase Request",
    field: "pr_count",
    sortable: true,
    align: "center",
  },
  {
    name: "po",
    label: "Purchase Order",
    field: "po_count",
    sortable: true,
    align: "center",
  },
]);
const rows = ref([]);
const loading = ref(false)
const intervalnya = ref(null)

onMounted(async () => {
  const test = await getDataApproval()
  if (test) {
    intervalnya.value = setInterval(getDataApproval, 10000);
  }
});

onMounted(() => {
  clearInterval(intervalnya.value)
})

const getDataApproval = async () => {
  loading.value = true
  return await api_web
    .get("/approval/notificationsAPI/top-user")
    .then((response) => {
      loading.value = false
      rows.value = response.data;

      return response.data
    }).catch((e) => {
      loading.value = false
    });
};

const onClickApprovalNumber = (data, typeAPI, conn) => {
  $q.dialog({
    component: viewListApproval,
    componentProps: {
      listApprv: data,
      typeAPI: typeAPI,
      conn: conn
    },
    // persistent: true,
  }).onOk(async (val) => {
    quotationGroupConditions.value = val.MCONDITION_RPT_STAT;
    quotationConditions.value = val.group;

    getDataApproval()
  });
};
</script>
