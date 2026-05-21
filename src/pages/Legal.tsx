import { Link } from "react-router-dom";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";

type Section = { heading: string; body: (string | string[])[] };

const COMPANY = {
  name: "P101 Limited",
  product: "DcernX",
  jurisdiction: "England and Wales",
  number: "17063831",
  contact: "hudson@p101limited.com",
};

const LAST_UPDATED = "20 May 2026";

const privacySections: Section[] = [
  {
    heading: "1. About this notice",
    body: [
      `${COMPANY.name} (“we”, “us”, “our”), a company registered in ${COMPANY.jurisdiction} under company number ${COMPANY.number}, operates the ${COMPANY.product} platform (the “Service”). This Privacy Policy explains how we handle information when our customers and their authorised users access the Service.`,
      `${COMPANY.product} is a business-to-business workspace used by investment teams. We do not market the Service to consumers, and we do not knowingly process the personal data of children.`,
    ],
  },
  {
    heading: "2. Our role under data protection law",
    body: [
      `For the limited operational data we collect directly from authorised users (such as account credentials and session logs), we act as a data controller under the UK GDPR and EU GDPR.`,
      `For all content that our customers upload, create, or process inside their workspace — including deal pipelines, documents, communications, evaluations, founder information and any personal data contained therein (collectively, “Customer Data”) — we act solely as a data processor on behalf of our customer. The customer is the controller and determines the purposes and means of processing.`,
    ],
  },
  {
    heading: "3. Personal data we do not collect",
    body: [
      `We do not collect, sell, or monetise personal data for advertising. We do not build behavioural profiles of individuals, and we do not use Customer Data to train third-party AI models.`,
      `We do not require, request, or knowingly process special-category data (such as health, biometric, or political data) as part of the Service.`,
    ],
  },
  {
    heading: "4. Information we collect to operate the Service",
    body: [
      `To provide and secure the Service, we process a limited set of information:`,
      [
        "Account information: name, business email address, organisation and role provided at sign-up.",
        "Authentication data: encrypted credentials, OAuth identifiers (e.g. Google), session tokens.",
        "Usage and diagnostic data: workspace identifiers, IP address, device and browser type, timestamps, feature interactions and error logs — used for security, abuse prevention and service reliability.",
        "Billing information: where applicable, handled by our payment provider; we do not store full card details.",
        "Support correspondence: messages you send to our team and any attachments you provide.",
      ],
    ],
  },
  {
    heading: "5. How we use this information",
    body: [
      `We use the information described above to: (a) provide, maintain and improve the Service; (b) authenticate users and enforce access controls; (c) detect, investigate and prevent fraud, abuse and security incidents; (d) provide customer support; (e) send essential service communications; and (f) comply with our legal and regulatory obligations.`,
      `Our lawful bases under UK and EU GDPR include performance of a contract, our legitimate interests in operating and securing the Service, compliance with legal obligations, and — where required — your consent.`,
    ],
  },
  {
    heading: "6. Customer Data",
    body: [
      `Customer Data is processed strictly on the documented instructions of the customer, as set out in our Terms of Service and Data Processing Addendum. We do not access Customer Data except where necessary to provide, support or secure the Service, or where required by law.`,
      `Each customer workspace is logically isolated. Access to Customer Data is restricted by role-based permissions defined by the customer, with all access events recorded in an immutable audit log.`,
    ],
  },
  {
    heading: "7. AI processing",
    body: [
      `Where customers use AI features within the Service, prompts and the relevant Customer Data are sent to our sub-processors for inference. Customer Data submitted to AI features is not used to train foundation models, and outputs are returned only to the originating workspace.`,
    ],
  },
  {
    heading: "8. Sharing and sub-processors",
    body: [
      `We share information only with vetted sub-processors that support hosting, storage, authentication, analytics, AI inference, email delivery and payments. A current list of sub-processors is available on request and is maintained in our DPA. All sub-processors are bound by written agreements with confidentiality, security and data-protection obligations no less protective than ours.`,
      `We may disclose information where required by law, court order, or to protect the rights, property or safety of ${COMPANY.name}, our customers or others.`,
    ],
  },
  {
    heading: "9. International transfers",
    body: [
      `Where personal data is transferred outside the UK or EEA, we rely on appropriate safeguards such as the UK International Data Transfer Agreement, the UK Addendum to the EU Standard Contractual Clauses, or the EU Standard Contractual Clauses, together with supplementary measures where required.`,
    ],
  },
  {
    heading: "10. Retention",
    body: [
      `Account and operational data is retained for as long as the customer relationship is active and for a reasonable period thereafter to meet legal, accounting and security requirements. Customer Data is retained for the duration set by the customer and deleted or returned in accordance with the Terms of Service and DPA at the end of the agreement.`,
    ],
  },
  {
    heading: "11. Security",
    body: [
      `We maintain technical and organisational measures designed to protect information, including encryption in transit and at rest, tenant isolation, role-based access controls, least-privilege principles, secure software-development practices, vulnerability management and continuous monitoring. Our security programme is aligned with ISO 27001 and SOC 2 principles.`,
    ],
  },
  {
    heading: "12. Your rights",
    body: [
      `Under UK and EU GDPR you may have rights of access, rectification, erasure, restriction, portability and objection in respect of personal data we hold about you as a controller. Where the data forms part of Customer Data, please direct your request to the relevant customer, who is the controller; we will support them in responding.`,
      `You may exercise your rights, or raise any concern, by contacting us at ${COMPANY.contact}. You also have the right to lodge a complaint with a supervisory authority, including the UK Information Commissioner’s Office (ICO).`,
    ],
  },
  {
    heading: "13. Changes to this policy",
    body: [
      `We may update this Privacy Policy from time to time. Material changes will be communicated through the Service or by email. The “Last updated” date below reflects the latest revision.`,
    ],
  },
  {
    heading: "14. Contact",
    body: [
      `${COMPANY.name}, registered in ${COMPANY.jurisdiction}, company number ${COMPANY.number}. For privacy enquiries, contact ${COMPANY.contact}.`,
    ],
  },
];

