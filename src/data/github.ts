// GitHub contributions for the journal cover: a copy of the calendar on my
// profile (signed in, so it counts private work too) as it stood on 18 November
// 2026. To refresh it, copy the calendar again.

export interface ContributionDay {
    date  : string;
    level : 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
    total  : number;
    period : string;
    days   : ContributionDay[];
}

// The week the calendar ends in starts on this Sunday
const LAST_WEEK = "2026-11-15";

// One line per week, oldest first, Sunday to Saturday: 0–4 for how much (none
// to most), "." for days outside the year shown
const WEEKS = [
    "0100000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000010",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0010000",
    "0000000",
    "0030000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0001000",
    "0142120",
    "0200000",
    "0000000",
    "0011200",
    "0100000",
    "0120000",
    "0000000",
    "0000200",
    "0000200",
    "0000000",
    "0000010",
    "0000000",
    "0000010",
    "0000000",
    "0100000",
    "0000011",
    "0113110",
    "0110110",
    "1230000",
    "0000010",
    "0003000",
    "0022000",
    "0020000",
    "0000000",
    "0003030",
    "0212040",
    "0400000",
    "0200000",
    "0000000",
    "0000000",
    "0000...",
];

const DAY = 86400000;

const days = WEEKS.flatMap((week, w) => week.split("").flatMap((cell, d): ContributionDay[] => {
    if (cell === ".") return [];
    const date = new Date(Date.parse(`${LAST_WEEK}T00:00:00Z`) - ((WEEKS.length - 1 - w) * 7 - d) * DAY);
    return [{ date: date.toISOString().slice(0, 10), level: Number(cell) as ContributionDay["level"] }];
}));

export const CONTRIBUTIONS: Contributions = { total: 220, period: "in the last year", days };
