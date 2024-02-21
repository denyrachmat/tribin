<template>
  <div class="q-pa-md bg-grey-5 window-height">
    <div class="row">
      <div
        :class="`col-3 ${idx > 0 ? 'q-pl-sm' : null}`"
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
    <div class="row q-pt-md">
      <div class="col">
        <q-table
          flat
          bordered
          title="Approval List"
          :rows="rows"
          :columns="columns"
          row-key="name"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {api, api_web} from "src/boot/axios"

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
]);
const columns = ref([
  { name: "name", label: "Business", field: "name", sortable: true, align: 'left'},
  { name: "quo", label: "Quotation", field: "quo", sortable: true, align: 'center'},
  { name: "pr", label: "Purchase Request", field: "pr", sortable: true, align: 'center'},
  { name: "spk", label: "SPK", field: "spk", sortable: true, align: 'center'},
]);
const rows = ref([]);

const getDataApproval = () => {
    
}
</script>
