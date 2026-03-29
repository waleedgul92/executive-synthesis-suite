import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Plus, Upload, X } from "lucide-react";
import { useCallback } from "react";

export interface Candidate {
  id: string;
  name: string;
  sourcingType: string;
  fileName: string;
}

interface RosterPanelProps {
  candidates: Candidate[];
  onCandidatesChange: (candidates: Candidate[]) => void;
}

const RosterPanel = ({ candidates, onCandidatesChange }: RosterPanelProps) => {
  const addCandidate = () => {
    onCandidatesChange([
      ...candidates,
      { id: crypto.randomUUID(), name: "", sourcingType: "", fileName: "" },
    ]);
  };

  const removeCandidate = (id: string) => {
    if (candidates.length <= 1) return;
    onCandidatesChange(candidates.filter((c) => c.id !== id));
  };

  const updateCandidate = (id: string, field: keyof Candidate, value: string) => {
    onCandidatesChange(
      candidates.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleFileDrop = useCallback(
    (id: string, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") {
        updateCandidate(id, "fileName", file.name);
      }
    },
    [candidates]
  );

  const handleFileSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateCandidate(id, "fileName", file.name);
    }
  };

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/10 border border-primary/20">
            <Users className="w-3.5 h-3.5 text-primary" />
          </div>
          <CardTitle className="text-sm font-semibold tracking-wide">
            Step 3: Executive Roster
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            className="relative p-4 rounded-lg border border-border bg-muted/30 space-y-3"
          >
            {candidates.length > 1 && (
              <button
                onClick={() => removeCandidate(candidate.id)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
              Candidate {index + 1}
            </div>

            <Input
              placeholder="Executive Name"
              value={candidate.name}
              onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
              className="bg-background border-border text-sm focus:border-primary/40"
            />

            <Select
              value={candidate.sourcingType}
              onValueChange={(v) => updateCandidate(candidate.id, "sourcingType", v)}
            >
              <SelectTrigger className="bg-background border-border text-sm focus:border-primary/40">
                <SelectValue placeholder="Sourcing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Promotion</SelectItem>
                <SelectItem value="competitor">External Hire – Competitor</SelectItem>
                <SelectItem value="cross-industry">External Hire – Cross-Industry</SelectItem>
              </SelectContent>
            </Select>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(candidate.id, e)}
              className="relative flex flex-col items-center justify-center gap-2 py-5 rounded-lg border-2 border-dashed border-border bg-muted/20 hover:border-primary/30 hover:bg-muted/40 transition-colors cursor-pointer"
              onClick={() =>
                document.getElementById(`file-${candidate.id}`)?.click()
              }
            >
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {candidate.fileName || "Upload Executive Dossier / CV (PDF)"}
              </span>
              <input
                id={`file-${candidate.id}`}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(candidate.id, e)}
              />
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={addCandidate}
          className="w-full border border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary/30 text-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Another Executive
        </Button>
      </CardContent>
    </Card>
  );
};

export default RosterPanel;
