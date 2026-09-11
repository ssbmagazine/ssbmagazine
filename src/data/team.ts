import type { Lang } from "../types";

export type Person = {
  id: string;
  name: { te: string; en: string };
  role: { te: string; en: string };
  bio?: { te: string; en: string };
  photo?: string;
};

export type TeamSection = {
  id: "editorial" | "publishing" | "printing";
  people: Person[];
};

export const teamSections: TeamSection[] = [
  {
    id: "editorial",
    people: [
      {
        id: "lavanya",
        name: {
          te: "డా।। ఎమ్. లావణ్య సరస్వతి",
          en: "Dr. M. Lavanya Saraswathi",
        },
        role: {
          te: "సంపాదకురాలు",
          en: "Editor",
        },
      },
      {
        id: "madhuri",
        name: {
          te: "శ్రీమతి యు. మాధురి",
          en: "Smt. U. Madhuri",
        },
        role: {
          te: "సహ సంపాదకురాలు",
          en: "Associate Editor",
        },
      },
      {
        id: "supraja",
        name: {
          te: "శ్రీమతి ఎస్. సుప్రజ",
          en: "Smt. S. Supraja",
        },
        role: {
          te: "సహాయ సంపాదకురాలు",
          en: "Assistant Editor",
        },
      },
    ],
  },
  {
    id: "publishing",
    people: [
      {
        id: "tsn-rao",
        name: {
          te: "శ్రీ టి. ఎస్. ఎన్. రావు",
          en: "Sri T. S. N. Rao",
        },
        role: {
          te: "ప్రచురణ",
          en: "Publishing",
        },
      },
      {
        id: "ganga",
        name: {
          te: "శ్రీమతి గంగ పిడతల",
          en: "Smt. Ganga Pidatala",
        },
        role: {
          te: "జాతీయ విద్యా సమన్వయకర్త",
          en: "National Education Coordinator",
        },
      },
    ],
  },
  {
    id: "printing",
    people: [
      {
        id: "sree-vani",
        name: {
          te: "శ్రీ వాణి ఆఫ్సెట్ ప్రింటర్స్",
          en: "Sree Vani Offset Printers",
        },
        role: {
          te: "ముద్రణ",
          en: "Printing",
        },
      },
    ],
  },
];

export function personName(person: Person, lang: Lang) {
  return person.name[lang];
}

export function personRole(person: Person, lang: Lang) {
  return person.role[lang];
}

export function personSecondaryName(person: Person, lang: Lang) {
  return person.name[lang === "te" ? "en" : "te"];
}
