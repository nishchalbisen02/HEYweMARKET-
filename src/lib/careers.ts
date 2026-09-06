/**
 * Careers domain: opportunity data, the application schema, and validation
 * shared by the client form and the /api/careers route handler.
 */

export type Job = {
  slug: string;
  title: string;
  employment: string;
  experience: string;
  description: string;
  skills: string[];
};

export const JOBS: Job[] = [
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    employment: "Internship / Full-Time",
    experience: "Fresher / Experienced",
    description:
      "We’re looking for a creative designer who can turn ideas into strong visual stories across digital, social media, campaigns and brand experiences.",
    skills: ["Photoshop", "Illustrator", "Figma", "Typography", "Branding", "Social Media Design"],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    employment: "Internship / Full-Time",
    experience: "Fresher / Experienced",
    description:
      "Help us build engaging social identities, campaigns and communities across digital platforms.",
    skills: [
      "Social Media Strategy",
      "Instagram",
      "Content Planning",
      "Campaign Management",
      "Analytics",
      "Trend Research",
    ],
  },
  {
    slug: "content-creator",
    title: "Content Creator",
    employment: "Internship / Full-Time",
    experience: "Fresher / Experienced",
    description:
      "Create content that people stop scrolling for — reels, scripts, campaigns, storytelling and creative concepts.",
    skills: [
      "Content Writing",
      "Reels",
      "Storytelling",
      "Script Writing",
      "Creative Thinking",
      "Social Media Trends",
    ],
  },
  {
    slug: "creative-marketing-intern",
    title: "Creative / Marketing Intern",
    employment: "Internship",
    experience: "Fresher",
    description:
      "A hands-on opportunity for ambitious students and freshers who want to learn marketing, content, design, social media and AI-driven workflows.",
    skills: [
      "Willingness to Learn",
      "Creativity",
      "Communication",
      "Basic Digital Skills",
      "AI Tools",
      "Teamwork",
    ],
  },
];

export const POSITIONS = JOBS.map((j) => j.title);
export const EMPLOYMENT_TYPES = ["Internship", "Full-Time"] as const;
export const EXPERIENCE_LEVELS = ["Fresher", "1–2 Years", "3+ Years"] as const;

export const VALUES = [
  {
    title: "Creative Freedom",
    body: "Your ideas lead. We give you the room, the tools and the trust to run with them.",
  },
  {
    title: "Learn & Grow",
    body: "Mentorship, real briefs and fast feedback loops — you level up on live work, not busywork.",
  },
  {
    title: "AI-First Culture",
    body: "We build with AI in the workflow, not as an afterthought. You’ll work the way the industry is heading.",
  },
  {
    title: "Real-World Impact",
    body: "Ship work that reaches real audiences for real brands — and see the numbers move.",
  },
];

/* ---- application schema ---- */

export const PORTFOLIO_FIELDS = [
  { name: "portfolioWebsite", label: "Portfolio Website" },
  { name: "behance", label: "Behance" },
  { name: "dribbble", label: "Dribbble" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "instagram", label: "Instagram" },
  { name: "otherPortfolio", label: "Other Portfolio Link" },
] as const;

export type ApplicationFields = {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  dob: string;
  position: string;
  employmentType: string;
  experience: string;
  education: string;
  skills: string;
  about: string;
  why: string;
  availability: string;
  portfolioWebsite: string;
  behance: string;
  dribbble: string;
  linkedin: string;
  instagram: string;
  otherPortfolio: string;
};

export const EMPTY_APPLICATION: ApplicationFields = {
  fullName: "",
  email: "",
  whatsapp: "",
  city: "",
  dob: "",
  position: "",
  employmentType: "",
  experience: "",
  education: "",
  skills: "",
  about: "",
  why: "",
  availability: "",
  portfolioWebsite: "",
  behance: "",
  dribbble: "",
  linkedin: "",
  instagram: "",
  otherPortfolio: "",
};

export const RESUME_ACCEPT = ".pdf,.doc,.docx";
export const RESUME_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const SAMPLES_ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp";
export const SAMPLES_MIME = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
export const SAMPLES_MAX_BYTES = 10 * 1024 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function humanFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Field-level validation shared by client and server. Returns `{}` when valid. */
export function validateApplication(f: Partial<ApplicationFields>): Partial<Record<keyof ApplicationFields, string>> {
  const e: Partial<Record<keyof ApplicationFields, string>> = {};
  const req = (k: keyof ApplicationFields, label: string) => {
    if (!String(f[k] ?? "").trim()) e[k] = `${label} is required.`;
  };

  req("fullName", "Full name");
  req("email", "Email address");
  req("whatsapp", "WhatsApp number");
  req("city", "City");
  req("position", "Position");
  req("employmentType", "Employment type");
  req("experience", "Experience");
  req("skills", "Skills");
  req("about", "About yourself");
  req("why", "This answer");

  if (f.email && !EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";

  if (f.whatsapp) {
    const digits = f.whatsapp.replace(/[^\d]/g, "");
    if (digits.length < 10 || digits.length > 15) e.whatsapp = "Enter a valid phone number with country/area code.";
  }

  if (f.position && !POSITIONS.includes(f.position)) e.position = "Choose a position from the list.";
  if (f.employmentType && !EMPLOYMENT_TYPES.includes(f.employmentType as (typeof EMPLOYMENT_TYPES)[number]))
    e.employmentType = "Choose an employment type.";
  if (f.experience && !EXPERIENCE_LEVELS.includes(f.experience as (typeof EXPERIENCE_LEVELS)[number]))
    e.experience = "Choose an experience level.";

  if (f.about && f.about.trim().length < 20) e.about = "Tell us a little more — at least a sentence or two.";
  if (f.why && f.why.trim().length < 20) e.why = "A one-liner won’t do it justice — give us a bit more.";

  return e;
}

/** Build the structured WhatsApp notification text from a validated application. */
export function buildWhatsappMessage(
  f: ApplicationFields,
  files: { resumeUrl?: string; resumeName?: string; samplesUrl?: string; samplesName?: string }
): string {
  const portfolio = PORTFOLIO_FIELDS.map(({ name, label }) => {
    const v = String(f[name] ?? "").trim();
    return v ? `${label}: ${v}` : null;
  })
    .filter(Boolean)
    .join("\n");

  const line = "━".repeat(18);
  return [
    line,
    "NEW CAREER APPLICATION",
    "HEY WE MARKET",
    line,
    "",
    "👤 PERSONAL DETAILS",
    "",
    `Name: ${f.fullName}`,
    `Email: ${f.email}`,
    `WhatsApp: ${f.whatsapp}`,
    `City: ${f.city}`,
    f.dob ? `Date of Birth: ${f.dob}` : null,
    "",
    "💼 APPLICATION",
    "",
    `Position: ${f.position}`,
    `Type: ${f.employmentType}`,
    `Experience: ${f.experience}`,
    f.education ? `Education: ${f.education}` : "Education: —",
    f.availability ? `Availability: ${f.availability}` : null,
    "",
    "🧠 SKILLS",
    "",
    f.skills,
    "",
    "📝 ABOUT",
    "",
    f.about,
    "",
    "🎯 WHY HEY WE MARKET?",
    "",
    f.why,
    "",
    "🔗 PORTFOLIO",
    "",
    portfolio || "—",
    "",
    "📎 RESUME",
    "",
    files.resumeUrl ?? (files.resumeName ? `Attached: ${files.resumeName}` : "—"),
    "",
    "📎 WORK SAMPLES",
    "",
    files.samplesUrl ?? (files.samplesName ? `Attached: ${files.samplesName}` : "—"),
    "",
    line,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
