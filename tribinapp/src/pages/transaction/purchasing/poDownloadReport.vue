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
        <div class="text-h6">Download PO Report</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input filled v-model="fdate" dense label="From Date" readonly>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fdate" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6">
            <q-input filled v-model="ldate" dense label="To Date" readonly>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="ldate" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Download"
          color="primary"
          @click="downloadReport()"
          :loading="loading"
        />
        <q-btn flat label="Close Report" color="red" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { api, api_web } from "boot/axios";

const $q = useQuasar();
const fdate = ref("");
const ldate = ref("");
const loading = ref(false);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const downloadReport = async () => {
  if (!fdate.value || !ldate.value) {
    $q.notify({
      type: "negative",
      message: "Please select both From Date and To Date",
    });
    return;
  }

  try {
    loading.value = true;
    await api_web
      .get(`purchase-order/download/${fdate.value}/${ldate.value}`)
      .then((response) => {
        loading.value = false;
        let pdfWindow = window.open("");
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(response.data) +
            "'></iframe>"
        );
      })
      .catch((e) => {
        loading.value = false;
      });

    $q.notify({
      type: "positive",
      message: "Report downloaded successfully",
    });
    // onDialogOK()
  } catch (error) {
    loading.value = false;
    $q.notify({
      type: "negative",
      message: "Failed to download report",
    });
    console.log(error)
  }
};
</script>
