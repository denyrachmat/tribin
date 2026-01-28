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
              @update:model-value="getIncomingData()"
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

const onPrint = (datanya) => {
  console.log(datanya);
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this barcode ? Input copy print you wanted.`,
    cancel: true,
    persistent: true,
    prompt: {
      model: 1,
      type: "number", // optional
    },
  }).onOk(async (datas) => {
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
          printLabel(getSavedPrinter, datanya, datas);
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
                localStorage.setItem("printerLabel", datas, datanya);
              })
              .onDismiss(() => {
                printLabel(datas, datanya, datas);
              });
          });
        }
      });
    });
  });
};

const printBarcode = () => {
  // Configure QZ Tray
  qz.init({
    logger: console,
  });

  // Define barcode data
  const barcodeData = {
    type: "EAN13", // Change barcode type as needed (e.g., 'CODE128', 'QR_CODE')
    value: "1234567890123", // Replace with your actual barcode value
  };

  // Define label dimensions
  const labelHeight = 20; // mm
  const labelWidth = 40; // mm
  const gapWidth = 2; // mm (adjust as needed)

  // Calculate label dimensions in dots
  const dotsPerMm = 8; // Assuming 8 dots per millimeter
  const labelHeightDots = labelHeight * dotsPerMm;
  const labelWidthDots = labelWidth * dotsPerMm;
  const gapWidthDots = gapWidth * dotsPerMm;

  // ESC/POS commands for label printing
  const config = {
    data: [
      // Initialize printer
      { type: "raw", data: "\x1B\x40" }, // Initialize

      // Set print direction
      { type: "raw", data: "\x1B\x7B\x01" }, // Select left margin

      // Set absolute print position
      { type: "raw", data: "\x1B\x44\x00" }, // Set horizontal position to 0

      // Set barcode height
      { type: "raw", data: "\x1D\x68" + String.fromCharCode(labelHeightDots) }, // Set barcode height in dots

      // Print barcode
      { type: "raw", data: String.fromCharCode(barcodeData) },

      // Print label separator (optional)
      { type: "raw", data: "\x1B\x4A" + String.fromCharCode(gapWidthDots) }, // Set horizontal tab for gap

      // Cut label
      { type: "raw", data: "\x1D\x56\x41" }, // Full cut
    ],
  };

  // Print the label
  qz.print(config).catch((err) => {
    console.error("Error printing label:", err);
  });
};

const printLabel = async (data, listData, countLabel = 1) => {
  console.log(listData);
  return qz.printers.find(data).then(async (printer) => {
    let config = qz.configs.create(printer);

    let zpl = [];
    listData.map((valHeader) => {
      if (valHeader) {
        localStorage.setItem("printerLabel", data);
        // const commands = [
        //   "\x1B\x40", // Initialize the printer (ESC @)
        //   "\x1D\x54\x05",
        //   `${valHeader.TRCVBC_BCCD}\n`, // Text to print
        //   "\x1B\x61\x01", // Left align text (ESC a 0)
        //   "---------------------\n",
        //   "\x1D\x68\x32", // Command to print Code 128 barcode (GS k 73)
        //   "\x0A", // Barcode height (in dots)
        //   valHeader.TRCVBC_BCCD, // The barcode data (e.g., "1234567890")
        //   "\x1B\x64\x05",
        //   // '\x1D\x56\x00',    // Cut the paper (GS V 0)
        // ];
        const barcodeData = valHeader.TRCVBC_BCCD;

        const labelHeight = 20; // mm
        const labelWidth = 40; // mm
        const gapWidth = 2; // mm (adjust as needed)

        // Calculate label dimensions in dots
        const dotsPerMm = 8; // Assuming 8 dots per millimeter
        const labelHeightDots = labelHeight * dotsPerMm;
        const labelWidthDots = labelWidth * dotsPerMm;
        const gapWidthDots = gapWidth * dotsPerMm;

        // ESC/POS commands for label printing
        // const commands = [
        //   "\x1B\x40", // Initialize printer
        //   '\x1B\x4A\x08', // Feed paper by 24 dots (3mm) to adjust for gap
        //   "\x1D\x68\x50", // Set barcode height to 80 dots (10mm)
        //   "\x1D\x77\x02", // Set barcode width to 2
        //   '\x1D\x48\x02', // Set HRI position to below the barcode
        //   "\x1D\x6B\x08", // Print Code128 barcode
        //   valHeader.TRCVBC_BCCD, // Barcode data
        //   "\x00", // Null terminator for barcode data
        //   '\x1B\x4A\xC8', // Feed paper by 200 dots (25mm) to ensure one full label is fed
        //   // '\x1B\x64\x03',
        //   "\x1D\x56\x42\x00", // Cut paper
        //   // "\x1D\x56\x41\x00",
        // ];

        // const commands = [
        //   "\x1B\x40", // Initialize printer
        //   "\x1B\x4A\x18", // Feed paper by 24 dots (3mm) to adjust for gap
        //   "\x1B\x64\x02", // Feed paper by 2 lines to move barcode up
        //   "\x1D\x68\x50", // Set barcode height to 80 dots (10mm)
        //   "\x1D\x77\x02", // Set barcode width to 2
        //   "\x1D\x48\x02", // Set HRI position to below the barcode
        //   "\x1D\x6B\x08", // Print Code128 barcode
        //   "1234567890", // Barcode data
        //   "\x00", // Null terminator for barcode data
        //   "\x1B\x64\x03", // Feed paper by 3 lines to ensure proper alignment
        //   "\x1D\x56\x42\x00", // Cut paper
        // ];

        for (let index = 0; index < countLabel; index++) {
          const commands = [
            "\x1B\x40", // Initialize printer
            "\x1D\x68\x20", // Set barcode height to 32 dots (4 mm)
            "\x1D\x77\x02", // Set barcode width to medium
            "\x1D\x48\x02", // Set text position to below the barcode
            "\x1D\x6B\x08",
            valHeader.TRCVBC_BCCD, // Print CODE39 barcode
            "\x00",
            // "\x1B\x4A\x20", // Feed 24 dots (3mm)
            '\x1B\x4A\xB8', // Feed 184 dots (23mm = 20mm label + 3mm gap)
            // "\x1B\x64\x02", // Cut paper (partial cut)
          ];

          // Convert commands to a single string
          zpl.push(commands.join(""));
        }
        // for (let index = 0; index < commands.length; index++) {
        //   const element = commands[index];
        //   zpl.push(element);
        // }
      }
    });

    // console.log(zpl);

    qz.print(config, zpl)
      .then(function () {
        $q.notify({
          message: "Printed successfully !!",
          color: "green",
          timeout: 5000,
          onDismiss: () => {},
        });

        qz.websocket.disconnect();
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

const stringToHex = (str) => {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, "0") + " ";
  }
  return hex.trim();
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
    getIncomingData();
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
