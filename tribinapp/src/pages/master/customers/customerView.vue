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
        <div class="text-h6">Create Customer Master</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input
              label="Item Code"
              dense
              v-model="custData.MCUS_CUSCD"
              filled
            />
          </div>
          <div class="col">
            <q-input
              label="Item Code"
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
