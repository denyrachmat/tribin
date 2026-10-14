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
        <div class="text-h6">
          {{ isEdit ? "Edit Discount Master" : "Create Discount Master" }}
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <fieldset style="border: 1px black solid; border-radius: 10px">
          <legend style="margin-left: 1em; padding: 0.2em 0.8em">
            <b>Header</b>
          </legend>

          <q-inner-loading :showing="loading" dark>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                label="Code"
                dense
                filled
                v-model="header.MDISC_CODE"
                :disable="isEdit"
                :rules="[(val) => !!val || 'Code is required']"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Description"
                dense
                filled
                v-model="header.MDISC_DESC"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12">
              <q-banner dense class="bg-blue-1 text-blue-10">
                Fill <b>either</b> a percentage <b>or</b> a fixed amount - not both.
              </q-banner>
            </div>
          </div>

          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12 col-sm-6">
              <q-input
                label="Percent (%)"
                type="number"
                dense
                filled
                v-model="header.MDISC_PERCENT"
                :disable="hasAmount"
                :hint="hasAmount ? 'Cleared because an amount is set' : '0 - 100'"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                label="Amount (Rp)"
                type="number"
                dense
                filled
                v-model="header.MDISC_AMT"
                :disable="hasPercent"
                :hint="hasPercent ? 'Cleared because a percent is set' : 'Minimum 0'"
              />
            </div>
          </div>
        </fieldset>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          @click="onSubmitData()"
          :loading="loading"
        />
        <q-btn flat label="Cancel" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api_web } from "boot/axios";

const $q = useQuasar();

const props = defineProps({
  dataHeader: {
    type: Object,
    default: () => ({}),
  },
});

const blank = {
  MDISC_CODE: "",
  MDISC_DESC: "",
  MDISC_PERCENT: "",
  MDISC_AMT: "",
};

const header = ref({ ...blank });
const loading = ref(false);

const isEdit = computed(() => !!props.dataHeader?.MDISC_CODE);
const hasPercent = computed(() => String(header.value.MDISC_PERCENT).trim() !== "");
const hasAmount = computed(() => String(header.value.MDISC_AMT).trim() !== "");

onMounted(() => {
  if (props.dataHeader && props.dataHeader.MDISC_CODE) {
    header.value = {
      MDISC_CODE: props.dataHeader.MDISC_CODE ?? "",
      MDISC_DESC: props.dataHeader.MDISC_DESC ?? "",
      // The table hands back numbers; keep blanks blank.
      MDISC_PERCENT: props.dataHeader.MDISC_PERCENT ?? "",
      MDISC_AMT: props.dataHeader.MDISC_AMT ?? "",
    };
  }
});

const onSubmitData = () => {
  // Guard here as well as server-side, so the user gets an immediate answer.
  if (!header.value.MDISC_CODE) {
    $q.notify({ type: "negative", message: "Code is required." });
    return;
  }
  if (!hasPercent.value && !hasAmount.value) {
    $q.notify({
      type: "negative",
      message: "Fill either a percent or an amount.",
    });
    return;
  }
  if (hasPercent.value && hasAmount.value) {
    $q.notify({
      type: "negative",
      message: "Use either a percent or an amount, not both.",
    });
    return;
  }

  $q.dialog({
    title: "Confirmation",
    message: "Are you sure want to save this discount master ?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    loading.value = true;

    const payload = { ...header.value };
    // Only send the field in use, so the other one is stored as null rather than "".
    if (hasPercent.value) {
      payload.MDISC_AMT = "";
    } else {
      payload.MDISC_PERCENT = "";
    }

    try {
      const url = isEdit.value
        ? `disc/${encodeURIComponent(header.value.MDISC_CODE)}`
        : "disc";
      const response = isEdit.value
        ? await api_web.put(url, payload)
        : await api_web.post(url, payload);

      $q.notify({
        color: "green",
        message: response.data?.msg ?? "Saved",
      });
      onDialogOK();
    } catch (e) {
      $q.notify({
        type: "negative",
        message: e?.response?.data?.error?.[0] ?? "Failed to save.",
      });
    } finally {
      loading.value = false;
    }
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
