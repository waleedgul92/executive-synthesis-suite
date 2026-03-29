export interface SynthesisCandidate {
  id: string;
  name?: string;
  title?: string;
  sourcingType?: string;
  baselineFit?: number;
  scenarioRisk?: number;
  aiConfidence?: number;
  gains?: string[];
  risks?: string[];
  scenarioRiskRating?: number;
  scenarioStrengths?: string[];
  blindSpots?: string[];
  idealPairing?: string;
  toxicPairing?: string;
  auditTrail?: { claim?: string; evidence_from_cv?: string; impact_on_scenario?: string }[];
  strategicPlacementAdvice?: string;
  missingData?: string | string[];
  interviewProbes?: string[];
  scenarioTitle?: string;
  scenarioDescription?: string;
  simulatedResponse?: string;
  hireRecommendation?: string;
  recommendationRationale?: string;
  technicalFitScore?: number;
  leadershipTraitsScore?: number;
  riskResilienceScore?: number;
  culturalAlignmentScore?: number;
  riskAdjustedFinalScore?: number;
  hasDealbreakers?: boolean;
  dealbreakerFlags?: string[];
  riskIndicators?: string[];
  finalVerdict?: {
    overall_recommendation?: string;
    risk_adjusted_score?: number;
    baseline_score?: number;
    score_delta?: number;
    is_hireable?: boolean;
    has_critical_risks?: boolean;
  };
}

/** Transform raw n8n webhook response into SynthesisCandidate */
export function transformWebhookResponse(
  raw: any,
  index: number,
  sourcingType: string
): SynthesisCandidate {
  return {
    id: String(index + 1),
    name: raw.candidateName || "Unknown Candidate",
    title: raw.roleBrief || "Role not specified",
    sourcingType,
    baselineFit: raw.weighted_baseline_score ?? 0,
    scenarioRisk: raw.execution_risk_rating ?? raw.scenario_score ?? 0,
    aiConfidence: raw.ai_confidence_score ?? (raw.risk_adjusted_final_score != null
      ? Math.max(0, Math.min(100, raw.risk_adjusted_final_score * 10))
      : 0),
    gains: raw.trade_offs?.what_you_gain ?? raw.top_strengths ?? [],
    risks: [
      ...(raw.trade_offs?.what_you_risk ?? raw.critical_gaps ?? []),
      ...(raw.dealbreaker_flags ?? []),
    ],
    scenarioRiskRating: raw.execution_risk_rating ?? raw.scenario_score ?? 0,
    scenarioStrengths: raw.what_handled_well ?? [],
    blindSpots: raw.where_fell_short ?? [],
    idealPairing: raw.combination_impact?.ideal_pairing,
    toxicPairing: raw.combination_impact?.toxic_pairing,
    auditTrail: raw.audit_trail,
    strategicPlacementAdvice: raw.strategic_advice || raw.recommendation_rationale || "No placement advice available.",
    missingData: raw.missing_data_warning ?? raw.risk_indicators ?? [],
    interviewProbes: raw.board_probes ?? raw.suggested_interview_probes ?? [],
    // New fields
    scenarioTitle: raw.scenario_title,
    scenarioDescription: raw.scenario_description,
    simulatedResponse: raw.simulated_candidate_response,
    hireRecommendation: raw.hire_recommendation,
    recommendationRationale: raw.recommendation_rationale,
    technicalFitScore: raw.technical_fit_score,
    leadershipTraitsScore: raw.leadership_traits_score,
    riskResilienceScore: raw.risk_resilience_score,
    culturalAlignmentScore: raw.cultural_alignment_score,
    riskAdjustedFinalScore: raw.risk_adjusted_final_score,
    hasDealbreakers: raw.has_dealbreakers ?? raw.is_high_risk,
    dealbreakerFlags: raw.dealbreaker_flags,
    riskIndicators: raw.risk_indicators,
    finalVerdict: raw.final_verdict,
  };
}
