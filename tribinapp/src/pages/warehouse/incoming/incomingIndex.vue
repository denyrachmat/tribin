<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Incoming</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create New Incoming</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Updated Incoming List"
          :rows="rows"
          :columns="cols"
          row-key="TDLVORD_DLVCD"
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
              :options="col"
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
              @update:model-value="getOutgoingData()"
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
                  :color="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? 'grey'
                      : 'orange'
                  "
                  icon="edit"
                  @click="onClickNew(props.row)"
                  dense
                  :disable="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                  "
                >
                  <q-tooltip>{{
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? "All qty already confirmed"
                      : "Edit Data"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? 'grey'
                      : 'red'
                  "
                  icon="delete"
                  @click="onDelete(props.row.id)"
                  dense
                  :disable="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                  "
                >
                  <q-tooltip>{{
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? "All qty already confirmed"
                      : "Delete Data"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? 'grey'
                      : 'indigo'
                  "
                  icon="check"
                  @click="onConfirmation(props.row)"
                  dense
                  :disable="
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                  "
                >
                  <q-tooltip>{{
                    parseInt(props.row.CONFIRMED_QTY) == props.row.TOT_RCV
                      ? "All qty already confirmed"
                      : "Confirm Data"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.bc.length == 0 ? 'grey' : 'indigo'"
                  icon="print"
                  @click="onPrintBarcode(props.row.bc)"
                  dense
                  :disable="props.row.bc.length == 0"
                >
                  <q-tooltip>{{
                    props.row.bc.length == 0
                      ? "No Barcode has been created, please confirm first!"
                      : "Barcode Print"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="props.row.bc.length == 0 ? 'grey' : 'green'"
                  icon="print"
                  @click="onExportBarcode(props.row.bc)"
                  dense
                  :disable="props.row.bc.length == 0"
                >
                  <q-tooltip>{{
                    props.row.bc.length == 0
                      ? "No Barcode has been created, please confirm first!"
                      : "Barcode Export Excel"
                  }}</q-tooltip>
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
import qz from "qz-tray";

import incomingCreate from "./incomingCreate.vue";
import incomingConfirmDet from "./incomingConfirmDet.vue";

const $q = useQuasar();

const rows = ref([]);
const cols = ref([
  {
    name: "TRCV_RCVCD",
    label: "Receive ID",
    field: "TRCV_RCVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MSUP_SUPNM",
    label: "Supplier Name",
    field: "MSUP_SUPNM",
    sortable: true,
    align: "left",
  },
  {
    name: "TOT_RCV",
    label: "Total Qty",
    field: "TOT_RCV",
    sortable: true,
    align: "left",
    format: (val) => `${val.toLocaleString()}`,
  },
  {
    name: "MSUP_CURCD",
    label: "Currency",
    field: "MSUP_CURCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TOT_AMT",
    label: "Total Amount",
    field: "TOT_AMT",
    sortable: true,
    align: "left",
    format: (val) => `${val.toLocaleString()}`,
  },
]);

const loading = ref(false);
const filterCol = ref("");
const filter = ref("");

onMounted(() => {
  getIncomingData();
});

const getIncomingData = async () => {
  loading.value = true;
  await api_web
    .post(`receive/searchAPI`, {
      searchBy: filterCol.value,
      searchValue: filter.value,
    })
    .then((response) => {
      loading.value = false;
      rows.value = response.data.data;
    })
    .catch((e) => {
      loading.value = false;
    });
};

const onClickNew = (data = []) => {
  $q.dialog({
    component: incomingCreate,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getIncomingData();
  });
};

const onConfirmation = (data = []) => {
  $q.dialog({
    component: incomingConfirmDet,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getIncomingData();
  });
};

const onDelete = (data) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this DO ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web.delete(`receive/item/${data}`).then((res) => {
      loading.value = false;
      getIncomingData();
    });
  })
};

const onPrintBarcode = (data) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print all of this DO barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    if (qz.websocket.isActive()) {
      qz.websocket.disconnect();
    } else {
      console.log("WebSocket connection is not active.");
    }

    console.log(data)

    qz.websocket.connect().then(async function () {
      return qz.printers.find().then((dataPrinter) => {
        console.log(dataPrinter);
        let listPrinter = [];
        for (let index = 0; index < dataPrinter.length; index++) {
          listPrinter.push({
            label: dataPrinter[index],
            value: dataPrinter[index],
          });
        }

        const getSavedPrinter = localStorage.getItem("printerLabel");

        if (getSavedPrinter) {
          printLabel(getSavedPrinter, response);
          loading.value = false;
        } else {
          $q.dialog({
            title: "Options",
            message: "Choose printer Label:",
            options: {
              type: "radio",
              model: "",
              // inline: true
              items: listPrinter,
            },
            cancel: true,
            persistent: true,
          }).onOk((datas) => {
            $q.dialog({
              title: "Confirmation",
              message:
                "Do you want save this printer ? next time printing will using this printer, won't be notified again.",
              cancel: true,
            })
              .onOk(() => {
                localStorage.setItem("printerLabel", datas, data);
              })
              .onDismiss(() => {
                printLabel(datas, data);
              });
          });

          loading.value = false;
        }
      });
    });
  });
};

const printLabel = async (data, listData) => {
  return qz.printers.find(data).then(async (printer) => {
    let config = qz.configs.create(printer);

    let zpl = [];
    listData.map((valHeader) => {
      if (valHeader) {
        localStorage.setItem("printerLabel", data);
        const commands = [
          '\x1B\x40',        // Initialize the printer (ESC @)
          '\x1B\x61\x01',    // Center align text (ESC a 1)
          'Product Barcode\n', // Text to print
          '\x1B\x61\x00',    // Left align text (ESC a 0)
          '--------------------------------\n',
          '\x1D\x6B\x6d',    // Command to print Code 128 barcode (GS k 73)
          '\x0A',            // Barcode height (in dots)
          valHeader.TRCVBC_BCCD,       // The barcode data (e.g., "1234567890")
          '\x1D\x56\x00',    // Cut the paper (GS V 0)
        ];

        for (let index = 0; index < commands.length; index++) {
          const element = commands[index];
          zpl.push(element)
        }
      }
    });

    qz.print(config, [zpl])
      .then(function () {
        $q.notify({
          message: "Printed successfully !!",
          color: "green",
          timeout: 5000,
          onDismiss: () => {},
        });

        for (let index = 0; index < zpl.length; index++) {}

        qz.websocket.disconnect();
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

const onExportBarcode = (bc) => {
  $q.dialog({
    title: "Confirmation",
    message: `Do you want to export all this item ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web
      .post(`receive/exportExcel`, {
        bc: bc
      }, {
        responseType: 'arraybuffer'
      })
      .then((datas) => {
        loading.value = false;
        const link = document.createElement("a");
        link.download = name;
        // const data = await fetch(datas).then((res) => res.blob());
        link.href = window.URL.createObjectURL(
          new Blob([datas.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        );
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  });
}
</script>
