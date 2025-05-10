<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Traits\gencodeTraits;

trait accTraits
{
    use gencodeTraits;
    public function sendACC($conn, $date, $reference_number, $journal_code, $description, $amount)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', env('ACC_URL') . 'api/post-journal', [
                'body' => json_encode([
                    'cg_code' => $conn,
                    'date' => $date,
                    'reference_number' => $reference_number,
                    'journal_code' => $journal_code,
                    'description' => $description,
                    'amount' => $amount,
                ]),
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-API-KEY' => env('ACC_KEY'),
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            return response()->json([
                'error' => 'Failed to post data to API',
                'message' => $e->getMessage(),
                'param' => [
                    'cg_code' => $conn,
                    'date' => $date,
                    'reference_number' => $reference_number,
                    'journal_code' => $journal_code,
                    'description' => $description,
                    'amount' => $amount,
                ]
            ], 500);
        }
    }
}
