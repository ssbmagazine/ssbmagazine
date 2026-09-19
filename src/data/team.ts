import type { Lang } from "../types";

export type Localized = { te: string; en: string };

export type Person = {
  id: string;
  name: Localized;
  role: Localized;
  /** Extra line under the name — degrees, place, etc. No phone numbers. */
  detail?: Localized;
  bio?: Localized;
  photo?: string;
};

export type TeamSectionId = "editorial" | "publishing" | "convenors" | "printing";

export type TeamSection = {
  id: TeamSectionId;
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
        detail: {
          te: "ఎం.ఎ., ఎం.ఫిల్., పి హెచ్.డి.",
          en: "M.A., M.Phil., Ph.D.",
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
          te: "ప్రచురణకర్త & కరస్పాండెంట్",
          en: "Publisher & Correspondent",
        }
      },
    ],
  },
  {
    id: "convenors",
    people: [
      {
        id: "ganga",
        name: {
          te: "శ్రీమతి గంగ పిడతల",
          en: "Smt. Ganga Pidatala",
        },
        role: {
          te: "జాతీయ ఉప సమన్వయకర్త, విద్య విభాగం (మహిళలు)",
          en: "Joint National Coordinator, Education Wing (Ladies)",
        },
      },
      {
        id: "sri-lakshmi",
        name: {
          te: "శ్రీమతి కె. శ్రీలక్ష్మి",
          en: "Smt. K. Sri Lakshmi",
        },
        role: {
          te: "రాష్ట్ర సమన్వయకర్త, విద్యా విభాగం — తెలంగాణ",
          en: "State Coordinator, Education Wing — Telangana",
        },
      },
      {
        id: "harinath",
        name: {
          te: "శ్రీ ఎస్. హరినాథ్ రెడ్డి",
          en: "Sri S. Harinath Reddy",
        },
        role: {
          te: "రాష్ట్ర సమన్వయకర్త, విద్యా విభాగం — తెలంగాణ",
          en: "State Coordinator, Education Wing — Telangana",
        },

      },
      {
        id: "madhavi",
        name: {
          te: "శ్రీమతి ఆర్. మాధవి",
          en: "Smt. R. Madhavi",
        },
        role: {
          te: "రాష్ట్ర సమన్వయకర్త, విద్యా విభాగం — ఆంధ్రప్రదేశ్",
          en: "State Coordinator, Education Wing — Andhra Pradesh",
        },
      },
      {
        id: "madhusudan",
        name: {
          te: "శ్రీ టి. మధుసూదన్ రావు",
          en: "Sri T. Madhusudan Rao",
        },
        role: {
          te: "రాష్ట్ర సమన్వయకర్త, విద్యా విభాగం — ఆంధ్రప్రదేశ్",
          en: "State Coordinator, Education Wing — Andhra Pradesh",
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
          te: "శ్రీవాణి ఆఫ్‌సెట్ ప్రింటర్స్",
          en: "Sree Vani Offset Printers",
        },
        role: {
          te: "ముద్రణ",
          en: "Printed at",
        },
        detail: {
          te: "మచిలీపట్నం",
          en: "Machilipatnam",
        },
      },
    ],
  },
];

/** Public contact used on About — emails only, no phone numbers. */
export const magazineEmails = [
  "sathyasaibalavikas@gmail.com",
  "sathyasaibalavikas@yahoo.co.in",
] as const;

/** Press Registrar General of India certificate. */
export const registration = {
  number: "APTEL/2002/08813",
  registeredOn: {
    te: "17 జనవరి 2003",
    en: "17 January 2003",
  },
  owner: {
    te: "శ్రీ సత్యసాయి సేవా సంస్థ, హైదరాబాద్ — మహిళా విభాగం",
    en: "Mahila Vibhag of Sri Sathya Sai Seva Organisation of Hyderabad",
  },
  place: {
    te: "తెలంగాణ — హైదరాబాద్",
    en: "Telangana — Hyderabad",
  },
  certificate: "brand/prgi-certificate.png",
} as const;

