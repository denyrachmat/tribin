<template>
  <q-page class="q-pa-md">
    <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>JAT Integrated Online System</q-toolbar-title>

          <span>v2.0.0</span>
        </q-toolbar>
      </q-header>

    <div class="row">
      <div class="col text-center">
        <img
          alt="Quasar logo"
          src="~assets/download.png"
          style="height: 200px"
        />
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col text-center">
        <q-btn flat color="blue" label="Continue To App" icon="login" @click="onClickLogin"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>

const onClickLogin = () => {
  document.location.href = process.env.API_WEB + 'welcome'
}
</script>
