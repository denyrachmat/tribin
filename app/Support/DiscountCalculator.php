<?php

namespace App\Support;

/**
 * Discount calculation.
 *
 * THE PIPELINE, in this order, per quotation line:
 *
 *   1. gross   = price x qty                        (untouched, existing behaviour)
 *   2. collect every discount that applies:
 *        - the item's CATEGORY discounts   (source CAT)
 *        - the CUSTOMER's discounts        (source CUST)
 *   3. order them by the sequence the user arranged (seq ascending, then source,
 *      then code, so the result is deterministic even with equal seq)
 *   4. apply them one at a time:
 *        PERCENT -> amount = running_base * pct / 100
 *        AMOUNT  -> amount = the fixed rupiah figure
 *      A discount in REPLACE mode clears everything applied before it, so one level
 *      can override the other rather than compound with it.
 *   5. round the TOTAL discount once, at the end, using the customer's rounding
 *      setting. Rounding per step would make "10% then 50rb" and "50rb then 10%"
 *      disagree, so it is done once, on the sum.
 *   6. net = gross - totalDiscount, floored at 0.
 *
 * Every figure stays in float until the single rounding step; all comparisons use a
 * small epsilon because 0.1 + 0.2 !== 0.3 in binary floating point.
 */
class DiscountCalculator
{
    public const MODE_STACK = 'STACK';

    public const MODE_REPLACE = 'REPLACE';

    public const ROUND_NEAREST = 'NEAREST';

    public const ROUND_DOWN = 'DOWN';

    public const ROUND_UP = 'UP';

    /** Anything smaller than this is treated as zero when comparing money. */
    private const EPSILON = 0.00001;

    /**
     * Calculate the discount for one line.
     *
     * @param  float   $gross         price x qty
     * @param  array   $discounts     each: ['code'=>, 'type'=>'PERCENT'|'AMOUNT',
     *                                     'value'=>float, 'src'=>'CAT'|'CUST',
     *                                     'mode'=>'STACK'|'REPLACE', 'seq'=>int]
     * @param  string  $roundMode     NEAREST | DOWN | UP
     * @param  int     $roundDp       decimal places to keep
     *
     * @return array{total: float, net: float, parts: array, order: array}
     */
    public static function forLine(
        float $gross,
        array $discounts,
        string $roundMode = self::ROUND_NEAREST,
        int $roundDp = 0
    ): array {
        $ordered = self::order($discounts);

        $parts = [];
        $runningBase = $gross;

        foreach ($ordered as $discount) {
            $mode = strtoupper((string) ($discount['mode'] ?? self::MODE_STACK));

            if ($mode === self::MODE_REPLACE && !empty($parts)) {
                // This level replaces what came before it, so scrap the earlier parts
                // and recalculate from the full gross.
                $parts = [];
                $runningBase = $gross;
            }

            $type = strtoupper((string) ($discount['type'] ?? 'PERCENT'));
            $value = (float) ($discount['value'] ?? 0);

            $amount = $type === 'PERCENT'
                ? $runningBase * $value / 100
                : $value;

            // A fixed amount can exceed what is left; clamp so a line never goes
            // negative mid-pipeline.
            if ($amount > $runningBase) {
                $amount = $runningBase;
            }
            if ($amount < 0) {
                $amount = 0.0;
            }

            $parts[] = [
                'code' => (string) ($discount['code'] ?? ''),
                'src' => (string) ($discount['src'] ?? ''),
                'type' => $type,
                'value' => $value,
                'base' => round($runningBase, 2),
                'amount' => round($amount, 2),
                'mode' => $mode,
            ];

            $runningBase -= $amount;

            if ($runningBase <= self::EPSILON) {
                $runningBase = 0.0;
                break;
            }
        }

        $rawTotal = array_sum(array_column($parts, 'amount'));
        $total = self::roundMoney($rawTotal, $roundMode, $roundDp);
        $net = $gross - $total;
        if ($net < 0) {
            $net = 0.0;
        }

        return [
            'total' => $total,
            'net' => $net,
            'parts' => $parts,
            'order' => array_map(fn ($p) => $p['code'] . '/' . $p['src'], $parts),
        ];
    }

    /**
     * Deterministic order: the user's sequence first, then source, then code, so two
     * discounts sharing a sequence still apply predictably.
     */
    public static function order(array $discounts): array
    {
        $ordered = array_values($discounts);

        usort($ordered, function ($a, $b) {
            $seqA = (int) ($a['seq'] ?? 0);
            $seqB = (int) ($b['seq'] ?? 0);

            if ($seqA !== $seqB) {
                return $seqA <=> $seqB;
            }

            $srcA = (string) ($a['src'] ?? '');
            $srcB = (string) ($b['src'] ?? '');

            if ($srcA !== $srcB) {
                return $srcA <=> $srcB;
            }

            return (string) ($a['code'] ?? '') <=> (string) ($b['code'] ?? '');
        });

        return $ordered;
    }

    /**
     * Round a money figure. The discount total is the only thing rounded: doing it
     * per step would make the result depend on the order of arithmetic rather than
     * the order the user chose.
     */
    public static function roundMoney(float $value, string $mode = self::ROUND_NEAREST, int $dp = 0): float
    {
        $dp = max(0, min(6, $dp));
        $factor = 10 ** $dp;
        $scaled = $value * $factor;

        $rounded = match (strtoupper($mode)) {
            self::ROUND_DOWN => floor($scaled + self::EPSILON),
            self::ROUND_UP => ceil($scaled - self::EPSILON),
            default => round($scaled),
        };

        return $rounded / $factor;
    }

    /**
     * How a customer's rounding preference is stored: null means "use the default".
     */
    public static function resolveRounding(?string $mode, ?int $dp): array
    {
        $mode = strtoupper((string) $mode);
        if (!in_array($mode, [self::ROUND_NEAREST, self::ROUND_DOWN, self::ROUND_UP], true)) {
            $mode = self::ROUND_NEAREST;
        }

        return [$mode, max(0, min(6, (int) ($dp ?? 0)))];
    }
}
