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
    id: raw.candidateId || String(index + 1),
    name: raw.candidateName,
    title: raw.roleBrief,
    sourcingType: sourcingType !== "Unknown" ? sourcingType : (raw.candidateType || "Unknown"),
    baselineFit: raw.weighted_baseline_score,
    scenarioRisk: raw.execution_risk_rating ?? raw.scenario_score,
    aiConfidence: raw.ai_confidence_score,
    gains: raw.trade_offs?.what_you_gain ?? [],
    risks: [
      ...(raw.trade_offs?.what_you_risk ?? []),
      ...(raw.dealbreaker_flags ?? []),
    ],
    scenarioRiskRating: raw.execution_risk_rating ?? raw.scenario_score,
    scenarioStrengths: raw.what_handled_well ?? [],
    blindSpots: raw.where_fell_short ?? [],
    idealPairing: raw.combination_impact?.ideal_pairing,
    toxicPairing: raw.combination_impact?.toxic_pairing,
    auditTrail: raw.audit_trail,
    strategicPlacementAdvice: raw.strategic_advice,
    missingData: raw.missing_data_warning,
    interviewProbes: raw.board_probes ?? [],
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
