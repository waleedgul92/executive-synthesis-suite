import { useState } from "react";
import Header from "@/components/Header";
import CandidateSidebar from "@/components/report/CandidateSidebar";
import CandidateDetail from "@/components/report/CandidateDetail";
import { mockCandidates } from "@/data/mockSynthesisData";

const SynthesisReport = () => {
  const [selectedId, setSelectedId] = useState(mockCandidates[0].id);
  const selected = mockCandidates.find((c) => c.id === selectedId) ?? mockCandidates[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <CandidateSidebar
          candidates={mockCandidates}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <CandidateDetail candidate={selected} />
      </div>
    </div>
  );
};

export default SynthesisReport;
