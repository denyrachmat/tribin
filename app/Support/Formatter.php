<?php

namespace App\Support;

use DateTimeInterface;

/**
 * Date and money formatting for printouts.
 *
 * Reports used to render dates with `date('d M Y', strtotime($value))` guarded only
 * by `!empty($value)`, which produced junk on real data:
 *
 *   '0000-00-00 00:00:00'  ->  '30 Nov -0001'   (year zero)
 *   '1970-01-01'           ->  '01 Jan 1970'    (looks like a real date, is not)
 *   '-', ''                ->  fine, guarded
 *
 * A missing period must print as '-', never as a year. 1970-01-01 is treated as
 * "no date" too: no legitimate rental period in this system starts then, so anything
 * at or before that is a placeholder left by a form or an import.
 */
class Formatter
{
    /** The last instant that still counts as "no date here". */
    private const PLACEHOLDER_CUTOFF = '1970-01-02';

    /** Rendered in place of a date that is absent or unusable. */
    public const EMPTY_DATE = '-';

    /**
     * Format a stored date for print, or '-' when there is not a usable one.
     *
     * @param  mixed  $value  string/date from the database or a view
     * @param  string  $format  output format, PHP date() syntax
     */
    public static function date($value, string $format = 'd M Y'): string
    {
        $timestamp = self::timestamp($value);

        return $timestamp === null ? self::EMPTY_DATE : date($format, $timestamp);
    }

    /**
     * The timestamp for a stored date, or null when it should print as '-'.
     */
    public static function timestamp($value): ?int
    {
        if ($value instanceof DateTimeInterface) {
            $stamp = $value->getTimestamp();
        } else {
            $raw = trim((string) $value);

            if ($raw === '' || $raw === '-') {
                return null;
            }

            if (str_starts_with($raw, '0000-00-00')) {
                return null;
            }

            // Database date columns use YYYY-MM-DD. Requiring that shape rejects
            // strings strtotime would otherwise read as something else entirely -
            // "0000" becomes midnight today, for instance.
            if (! preg_match('/^\d{4}-\d{2}-\d{2}/', $raw)) {
                return null;
            }

            $stamp = strtotime($raw);

            if ($stamp === false) {
                return null;
            }
        }

        // Anything up to the epoch placeholder is "no date": a period that began
        // at or before 1 Jan 1970 is a leftover default, not a real rental.
        if ($stamp < (int) strtotime(self::PLACEHOLDER_CUTOFF)) {
            return null;
        }

        return $stamp;
    }

    /**
     * Whether a value carries a printable date, for @if checks in templates.
     */
    public static function hasDate($value): bool
    {
        return self::timestamp($value) !== null;
    }
}
