<template>
  <template v-for="(form, idx) in listForms" :key="idx">
    <fieldset
      style="border: 1px black solid; border-radius: 10px"
      v-if="form.types === 'title'"
      class="full-width q-pa-md"
    >
      <legend style="margin-left: 1em; padding: 0.2em 0.8em">
        <b>{{ form.name }}</b>
      </legend>

      <div class="row q-col-gutter-md q-pa-md" v-if="form.children">
        <dynamicForms :forms="form.children" v-model="valueForm" />
      </div>
    </fieldset>

    <div :class="`col-${form.formLength}`">
      <q-input
        v-if="form.types && form.types.includes('input')"
        :label="form.name"
        v-model="
          valueForm[
            form.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '_')
              .replace(/^_|_$/g, '')
          ]
        "
        outlined
        dense
        :type="form.types && form.types.includes('int') ? 'number' : 'text'"
        :readonly="form.types === 'inputDate' || form.types === 'inputDateTime'"
      >
        <template
          v-slot:prepend
          v-if="form.types === 'inputDate' || form.types === 'inputDateTime'"
        >
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="
                  valueForm[
                    form.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '_')
                      .replace(/^_|_$/g, '')
                  ]
                "
                mask="YYYY-MM-DD HH:mm"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template
          v-slot:append
          v-if="form.types === 'inputTime' || form.types === 'inputDateTime'"
        >
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="
                  valueForm[
                    form.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '_')
                      .replace(/^_|_$/g, '')
                  ]
                "
                mask="YYYY-MM-DD HH:mm"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select
        v-if="form.types === 'select'"
        :label="form.name"
        :options="form.options"
        v-model="
          valueForm[
            form.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '_')
              .replace(/^_|_$/g, '')
          ]
        "
        emit-value
        map-options
        outlined
        dense
      />
      <q-select
        v-if="form.types === 'selectAPI'"
        :label="form.name"
        @filter="
          (inputValue, doneFn, abortFn) =>
            filterFn(inputValue, doneFn, abortFn, form)
        "
        :options="form.options"
        v-model="
          valueForm[
            form.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '_')
              .replace(/^_|_$/g, '')
          ]
        "
        emit-value
        map-options
        :multiple="form.apiOpt?.multiple ?? false"
        outlined
        dense
        use-input
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-if="form.types === 'selectMultiple'"
        :label="form.name"
        :options="form.options"
        v-model="
          valueForm[
            form.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '_')
              .replace(/^_|_$/g, '')
          ]
        "
        emit-value
        map-options
        multiple
        outlined
        dense
      />
    </div>
  </template>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import dynamicForms from "./dynamicForms.vue";
import { api, api_web } from "boot/axios";

const props = defineProps({
  forms: Array,
  modelValue: Object,
});

const $q = useQuasar();
const valueForm = ref(props.modelValue ?? {});
const loadingAPI = ref(false);
const listForms = ref([]);

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  listForms.value = props.forms;
  valueForm.value = props.forms.reduce((acc, form) => {
    const formKey = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    if (form.types && form.types.includes("selectMultiple")) {
      acc[formKey] = [];
    } else if (form.types && form.types.includes("integer")) {
      acc[formKey] = 0;
    } else if(form.types && form.types.includes("selectAPI")) {
      acc[formKey] = "";
      if (props.modelValue && props.modelValue[formKey]) {
        // prefill selectAPI options if modelValue has a value for it
        getDataforSelectAPI(form.apiOpt).then((data) => {
          const matchedOption = data.find(
            (option) => option.id === props.modelValue[formKey]
          );
          if (matchedOption) {
            valueForm.value[formKey] = matchedOption.id;
          }
        });
      }
    } else {
      acc[formKey] = "";
    }
    return acc;
  }, {});

  if (props.modelValue) {
    valueForm.value = props.modelValue;
  }
});

const getDataforSelectAPI = async (optApi, searchValue) => {
  loadingAPI.value = true;
  try {
    const response = await api_web[optApi.method](
      optApi.url,
      optApi.data || {},
      optApi.headers || {}
    );

    console.log(response.data);

    return response.data.map((item) =>
      Object.keys(optApi.data).reduce((acc, key) => {
        acc[key] = item[optApi.data[key]];
        return acc;
      }, {})
    );
  } catch (error) {
    console.error("Error fetching data for select API:", error);
    return [];
  } finally {
    loadingAPI.value = false;
  }
};

const filterFn = (val, update, abort, formData) => {
  // console.log('check inside', [val, update, abort, formData])
  // if (formData.options.length > 0) {
  //   // already loaded
  //   update();
  //   return;
  // }

  getDataforSelectAPI(formData.apiOpt)
    .then((data) => {
      // console.log('data for select API', data)

      if (formData.apiOpt.filter) {
        const filterOpt = formData.apiOpt.filter;
        let valForFilter = "";

        if (filterOpt.method === "id") {
          const searchForms = listForms.value.filter(
            (f) => f.id === parseInt(filterOpt.search_value)
          );

          valForFilter =
            valueForm.value[
              searchForms.length > 0
                ? searchForms[0].name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "_")
                    .replace(/^_|_$/g, "")
                : ""
            ] || "";
        } else if (filterOpt.method === "value") {
          const selectedOption = formData.options.find(
            (option) =>
              option.id ===
              valueForm.value[
                filterOpt.field
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "_")
                  .replace(/^_|_$/g, "")
              ]
          );
          valForFilter = selectedOption ? selectedOption.value : "";
        }

        if (!valForFilter) {
          $q.notify({
            type: "warning",
            message: `Please input a value for ${filterOpt.field} before filtering.`,
          });
        }

        data = data.filter((item) =>
          item[filterOpt.search_by].includes(valForFilter)
        );
      }

      formData.options = data;
      update();
    })
    .catch((error) => {
      console.error("Error fetching data for select API:", error);
      abort();
    });
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) valueForm.value = newVal;
  },
  { deep: true }
);

watch(
  valueForm,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);
</script>
