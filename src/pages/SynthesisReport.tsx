import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import CandidateSidebar from "@/components/report/CandidateSidebar";
import CandidateDetail from "@/components/report/CandidateDetail";
import { mockCandidates } from "@/data/mockSynthesisData";

const SynthesisReport = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(mockCandidates[0].id);
  const selected = mockCandidates.find((c) => c.id === selectedId) ?? mockCandidates[0];

  const handleEditSetup = () => {
    navigate("/");
  };

  const handleAddCandidate = () => {
    navigate("/");
  };

  const handleExport = () => {
    toast.info("PDF export will be available once connected to the synthesis engine.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onEditSetup={handleEditSetup} onExport={handleExport} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <CandidateSidebar
          candidates={mockCandidates}
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
