import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ShieldAlert } from "lucide-react";

interface EnvironmentPanelProps {
  mandate: string;
  onMandateChange: (value: string) => void;
}

const EnvironmentPanel = ({ mandate, onMandateChange }: EnvironmentPanelProps) => {
  return (
    <div className="space-y-5">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/10 border border-primary/20">
              <FileText className="w-3.5 h-3.5 text-primary" />
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
            className="min-h-[160px] bg-input/50 border-border text-sm placeholder:text-muted-foreground resize-none focus:border-primary/40"
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm border-dashed border-muted-foreground/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-destructive/10 border border-destructive/20">
              <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
            </div>
            <CardTitle className="text-sm font-semibold tracking-wide">
              Step 2: Inject Dynamic Scenario (Stress Test)
            </CardTitle>
            <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Coming Soon</span>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            disabled
            placeholder="Sudden Scenario Shift: A new, aggressive geopolitical tariff has just increased the cost of imported Asian battery cells by 40%, instantly destroying the EV margin forecast for the next 18 months. Simultaneously, leaked internal documents regarding the new highly automated production line have triggered an unsanctioned 'wildcat' strike. The Board demands a revised supply chain strategy within 30 days and an immediate resolution to the strike without conceding to the union's demands to halt the automation rollout."
            className="min-h-[120px] bg-muted/30 border-border text-sm placeholder:text-muted-foreground/50 resize-none cursor-not-allowed opacity-60"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentPanel;
