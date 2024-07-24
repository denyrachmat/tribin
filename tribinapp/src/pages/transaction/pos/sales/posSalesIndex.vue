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
          <div class="col" style="height: 50vh; overflow: auto">
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
                    <q-item-label>{{ selItem.MITM_ITMNM }}</q-item-label>
                    <q-item-label lines="1">
                      Rp {{ selItem.LATEST_PRC.toLocaleString() }} x
                      {{ selItem.sellQty.toLocaleString() }} =
                      <b>{{
                        (selItem.LATEST_PRC * selItem.sellQty).toLocaleString()
                      }}</b>
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
            <div class="row">
              <div class="col q-pa-sm" style="height: 20vh">
                <div class="text-h6 text-bold">
                  Total : Rp. {{ getTotal.toLocaleString() }}
                </div>
              </div>
            </div>
            <q-separator />
            <div class="row" style="height: 10vh">
              <div class="col-sm-6 col-12 q-pa-sm">
                <q-btn color="primary" class="full-width" @click="onSubmited()">
                  Submit
                </q-btn>
              </div>
              <div class="col-sm-6 col-12 q-pa-sm">
                <q-btn color="red" class="full-width" @click="onCancelSales()">
                  Cancel
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pa-xs q-gutter-sm">
        <div class="row bg-white" style="height: 10vh; overflow: auto">
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
        <div class="row bg-white" style="height: 70vh; overflow: auto">
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
                      parseInt(item.STOCK) - (item.sellQty ? parseInt(item.sellQty) : 0)
                    ).toLocaleString()
                  }}</q-badge>
                  <div class="text-center">
                    <q-icon name="category" size="8em" />
                  </div>
                  <q-card-section>
                    <div class="row items-center">
                      <div class="col text-bold ellipsis">
                        {{ item.MITM_ITMNM }} {{ item.sellQty }}
                      </div>
                    </div>
                  </q-card-section>
                  <q-list>
                    <q-item clickable @click="onAddItems(item, n)">
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

const $q = useQuasar();

const listItems = ref([]);
const selectedItems = ref([]);
const loading = ref(false);
const page = ref(0);
const searchItem = ref("");

onMounted(() => {
  getItem("");
});

const getTotal = computed(() =>
  selectedItems.value.length > 0
    ? selectedItems.value.reduce(
        (acc, cur) => acc + parseFloat(cur.LATEST_PRC) * parseInt(cur.sellQty),
        0
      )
    : 0
);

const getItem = async (val) => {
  loading.value = true;
  page.value = page.value + 1;
  await api_web
    .post("item/searchAPIStockAndPriceOnly", {
      searchValue: val,
      page: page.value,
    })
    .then((response) => {
      loading.value = false;

      response.data.data.data.map((valItem) => {
        let indexItm = selectedItems.value.findIndex(
          (item) => item.MITM_ITMCD === valItem.MITM_ITMCD
        );

        console.log(indexItm);
        if (indexItm === -1) {
          listItems.value.push(valItem);
        }
      });
    })
    .catch(() => {
      loading.value = false;
    });
};

const onAddItems = (vals, idx) => {
  $q.dialog({
    dark: true,
    title: "Prompt",
    message: "How many qty?",
    prompt: {
      model: 0,
      type: "number", // optional
      isValid: (val) => val > 0 && val <= listItems.value[idx].STOCK,
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      selectedItems.value.push({
        ...vals,
        sellQty: data,
      });
      // console.log('>>>> OK, received', data)
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onLoad = async (index, done) => {
  await getItem("");
  done();
};

const onInputSearch = (val) => {
  getItem(val);
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

const onCancelSales = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to cancel sales ??`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    selectedItems.value = [];
  });
};

const onSubmited = () => {
  $q.dialog({
    title: "Confirmation",
    message: `Are you sure want to process this sales ??`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    selectedItems.value = [];
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
