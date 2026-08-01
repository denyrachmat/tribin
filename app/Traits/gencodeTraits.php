<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\M_GENCODE;
use Illuminate\Support\Facades\Crypt;
use DB;

trait gencodeTraits
{
    /**
     * Get gencode data by code
     * 
     * @param string $code Base64 encoded string
     * @param string $value
     * @param string $cg
     * @return mixed
     */
    public function getGencode($code, $value = '', $cg = '', $branch = '', $exactSearch = false, $includeChild = false)
    {
        $dataHead = M_GENCODE::select('mg.*', DB::raw('(
                SELECT MGECD_VALUE FROM M_GENCODE
                WHERE MGECD_CODE = mg.MGECD_VALUE
                AND (MGECD_CG = mg.MGECD_CG OR MGECD_CG IS NULL)
            ) as CODE_VALUE'))
            ->from('M_GENCODE as mg')
            // ->leftjoin('M_GENCODE as mg2', 'mg.MGECD_VALUE', '=', 'mg2.MGECD_CODE')
            ->where('mg.MGECD_CODE', $exactSearch ? '=' : 'like', base64_decode($code) . ($exactSearch ? '' : '%'))
            ->where('mg.MGECD_ACTIVE', 1)
            ->orderBy('mg.MGECD_CODE', 'asc')
            ->orderBy('mg.MGECD_ORDER', 'asc');

        if (!empty($branch)) {
            $dataHead->where('mg.MGECD_BRANCH', $branch);
        }

        if ($includeChild === true) {
            $dataHead->whereNull('MGECD_PARENT')->with('children', function ($query) use ($cg, $branch) {
                $query->where('MGECD_ACTIVE', 1);
                if (!empty($branch)) {
                    $query->where('MGECD_BRANCH', $branch);
                }
                if (!empty($cg)) {
                    $conn = Crypt::decryptString($cg);
                    $query->where('MGECD_CG', $conn);
                } else {
                    $query->whereNull('MGECD_CG');
                }

                $query->orderBy('MGECD_CODE', 'asc')->orderBy('MGECD_ORDER', 'asc');
            });
        }

        if (!empty($value)) {
            $hasil = (clone $dataHead)->where('mg.MGECD_VALUE', base64_decode($value));
            if ($cg != '') {
                $conn = Crypt::decryptString($cg);
                $hasil = $hasil->where('mg.MGECD_CG', $conn)->first();
            } else {
                $hasil = $hasil->first();
            }
        } else {
            $hasil = (clone $dataHead)->whereNull('mg.MGECD_CG')->get()->toArray();

            if ($cg != '') {
                $conn = Crypt::decryptString($cg);
                $dataByCG = (clone $dataHead)->where('mg.MGECD_CG', $conn)->get()->toArray();
                if (count($dataByCG) > 0)
                    $hasil = array_merge($hasil, $dataByCG);
            }
        }

        return $hasil;
    }

    public function getDynamicsGencode(Request $request)
    {
        $select = $request->has('select') ? $request->select : 'mg.*';
        $data = M_GENCODE::select($select, 'mg2.MGECD_VALUE as CODE_VALUE')
            ->from('M_GENCODE as mg')
            ->leftjoin('M_GENCODE as mg2', 'mg.MGECD_VALUE', '=', 'mg2.MGECD_CODE');

        if ($request->has('where') && count($request->where) > 0) {
            foreach ($request->where as $key => $valueWhere) {
                $data->where($valueWhere['col'], $valueWhere['opr'], $valueWhere['val']);
            }
        }

        if ($request->has('group')) {
            $data->groupBy($request->group);
        }

        return $data->get();
    }

    public function saveGencode(Request $request)
    {
        foreach ($request->data as $key => $value) {
            if (!empty($value['MGECD_VALUE'])) {

                $gencode = M_GENCODE::updateOrCreate([
                    'MGECD_CODE' => $value['MGECD_CODE'],
                    'MGECD_VALUE' => $value['MGECD_VALUE'],
                    'MGECD_CG' => isset($value['MGECD_CG']) ? Crypt::decryptString($value['MGECD_CG']) : null,
                ], [
                    'MGECD_CODE' => $value['MGECD_CODE'],
                    'MGECD_VALUE' => $value['MGECD_VALUE'],
                    'MGECD_DESC' => $value['MGECD_DESC'],
                    'MGECD_DESC2' => isset($value['MGECD_DESC2']) ? $value['MGECD_DESC2'] : null,
                    'MGECD_DESC3' => isset($value['MGECD_DESC3']) ? $value['MGECD_DESC3'] : null,
                    'MGECD_ACTIVE' => $value['MGECD_ACTIVE'] ?? 1,
                    'MGECD_CG' => isset($value['MGECD_CG']) ? Crypt::decryptString($value['MGECD_CG']) : null,
                ]);
            } else {
                $gencode = M_GENCODE::where('MGECD_CODE', $value['MGECD_CODE'])
                    ->delete();
            }
        }

        return "Data Berhasil Disimpan";
    }

    public function getGencodeData($code, $cg, $isSaved = false)
    {
        $data = M_GENCODE::where('MGECD_CG', $cg)
            ->where('MGECD_CODE', 'like', 'GEN_REF_' . $code . '%')
            ->orderBy('MGECD_CODE', 'asc')
            ->get();

        $resultGencode = '';
        foreach ($data as $key => $value) {
            $format = $value->MGECD_DESC3;
            if ($format) {
                $parts = explode('|', $format);
                // return $parts;
                // Increment if MGECD_FLAG is 1
                if ($value->MGECD_FLAG == 1) {
                    if ($parts[0] === 'INT') {
                        // Reset sequence when format contains "RET,ym" and the year-month changed
                        $shouldResetYm = false;
                        $periodKey = null;

                        foreach ($parts as $token) {
                            $clean = strtolower(str_replace(' ', '', $token));
                            if (strpos($clean, 'ret,') === 0) {
                                [$ret, $arg] = array_pad(explode(',', $clean, 2), 2, null);
                                if ($arg === 'ym') {
                                    $periodKey = date('ym'); // current year-month (yyMM)
                                    $lastPeriod = trim((string) ($value->MGECD_DESC2 ?? ''));
                                    $shouldResetYm = ($lastPeriod !== $periodKey);
                                    break;
                                }
                            }
                        }

                        $currentValue = intval($value->MGECD_VALUE);
                        $currentValue = $shouldResetYm ? 1 : ($currentValue + 1);

                        // Persist current period so next call can compare
                        if ($periodKey !== null) {
                            $value->MGECD_DESC2 = $periodKey;
                        }

                        $value->MGECD_VALUE = strval($currentValue);

                        if ($isSaved === true) {
                            $value->save();
                        }
                    }
                }

                if ($parts[0] === 'DATE' && count($parts) > 1) {
                    $dateValue = $value->MGECD_VALUE;
                    $formattedValue = $dateValue;
                    for ($i = 1; $i < count($parts); $i++) {
                        // Support DATE|m|rom where:
                        // - "m" picks the month
                        // - "d" picks the day
                        // - "y" picks the year
                        // Support Roman numerals for year/day/month when followed by "|rom"
                        // Implement 'd' (day) selector and generalized ROM handling

                        // Handle 'd' (day) here and skip switch below
                        if ($parts[0] === 'DATE' && strtolower($parts[$i]) === 'd' || strtolower($parts[$i]) === 'm' || strtolower($parts[$i]) === 'y') {
                            $ts = is_string($dateValue) && strtolower(trim($dateValue)) === 'now'
                                ? time()
                                : strtotime($dateValue ?: 'now');
                            if ($ts === false) {
                                $ts = time();
                            }
                            $formattedValue = date($parts[$i], $ts);
                            // prevent switch from re-processing this token
                            $parts[$i] = '_skip_';
                        }

                        // Handle 'rom' generically (for y/m/d) and skip switch below
                        if (strtolower($parts[$i]) === 'rom') {
                            $toRoman = static function (int $num): string {
                                if ($num <= 0)
                                    return '0';
                                $map = [
                                    1000 => 'M',
                                    900 => 'CM',
                                    500 => 'D',
                                    400 => 'CD',
                                    100 => 'C',
                                    90 => 'XC',
                                    50 => 'L',
                                    40 => 'XL',
                                    10 => 'X',
                                    9 => 'IX',
                                    5 => 'V',
                                    4 => 'IV',
                                    1 => 'I',
                                ];
                                $res = '';
                                foreach ($map as $val => $sym) {
                                    while ($num >= $val) {
                                        $res .= $sym;
                                        $num -= $val;
                                    }
                                }
                                return $res;
                            };

                            if (isset($formattedValue) && is_scalar($formattedValue) && ctype_digit((string) $formattedValue)) {
                                // Convert already-selected numeric (y/m/d) to Roman
                                $formattedValue = $toRoman((int) $formattedValue);
                            } else {
                                // Fallback: use month number from timestamp
                                $ts = is_string($dateValue) && strtolower(trim($dateValue)) === 'now'
                                    ? time()
                                    : strtotime($dateValue ?: 'now');
                                if ($ts === false) {
                                    $ts = time();
                                }
                                $num = (int) date('n', $ts);
                                $formattedValue = $toRoman($num);
                            }

                            // prevent switch from re-processing this token
                            $parts[$i] = '_skip_';
                        }

                        // - "rom" converts the month to Roman numerals
                        // Also support "now" as date value fallback
                        $timestamp = null;
                        if (is_string($dateValue) && strtolower(trim($dateValue)) === 'now') {
                            $timestamp = time();
                        } else {
                            $timestamp = strtotime($dateValue ?: 'now');
                            if ($timestamp === false) {
                                $timestamp = time();
                            }
                        }
                    }
                    $resultGencode .= $formattedValue . $value->MGECD_DESC;

                    if ($isSaved === true) {
                        $value->MGECD_VALUE = $formattedValue;
                        $value->save();
                    }
                } elseif ($parts[0] === 'INT' && count($parts) > 1) {
                    $intValue = intval($value->MGECD_VALUE);

                    if (str_contains($parts[1], 'STRPAD')) {
                        $splitsByComma = explode(',', $parts[1]);
                        $padChar = $splitsByComma[1] ?? '0';
                        $padLength = intval($splitsByComma[2] ?? 4);
                        $formattedValue = str_pad($intValue, $padLength, $padChar, STR_PAD_LEFT);
                    } else {
                        $formattedValue = $intValue;
                    }
                    $resultGencode .= $formattedValue . $value->MGECD_DESC;
                } else {
                    $resultGencode .= $value->MGECD_VALUE . $value->MGECD_DESC;
                }
            } else {
                $resultGencode .= $value->MGECD_VALUE . $value->MGECD_DESC;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $resultGencode
        ]);
    }
}
