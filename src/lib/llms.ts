/**
 * Plain-text / Markdown renditions of the site for LLM crawlers (llmstxt.org).
 * Built from the same data modules the page renders, so they cannot drift from it.
 */
import { COPY, CONTACT, FAQS, FOUNDERS, PROCESS, SERVICES, SITE_NAME, SITE_URL, STATS, WHY } from "./site";
import { JOBS } from "./careers";

const summary =
  "Hey We Market is a full service digital marketing agency in Bhopal, Madhya Pradesh. It helps businesses grow through strategy led social media management, paid advertising, content creation, SEO and AI search visibility, branding, and website optimization.";

const stat = (label: string) => {
  const s = STATS.find((x) => x.label === label);
  return s ? `${s.target}${s.suffix}` : "";
};

function keyFacts(): string[] {
  return [
    `- Name: ${SITE_NAME} (written "hey we market!" in its logo)`,
    `- Location: ${CONTACT.addressLine}, India`,
    "- Serves: businesses across India, through both in person and remote collaboration",
    `- Services: ${SERVICES.map((s) => s.title).join("; ")}`,
    `- Process: ${PROCESS.map((p) => p.title).join(" → ")}`,
    `- Founders: ${FOUNDERS.map((f) => `${f.name} (${f.jobTitle})`).join("; ")}`,
    `- Parent company: ${CONTACT.parent.name} (${CONTACT.parent.url})`,
    `- Track record as stated on the website: ${stat("Brands Worked With")} brands, ${stat("Projects Delivered")} projects delivered, ${stat("Content Views")} content views`,
    "- Approach: strategy first, execution second; honest reporting and long term strategy over vanity metrics",
    `- Contact: ${CONTACT.email} · ${CONTACT.phoneDisplay} · WhatsApp ${CONTACT.whatsappUrl}`,
    `- Instagram: ${CONTACT.instagram}`,
  ];
}

/** /llms.txt — concise index. */
export function llmsTxt(): string {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${summary}`,
    "",
    "## Key facts",
    ...keyFacts(),
    "",
    "## Pages",
    `- [Home](${SITE_URL}/): agency overview, services, work, process, FAQ and contact details`,
    `- [Careers](${SITE_URL}/careers): open roles and internships, with an online application form`,
    "",
    "## Services",
    ...SERVICES.map((s) => `- **${s.title}**: ${s.body}`),
    "",
    "## Optional",
    `- [Full site content in one file](${SITE_URL}/llms-full.txt): all copy, FAQ, process and contact details as Markdown`,
    "",
  ].join("\n");
}

/** /llms-full.txt — everything on the site, as Markdown. */
export function llmsFullTxt(): string {
  return [
    `# ${SITE_NAME} — full site content`,
    "",
    `> ${summary}`,
    "",
    `Source: ${SITE_URL}/ · Language: English (India)`,
    "",
    "## Key facts",
    ...keyFacts(),
    "",
    `## ${COPY.about.title}`,
    COPY.about.p1,
    "",
    COPY.about.p2,
    "",
    `### ${COPY.about.cardTitle}`,
    COPY.about.cardBody,
    "",
    `## ${COPY.vision.title}`,
    COPY.vision.p1,
    "",
    COPY.vision.p2,
    "",
    `### ${COPY.vision.headedTitle}`,
    COPY.vision.p3,
    "",
    `## ${COPY.promise.title}`,
    COPY.promise.body,
    "",
    "## Founders",
    ...FOUNDERS.flatMap((f) => [`### ${f.name} — ${f.jobTitle}`, f.bio, ""]),
    "## Digital marketing services",
    ...SERVICES.flatMap((s) => [`### ${s.idx}. ${s.title}`, s.body, ""]),
    "## Why businesses choose Hey We Market",
    ...WHY.map((w) => `- **${w.title}**: ${w.body}`),
    "",
    "## Process: simple process, powerful results",
    ...PROCESS.map((p) => `${Number(p.n)}. **${p.title}**: ${p.body}`),
    "",
    "## Frequently asked questions",
    ...FAQS.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Careers",
    `Hey We Market is hiring across design, social media, content and marketing. Apply at ${SITE_URL}/careers.`,
    ...JOBS.map((j) => `- **${j.title}** (${j.employment}; ${j.experience}): ${j.description}`),
    "",
    "## Contact",
    `- Email: ${CONTACT.email}`,
    `- Phone: ${CONTACT.phoneDisplay}`,
    `- WhatsApp: ${CONTACT.whatsappUrl}`,
    `- Address: ${CONTACT.addressLine}`,
    "- Response time: within 24 hours",
    "- Currently accepting new projects",
    "",
  ].join("\n");
}
