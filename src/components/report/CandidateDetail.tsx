import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";

interface CandidateDetailProps {
  candidate: SynthesisCandidate;
}

const CandidateDetail = ({ candidate }: CandidateDetailProps) => {
  const c = candidate;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{c.name}</h1>
            <p className="text-sm text-muted-foreground">{c.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="electric" className="text-xs px-3 py-1">
              <Zap className="w-3 h-3 mr-1" />
              AI Confidence: {c.aiConfidence}%
            </Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-1 text-muted-foreground/60 border-border/50">
              {c.sourcingType}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Section 1: Trade-Off Matrix */}
        <section>
          <SectionHeader icon={Target} label="The Trade-Off Matrix" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {/* Gains */}
            <div className="p-4 rounded-lg border border-emerald-500/15 bg-emerald-500/5">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3">What You Gain</h4>
              <ul className="space-y-2.5">
                {c.gains.map((g, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Risks */}
            <div className="p-4 rounded-lg border border-red-500/15 bg-red-500/5">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-red-400 mb-3">What You Risk</h4>
              <ul className="space-y-2.5">
                {c.risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Dynamic Scenario Impact */}
        <section>
          <SectionHeader icon={Shield} label="Dynamic Scenario Impact" />
          <div className="mt-3 p-5 rounded-lg border border-electric/15 bg-electric/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-electric/80">Scenario Risk Rating</span>
              <span className="text-sm font-mono font-semibold text-foreground">{c.scenarioRiskRating}/100</span>
            </div>
            <Progress
              value={c.scenarioRiskRating}
              className="h-2 bg-muted"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div>
                <h5 className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400 mb-2">Scenario-Specific Strengths</h5>
                <ul className="space-y-2">
                  {c.scenarioStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] font-semibold tracking-wider uppercase text-red-400 mb-2">Severe Blind Spots</h5>
                <ul className="space-y-2">
                  {c.blindSpots.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                      <AlertOctagon className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Leadership Combination Forecast */}
        <section>
          <SectionHeader icon={Users} label="Leadership Combination Forecast" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {/* Ideal Pairing */}
            <div className="p-4 rounded-lg border border-electric/20 bg-electric/5">
              <div className="flex items-center gap-2 mb-3">
                <CircleDot className="w-4 h-4 text-electric" />
                <h4 className="text-xs font-semibold tracking-wider uppercase text-electric">Ideal Pairing</h4>
              </div>
              <p className="text-sm font-medium text-foreground">{c.idealPairing.name}</p>
              <p className="text-[11px] text-muted-foreground mb-2">{c.idealPairing.title}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{c.idealPairing.rationale}</p>
            </div>
            {/* Toxic Pairing */}
            <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-400">Toxic Pairing</h4>
              </div>
              <p className="text-sm font-medium text-foreground">{c.toxicPairing.name}</p>
              <p className="text-[11px] text-muted-foreground mb-2">{c.toxicPairing.title}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{c.toxicPairing.rationale}</p>
            </div>
          </div>
        </section>

        {/* Section 4: Explainability Audit Trail */}
        <section>
          <SectionHeader icon={FileSearch} label="Explainability Audit Trail" />
          <Accordion type="single" collapsible className="mt-3 space-y-2">
            {c.auditTrail.map((entry, i) => (
              <AccordionItem key={i} value={`audit-${i}`} className="border border-border/40 rounded-lg px-4 bg-background/40">
                <AccordionTrigger className="text-sm text-foreground/90 hover:no-underline py-3">
                  <span className="text-left pr-4">{entry.claim}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/60">Evidence from CV</span>
                    <p className="text-sm text-foreground/75 mt-1">{entry.evidence}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/60">Impact on Scenario</span>
                    <p className="text-sm text-foreground/75 mt-1">{entry.impact}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Section 5: Human Action Required */}
        <section className="space-y-4">
          {/* Missing Data Warning */}
          <div className="p-4 rounded-lg border border-amber-500/25 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquareWarning className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-400">Missing Data Warning</h4>
            </div>
            <ul className="space-y-2">
              {c.missingData.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="text-amber-400/60 mt-1">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Probes */}
          <div className="p-4 rounded-lg border border-electric/20 bg-card/60">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-electric" />
              <h4 className="text-xs font-semibold tracking-wider uppercase text-electric">Board-Level Interview Probes</h4>
            </div>
            <ol className="space-y-3">
              {c.interviewProbes.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-electric/10 border border-electric/20 text-[10px] font-mono font-semibold text-electric shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4 text-electric/70" />
    <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/70">{label}</h3>
  </div>
);

export default CandidateDetail;
