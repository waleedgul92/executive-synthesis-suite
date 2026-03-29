import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";
import { cn } from "@/lib/utils";

interface CandidateSidebarProps {
  candidates: SynthesisCandidate[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CandidateSidebar = ({ candidates, selectedId, onSelect }: CandidateSidebarProps) => {
  return (
    <aside className="w-full lg:w-80 shrink-0 border-r border-border bg-card/50 flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <div className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase mb-1">
          Synthesis Complete
        </div>
        <h2 className="text-sm font-semibold tracking-wide text-foreground">
          Processed Candidates
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {candidates.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all duration-200",
                active
                  ? "border-electric/40 bg-electric/5 glow-electric"
                  : "border-border/40 bg-background/40 hover:border-border/70 hover:bg-background/60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  active ? "bg-electric/15 border border-electric/30" : "bg-muted border border-border/50"
                )}>
                  <User className={cn("w-4 h-4", active ? "text-electric" : "text-muted-foreground")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-medium truncate", active ? "text-foreground" : "text-foreground/80")}>
                    {c.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground/60 truncate mt-0.5">
                    {c.sourcingType}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-[10px] px-2 py-0">
                      Fit: {c.baselineFit}/100
                    </Badge>
                    <Badge variant={c.scenarioRisk > 50 ? "danger" : "warning"} className="text-[10px] px-2 py-0">
                      Risk: {c.scenarioRisk}/100
                    </Badge>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CandidateSidebar;
