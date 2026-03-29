export interface SynthesisCandidate {
  id: string;
  name: string;
  title: string;
  sourcingType: string;
  baselineFit: number;
  scenarioRisk: number;
  aiConfidence: number;
  gains: string[];
  risks: string[];
  scenarioRiskRating: number;
  scenarioStrengths: string[];
  blindSpots: string[];
  idealPairing: { name: string; title: string; rationale: string };
  toxicPairing: { name: string; title: string; rationale: string };
  auditTrail: { claim: string; evidence: string; impact: string }[];
  strategicPlacementAdvice: string;
  missingData: string[];
  interviewProbes: string[];
}

export const mockCandidates: SynthesisCandidate[] = [
  {
    id: "1",
    name: "Dr. Katharina Voss",
    title: "SVP, Global Operations — Siemens AG",
    sourcingType: "External Hire – Cross-Industry",
    baselineFit: 87,
    scenarioRisk: 34,
    aiConfidence: 88,
    gains: [
      "Proven track record scaling operations across 14 markets with 23% cost reduction over 3 years",
      "Deep expertise in industrial digital transformation and IoT-driven manufacturing",
      "Strong board-level presence with documented shareholder communication wins",
      "Built and led a 2,400-person cross-functional org through a major restructuring",
    ],
    risks: [
      "No direct automotive OEM experience — learning curve on regulatory compliance (UNECE, Euro 7)",
      "Leadership style indexed heavily toward consensus — may slow decision velocity in crisis",
      "Limited exposure to union negotiation in the German automotive context (IG Metall dynamics)",
    ],
    scenarioRiskRating: 62,
    scenarioStrengths: [
      "Managed a €400M supply chain disruption at Siemens in 2022 — redirected sourcing within 6 weeks",
      "Existing relationships with tier-2 semiconductor suppliers in Southeast Asia",
    ],
    blindSpots: [
      "Has never managed a workforce reduction exceeding 500 FTEs — BMW's scenario projects 1,200+",
      "No documented experience with government subsidy negotiations critical to EV plant relocations",
    ],
    idealPairing: {
      name: "Marcus Thiel",
      title: "CFO, BMW Group",
      rationale: "Voss's operational boldness is balanced by Thiel's fiscal discipline. Together they create a complementary decision axis — she pushes for speed, he stress-tests financial exposure.",
    },
    toxicPairing: {
      name: "Dr. Stefan Kessler",
      title: "SVP, Legal & Compliance",
      rationale: "Both exhibit high-control leadership tendencies. Data suggests a 73% probability of decision gridlock on cross-functional compliance matters, particularly around ESG reporting mandates.",
    },
    auditTrail: [
      {
        claim: "Scaled operations across 14 international markets",
        evidence: "CV Section 3: Siemens Digital Industries, 2018–2023. Confirmed via annual report cross-reference.",
        impact: "Directly relevant to BMW's NEUE KLASSE global rollout requiring simultaneous market entry.",
      },
      {
        claim: "Achieved 23% cost reduction in 3-year period",
        evidence: "CV Section 3, bullet 2. Partially verifiable — Siemens 2022 annual report cites 'operational efficiency gains' but no specific percentage attributed to candidate.",
        impact: "If verified, demonstrates ability to execute cost mandates under Board pressure — critical for Scenario A.",
      },
      {
        claim: "Led 2,400-person cross-functional restructuring",
        evidence: "CV Section 4: Organizational Transformation Lead. No external verification found. Recommend board-level reference check.",
        impact: "Essential capability for managing the projected workforce transition in the EV pivot.",
      },
    ],
    strategicPlacementAdvice: "Dr. Voss is best positioned as a transformation-stage leader. Her optimal deployment window is during the first 18 months of the NEUE KLASSE operational rollout, where her cross-industry scaling expertise will have maximum impact. Consider pairing her appointment with a structured 90-day immersion in BMW's regulatory and union landscape to mitigate her primary blind spots. If the Board's priority shifts to steady-state optimization rather than transformation, her profile becomes significantly less advantageous.",
    missingData: [
      "No 360-degree leadership assessment on file — psychometric profile unavailable",
      "Compensation expectations and non-compete clause status from Siemens not disclosed",
      "No data on candidate's stance regarding relocation to Munich headquarters",
    ],
    interviewProbes: [
      "In our scenario, BMW faces a sudden 18% tariff on battery components from China. Walk us through your first 72 hours — who do you call, what do you cut, and what do you protect?",
      "Your CV shows consensus-driven leadership. Describe a situation where you had to override your team's recommendation and act unilaterally. What was the outcome and what did it cost you politically?",
      "If appointed, you would inherit a leadership team with two members who were themselves candidates for this role. How do you plan to neutralize resentment and establish authority within the first 90 days?",
    ],
  },
  {
    id: "2",
    name: "James Whitfield",
    title: "VP, Powertrain Strategy — General Motors",
    sourcingType: "External Hire – Competitor",
    baselineFit: 79,
    scenarioRisk: 51,
    aiConfidence: 74,
    gains: [
      "Direct automotive powertrain experience across ICE-to-EV transition programs",
      "Led GM's Ultium platform supplier negotiations — $2.1B portfolio",
      "Strong US-market regulatory knowledge (EPA, NHTSA frameworks)",
    ],
    risks: [
      "US-centric career — limited European market and regulatory experience",
      "No experience managing German works council dynamics",
      "GM's organizational culture differs significantly from BMW's consensus-driven governance",
      "Non-compete clause with GM may delay start by 6–9 months",
    ],
    scenarioRiskRating: 71,
    scenarioStrengths: [
      "Managed supplier diversification during the 2021 chip shortage — kept Ultium production at 89% capacity",
    ],
    blindSpots: [
      "No exposure to European EV subsidy frameworks (IPCEI, EU Battery Regulation)",
      "Has never operated within a dual-board governance structure (Vorstand/Aufsichtsrat)",
      "Limited experience with premium brand positioning — GM portfolio is mass-market focused",
    ],
    idealPairing: {
      name: "Dr. Anna Berger",
      title: "CHRO, BMW Group",
      rationale: "Berger's deep institutional knowledge of BMW culture would accelerate Whitfield's integration and mitigate cultural friction risk.",
    },
    toxicPairing: {
      name: "Dr. Katharina Voss",
      title: "SVP, Global Operations (if also hired)",
      rationale: "Two external hires in adjacent C-suite roles creates organizational instability. Historical data shows 61% failure rate for dual-external senior appointments within 18 months.",
    },
    auditTrail: [
      {
        claim: "Led $2.1B Ultium supplier negotiations",
        evidence: "CV Section 2. Partially verified via GM 2022 investor presentation referencing Ultium partnership framework.",
        impact: "Relevant to BMW's supplier consolidation strategy but scale difference (GM volume vs. BMW premium) needs validation.",
      },
      {
        claim: "Maintained 89% production capacity during chip shortage",
        evidence: "CV Section 2, bullet 4. No independent verification. GM's public reporting cited 'significant production impacts' during this period.",
        impact: "Claim appears inflated. Recommend direct verification with GM references before proceeding.",
      },
    ],
    missingData: [
      "Non-compete clause terms and enforceability in German jurisdiction not assessed",
      "No European work authorization status confirmed",
      "Compensation benchmark against BMW C-suite band not completed",
      "No leadership psychometric data available",
    ],
    interviewProbes: [
      "BMW operates within a co-determination framework with strong union representation. You have no experience with this model. How would you prepare for your first works council negotiation on headcount reductions?",
      "Your entire career has been in mass-market automotive. How do you reconcile the operational efficiency mindset of GM with BMW's premium brand DNA where margin comes from exclusivity, not volume?",
      "One of your claimed achievements — maintaining 89% capacity during the chip crisis — conflicts with GM's public reporting. Help us understand the discrepancy.",
    ],
  },
  {
    id: "3",
    name: "Dr. Florian Mayer",
    title: "VP, Corporate Strategy — BMW Group",
    sourcingType: "Internal Promotion",
    baselineFit: 82,
    scenarioRisk: 28,
    aiConfidence: 81,
    gains: [
      "12-year BMW tenure with deep institutional knowledge across strategy, M&A, and product planning",
      "Architected the NEUE KLASSE investment thesis — Board-approved €10B allocation",
      "Strong relationships across Vorstand and Aufsichtsrat — trusted internal voice",
      "Native understanding of co-determination and IG Metall dynamics",
    ],
    risks: [
      "Has never held a P&L-responsible operational role — strategy-only career track",
      "Perceived as 'too close' to current CEO — succession optics may face Aufsichtsrat resistance",
      "Limited external network in supplier ecosystem — relies on existing BMW procurement channels",
    ],
    scenarioRiskRating: 38,
    scenarioStrengths: [
      "Co-authored BMW's contingency playbook for supply chain disruption — knows the internal escalation protocols",
      "Personal relationships with key IG Metall representatives — can negotiate informally before formal proceedings",
    ],
    blindSpots: [
      "Has never managed a crisis in an operational capacity — all experience is advisory/strategic",
      "May default to internal BMW solutions when external disruption requires unconventional responses",
    ],
    idealPairing: {
      name: "Dr. Katharina Voss",
      title: "SVP, Global Operations (if hired externally)",
      rationale: "Mayer's institutional depth combined with Voss's operational execution creates a powerful internal-external hybrid leadership model.",
    },
    toxicPairing: {
      name: "Thomas Richter",
      title: "SVP, Product Line Management",
      rationale: "Both are strategy-oriented with overlapping influence zones. Data suggests 67% probability of territorial conflict over NEUE KLASSE program ownership.",
    },
    auditTrail: [
      {
        claim: "Architected NEUE KLASSE investment thesis",
        evidence: "Internal records confirm Mayer led the 2021–2022 strategy task force. Board minutes reference his presentation. Fully verified.",
        impact: "Demonstrates ability to drive Board-level decisions at scale — directly relevant to the mandate.",
      },
      {
        claim: "12-year tenure across strategy, M&A, and product planning",
        evidence: "HR records confirm. Performance ratings: 'Exceeds Expectations' in 9 of 12 years.",
        impact: "Continuity advantage — minimal onboarding time. Risk: may perpetuate existing strategic blind spots.",
      },
    ],
    missingData: [
      "No external leadership assessment — all evaluations are internal BMW HR reviews",
      "No data on candidate's willingness to relocate if role requires presence in new plant locations",
      "Succession risk assessment for candidate's current role not completed",
    ],
    interviewProbes: [
      "You've spent 12 years in strategy roles. This position demands operational execution under extreme time pressure. Give us a concrete example of when you personally drove execution — not advised on it — and what you learned about your own limitations.",
      "There is a perception that you are closely aligned with the current CEO's vision. If the Aufsichtsrat signals a strategic pivot away from that vision, how do you demonstrate independent judgment?",
      "Your strongest competitor for this role is an external candidate with deep operational credentials you lack. Make the case for why institutional knowledge outweighs operational experience in this specific mandate.",
    ],
  },
];
