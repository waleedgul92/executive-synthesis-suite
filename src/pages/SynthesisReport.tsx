import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import CandidateSidebar from "@/components/report/CandidateSidebar";
import CandidateDetail from "@/components/report/CandidateDetail";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";

const SynthesisReport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const candidates: SynthesisCandidate[] = location.state?.candidates ?? [];

  console.log("SynthesisReport candidates:", candidates.length, candidates.map(c => ({ id: c.id, name: c.name })));

  const [selectedId, setSelectedId] = useState(candidates[0]?.id ?? "");
  const selected = candidates.find((c) => c.id === selectedId) ?? candidates[0];

  console.log("Selected candidate:", selectedId, selected?.name);

  const handleEditSetup = () => navigate("/");
  const handleAddCandidate = () => navigate("/");
  const handleExport = () => {
    toast.info("PDF export will be available once connected to the synthesis engine.");
  };

  if (!candidates.length) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header onEditSetup={handleEditSetup} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">No synthesis data available.</p>
            <p className="text-sm text-muted-foreground">Please run a synthesis from the Decision Matrix first.</p>
            <button
              onClick={handleEditSetup}
              className="text-primary hover:underline text-sm font-medium"
            >
              ← Return to Decision Matrix
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onEditSetup={handleEditSetup} onExport={handleExport} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <CandidateSidebar
          candidates={candidates}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAddCandidate={handleAddCandidate}
        />
        <CandidateDetail candidate={selected} />
      </div>
    </div>
  );
};

export default SynthesisReport;
