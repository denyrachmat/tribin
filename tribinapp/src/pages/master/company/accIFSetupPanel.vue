<template>
  <div class="q-pa-md">
    <div class="text-h6">Acc Interface Setup</div>
    <q-card-section class="q-pa-sm">
      <div class="row">
        <div class="col">
          <fieldset style="border: 1px black solid; border-radius: 10px">
            <legend style="margin-left: 1em; padding: 0.2em 0.8em">
              <b>Default Customer Setup</b>
            </legend>
            <div
              :class="`row ${idx > 0 ? 'q-pt-sm' : null}`"
              v-for="(list, idx) in listCustType"
              :key="list.value"
            >
              <div class="col">
                <q-select
                  dense
                  filled
                  :label="list.label"
                  v-model="list.valueChoosed"
                  :options="listCOA[idx]"
                  :loading="loading"
                  emit-value
                  map-options
                >
                </q-select>
              </div>

              <div class="col-1 text-right">
                <q-btn
                  color="red"
                  icon="close"
                  @click="onClickDelete(list, idx, 'cust')"
                  flat
                  dense
                >
                  <q-tooltip>Remove data</q-tooltip>
                </q-btn>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="row q-pt-sm">
        <div class="col">
          <fieldset style="border: 1px black solid; border-radius: 10px">
            <legend style="margin-left: 1em; padding: 0.2em 0.8em">
              <b>Default Supplier Setup</b>
            </legend>
            <div
              :class="`row ${idx > 0 ? 'q-pt-sm' : null}`"
              v-for="(list, idx) in listPOType"
              :key="list.value"
            >
              <div class="col">
                <q-select
                  dense
                  filled
                  :label="list.label"
                  v-model="list.valueChoosed"
                  :options="listCOASupp[idx]"
                  :loading="loading"
                  emit-value
                  map-options
                >
                </q-select>
              </div>
              <div class="col-1 text-right">
                <q-btn
                  color="red"
                  icon="close"
                  @click="onClickDelete(list, idx, 'supp')"
                  flat
                  dense
                >
                  <q-tooltip>Remove data</q-tooltip>
                </q-btn>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="row q-pt-sm">
        <div class="col text-right">
          <q-btn
            color="primary"
            label="save"
            @click="onClickSave()"
            :loading="loading"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { api, api_web, api_acc } from "boot/axios";
import { useQuasar } from "quasar";

const forms = ref({
  optionsChoose: "",
});
const listCustType = ref([]);
const listPOType = ref([]);
const loading = ref(false);
const listCOA = ref([]);
const listCOASupp = ref([]);

const $q = useQuasar();

onMounted(() => {
  getTransTypeList();
  getTransSuppTypeList();
});

const onClickSave = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to update the setup ?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;
    const datanya = [...listCustType.value, ...listPOType.value];
    let hasil = [];

    console.log(datanya);

    datanya.map((v) => {
      if (v.valueChoosed) {
        hasil.push({
          MGECD_CODE: v.value,
          MGECD_VALUE: v.valueChoosed,
          MGECD_DESC: `${v.label} - ${v.valueChoosed}`,
          MGECD_ACTIVE: 1,
          MGECD_CG:
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("CGID="))
              ?.split("=")[1] || "",
        });
      }
    });

    await api
      .post(`master/gencode`, {
        data: hasil,
      })
      .then((val) => {
        loading.value = false;
      })
      .catch((e) => {});
  });
};

const getTransTypeList = async () => {
  loading.value = true;
  const getCG =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("CGID="))
      ?.split("=")[1] || "";

  await api
    .get(`master/gencode/${btoa("CUST_ACC_LIST")}/0/${getCG}`)
    .then((val) => {
      loading.value = false;
      listCustType.value = [];
      val.data.map((v, idx) => {
        listCustType.value.push({
          label: v.MGECD_DESC,
          value: v.MGECD_VALUE,
          valueChoosed: v.CODE_VALUE,
        });

        if (v.MGECD_DESC2 === "acc") {
          getCOAList(idx);
        } else {
          getFromAPI(v.MGECD_DESC2, "listCOA", idx);
        }
      });
    })
    .catch((e) => {});
};

const getTransSuppTypeList = async () => {
  loading.value = true;
  const getCG =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("CGID="))
      ?.split("=")[1] || "";

  await api
    .get(`master/gencode/${btoa("SUPP_ACC_LIST")}/0/${getCG}`)
    .then((val) => {
      loading.value = false;
      listPOType.value = [];
      val.data.map((v, idx) => {
        listPOType.value.push({
          label: v.MGECD_DESC,
          value: v.MGECD_VALUE,
          valueChoosed: v.CODE_VALUE,
        });

        if (v.MGECD_DESC2 === "acc") {
          getCOAListSupp(idx);
        } else {
          getFromAPI(v.MGECD_DESC2, "listCOASupp", idx);
        }
      });
    })
    .catch((e) => {});
};

const getCOAList = async (idx) => {
  loading.value = true;
  await api_acc
    .get(`feature-list?cg_code=CG&start=0&length=10`, {
      headers: {
        "X-API-KEY": process.env.API_KEY_ACC,
      },
    })
    .then((val) => {
      loading.value = false;
      listCOA[idx].value = [];
      val.data.data.map((v) => {
        listCOA[idx].value.push({
          label: v.name,
          value: v.code,
        });
      });
    })
    .catch((e) => {});
};

const getCOAListSupp = async (idx) => {
  loading.value = true;
  await api_acc
    .get(`feature-list?cg_code=CG&start=0&length=10`, {
      headers: {
        "X-API-KEY": process.env.API_KEY_ACC,
      },
    })
    .then((val) => {
      loading.value = false;
      listCOASupp[idx].value = [];
      val.data.data.map((v) => {
        listCOASupp[idx].value.push({
          label: v.name,
          value: v.code,
        });
      });
    })
    .catch((e) => {});
};

const onClickDelete = (list, idx, type) => {
  if (type === "cust") {
    listCustType.value[idx].valueChoosed = null;
  } else {
    listPOType.value[idx].valueChoosed = null;
  }
};

const getFromAPI = async (url, toVar, idx) => {
  loading.value = true;
  await api_web
    .get(url)
    .then((val) => {
      loading.value = false;
      if (toVar == "listCOA") {
        listCOA.value[idx] = val.data;
      } else if (toVar == "listCOASupp") {
        listCOASupp.value[idx] = val.data;
      }
    })
    .catch((e) => {
      loading.value = false;
    });
};
</script>