const termsSections: Section[] = [
  {
    heading: "1. Agreement",
    body: [
      `These Terms of Service (“Terms”) govern access to and use of the ${COMPANY.product} platform, websites, APIs and related services (the “Service”) provided by ${COMPANY.name}, a company registered in ${COMPANY.jurisdiction} under company number ${COMPANY.number} (“we”, “us”, “our”).`,
      `By signing up, accessing or using the Service, you agree to these Terms on behalf of yourself and, where applicable, the organisation you represent (“Customer”). If you do not agree, do not use the Service.`,
    ],
  },
  {
    heading: "2. The Service",
    body: [
      `${COMPANY.product} is a software-as-a-service platform for private investment teams to manage sourcing, diligence, communications, evaluations and decision records. We may update, enhance, or modify features of the Service from time to time; we will not materially degrade core functionality during an active subscription term.`,
    ],
  },
  {
    heading: "3. Accounts and access",
    body: [
      `The Customer is responsible for: (a) provisioning and de-provisioning its authorised users; (b) ensuring the confidentiality of credentials; (c) all activity that occurs under its workspace; and (d) ensuring that authorised users comply with these Terms.`,
      `We may suspend access where we reasonably believe there is a security risk, a breach of these Terms, or non-payment.`,
    ],
  },
  {
    heading: "4. Customer Data and licence",
    body: [
      `As between the parties, the Customer retains all rights, title and interest in Customer Data. The Customer grants us a limited, worldwide, non-exclusive licence to host, copy, transmit, display and process Customer Data solely to provide, secure and support the Service in accordance with these Terms and our Data Processing Addendum.`,
      `The Customer represents and warrants that it has all necessary rights, consents and lawful bases to upload Customer Data to the Service and to permit our processing as set out herein.`,
    ],
  },
  {
    heading: "5. Acceptable use",
    body: [
      `The Customer and its users must not: (a) violate any law or third-party right; (b) upload malicious code or attempt to compromise the Service; (c) reverse engineer, decompile, or scrape the Service except as permitted by law; (d) use the Service to build a competing product; (e) misuse AI features to generate unlawful, defamatory or infringing content; or (f) share access credentials beyond authorised users.`,
    ],
  },
  {
    heading: "6. Fees and payment",
    body: [
      `Where applicable, fees, billing cycle and payment terms are set out in the relevant order form or subscription plan. Fees are exclusive of taxes, which the Customer is responsible for paying. Invoices are due within 30 days of issuance unless otherwise agreed. Late payments may incur statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998.`,
    ],
  },
  {
    heading: "7. Term and termination",
    body: [
      `Subscriptions continue for the term stated on the order form and renew automatically unless cancelled before renewal. Either party may terminate for material breach not cured within 30 days of written notice, or immediately on the other party’s insolvency.`,
      `On termination, the Customer’s right to access the Service ceases. We will make Customer Data available for export for 30 days after termination, after which we will delete or anonymise Customer Data in accordance with our retention practices, except where retention is required by law.`,
    ],
  },
  {
    heading: "8. Confidentiality",
    body: [
      `Each party will protect the other’s confidential information with at least the same degree of care it uses to protect its own (and no less than a reasonable standard), and will use it only to perform under these Terms.`,
    ],
  },
  {
    heading: "9. Intellectual property",
    body: [
      `We and our licensors retain all rights, title and interest in and to the Service, including all software, models, designs, documentation, and improvements. No rights are granted other than those expressly set out in these Terms. Feedback you provide may be used by us without restriction or obligation.`,
    ],
  },
  {
    heading: "10. Warranties and disclaimers",
    body: [
      `We warrant that we will provide the Service with reasonable skill and care. Except as expressly stated, the Service is provided “as is” and we disclaim, to the maximum extent permitted by law, all other warranties, including merchantability, fitness for a particular purpose and non-infringement.`,
      `${COMPANY.product} supports investment workflows but does not provide investment, legal, tax, or financial advice. AI-generated outputs may be incomplete or inaccurate and must be independently reviewed before being relied upon.`,
    ],
  },
  {
    heading: "11. Limitation of liability",
    body: [
      `Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be limited by law. Subject to the foregoing, neither party will be liable for indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, goodwill or data. Each party’s aggregate liability arising under or in connection with these Terms will not exceed the fees paid by the Customer to us in the 12 months preceding the event giving rise to the claim.`,
    ],
  },
  {
    heading: "12. Indemnification",
    body: [
      `The Customer will defend and indemnify us against third-party claims arising from Customer Data or its breach of Section 5 (Acceptable use). We will defend and indemnify the Customer against third-party claims that the Service, as provided by us and used in accordance with these Terms, infringes such third party’s intellectual property rights.`,
    ],
  },
  {
    heading: "13. Data protection",
    body: [
      `The parties will comply with applicable data-protection laws, including the UK GDPR and EU GDPR. Our Data Processing Addendum forms part of these Terms and governs our processing of personal data within Customer Data.`,
    ],
  },
  {
    heading: "14. Force majeure",
    body: [
      `Neither party will be liable for delays or failures caused by events beyond its reasonable control, including acts of God, war, terrorism, civil unrest, pandemic, or failures of the public internet or third-party infrastructure.`,
    ],
  },
  {
    heading: "15. Governing law and jurisdiction",
    body: [
      `These Terms are governed by the laws of England and Wales. The parties submit to the exclusive jurisdiction of the courts of England and Wales, save that we may seek injunctive relief in any competent court to protect our intellectual property or confidential information.`,
    ],
  },
  {
    heading: "16. Changes",
    body: [
      `We may update these Terms from time to time. Material changes will be notified through the Service or by email and will take effect on the date stated in the notice. Continued use after the effective date constitutes acceptance.`,
    ],
  },
  {
    heading: "17. Contact",
    body: [
      `${COMPANY.name}, registered in ${COMPANY.jurisdiction}, company number ${COMPANY.number}. Questions about these Terms can be sent to ${COMPANY.contact}.`,
    ],
  },
];

