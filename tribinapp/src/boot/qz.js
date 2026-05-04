import qz from 'qz-tray'
import JsBarcode from 'jsbarcode'

export async function printLabel() {
    if (!qz.websocket.isActive()) {
        await qz.websocket.connect()
    }

    const printer = await qz.printers.find('RP400')
    const config = qz.configs.create(printer, {
        units: 'mm',
        size: { width: 40, height: 20 },
        margins: 0,
        scaleContent: false,
        rasterize: true
    })

    // === canvas utama (label) ===
    const canvas = document.createElement('canvas')
    canvas.width = 320
    canvas.height = 160

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barcodeCanvas = document.createElement('canvas')

    JsBarcode(barcodeCanvas, '123456789', {
        format: 'CODE128',
        width: 2,
        height: 60,
        displayValue: false
    })

    ctx.drawImage(barcodeCanvas, 30, 20)

    ctx.fillStyle = '#000'
    ctx.font = '16px monospace'
    ctx.fillText('123456789', 90, 125)

    const base64 = canvas.toDataURL('image/png')

    const data = [{
        type: 'pixel',
        format: 'html',
        flavor: 'plain',
        data: `
    <html>
      <body style="margin:0; padding:0;">
        <img src="${base64}" style="width:40mm; height:20mm;" />
      </body>
    </html>
  `
    }]

    await qz.print(config, data)
}