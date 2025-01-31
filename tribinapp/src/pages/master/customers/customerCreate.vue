<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="q-dialog-plugin bg-white q-pa-sm">
      <q-card-section>
        <div class="text-h6">Create New Customer Data</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row q-pb-md">
          <div class="col">
            <q-input
              label="Customer Name"
              dense
              v-model="custData.MCUS_CUSNM"
              filled
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