export const subscription = {
  contactName: {
    te: "శ్రీమతి యు. మాధురి",
    en: "Smt. U. Madhuri",
  },
  contactRole: {
    te: "చందాదారుల సలహాదారు",
    en: "Subscribers Adviser",
  },
  /** WhatsApp only — no other phone numbers on the site. */
  whatsapp: "918919447683",
  whatsappDisplay: "+91 89194 47683",
  /** Preferred UPI handle for Scan & pay / app pay. */
  upiId: "30021971566@sbi",
  upiPayeeName: "Sathya Sai Balavikas",
  address: {
    te: "బేగంపేట, హైదరాబాద్ 500 016",
    en: "Begumpet, Hyderabad 500 016",
  },
  rates: [
    {
      id: "single",
      plan: { te: "ఒక సంచిక (భారతదేశం)", en: "Single copy (India)" },
      amount: { te: "₹20", en: "₹20" },
    },
    {
      id: "annual",
      plan: {
        te: "సంవత్సర చందా — భారతదేశం (12 సంచికలు)",
        en: "Annual — India (12 issues)",
      },
      amount: { te: "₹240", en: "₹240" },
    },
    {
      id: "foreign",
      plan: {
        te: "సంవత్సర చందా — విదేశాలు (12 సంచికలు)",
        en: "Annual — Overseas (12 issues)",
      },
      amount: { te: "₹2,000", en: "₹2,000" },
    },
  ],
  /** Choose exactly one of these to pay. */
  paymentMethods: [
    {
      id: "upi",
      method: { te: "UPI / స్కాన్ & పే", en: "UPI / Scan & pay" },
      how: {
        te: "Google Pay, PhonePe లేదా క్యూఆర్ — చెల్లింపు స్క్రీన్‌షాట్ పంపండి.",
        en: "Google Pay, PhonePe, or QR — send the payment screenshot.",
      },
    },
    {
      id: "neft",
      method: { te: "NEFT / ఆన్‌లైన్ బ్యాంకింగ్", en: "NEFT / online banking" },
      how: {
        te: "కింది బ్యాంకు ఖాతాకు బదిలీ చేసి రసీదు పంపండి.",
        en: "Transfer to the bank account below and send the receipt.",
      },
    },
    {
      id: "dd",
      method: { te: "డిమాండ్ డ్రాఫ్ట్", en: "Demand draft" },
      how: {
        te: "“సత్యసాయి బాలవికాస్” పేరుతో DD తీసి చిరునామాకు పంపండి.",
        en: "Draw a DD in favour of “Sathya Sai Balavikas” and post it to the address.",
      },
    },
    {
      id: "cheque",
      method: { te: "చెక్", en: "Cheque" },
      how: {
        te: "“సత్యసాయి బాలవికాస్” పేరుతో చెక్ రాసి పంపండి.",
        en: "Write a cheque in favour of “Sathya Sai Balavikas” and send it.",
      },
    },
    {
      id: "mo",
      method: { te: "మనీ ఆర్డర్", en: "Money order" },
      how: {
        te: "మనీ ఆర్డర్ ద్వారా చెల్లించి వివరాలు పంపండి.",
        en: "Pay by money order and send your details.",
      },
    },
  ],
  bank: {
    name: { te: "స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా", en: "State Bank of India" },
    branch: {
      te: "హైదరాబాద్ పబ్లిక్ స్కూల్ శాఖ",
      en: "Hyderabad Public School branch",
    },
    holder: { te: "సత్యసాయి బాలవికాస్", en: "Sathya Sai Balavikas" },
    account: "30021971566",
    ifsc: "SBIN0002728",
    micr: "50002046",
  },
  whatsappMessage: {
    te: `సాయిరామ్

నేను సత్యసాయి బాలవికాస్ చందా కోసం చెల్లించాను. చెల్లింపు స్క్రీన్‌షాట్ కింద జత చేస్తున్నాను

పేరు: 
చిరునామా:
ఫోన్:
చందా రకం (కొత్త / పునరుద్ధరణ): 
చెల్లింపు పద్ధతి (UPI / NEFT / DD / చెక్ / మనీ ఆర్డర్)
`,
    en: `Sairam

I have paid for a Sathya Sai Balavikas subscription. Payment screenshot is attached below

Name: 
Address:
Phone:
Subscription type (New / Renewal): 
Payment method (UPI / NEFT / DD / Cheque / Money order)
`,
  },
} as const;

export function subscriptionWhatsAppUrl(lang: Lang) {
  const text = encodeURIComponent(subscription.whatsappMessage[lang]);
  return `https://wa.me/${subscription.whatsapp}?text=${text}`;
}

/** Opens the phone’s UPI app (Google Pay / PhonePe / etc.) when supported. */
export function subscriptionUpiPayUrl() {
  const pa = encodeURIComponent(subscription.upiId);
  const pn = encodeURIComponent(subscription.upiPayeeName);
  return `upi://pay?pa=${pa}&pn=${pn}&cu=INR`;
}

export function personName(person: Person, lang: Lang) {
  return person.name[lang];
}

export function personRole(person: Person, lang: Lang) {
  return person.role[lang];
}

export function personSecondaryName(person: Person, lang: Lang) {
  return person.name[lang === "te" ? "en" : "te"];
}

export function personDetail(person: Person, lang: Lang) {
  return person.detail?.[lang] ?? null;
}

export function loc(text: Localized, lang: Lang) {
  return text[lang];
}
