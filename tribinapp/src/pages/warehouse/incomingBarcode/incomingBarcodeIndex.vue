<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">Incoming Barcode</span>
      </div>
      <div class="col text-right">
        <q-btn icon="add" color="blue" @click="onClickNew()">
          <q-tooltip>Create Barcode</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col">
        <q-table
          title="Barcoded Incoming List"
          :rows="rows"
          :columns="cols"
          row-key="TRCVBC_BCCD"
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
                  :color="'red'"
                  icon="delete"
                  @click="onDelete(props.row.TRCVBC_BCCD)"
                  dense
                  :disable="props.row.det && props.row.det.length === 0"
                >
                  <q-tooltip>{{
                    props.row.det && props.row.det.length === 0
                      ? "All qty already confirmed"
                      : "Cancel Barcode"
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  :color="'indigo'"
                  icon="print"
                  @click="onPrint([props.row])"
                  dense
                  :disable="props.row.det && props.row.det.length === 0"
                >
                  <q-tooltip>Print Barcode</q-tooltip>
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

import barcodeCreate from "./barcodeCreate.vue";

const $q = useQuasar();

const rows = ref([]);
const cols = ref([
  {
    name: "TRCVBC_BCCD",
    label: "Barcode ID",
    field: "TRCVBC_BCCD",
    sortable: true,
    align: "left",
  },
  {
    name: "TRCV_RCVCD",
    label: "Doc No",
    field: "TRCV_RCVCD",
    sortable: true,
    align: "left",
  },
  {
    name: "MSUP_SUPNM",
    label: "Supplier",
    field: "MSUP_SUPNM",
    sortable: true,
    align: "left",
  },
  {
    name: "MITM_ITMNM",
    label: "Item Name",
    field: "MITM_ITMNM",
    sortable: true,
    align: "left",
  },
  {
    name: "TRCVBC_BCQT",
    label: "Qty",
    field: "TRCVBC_BCQT",
    sortable: true,
    align: "right",
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
    .post(`receiveBarcodes/searchAPI`, {
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

const onPrint = (data) => {
  console.log(data);
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    if (qz.websocket.isActive()) {
      qz.websocket.disconnect();
    } else {
      console.log("WebSocket connection is not active.");
    }

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
          printLabel(getSavedPrinter, data);
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
          }).onOk((datas, data) => {
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
        // const commands = [
        //   '\x1B\x40',                        // Initialize Printer
        //   '\x1DH\x14',                    // Set barcode height (~20 dots)
        //   '\x1DW\x01',                    // Set narrow barcode width
        //   '\x1BK\x49',                    // CODE128 Barcode command
        //   '\x0A',                         // Newline
        //   valHeader.TRCVBC_BCCD,          // Barcode Data
        //   '\x0A',                         // Newline after barcode
        //   '\x1B!\x00',                    // Normal font style
        //   'True-Ally Barcode',            // First line of text
        //   '\x0A\x1B!\x01',                // Newline + Bold style
        //   'labels and stickers.',         // Second line of text
        //   '\x0A\x0A'                      // Spacing for label
        // ];

        const commands = [
          '\x1B\x40',        // Initialize the printer (ESC @)
          '\x1B\x61\x01',    // Center align text (ESC a 1)
          `${valHeader.TRCVBC_BCCD}\n`, // Text to print
          '\x1B\x61\x00',    // Left align text (ESC a 0)
          '--------------------------------\n',
          '\x1D\x6B\x49',    // Command to print Code 128 barcode (GS k 73)
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

    qz.print(config, zpl)
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

const onDelete = (id) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    await api_web.delete(`receiveBarcode/${id}`).then((response) => {
      loading.value = false;
      getIncomingData();
    });
  });
};

const onClickNew = (data = []) => {
  $q.dialog({
    component: barcodeCreate,
    componentProps: {
      dataHeader: data,
    },
    // persistent: true,
  }).onOk(async (val) => {
    getOutgoingData();
  });
};

// const onConfirmation = (data = []) => {
//   $q.dialog({
//     component: incomingConfirmDet,
//     componentProps: {
//       dataHeader: data,
//     },
//     // persistent: true,
//   }).onOk(async (val) => {
//     getOutgoingData();
//   });
// }
</script>
