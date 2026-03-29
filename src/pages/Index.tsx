import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import EnvironmentPanel from "@/components/EnvironmentPanel";
import RosterPanel, { type Candidate } from "@/components/RosterPanel";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { transformWebhookResponse } from "@/data/mockSynthesisData";

const Index = () => {
  const navigate = useNavigate();
  const [mandate, setMandate] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: crypto.randomUUID(), name: "", sourcingType: "", cvText: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSynthesis = async () => {
    setIsLoading(true);
    try {
      const payload = {
        mandate,
        candidates: candidates.map(({ id, ...rest }) => rest),
      };

      const response = await fetch(
        "https://nell-groved-alla.ngrok-free.dev/webhook/hiring-pipeline",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(`Webhook returned ${response.status}`);

      const text = await response.text();
      console.log("Raw webhook response length:", text.length);
      console.log("Raw webhook response:", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        // Try to extract a JSON array first
        const arrayMatch = text.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
          data = JSON.parse(arrayMatch[0]);
        } else {
          // Try to find multiple JSON objects concatenated together
          const objects: any[] = [];
          const objectRegex = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/g;
          let match;
          while ((match = objectRegex.exec(text)) !== null) {
            try {
              objects.push(JSON.parse(match[0]));
            } catch {
              // skip malformed objects
            }
          }
          if (objects.length > 0) {
            data = objects;
          } else {
            throw new Error("Could not parse webhook response as JSON");
          }
        }
      }

      // Handle both single object and array responses
      const rawResults = Array.isArray(data) ? data : [data];
      console.log("Parsed candidates count:", rawResults.length, rawResults.map((r: any) => r.candidateName));

      const synthesisResults = rawResults.map((raw, i) => {
        // Try to match sourcing type from original candidate list
        const matchedCandidate = candidates.find(
          (c) => c.name.toLowerCase().trim() === (raw.candidateName || "").toLowerCase().trim()
        );
        const sourcingType = matchedCandidate?.sourcingType || "Unknown";
        return transformWebhookResponse(raw, i, sourcingType);
      });

      navigate("/report", { state: { candidates: synthesisResults } });
    } catch (err: any) {
      console.error("Synthesis webhook error:", err);
      toast.error("Synthesis failed — please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnvironmentPanel
            mandate={mandate}
            onMandateChange={setMandate}
          />
          <RosterPanel
            candidates={candidates}
            onCandidatesChange={setCandidates}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="synthesis"
            size="lg"
            onClick={handleRunSynthesis}
            disabled={isLoading}
            className="w-full max-w-2xl h-12 text-sm uppercase tracking-[0.2em]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synthesizing…
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Run Multi-Agent Synthesis
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
