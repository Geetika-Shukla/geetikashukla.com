// GitHub contributions for the journal cover, from a public mirror of the
// contribution calendar (no token needed), refreshed once a day

export const GITHUB_USER = "Geetika-Shukla";

export interface ContributionDay {
    date  : string;
    count : number;
    level : 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
    total : number;
    since : string;
    days  : ContributionDay[];
}

const DAY = 86400000;

// Every contribution since the account began (across all repositories), and
// the last year day by day for the grid; null if it can't be fetched (the
// cover then goes without)
export const getContributions = async (): Promise<Contributions | null> => {
    try {
        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=all`,
            { next: { revalidate: 86400 } },
        );
        if (!response.ok) return null;
        const data = await response.json();
        if (!Array.isArray(data.contributions) || !data.total) return null;

        const years = Object.entries(data.total as Record<string, number>);
        const total = years.reduce((sum, [, count]) => sum + count, 0);
        const since = years.map(([year]) => year).sort()[0];

        // The year up to today, oldest first (the full list runs year by year, to each year's end)
        const today = new Date().toISOString().slice(0, 10);
        const yearAgo = new Date(Date.now() - 364 * DAY).toISOString().slice(0, 10);
        const days = (data.contributions as ContributionDay[])
            .filter(({ date }) => date >= yearAgo && date <= today)
            .sort((a, b) => a.date.localeCompare(b.date));

        return { total, since, days };
    } catch {
        return null;
    }
};