const fairUseSections: Section[] = [
  {
    heading: "1. Purpose of this policy",
    body: [
      `This Fair Use Policy supplements our Terms of Service and governs how customers, evaluators and trial users may use the ${COMPANY.product} platform, including AI-assisted analyses, document ingestion, integrations and any free trial entitlements. It is designed to keep the Service available, performant and safe for all users and to protect ${COMPANY.name}, its customers and third parties.`,
    ],
  },
  {
    heading: "2. Free analysis entitlement",
    body: [
      `The free AI-assisted primary analysis offered at /ai-analysis/try is limited to one (1) successful analysis run per user, per organisation and per verified work email. We may, at our discretion, count multiple sign-ups originating from the same individual, household, organisation, IP range or payment instrument as a single user.`,
      `Additional analysis runs beyond the free entitlement require a paid plan or the purchase of additional inference tokens, which are consumed against the customer's active usage plan. Token balances are non-transferable, non-refundable and expire in line with the customer's subscription term unless otherwise stated on the order form.`,
    ],
  },
  {
    heading: "3. Inference environment and data handling",
    body: [
      `Free analyses are produced using a gatekept public inference model operated by our sub-processors. While we apply reasonable safeguards, inputs submitted in the free tier should be treated as suitable for a shared inference environment. You are solely responsible for the materials you submit on the free tier, for ensuring you have the rights to share them, and for redacting any confidential, regulated, personal or special-category data prior to submission.`,
      `Paid plans are provisioned on private inference with advanced data-privacy guardrails, including tenant isolation, encryption in transit and at rest, no-training contractual commitments with model providers, configurable data-residency, and audit logging. Specific guarantees applicable to your plan are set out in your order form and Data Processing Addendum.`,
      `Across both tiers, ${COMPANY.name} does not use Customer Data to train foundation models and does not sell Customer Data.`,
    ],
  },
  {
    heading: "4. Acceptable use of AI features",
    body: [
      `You must not use the Service, including any AI analyses, to: (a) submit content you do not have the right to process; (b) generate or distribute unlawful, defamatory, harassing, deceptive, infringing or sexually explicit material; (c) produce regulated investment, legal, tax, medical or financial advice for onward distribution as if it were professional advice; (d) make solely automated decisions producing legal or similarly significant effects on individuals without appropriate human review; (e) attempt to reverse-engineer, extract weights from, or replicate the underlying models; or (f) submit prompts engineered to bypass safety, security or rate-limit controls.`,
      `Outputs are probabilistic and may be incomplete, outdated or inaccurate. You must independently verify any output before relying on it for an investment, compliance or other material decision.`,
    ],
  },
  {
    heading: "5. Rate limits, volumes and abusive patterns",
    body: [
      `We apply rate limits, per-user concurrency caps and per-plan monthly volume limits to protect Service stability. These limits may be adjusted from time to time and are visible in your workspace where applicable.`,
      `Behaviour we treat as abusive includes, without limitation: (a) automated, scripted or bulk submissions outside published APIs; (b) credential sharing across users or organisations; (c) circumventing the free-tier entitlement through disposable emails, alternate identities or coordinated sign-ups; (d) using the Service to scrape, mirror or rebuild a competing dataset or product; (e) submitting content designed to overload, destabilise or fingerprint the inference layer; and (f) attempting to access another customer's workspace or data.`,
    ],
  },
  {
    heading: "6. Inputs and prohibited content",
    body: [
      `You must not submit to the Service: (a) malware, exploits or actively malicious payloads; (b) export-controlled or sanctioned-party data in breach of applicable law; (c) personal data of children or special-category personal data unless expressly permitted by a written agreement; (d) credentials, secrets or payment-card data; or (e) content obtained in violation of a third party's terms, confidentiality or intellectual-property rights.`,
    ],
  },
  {
    heading: "7. Enforcement",
    body: [
      `Where we reasonably believe this Fair Use Policy has been breached, we may, with or without notice and proportionate to the breach: (a) throttle or suspend access; (b) revoke free-tier entitlements; (c) invalidate cached outputs; (d) require migration to a paid plan; (e) terminate the account under the Terms of Service; and (f) cooperate with law enforcement or regulators where required.`,
      `We will, where reasonable and lawful, contact the customer administrator before taking material action and provide an opportunity to remediate.`,
    ],
  },
  {
    heading: "8. No professional advice; investor responsibility",
    body: [
      `${COMPANY.product} supports investment workflows. Outputs are decision-support artefacts, not investment, legal, tax, regulatory or financial advice. The customer and its authorised users remain solely responsible for any investment, diligence, compliance or operational decision taken on the basis of, or informed by, the Service.`,
    ],
  },
  {
    heading: "9. Changes",
    body: [
      `We may update this Fair Use Policy from time to time. Material changes will be communicated through the Service or by email. Continued use of the Service after the effective date constitutes acceptance of the updated policy.`,
    ],
  },
  {
    heading: "10. Contact",
    body: [
      `Questions, reports of suspected abuse, or requests to raise limits can be sent to ${COMPANY.contact}.`,
    ],
  },
];

