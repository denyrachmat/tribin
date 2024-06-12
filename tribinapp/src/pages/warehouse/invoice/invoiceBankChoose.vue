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
        <div class="text-h6">Choose Bank Transfer</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row q-pt-md">
          <div class="col">
            <q-table
              title="List Bank Account"
              :rows="rows"
              :columns="columns"
              row-key="id"
              :loading="loading"
              dense
              :pagination="{
                rowsPerPage: 20,
              }"
              class="my-sticky-header-column-table"
              selection="multiple"
              v-model:selected="selected"
            >
              <!-- For Search Header -->
              <template v-slot:top-right>
                <q-select
                  outlined
                  v-model="filterCol"
                  :options="columns"
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
                  @update:model-value="dataQuo()"
                  debounce="1000"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
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

const $q = useQuasar();

const loading = ref(false);
const columns = ref([
  {
    name: "id",
    label: "id",
    field: "id",
    sortable: true,
    align: "left",
  },
  {
    name: "bank_name",
    label: "Bank Name",
    field: "bank_name",
    sortable: true,
    align: "left",
  },
  {
    name: "bank_account_name",
    label: "Bank Acc Name",
    field: "bank_account_name",
    sortable: true,
    align: "left",
  },
  {
    name: "bank_account_number",
    label: "Bank Acc Number",
    field: "bank_account_number",
    sortable: true,
    align: "left",
  },
])
const rows = ref([])
const selected = ref([])

const props = defineProps({
  payment: Array,
});

onMounted(() => {
  if (props.payment && props.payment.length > 0) {
    console.log(props.payment)
    selected.value = props.payment
  }

  getItem()
})

const getItem = async () => {
  loading.value = true;
  await api_web
    .get("payment-account")
    .then((response) => {
      console.log(response.data)
      loading.value = false;
      rows.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSubmitData = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to choose all this data ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    console.log(selected.value)
    onDialogOK(selected.value)
  })
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
