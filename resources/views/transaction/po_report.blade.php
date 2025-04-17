<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PO Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 18px;
        }

        .header p {
            margin: 0;
            font-size: 12px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .table th,
        .table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        .table th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 10px;
        }
    </style>
</head>

<body>
    <div class="header">
        <p style="font-size: 20px; font-weight: bold;">{{ $companyGroupData->name }}</p>
        <p style="font-size: 18px; font-weight: bold;">Purchase Order Report</p>
        <p style="font-size: 15px; margin-top: 1em;">Date: {{ date('Y-m-d', strtotime($fdate)) }} to {{ date('Y-m-d', strtotime($ldate)) }}</p>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Item</th>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Price per Item</th>
                <th>Total Before Tax</th>
                <th>Tax Total</th>
                <th>Total Amount</th>
            </tr>
        </thead>
        <tbody>
            @php $groupNumber = 1; @endphp
            @foreach ($data as $index => $po)
                        @if ($index > 0 && $data[$index - 1]->TPCHORD_PCHCD !== $po->TPCHORD_PCHCD)
                            @php $groupNumber++; @endphp
                        @endif
                        <tr>
                            <td colspan="{{ $index > 0 && $data[$index - 1]->TPCHORD_PCHCD === $po->TPCHORD_PCHCD ? 3 : 1 }}">
                                {{ $index > 0 && $data[$index - 1]->TPCHORD_PCHCD === $po->TPCHORD_PCHCD ? '' : $groupNumber }}</td>
                            @if(!($index > 0 && $data[$index - 1]->TPCHORD_PCHCD === $po->TPCHORD_PCHCD))
                                <td>{{ $index > 0 && $data[$index - 1]->TPCHORD_PCHCD === $po->TPCHORD_PCHCD ? '' : $po->TPCHORD_PCHCD }}
                                </td>
                                <td>{{ $index > 0 && $data[$index - 1]->TPCHORD_PCHCD === $po->TPCHORD_PCHCD ? '' : $po->MSUP_SUPNM }}
                                </td>
                            @endif
                            <td>{{ $po->TPCHORDDETA_ITMCD }}</td>
                            <td>{{ $po->MITM_ITMNM }}</td>
                            <td>{{ $po->TPCHORDDETA_ITMQT }}</td>
                            <td>{{ number_format($po->TPCHORDDETA_ITMPRC_PER, 2) }}</td>
                            <td>{{ number_format($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER, 2) }}</td>
                            <td>{{ number_format($po->totalTax, 2) }}</td>
                            <td>{{ number_format(($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER) + $po->totalTax, 2) }}</td>
                        </tr>
                        @php
                            $subtotalQty = isset($subtotalQty) ? $subtotalQty + $po->TPCHORDDETA_ITMQT : $po->TPCHORDDETA_ITMQT;
                            $subtotalPrice = isset($subtotalPrice) ? $subtotalPrice + $po->TPCHORDDETA_ITMPRC_PER : $po->TPCHORDDETA_ITMPRC_PER;
                            $subtotal = isset($subtotal) ? $subtotal + (($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER) + $po->totalTax) : (($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER) + $po->totalTax);
                            $grandTotalQty = isset($grandTotalQty) ? $grandTotalQty + $po->TPCHORDDETA_ITMQT : $po->TPCHORDDETA_ITMQT;
                            $grandTotal = isset($grandTotal) ? $grandTotal + (($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER) + $po->totalTax) : ($po->TPCHORDDETA_ITMQT * $po->TPCHORDDETA_ITMPRC_PER) + $po->totalTax;
                        @endphp
                        @if ($index + 1 === count($data) || $data[$index + 1]->TPCHORD_PCHCD !== $po->TPCHORD_PCHCD)
                                <tr>
                                    <td colspan="5" style="text-align: right; font-weight: bold;">Subtotal:</td>
                                    <td colspan="4" style="font-weight: bold;">{{ number_format($subtotalQty, 2) }}</td>
                                    <!-- <td style="font-weight: bold;">{{ number_format($subtotalPrice, 2) }}</td> -->
                                    <td style="font-weight: bold;">{{ number_format($subtotal, 2) }}</td>
                                </tr>
                                @php
                                    $subtotal = 0;
                                    $subtotalQty = 0;
                                    $subtotalPrice = 0;
                                    $subtotalQty = 0;
                                @endphp
                        @endif
            @endforeach
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">Grand Total:</td>
                <td colspan="4" style="font-weight: bold;">{{ number_format($grandTotalQty, 2) }}</td>
                <td style="font-weight: bold;">{{ number_format($grandTotal, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Generated by the system. Confidential document.</p>
    </div>
</body>

</html>
