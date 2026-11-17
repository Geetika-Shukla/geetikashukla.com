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
    days  : ContributionDay[];
}

// The last year, day by day; null if it can't be fetched (the cover then goes without)
export const getContributions = async (): Promise<Contributions | null> => {
    try {
        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
            { next: { revalidate: 86400 } },
        );
        if (!response.ok) return null;
        const data = await response.json();
        if (!Array.isArray(data.contributions)) return null;
        return { total: data.total?.lastYear ?? 0, days: data.contributions };
    } catch {
        return null;
    }
};
