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
            if ($amount < 1) {
                return response()->json([
                    'status' => true,
                    'error' => 'Acc won\'t accept 0 or negative amount, the transaction not posted !',
                    'param' => [
                        'cg_code' => $conn,
                        'date' => $date,
                        'reference_number' => $reference_number,
                        'journal_code' => $journal_code,
                        'description' => $description,
                        'amount' => $amount,
                    ],
                    'data' => [],
                ], 200);
            }
            $checkRef = $this->getACC($conn, $reference_number, false);

            // If $checkRef is a JsonResponse, get the original data
            if ($checkRef instanceof \Illuminate\Http\JsonResponse) {
                $checkRef = $checkRef->getData(true);
            }

            // return $checkRef;
            $filterClose = array_filter($checkRef, function ($item) {
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
            $filterUnvoid = array_filter($checkRef, function ($item) {
                return empty($item['voided_at']);
            });

            if (isset($checkRef) && count($filterUnvoid) > 0) {
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
                'code' => $e->getCode(),
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

    public function getACC($conn, $reference_number, $shouldExists = true)
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
            if ($shouldExists) {
                return json_decode($response->getBody(), true);
            } else {
                return json_decode($response->getBody(), true)['data'];
            }

        } catch (\GuzzleHttp\Exception\RequestException $e) {

            if ($shouldExists === false && $e->getCode() == 422) {
                return response()->json([
                    'status' => true,
                    'error' => 'Interface ACC Err: Reference number not found',
                    'param' => [
                        'cg_code' => $conn,
                        'reference_number' => $reference_number,
                    ],
                    'data' => [],
                ], 200);
            }
            return response()->json([
                'error' => 'Failed to get data from API',
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'param' => [
                    'cg_code' => $conn,
                    'reference_number' => $reference_number,
                ],
                'data' => [],
            ], 500);
        }
    }

    public function deleteACC($conn, $reference_number)
    {
        try {
            $checkRef = $this->getACC($conn, $reference_number);

            if ($checkRef instanceof \Illuminate\Http\JsonResponse) {
                $checkRef = $checkRef->getData(true);
            }

            $filterClose = array_filter($checkRef, function ($item) {
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

            $filterUnvoid = array_filter($checkRef, function ($item) {
                return empty($item['voided_at']);
            });

            // Validate check if reference number not voided yet
            if (isset($checkRef) && count($filterUnvoid) > 0) {
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
                    'status' => true,
                    'error' => 'Interface ACC Err: Reference number already voided or not found',
                    'param' => [
                        'cg_code' => $conn,
                        'reference_number' => $reference_number,
                    ],
                    'data' => $filterUnvoid,
                ], 200);
            }
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            return response()->json([
                'error' => 'Failed to delete data from API',
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'param' => [
                    'cg_code' => $conn,
                    'reference_number' => $reference_number,
                ]
            ], 500);
        }
    }
}
