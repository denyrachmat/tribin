<template>
  <div class="container">
    <h1>Print Label Using TSPL</h1>
    <button @click="printLabel">Print Label</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import qz from "qz-tray";
import { sha256 } from "js-sha256";

export default {
  setup() {
    const qzReady = ref(false);

    const initializeQZ = () => {
      qz.init({
        logger: console,
      });
      try {
        qz.api.setPromiseType(
          () => new Promise((resolve, reject) => resolve())
        );
        qz.api.setSha256Type((data) => sha256(data)); // SHA256 signing
        qzReady.value = true;
        console.log("QZ Tray initialized successfully.");
      } catch (error) {
        console.error("Failed to initialize QZ Tray:", error);
      }
    };

    const printLabel = async () => {
      if (!qzReady.value) {
        alert("QZ Tray is not initialized or connected.");
        return;
      }

      const tsplCommands = `
        SIZE 100 mm, 150 mm
        GAP 3 mm, 0 mm
        DIRECTION 1
        CLS
        TEXT 100,100,"3",0,1,1,"Hello TSPL!"
        BARCODE 100,200,"128",100,1,0,2,2,"123456789"
        PRINT 1,1
      `;

      try {
        if (!qz.websocket.isActive()) {
          await qz.websocket.connect();
        }

        const printers = await qz.printers.find();

        console.log(printers);
        const printerName = "Rongta RP4xx Series"; // Replace with your printer name
        const config = qz.configs.create(printerName);

        const data = [
          { type: "raw", format: "base64", data: btoa(tsplCommands) },
        ];
        await qz.print(config, data);

        alert("Print job sent successfully!");
      } catch (error) {
        console.error("Failed to print:", error);
        alert(`Failed to print: ${error.message}`);
      }
    };

    onMounted(() => {
      initializeQZ();
    });

    return {
      printLabel,
    };
  },
};
</script>

<style>
.container {
  text-align: center;
  margin: 50px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
