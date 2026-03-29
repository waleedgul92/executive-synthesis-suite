import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertTriangle,
  Shield,
  Users,
  FileSearch,
  AlertOctagon,
  MessageSquareWarning,
  Zap,
  Target,
  CircleDot,
  Lightbulb,
  BarChart3,
  Gavel,
  Theater,
} from "lucide-react";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";

interface CandidateDetailProps {
  candidate: SynthesisCandidate;
}

const CandidateDetail = ({ candidate }: CandidateDetailProps) => {
  const c = candidate;

  const isHighRisk = c.hasDealbreakers === true;
  const verdictColor = isHighRisk ? "danger" : "success";
  const verdictLabel = isHighRisk ? "HIGH RISK" : (c.hireRecommendation?.replace(/_/g, " ") || "REVIEW NEEDED");

  const gains = c.gains ?? [];
  const risks = c.risks ?? [];
  const scenarioStrengths = c.scenarioStrengths ?? [];
  const blindSpots = c.blindSpots ?? [];
  const auditTrail = c.auditTrail ?? [];
  const interviewProbes = c.interviewProbes ?? [];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Top Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{c.name || "Unnamed Executive"}</h1>
            <p className="text-sm text-muted-foreground">{c.title || "Role not specified"}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={verdictColor} className="text-xs px-3 py-1 font-semibold">
              <Gavel className="w-3 h-3 mr-1" />
              {verdictLabel}
            </Badge>
            {c.riskAdjustedFinalScore != null && (
              <Badge variant="electric" className="text-xs px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Risk-Adjusted Score: {c.riskAdjustedFinalScore}/100
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px] px-2 py-1 text-muted-foreground border-border">
              {c.sourcingType || "Unknown"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Breakdown */}
        {(c.technicalFitScore != null || c.leadershipTraitsScore != null || c.riskResilienceScore != null || c.culturalAlignmentScore != null) && (
          <section>
            <SectionHeader icon={BarChart3} label="Assessment Score Breakdown" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              <ScoreCard label="Technical Fit" value={c.technicalFitScore} />
              <ScoreCard label="Leadership Traits" value={c.leadershipTraitsScore} />
              <ScoreCard label="Risk Resilience" value={c.riskResilienceScore} />
              <ScoreCard label="Cultural Alignment" value={c.culturalAlignmentScore} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ScoreCard label="Baseline Fit" value={c.baselineFit} />
              <ScoreCard label="Scenario Score" value={c.scenarioRisk} />
            </div>
          </section>
        )}

        {/* Section 1: Trade-Off Matrix */}
        {(gains.length > 0 || risks.length > 0) && (
          <section>
            <SectionHeader icon={Target} label="The Trade-Off Matrix" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {gains.length > 0 && (
                <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-emerald-700 mb-3">What You Gain</h4>
                  <ul className="space-y-2.5">
                    {gains.map((g, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {risks.length > 0 && (
                <div className="p-4 rounded-lg border border-red-200 bg-red-50/50">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-red-700 mb-3">What You Risk</h4>
                  <ul className="space-y-2.5">
                    {risks.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Scenario Simulation */}
        {(c.scenarioTitle || c.scenarioDescription) && (
          <section>
            <SectionHeader icon={Theater} label="Scenario Simulation" />
            <div className="mt-3 p-5 rounded-lg border border-primary/15 bg-primary/5 space-y-4">
              {c.scenarioTitle && (
                <h4 className="text-sm font-semibold text-foreground">{c.scenarioTitle}</h4>
              )}
              {c.scenarioDescription && (
                <p className="text-sm text-foreground/75 leading-relaxed">{c.scenarioDescription}</p>
              )}
              {c.simulatedResponse && (
                <div className="p-4 rounded-lg border border-border bg-card">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground block mb-2">
                    Simulated Candidate Response
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed italic">
                    "{c.simulatedResponse}"
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 2: Dynamic Scenario Impact */}
        {(scenarioStrengths.length > 0 || blindSpots.length > 0) && (
          <section>
            <SectionHeader icon={Shield} label="Dynamic Scenario Impact" />
            <div className="mt-3 p-5 rounded-lg border border-primary/15 bg-primary/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">Scenario Risk Rating</span>
                <span className="text-sm font-mono font-semibold text-foreground">{c.scenarioRiskRating ?? 0}/100</span>
              </div>
              <Progress value={c.scenarioRiskRating ?? 0} className="h-2 bg-muted" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {scenarioStrengths.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-semibold tracking-wider uppercase text-emerald-700 mb-2">Scenario-Specific Strengths</h5>
                    <ul className="space-y-2">
                      {scenarioStrengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {blindSpots.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-semibold tracking-wider uppercase text-red-600 mb-2">Severe Blind Spots</h5>
                    <ul className="space-y-2">
                      {blindSpots.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                          <AlertOctagon className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Leadership Combination Forecast */}
        {(c.idealPairing || c.toxicPairing) && (
          <section>
            <SectionHeader icon={Users} label="Leadership Combination Forecast" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {c.idealPairing && (
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 mb-3">
                    <CircleDot className="w-4 h-4 text-primary" />
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary">Ideal Pairing</h4>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{c.idealPairing}</p>
                </div>
              )}
              {c.toxicPairing && (
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-700">Toxic Pairing</h4>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{c.toxicPairing}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Strategic Placement Advice */}
        {c.strategicPlacementAdvice && (
          <section>
            <SectionHeader icon={Lightbulb} label="Strategic Placement Advice" />
            <Alert className="mt-3 border-primary/20 bg-primary/5">
              <Lightbulb className="h-4 w-4 text-primary" />
              <AlertTitle className="text-sm font-semibold text-foreground">Placement Recommendation</AlertTitle>
              <AlertDescription className="text-sm text-foreground/75 leading-relaxed mt-1">
                {c.strategicPlacementAdvice}
              </AlertDescription>
            </Alert>
          </section>
        )}

        {/* Section 4: Explainability Audit Trail */}
        {auditTrail.length > 0 && (
          <section>
            <SectionHeader icon={FileSearch} label="Explainability Audit Trail" />
            <div className="mt-3 space-y-3">
              {auditTrail.map((entry, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-lg overflow-hidden border border-border shadow-sm">
                  <div className="p-4 bg-primary/5">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-primary block mb-1.5">AI Claim</span>
                    <p className="text-sm text-foreground/90 leading-relaxed">{entry.claim || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-muted/50">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground block mb-1.5">Evidence from CV</span>
                    <p className="text-sm text-foreground/75 leading-relaxed">{entry.evidence_from_cv || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-muted/50">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground block mb-1.5">Scenario Impact</span>
                    <p className="text-sm text-foreground/75 leading-relaxed">{entry.impact_on_scenario || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final Verdict */}
        {c.finalVerdict && (
          <section>
            <SectionHeader icon={Gavel} label="Final Verdict" />
            <div className={`mt-3 p-5 rounded-lg border ${
              c.finalVerdict.is_hireable
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-red-200 bg-red-50/50"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <Badge
                  variant={c.finalVerdict.is_hireable ? "success" : "danger"}
                  className="text-sm px-4 py-1.5 font-semibold"
                >
                  {(c.finalVerdict.overall_recommendation || "PENDING").replace(/_/g, " ")}
                </Badge>
                {c.finalVerdict.has_critical_risks && (
                  <Badge variant="danger" className="text-[10px] px-2 py-0.5">
                    ⚠ Critical Risks Detected
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-card border border-border">
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-1">Baseline Score</p>
                  <p className="text-2xl font-mono font-bold text-foreground">{c.finalVerdict.baseline_score ?? "—"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card border border-border">
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-1">Risk-Adjusted</p>
                  <p className="text-2xl font-mono font-bold text-foreground">{c.finalVerdict.risk_adjusted_score ?? "—"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card border border-border">
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-1">Score Delta</p>
                  <p className={`text-2xl font-mono font-bold ${
                    (c.finalVerdict.score_delta ?? 0) >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {c.finalVerdict.score_delta != null ? ((c.finalVerdict.score_delta > 0 ? "+" : "") + c.finalVerdict.score_delta) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Human Action Required */}
        <section className="space-y-4">
          {c.missingData && (typeof c.missingData === 'string' ? c.missingData.length > 0 : (c.missingData as string[]).length > 0) && (
            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareWarning className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-700">Missing Data Warning</h4>
              </div>
              {typeof c.missingData === 'string' ? (
                <p className="text-sm text-foreground/70">{c.missingData}</p>
              ) : (
                <ul className="space-y-2">
                  {(c.missingData as string[]).map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {interviewProbes.length > 0 && (
            <div className="p-4 rounded-lg border border-border bg-card shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold tracking-wider uppercase text-primary">Board-Level Interview Probes</h4>
              </div>
              <ol className="space-y-3">
                {interviewProbes.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono font-semibold text-primary shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4 text-primary" />
    <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{label}</h3>
  </div>
);

const ScoreCard = ({ label, value }: { label: string; value?: number }) => {
  if (value == null) return null;
  return (
    <div className="p-3 rounded-lg border border-border bg-card text-center">
      <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-mono font-bold text-foreground">{value}</p>
      <Progress value={value} className="h-1.5 bg-muted mt-2" />
    </div>
  );
};

export default CandidateDetail;
