<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Struk POS</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 10px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        .table th, .table td { border-bottom: 1px solid #ddd; padding: 4px; text-align: left; }
        .footer { text-align: right; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>{{ $header->name }}</h2>
        @if(isset($header))
            <p>{{ $header->address }}</p>
            <p>Telp: {{ $header->phone }} | Fax: {{ $header->fax }}</p>
        @endif
        <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
        <p>No. Struk: {{ $struk_no ?? '0001' }}</p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($details ?? [] as $item)
            <tr>
                <td>{{ $item['TPOSD_ITMCD'] }} ({{ $item['MITM_ITMNM'] }})</td>
                <td>{{ $item['TPOSD_QTY'] }}</td>
                <td>{{ number_format($item['TPOSD_PRC'], 0, ',', '.') }}</td>
                <td>{{ number_format($item['TPOSD_QTY'] * $item['TPOSD_PRC'], 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="footer">
        <p>Subtotal: Rp {{ number_format($subtotal ?? 0, 0, ',', '.') }}</p>
        <p>Diskon: Rp {{ number_format($diskon ?? 0, 0, ',', '.') }}</p>
        <p>Total: <strong>Rp {{ number_format(($subtotal ?? 0) - ($diskon ?? 0), 0, ',', '.') }}</strong></p>
        <p>Bayar: Rp {{ number_format($data['TPOS_PAY'] ?? 0, 0, ',', '.') }}</p>
        <p>Kembali: Rp {{ number_format(($data['TPOS_PAY'] ?? 0) - (($subtotal ?? 0) - ($diskon ?? 0)), 0, ',', '.') }}</p>
    </div>
    <div class="header">
        <p>Terima kasih atas kunjungan Anda!</p>
    </div>
</body>
</html>