function LegalShell({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <MarketingThemeToggle />
            <Link to="/" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors h-8 px-3 inline-flex items-center">
              Back to home
            </Link>
          </div>
        </div>
      </nav>

      <main className="px-6 pt-16 pb-24">
        <article className="mx-auto max-w-[760px]">
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">{eyebrow}</p>
          <h1 className="text-[clamp(2rem,3.5vw,2.75rem)] font-[500] tracking-[-0.035em] leading-[1.1] text-foreground">
            {title}
          </h1>
          <p className="mt-6 text-[15px] text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          <p className="mt-8 text-[15px] leading-[1.7] text-foreground/80">{intro}</p>

          <div className="mt-14 space-y-12">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-[18px] font-medium tracking-[-0.01em] text-foreground mb-4">{s.heading}</h2>
                <div className="space-y-4">
                  {s.body.map((b, i) =>
                    Array.isArray(b) ? (
                      <ul key={i} className="list-disc pl-5 space-y-2 text-[14.5px] leading-[1.7] text-foreground/75">
                        {b.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} className="text-[14.5px] leading-[1.7] text-foreground/75">
                        {b}
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" aria-label="DcernX home" className="-ml-0.5">
            <StackedLogo size={20} />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/fair-use" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Fair Use
            </Link>
            <span className="text-[12px] text-muted-foreground">
              © {new Date().getFullYear()} {COMPANY.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Privacy = () => (
  <>
    <Seo
      title="Privacy Policy | DcernX"
      description="How P101 Limited (DcernX) handles information across the platform. GDPR-compliant, minimal PII, customer data processed solely on behalf of our customers."
      path="/privacy"
    />
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`This policy explains how ${COMPANY.name}, the company behind ${COMPANY.product}, handles information across the Service. ${COMPANY.product} is built for private investment teams, and we have deliberately designed it to minimise the personal data we collect about you directly. Most data inside the Service is uploaded by our customers, who remain in control of it at all times.`}
      sections={privacySections}
    />
  </>
);

export const Terms = () => (
  <>
    <Seo
      title="Terms of Service | DcernX"
      description="The terms of service governing use of DcernX, operated by P101 Limited, registered in England and Wales (company no. 17063831)."
      path="/terms"
    />
    <LegalShell
      eyebrow="Legal"
      title="Terms of Service"
      intro={`These Terms set out the agreement between ${COMPANY.name} and the organisations and individuals who use ${COMPANY.product}. They cover how the Service is provided, the responsibilities of each party, and the legal framework that applies to our relationship.`}
      sections={termsSections}
    />
  </>
);

export const FairUse = () => (
  <>
    <Seo
      title="Fair Use Policy | DcernX"
      description="Fair use rules for DcernX, including the one-run free AI analysis entitlement, paid plan token usage, public vs private inference, and acceptable-use guardrails."
      path="/fair-use"
    />
    <LegalShell
      eyebrow="Legal"
      title="Fair Use Policy"
      intro={`This policy explains how ${COMPANY.product} may be used fairly and safely — including limits on the free AI analysis, how additional usage is purchased, and the inference environments and safeguards that apply to free and paid plans.`}
      sections={fairUseSections}
    />
  </>
);
