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
                  @click="onPrint(props.row)"
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
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to print this barcode ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    // loading.value = true;
    // await api_web
    //   .post(`receiveBarcodes/printBarcode`, {
    //     data: [data],
    //   })
    //   .then((response) => {
    //     loading.value = false;
    //     // let pdfWindow = window.open("");
    //     // pdfWindow.document.write(
    //     //   "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
    //     //     encodeURI(response.data) +
    //     //     "'></iframe>"
    //     // );
    //   });

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
          printLabel(getSavedPrinter);
        } else {
          $q.dialog({
            title: "Options",
            message: "Choose printer SATO:",
            options: {
              type: "radio",
              model: "",
              // inline: true
              items: listPrinter,
            },
            cancel: true,
            persistent: true,
          }).onOk((data) => {
            $q.dialog({
              title: "Confirmation",
              message:
                "Do you want save this printer ? next time printing will using this printer, won't be notified again.",
              cancel: true,
            })
              .onOk(() => {
                localStorage.setItem("printerLabel", data);
              })
              .onDismiss(() => {
                printLabel(data);
              });
          });
        }
      });
    });
  });
};

const printLabel = async (data) => {
  return qz.printers.find(data).then(async (printer) => {
    let config = qz.configs.create(printer);

    let zpl = [];
    listData.value.map((valHeader) => {
      if (valHeader.det) {
        valHeader.det.map((val) => {
          for (let index = 0; index < val.TOTAL_PRINT; index++) {
            localStorage.setItem("printerLabel", data);
            if (printer.includes("305")) {
              zpl.push(`
                  ^XA

                  ^FX Top section with logo, name and address.
                  ^MUd,305,600
                  ^CFA,30
                  ^FO50,30^A0N,30,30^FDItem Code : ${val.PGIT_ITMCD.trim()}^FS
                  ^FO50,80^A0N,30,30^FDQty : ${parseInt(
                    val.SPQ_QTY
                  ).toLocaleString("en")}^FS
                  ^FO50,150^A0N,35,35^FD(3N1) ${val.PGIT_ITMCD.trim()}^FS
                  ^FO50,190^BY 2 ^BC,60,N,N,N,A^FD3N1 ${val.PGIT_ITMCD.trim()}^FS

                  ^FO50,270^A0N,35,35^FD(3N2) ${parseInt(
                    val.SPQ_QTY
                  )} ${date.formatDate(
                val.PGRN_RCVDT,
                "DDMMYY"
              )} ${val.PGITSHP_SHPREFNO.trim()}^FS
                  ^FO50,310^BQN,2,4^FH^FDQA,3N2 ${parseInt(
                    val.SPQ_QTY
                  )} ${date.formatDate(
                val.PGRN_RCVDT,
                "DDMMYY"
              )} ${val.PGITSHP_SHPREFNO.trim()}^FS^CFA,15

                  ^FO50,460^A0N,35,35^FD(1P) ${val.MITM_SPTNO.trim()}^FS
                  ^FO50,500^BY 2 ^BC,60,N,N,N,A^FD1P${val.MITM_SPTNO.trim()}^FS

                  ^XZ
                `);
            } else {
              zpl.push(`
                  ^XA
                  ^FX Top section with logo, name and address.
                  ^CFA,30
                  ^FO25,30^A0N,25,25^FDItem Code : ${val.PGIT_ITMCD.trim()}^FS
                  ^FO25,60^A0N,25,25^FDQty : ${parseInt(
                    val.SPQ_QTY
                  ).toLocaleString("en")}^FS
                  ^FO25,115^A0N,25,25^FD(3N1) ${val.PGIT_ITMCD.trim()}^FS
                  ^FO25,140^BY 1 ^BC,40,N,N,N,A^FD3N1 ${val.PGIT_ITMCD.trim()}^FS

                  ^FO25,190^A0N,25,25^FD(3N2) ${parseInt(
                    val.SPQ_QTY
                  )} ${date.formatDate(
                val.PGRN_RCVDT,
                "DDMMYY"
              )} ${val.PGITSHP_SHPREFNO.trim()}^FS
                  ^FO25,210^BQN,2,3^FH^FDQA,3N2 ${parseInt(
                    val.SPQ_QTY
                  )} ${date.formatDate(
                val.PGRN_RCVDT,
                "DDMMYY"
              )} ${val.PGITSHP_SHPREFNO.trim()}^FS^CFA,15

                  ^FO25,320^A0N,25,25^FD(1P) ${val.MITM_SPTNO.trim()}^FS
                  ^FO25,350^BY 1 ^BC,40,N,N,N,A^FD1P${val.MITM_SPTNO.trim()}^FS

                  ^XZ
                `);
            }
          }
        });
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

        onDialogOK();
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
