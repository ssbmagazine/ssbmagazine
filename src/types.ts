export type Lang = "te" | "en";
export type Theme = "light" | "dark";

export type IssueType = "monthly" | "special";

export type Issue = {
  id: string;
  year: number;
  month: number | null;
  type: IssueType;
  slug: string;
  title: { te: string; en: string };
  pdf: string;
  cover: string;
  pageCount: number | null;
};
