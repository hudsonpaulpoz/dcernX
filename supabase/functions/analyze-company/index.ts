// Edge function: AI-powered primary analysis for prospective deals.
// Calls Lovable AI gateway (no API key required from caller) and returns
// structured markdown. CORS-enabled for the marketing site.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ANALYSIS_PROMPTS: Record<string, { title: string; instructions: string }> = {
  strategy: {
    title: "Strategy Analysis",
    instructions:
      "Assess the company's strategic positioning, value proposition, target market, go-to-market motion, defensibility/moat, and 18-month strategic priorities. Identify the 3 most material strategic risks and 3 strategic opportunities.",
  },
  competition: {
    title: "Competition Analysis",
    instructions:
      "Map the competitive landscape. Identify 4-7 direct and adjacent competitors with one-line positioning each. Compare differentiation, pricing posture and distribution. Highlight where the target wins, where it loses, and structural threats from incumbents or fast-followers.",
  },
  negative_media: {
    title: "Negative Media Analysis",
    instructions:
      "Surface plausible reputational, legal, ethical and adverse-news risk vectors that a diligence team should investigate. Provide a structured checklist (categories, search queries, jurisdictions). Be explicit that this is a research scaffold based on public reasoning, not a real-time scan.",
  },
  regulatory: {
    title: "Regulatory Analysis",
    instructions:
      "Identify the regulatory regimes most likely to apply by sector and geography (e.g. financial services, health, AI, data, consumer). Flag licensing, reporting and approval requirements, plus emerging regulation that could shift the operating model in the next 24 months.",
  },
  compliance: {
    title: "Compliance Analysis",
    instructions:
      "Assess the compliance posture the company likely needs to operate at scale: data protection (GDPR/UK GDPR/CCPA), security frameworks (SOC 2, ISO 27001), KYC/AML where relevant, employment and contractor compliance, IP hygiene, and third-party risk. Note evidence the diligence team should request.",
  },
  financial: {
    title: "Financial Analysis",
    instructions:
      "Reason about likely revenue model, unit economics, gross-margin profile, burn dynamics and capital efficiency for a company at this stage and in this sector. Provide the financial KPIs an investor should request, with benchmark ranges. State assumptions clearly.",
  },
  risk: {
    title: "Risk Report",
    instructions:
      "Produce a consolidated risk register across market, execution, team, technology, regulatory, financial and reputational categories. For each risk: brief description, likelihood (Low/Med/High), impact (Low/Med/High), and a mitigation/diligence question.",
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company, website, context, analyses } = await req.json();

    if (!company || typeof company !== "string") {
      return new Response(JSON.stringify({ error: "Company name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const selected: string[] = Array.isArray(analyses) && analyses.length
      ? analyses.filter((a: string) => a in ANALYSIS_PROMPTS)
      : Object.keys(ANALYSIS_PROMPTS);

    const sections = selected
      .map((key, i) => `### ${i + 1}. ${ANALYSIS_PROMPTS[key].title}\n${ANALYSIS_PROMPTS[key].instructions}`)
      .join("\n\n");

    const systemPrompt = `You are DcernX's primary analysis agent for private investment teams. You produce concise, evidence-aware diligence briefs. You reason carefully, state assumptions, and never fabricate specific numbers, citations, URLs, people or quotes. When public information is insufficient, say so and recommend evidence to request from the founder. Output well-formatted markdown with clear H3 section headings (### ...). Use short paragraphs and bulleted lists. Do not include a preamble or closing remarks.`;

    const userPrompt = `Run the following primary-analysis sections for this prospective investment.

Target company: ${company}${website ? `\nWebsite: ${website}` : ""}${context ? `\nAdditional context from the investor:\n${context}` : ""}

Produce ONLY the sections below, in order, each prefixed by a level-3 markdown heading exactly matching the section title. Within each section keep the prose tight, decision-useful, and skimmable.

${sections}`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI gateway not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "Analysis failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResponse.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("analyze-company error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
