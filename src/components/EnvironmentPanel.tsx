import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, AlertTriangle } from "lucide-react";

interface EnvironmentPanelProps {
  mandate: string;
  scenario: string;
  onMandateChange: (value: string) => void;
  onScenarioChange: (value: string) => void;
}

const EnvironmentPanel = ({ mandate, scenario, onMandateChange, onScenarioChange }: EnvironmentPanelProps) => {
  return (
    <div className="space-y-5">
      {/* Step 1 */}
      <Card className="card-shine border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-electric/15 border border-electric/20">
              <FileText className="w-3.5 h-3.5 text-electric" />
            </div>
            <CardTitle className="text-sm font-semibold tracking-wide">
              Step 1: Define the Strategic Mandate
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={mandate}
            onChange={(e) => onMandateChange(e.target.value)}
            placeholder="Paste the executive mandate or strategic objectives here..."
            className="min-h-[160px] bg-input/50 border-border/60 text-sm placeholder:text-muted-foreground/60 resize-none focus:border-electric/40"
          />
        </CardContent>
      </Card>

      {/* Step 2 */}
      <Card className="card-shine border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-terminal/15 border border-terminal/20">
              <AlertTriangle className="w-3.5 h-3.5 text-terminal" />
            </div>
            <CardTitle className="text-sm font-semibold tracking-wide">
              Step 2: Inject Dynamic Scenario (Stress Test)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-2 left-3 text-[10px] font-mono text-terminal/60 tracking-wider uppercase">
              ▶ scenario_inject.live
            </div>
            <Textarea
              value={scenario}
              onChange={(e) => onScenarioChange(e.target.value)}
              placeholder="Describe a sudden business shift (e.g., unexpected tariff, union strike, supply chain failure)..."
              className="min-h-[140px] pt-8 bg-terminal-bg border-terminal/20 font-mono text-sm text-terminal/90 placeholder:text-terminal/30 resize-none terminal-glow focus:border-terminal/40"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentPanel;
