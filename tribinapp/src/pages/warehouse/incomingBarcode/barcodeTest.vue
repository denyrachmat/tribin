<template>
  <q-page padding>
    <q-btn color="primary" label="Print Label" @click="handlePrint" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { printLabel } from 'boot/qz'

const $q = useQuasar()

async function handlePrint() {
  try {
    await printLabel()
    $q.notify({ type: 'positive', message: 'Print berhasil dikirim' })
  } catch (err: any) {
    console.error(err)
    $q.notify({
      type: 'negative',
      message: err?.message || 'Gagal print'
    })
  }
}
</script>