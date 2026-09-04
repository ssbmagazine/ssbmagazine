import catalog from "../data/issues.json";
import type { Issue, Lang } from "../types";

export const issues = catalog as Issue[];

export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}

export function issuePath(issue: Issue) {
  return `/archive/${issue.year}/${issue.slug}`;
}

export function issueTitle(issue: Issue, lang: Lang) {
  return issue.title[lang];
}

export function sortedIssues(list = issues) {
  return [...list].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const am = a.month ?? 99;
    const bm = b.month ?? 99;
    if (am !== bm) return bm - am;
    return b.slug.localeCompare(a.slug);
  });
}

export function latestIssue() {
  return sortedIssues()[0] ?? null;
}

export function findIssue(year: string, slug: string) {
  return issues.find((issue) => String(issue.year) === year && issue.slug === slug) ?? null;
}

export function issueNeighbors(issue: Issue) {
  const chronological = [...issues].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const am = a.month ?? 99;
    const bm = b.month ?? 99;
    if (am !== bm) return am - bm;
    return a.slug.localeCompare(b.slug);
  });
  const index = chronological.findIndex((item) => item.id === issue.id);
  return {
    prev: index > 0 ? chronological[index - 1] : null,
    next: index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : null,
  };
}

export function issuesForYear(year: number) {
  return [...issues]
    .filter((issue) => issue.year === year)
    .sort((a, b) => {
      const am = a.month ?? 99;
      const bm = b.month ?? 99;
      if (am !== bm) return am - bm;
      return a.slug.localeCompare(b.slug);
    });
}

export function yearsWithIssues() {
  return [...new Set(issues.map((issue) => issue.year))].sort((a, b) => b - a);
}

export function decadesWithIssues() {
  return [...new Set(yearsWithIssues().map((year) => Math.floor(year / 10) * 10))].sort(
    (a, b) => b - a,
  );
}

export function issuesByYear(decade: number | null) {
  const years = yearsWithIssues().filter((year) =>
    decade === null ? true : Math.floor(year / 10) * 10 === decade,
  );
  return years.map((year) => ({
    year,
    issues: issuesForYear(year),
  }));
}

export function lastPageKey(id: string) {
  return `ssb:lastPage:${id}`;
}
