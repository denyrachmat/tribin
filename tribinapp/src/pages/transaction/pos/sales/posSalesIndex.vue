<template>
  <div class="q-pa-md">
    <div class="row q-pb-md">
      <div class="col">
        <span class="text-h4">POS</span>
      </div>
      <div class="col text-right"></div>
    </div>

    <div class="row bg-grey q-pa-md full-width" style="height: 86vh">
      <div class="col-4 q-pa-xs">
        <div class="row bg-white">
          <div
            class="col"
            style="height: 50vh; overflow: auto; font-size: 10px"
          >
            <q-list bordered :loading="loading">
              <template v-if="selectedItems.length > 0">
                <q-item
                  v-for="(selItem, idx) in selectedItems"
                  :key="selItem.id"
                  class="q-my-sm"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar
                      color="primary"
                      text-color="white"
                      icon="category"
                    >
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ selItem.MITM_ITMNMREAL }}</q-item-label>
                    <q-item-label lines="2">
                      Rp {{ selItem.LATEST_PRC.toLocaleString() }} x
                      {{ selItem.sellQty.toLocaleString() }} =
                      <b>{{
                        (selItem.LATEST_PRC * selItem.sellQty).toLocaleString()
                      }}</b>
                      <br />
                      BC : {{ selItem.BC || "-" }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn-group flat>
                      <q-btn
                        icon="edit"
                        color="orange"
                        @click="onEditSelItem(idx)"
                        dense
                      />
                      <q-btn
                        icon="delete"
                        color="red"
                        @click="onDeleteSelItem(idx)"
                        dense
                      />
                    </q-btn-group>
                  </q-item-section>
                </q-item>
              </template>
              <q-item v-else>
                <q-item-section> No item selected!! </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="row q-pt-xs" style="height: 30vh">
          <div class="col bg-white vertical-middle">
            <!-- style="height: 20vh" -->
            <template v-if="isUsingTax">
              <div class="row">
                <div class="col q-pa-sm">
                  <div class="text-h6 text-bold">
                    Subtotal : Rp. {{ getTotal.toLocaleString() }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm">
                  <div class="text-h6 text-bold">
                    Tax : Rp. {{ getTotalTax.toLocaleString() }}
                  </div>
                </div>
              </div>
            </template>
            <div class="row">
              <div class="col q-pa-sm">
                <div class="text-h6 text-bold">
                  Total : Rp. {{ (getTotal + getTotalTax).toLocaleString() }}
                </div>
              </div>
            </div>
            <q-separator />
            <div class="row" style="height: 10vh">
              <div class="col-sm-6 col-12 q-pa-sm">
                <q-btn
                  color="primary"
                  class="full-width"
                  @click="onSubmited()"
                  :loading="loading"
                  :disable="!TPOS_CUSTCD"
                >
                  Submit
                </q-btn>
              </div>
              <div class="col-sm-6 col-12 q-pa-sm">
                <q-btn
                  color="red"
                  class="full-width"
                  @click="onCancelSales()"
                  :loading="loading"
                >
                  Cancel
                </q-btn>
              </div>

              <div class="col-12 q-pa-sm">
                <q-btn
                  color="orange"
                  class="full-width"
                  @click="findTransaction()"
                  :loading="loading"
                >
                  Find transaction
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pa-xs q-gutter-sm">
        <div class="row bg-white">
          <div class="col">
            <q-input
              filled
              v-model="BC"
              label="Barcode"
              dense
              @update:model-value="(val) => onScanBarcode(val)"
              :debounce="500"
              ref="barcodeRef"
            >
            </q-input>
          </div>
        </div>
        <div class="row bg-white">
          <div class="col">
            <q-input
              filled
              v-model="searchItem"
              label="Search Item"
              dense
              @update:model-value="(val) => onInputSearch(val)"
              :debounce="1000"
            />
          </div>
        </div>
        <div class="row bg-white">
          <div class="col">
            <q-select
              dense
              filled
              label="Customer Choose"
              v-model="TPOS_CUSTCD"
              use-input
              input-debounce="500"
              :options="listCustomers"
              @filter="
                (val, update, abort) => filterFn(val, update, abort, 'cust')
              "
              behavior="dialog"
              option-label="MCUS_CUSNM"
              option-value="MCUS_CUSCD"
              emit-value
              map-options
              :loading="loading"
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="person_add"
                  @click="onAddCustClick()"
                  color="cyan"
                >
                  <q-tooltip>Add new customer</q-tooltip>
                </q-btn>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row bg-white">
          <div class="col">
            <q-select
              dense
              filled
              label="Tax Code"
              v-model="tax_code"
              use-input
              input-debounce="500"
              :options="listTaxes"
              @filter="
                (val, update, abort) => filterFn(val, update, abort, 'tax')
              "
              behavior="dialog"
              option-label="MTAX_DESC"
              option-value="MTAX_CODE"
              emit-value
              map-options
              :loading="loading"
              :disable="!isUsingTax"
            />
          </div>
        </div>
        <div
          class="row bg-white q-pa-sm"
          style="height: 55vh; overflow: auto"
          :key="refreshIdx"
        >
          <div class="col">
            <div class="row q-col-gutter-sm">
              <div
                class="col-6 q-pa-sm"
                v-for="(item, n) in listItems"
                :key="`sm-${n}`"
              >
                <q-card flat bordered>
                  <q-badge color="orange" floating>{{
                    (
                      parseInt(item.STOCK) - getSellQty(item.MITM_ITMNM)
                    ).toLocaleString()
                  }}</q-badge>
                  <div class="text-center">
                    <q-icon name="category" size="8em" />
                  </div>
                  <q-card-section>
                    <div class="row items-center">
                      <div class="col text-bold ellipsis">
                        {{ item.MITM_ITMNMREAL }}
                      </div>
                    </div>
                  </q-card-section>
                  <q-list>
                    <q-item
                      clickable
                      @click="onAddItems(item, n)"
                      :disable="item.STOCK - getSellQty(item.MITM_ITMNM) === 0"
                    >
                      <q-item-section avatar>
                        <q-icon color="primary" name="add" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Add Item</q-item-label>
                        <q-item-label caption lines="2">
                          Rp. {{ parseInt(item.LATEST_PRC).toLocaleString() }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </div>
            <template v-if="loading">
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
            <template v-else>
              <div class="row justify-center q-my-md">
                <q-btn
                  color="primary"
                  label="Load more"
                  @click="onLoad"
                ></q-btn>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api, api_web } from "boot/axios";
import customerView from "src/pages/master/customers/customerView.vue";
import multiplePromptDialog from "src/components/multiplePromptDialog.vue";
const $q = useQuasar();

const TPOS_CUSTCD = ref("");
const TPOS_DOCNO = ref("");
const listItems = ref([]);
const listCustomers = ref([]);
const selectedItems = ref([]);
const loading = ref(false);
const page = ref(1);
const searchItem = ref("");
const refreshIdx = ref(0);
const isUsingTax = ref(false);
const tax_code = ref("");
const listTaxes = ref([]);
const BC = ref("");
const barcodeRef = ref(null);

const listDocuments = ref([]);

onMounted(async () => {
  await getItem("");
  await getCustomer("");
  await getTaxes();
  await getDefaultTax();
  await getListData();
});

const getTotal = computed(() =>
  selectedItems.value.length > 0
    ? selectedItems.value.reduce(
        (acc, cur) => acc + parseFloat(cur.LATEST_PRC) * parseInt(cur.sellQty),
        0
      )
    : 0
);

const getTotalTax = computed(() =>
  listTaxes.value.length > 0
    ? listTaxes.value.reduce(
        (acc, cur) =>
          cur.MTAX_CODE === tax_code.value
            ? acc + parseFloat(cur.MTAX_RATE)
            : acc + 0,
        0
      )
    : 0
);

const getItem = async (val) => {
  loading.value = true;
  if (listItems.value.length > 0) {
    page.value = page.value + 1;
  }

  await api_web
    .post("item/searchAPIStockAndPriceOnly", {
      searchValue: val,
      page: !val ? page.value : 1,
    })
    .then((response) => {
      loading.value = false;
      if (val) {
        listItems.value = response.data.data.data;
      } else {
        response.data.data.data.map((valItem) => {
          let indexItm = selectedItems.value.findIndex(
            (item) => item.MITM_ITMNM === valItem.MITM_ITMNM
          );

          if (indexItm === -1) {
            listItems.value.push(valItem);
          }
        });
      }
    })
    .catch(() => {
      loading.value = false;
    });
};

const getCustomer = async (val, cols = "MCUS_CUSNM") => {
  loading.value = true;
  await api_web
    .post("customer/searchAPI", {
      searchValue: val,
      searchCol: cols,
      type: [1],
    })
    .then((response) => {
      loading.value = false;
      listCustomers.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onAddItems = (vals, idx, barcode = "") => {
  $q.dialog({
    dark: true,
    title: "Prompt",
    message: "How many qty?",
    prompt: {
      model: 0,
      type: "number", // optional
      isValid: (val) => val > 0 && val <= vals.STOCK,
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      refreshIdx.value = refreshIdx.value + 1;
      const findIndex = selectedItems.value.findIndex(
        (item) => item.MITM_ITMNM === vals.MITM_ITMNM
      );

      if (findIndex !== -1) {
        selectedItems.value[findIndex].sellQty = data;
      } else {
        selectedItems.value.push({
          ...vals,
          sellQty: data,
          BC: barcode,
        });
      }
      // console.log('>>>> OK, received', data)
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onAddCustClick = () => {
  $q.dialog({
    component: customerView,
    componentProps: {
      CustType: 1,
      Groups: "POS_CUST",
      Curr: "IDR",
    },
    // persistent: true,
  }).onOk(async (val) => {
    await getCustomer("");
    TPOS_CUSTCD.value = val.MCUS_CUSCD;
  });
};

const onLoad = async (index, done) => {
  await getItem("");
  done();
};

const onInputSearch = (val) => {
  page.value = 0;
  if (!val) {
    listItems.value = [];
  }
  getItem(val);
};

const filterFn = (val, update, abort, fun) => {
  update(async () => {
    if (fun === "cust") {
      await getCustomer(val);
    }

    if (fun === "item") {
      await getItem(val);
    }
  });
};

const onEditSelItem = (idx) => {
  $q.dialog({
    dark: true,
    title: "Prompt",
    message: "How many qty?",
    prompt: {
      model: selectedItems.value[idx].sellQty,
      type: "number", // optional
      isValid: (val) => val > 0 && val <= selectedItems.value[idx].STOCK,
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    selectedItems.value[idx].sellQty = data;
  });
};

const onDeleteSelItem = (idx) => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to delete this line ??`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    selectedItems.value.splice(idx, 1);
  });
};

const getSellQty = (items) => {
  let indexItm = selectedItems.value.findIndex(
    (item) => item.MITM_ITMNM === items
  );

  if (indexItm !== -1 && selectedItems.value[indexItm].sellQty) {
    return selectedItems.value[indexItm].sellQty;
  } else {
    return 0;
  }
};

const onCancelSales = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to cancel sales ??`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    selectedItems.value = [];
    TPOS_CUSTCD.value = "";
    tax_code.value = "";
    TPOS_DOCNO.value = "";
    BC.value = "";

    await getItem("");
    await getCustomer("");
    await getTaxes();
    await getDefaultTax();
    await getListData();
  });
};

const onSubmited = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to process this sales ??`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    $q.dialog({
      title: "Payment",
      message: "Enter payment amount",
      prompt: {
        model: "",
        type: "number", // optional
        isValid: (val) => val > 0 && val >= getTotal.value + getTotalTax.value, // << here is the magic
      },
      cancel: true,
      persistent: true,
    }).onOk(async (data) => {
      $q.dialog({
        title: "Confirmation",
        message: `Payment amount is Rp. ${parseInt(
          data
        ).toLocaleString()}, are you sure want continue ?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.dialog({
          title: "Payment",
          message:
            "Change amount is Rp. " +
            (data - getTotal.value - getTotalTax.value).toLocaleString(),
          noEscDismiss: true,
          noBackdropDismiss: true,
          persistent: true,
        });

        loading.value = true;
        let dataDet = selectedItems.value.map((val) => {
          return {
            TPOSD_ITMCD: val.MITM_ITMNM,
            TPOSD_PRC: val.LATEST_PRC,
            TPOSD_QTY: val.sellQty,
            BC: val.BC || "",
          };
        });

        await api_web
          .post("pos", {
            TPOS_DOCNO: TPOS_DOCNO.value,
            TPOS_CUSTCD: TPOS_CUSTCD.value,
            TPOS_PAY: data,
            det: dataDet,
          })
          .then((response) => {
            loading.value = false;
            selectedItems.value = [];
            onClickPrintStruk(response.data.data.TPOS_DOCNO);
          })
          .catch(() => {
            loading.value = false;
          });
      });
    });
  });
};

