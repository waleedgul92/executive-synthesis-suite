import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface EnvironmentPanelProps {
  mandate: string;
  onMandateChange: (value: string) => void;
}

const EnvironmentPanel = ({ mandate, onMandateChange }: EnvironmentPanelProps) => {
  return (
    <div className="space-y-5">
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
    </div>
  );
};

export default EnvironmentPanel;
