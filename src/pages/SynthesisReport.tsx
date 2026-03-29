import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import CandidateSidebar from "@/components/report/CandidateSidebar";
import CandidateDetail from "@/components/report/CandidateDetail";
import type { SynthesisCandidate } from "@/data/mockSynthesisData";
import { exportBoardReportPdf } from "@/lib/exportPdf";

const SynthesisReport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const candidates: SynthesisCandidate[] = location.state?.candidates ?? [];

  const [selectedId, setSelectedId] = useState(candidates[0]?.id ?? "");
  const selected = candidates.find((c) => c.id === selectedId) ?? candidates[0];

  const handleEditSetup = () => navigate("/");
  const handleAddCandidate = () => navigate("/");
  const handleExport = () => {
    exportBoardReportPdf(candidates);
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
