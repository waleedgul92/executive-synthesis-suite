import { User, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";
import { cn } from "@/lib/utils";

interface CandidateSidebarProps {
  candidates: SynthesisCandidate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddCandidate?: () => void;
}

const CandidateSidebar = ({ candidates, selectedId, onSelect, onAddCandidate }: CandidateSidebarProps) => {
  return (
    <aside className="w-full lg:w-80 shrink-0 border-r border-border bg-sidebar flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
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
                  ? "border-primary/40 bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-border hover:shadow-sm"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  active ? "bg-primary/10 border border-primary/30" : "bg-muted border border-border"
                )}>
                  <User className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-medium truncate", active ? "text-foreground" : "text-foreground/80")}>
                    {c.name || "Unnamed Executive"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {c.sourcingType || "Unknown"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-[10px] px-2 py-0">
                      Fit: {c.baselineFit ?? 0}/100
                    </Badge>
                    <Badge variant={(c.scenarioRisk ?? 0) > 50 ? "danger" : "warning"} className="text-[10px] px-2 py-0">
                      Risk: {c.scenarioRisk ?? 0}/100
                    </Badge>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {onAddCandidate && (
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            onClick={onAddCandidate}
            className="w-full border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 text-xs h-10"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Upload Additional Executive
          </Button>
        </div>
      )}
    </aside>
  );
};

export default CandidateSidebar;