const onClickPrintStruk = async (docNo) => {
  try {
    loading.value = true;

    const getUsersDet =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_det="))
        ?.split("=")[1] || "";

    const userDet = getUsersDet
      ? JSON.parse(decodeURIComponent(getUsersDet))
      : {};
    const response = await api_web.post(
      "pos/printStruk",
      {
        TPOS_DOCNO: docNo,
        cg:
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("CGID="))
            ?.split("=")[1] || "",
        username: userDet.nick_name || "",
        branch: userDet ? userDet.branch : "",
      },
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

const getTaxes = async (val) => {
  loading.value = true;
  await api_web
    .post("taxes/searchAPI", {
      searchBy: "MTAX_DESC",
      searchValue: val,
    })
    .then((response) => {
      loading.value = false;
      listTaxes.value = response.data.data;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getDefaultTax = async () => {
  const getCG =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("CGID="))
      ?.split("=")[1] || "";
  loading.value = true;
  await api
    .get(
      `master/gencode/${btoa("CUST_ACC_LIST")}/${btoa(
        "DEF_CUST_TAXPOS"
      )}/${getCG}`
    )
    .then((val) => {
      loading.value = false;
      console.log(val);
      if (val.data.CODE_VALUE && !tax_code.value) {
        isUsingTax.value = true;
        tax_code.value = val.data.CODE_VALUE;
      }
    })
    .catch((e) => {});
};

const onScanBarcode = async (value, wh = "WH1") => {
  if (!value) return;

  // if (selectedItems.value.filter((fil) => fil.BC === value).length > 0) {
  //   $q.notify({
  //     color: "negative",
  //     message: `Barcode ${value} already scanned !!`,
  //   });
  //   BC.value = "";
  //   barcodeRef.value?.focus();
  //   return;
  // }

  try {
    loading.value = true;
    await api_web
      .get(`inventory/findStockByBarcode/${value}/${wh}`)
      .then((response) => {
        loading.value = false;
        if (response.data.length > 0) {
          console.log("Found item:", response.data[0]);

          let dataItem = response.data[0];
          console.log("Data item:", dataItem);

          if (dataItem) {
            // Check if barcode already scanned on other line
            if (
              selectedItems.value.filter((fil) => fil.BC === value).length > 0
            ) {
              $q.notify({
                color: "negative",
                message: `Barcode ${value} already scanned !!`,
              });
              BC.value = "";
              barcodeRef.value?.focus();

              return;
            }
            onAddItems(
              {
                MITM_ITMNM: dataItem.CITRN_ITMCD,
                MITM_ITMNMREAL: dataItem.MITM_ITMNM,
                STOCK: dataItem.STOCK,
                LATEST_PRC: dataItem.MITMSPRC_PRC,
              },
              0,
              value
            );

            // console.log("List Det after scan:", listDet.value);
            BC.value = "";
            barcodeRef.value?.focus();
          }
        }
      });
  } catch (error) {
    console.error("Error scanning barcode:", error);
    $q.notify({
      color: "negative",
      message: `Error scanning barcode: ${error.message}`,
    });
    BC.value = "";
    barcodeRef.value?.focus();
  } finally {
    loading.value = false;
  }
};

const getListData = async (pagination) => {
  loading.value = true;
  try {
    const response = await api_web.post("pos/searchApi", {
      withDet: true,
    });
    listDocuments.value = response.data;
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

const findTransaction = () => {
  $q.dialog({
    component: multiplePromptDialog,
    componentProps: {
      title: "User Details",
      initialFields: [
        {
          name: "pos_no",
          label: "Select Transaction ID",
          type: "select",
          // default: "",
          options: listDocuments.value.map((doc) => ({
            label: `${doc.TPOS_DOCNO} - ${doc.MCUS_CUSNM} - ${doc.MCUS_CURCD} ${doc.TPOS_TOTALAMT}`,
            value: doc.TPOS_DOCNO,
          })),
          rules: [(val) => !!val || "Field is required"],
        },
      ],
    },
    persistent: true,
  }).onOk((data) => {
    let selectedDoc = listDocuments.value.find(
      (doc) => doc.TPOS_DOCNO === data.pos_no
    );
    if (selectedDoc) {
      TPOS_DOCNO.value = selectedDoc.TPOS_DOCNO;
      TPOS_CUSTCD.value = selectedDoc.TPOS_CUSTCD;
      tax_code.value = selectedDoc.TPOS_TAXCODE;
      selectedItems.value = selectedDoc.det.map((det) => ({
        MITM_ITMNM: det.TPOSD_ITMCD,
        MITM_ITMNMREAL: det.MITM_ITMNMREAL,
        LATEST_PRC: det.TPOSD_PRC,
        sellQty: det.TPOSD_QTY,
        BC: det.TPOSD_BC || "",
      }));
    }
  });
};
</script>

<style lang="sass">
.example-col-gutter-size
  .my-content
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
