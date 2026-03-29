import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import EnvironmentPanel from "@/components/EnvironmentPanel";
import RosterPanel, { type Candidate } from "@/components/RosterPanel";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";

const Index = () => {
  const [mandate, setMandate] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: crypto.randomUUID(), name: "", sourcingType: "", fileName: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSynthesis = async () => {
    setIsLoading(true);
    // Simulate loading — replace with actual n8n webhook call
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <EnvironmentPanel
            mandate={mandate}
            onMandateChange={setMandate}
          />

          {/* Right Column */}
          <RosterPanel
            candidates={candidates}
            onCandidatesChange={setCandidates}
          />
        </div>

        {/* Action Footer */}
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
