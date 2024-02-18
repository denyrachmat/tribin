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
        <div class="text-h6">View Condition</div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-item clickable v-ripple v-for="(cond, idx) in props.listCond" :key="idx">
          <q-item-section>
            <q-item-label>{{ cond.MCONDITION_DESCRIPTION }}</q-item-label>
            <q-item-label caption>Description</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" @click="onDialogOK" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";

const props = defineProps({
  listCond: Array,
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
