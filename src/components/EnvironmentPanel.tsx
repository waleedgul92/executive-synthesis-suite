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
    </div>
  );
};

export default EnvironmentPanel;
