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
            $checkRef = $this->getACC($conn, $reference_number);

            $filterClose = array_filter($checkRef['data'], function ($item) {
                return $item['is_closed'] == 1;
            });

            // Validate Closing
            if (count($filterClose) > 0) {
                return response()->json([
                    'status' => false,
                    'error' => 'Interface ACC Err: Reference number already closed',
                    'param' => [
                        'cg_code' => $conn,
                        'date' => $date,
                        'reference_number' => $reference_number,
                        'journal_code' => $journal_code,
                        'description' => $description,
                        'amount' => $amount,
                    ],
                    'data' => $filterClose,
                ], 400);
            }

            // Validate check if reference number already exists
            $filterUnvoid = array_filter($checkRef['data'], function ($item) {
                return empty($item['voided_at']);
            });

            if (isset($checkRef['data']) && count($filterUnvoid) > 0) {
                return response()->json([
                    'status' => false,
                    'error' => 'Interface ACC Err: Reference number already exists',
                    'param' => [
                        'cg_code' => $conn,
                        'date' => $date,
                        'reference_number' => $reference_number,
                        'journal_code' => $journal_code,
                        'description' => $description,
                        'amount' => $amount,
                    ],
                    'data' => $filterUnvoid,
                ], 400);
            }

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
                'status' => false,
                'error' => 'Interface ACC Err: Failed to post data to API',
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

    public function getACC($conn, $reference_number)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', env('ACC_URL') . 'api/journal-by-reference', [
                'query' => [
                    'cg_code' => $conn,
                    'reference_number' => $reference_number,
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-API-KEY' => env('ACC_KEY'),
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            return response()->json([
                'error' => 'Failed to get data from API',
                'message' => $e->getMessage(),
                'param' => [
                    'cg_code' => $conn,
                    'reference_number' => $reference_number,
                ]
            ], 500);
        }
    }

    public function deleteACC($conn, $reference_number)
    {
        try {
            $checkRef = $this->getACC($conn, $reference_number);
            $filterClose = array_filter($checkRef['data'], function ($item) {
                return $item['is_closed'] == 1;
            });

            // Validate Closing
            if (count($filterClose) > 0) {
                return response()->json([
                    'status' => false,
                    'error' => 'Interface ACC Err: Reference number already closed',
                    'param' => [
                        'cg_code' => $conn,
                        'reference_number' => $reference_number,
                    ],
                    'data' => $filterClose,
                ], 400);
            }

            $filterUnvoid = array_filter($checkRef['data'], function ($item) {
                return empty($item['voided_at']);
            });

            // Validate check if reference number not voided yet
            if (isset($checkRef['data']) && count($filterUnvoid) > 0) {
                // return $filterUnvoid;
                foreach ($filterUnvoid as $key => $value) {
                    $client = new \GuzzleHttp\Client();
                    $response = $client->request('DELETE', env('ACC_URL') . 'api/voidJournal/' . $value['id'], [
                        'headers' => [
                            'Content-Type' => 'application/json',
                            'X-API-KEY' => env('ACC_KEY'),
                        ]
                    ]);

                    return json_decode($response->getBody(), true);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'error' => 'Interface ACC Err: Reference number already voided',
                    'param' => [
                        'cg_code' => $conn,
                        'reference_number' => $reference_number,
                    ],
                    'data' => $filterUnvoid,
                ], 400);
            }

        } catch (\GuzzleHttp\Exception\RequestException $e) {
            return response()->json([
                'error' => 'Failed to delete data from API',
                'message' => $e->getMessage(),
                'param' => [
                    'cg_code' => $conn,
                    'reference_number' => $reference_number,
                ]
            ], 500);
        }
    }
}
