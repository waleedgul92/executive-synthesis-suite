import type { SynthesisCandidate } from "@/data/mockSynthesisData";

/**
 * Export synthesis report as PDF using the browser's built-in print dialog.
 * Generates a clean, printable HTML document and opens print preview.
 */
export function exportBoardReportPdf(candidates: SynthesisCandidate[]) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow pop-ups to export the PDF.");
    return;
  }

  const html = buildReportHtml(candidates);
  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for content to render, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };
}

function scoreBar(value: number | undefined, max = 100): string {
  if (value == null) return "";
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = pct >= 70 ? "#16a34a" : pct >= 40 ? "#d97706" : "#dc2626";
  return `
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:${color};border-radius:3px;"></div>
      </div>
      <span style="font-family:monospace;font-weight:700;font-size:13px;">${value}</span>
    </div>
  `;
}

function candidateSection(c: SynthesisCandidate, index: number): string {
  const gains = c.gains ?? [];
  const risks = c.risks ?? [];
  const auditTrail = c.auditTrail ?? [];
  const interviewProbes = c.interviewProbes ?? [];
  const isHighRisk = c.hasDealbreakers === true;

  return `
    <div class="candidate" style="page-break-before:${index > 0 ? "always" : "auto"};">
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #1e40af;">
        <div>
          <h2 style="margin:0;font-size:22px;color:#0f172a;">${c.name || "Unnamed"}</h2>
          <p style="margin:4px 0 0;font-size:13px;color:#64748b;">${c.title || ""}</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="padding:4px 14px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;${
            isHighRisk
              ? "background:#fef2f2;color:#dc2626;border:1px solid #fecaca;"
              : "background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;"
          }">${isHighRisk ? "HIGH RISK" : "REVIEW NEEDED"}</span>
          <span style="padding:4px 12px;border-radius:4px;font-size:11px;font-weight:600;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;text-transform:capitalize;">
            ${c.sourcingType || "Unknown"}
          </span>
        </div>
      </div>

      <!-- Scores -->
      ${(c.baselineFit != null || c.scenarioRisk != null || c.aiConfidence != null) ? `
        <div style="margin-bottom:24px;">
          <h3 class="section-title">Assessment Scores</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
            ${c.baselineFit != null ? `<div class="score-box"><span class="score-label">Baseline Fit</span>${scoreBar(c.baselineFit)}</div>` : ""}
            ${c.scenarioRisk != null ? `<div class="score-box"><span class="score-label">Execution Risk</span>${scoreBar(c.scenarioRisk)}</div>` : ""}
            ${c.aiConfidence != null ? `<div class="score-box"><span class="score-label">AI Confidence</span>${scoreBar(c.aiConfidence)}</div>` : ""}
          </div>
        </div>
      ` : ""}

      <!-- Trade-Offs -->
      ${(gains.length > 0 || risks.length > 0) ? `
        <div style="margin-bottom:24px;">
          <h3 class="section-title">Trade-Off Matrix</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            ${gains.length > 0 ? `
              <div style="padding:16px;border-radius:8px;background:#f0fdf4;border:1px solid #bbf7d0;">
                <h4 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#16a34a;font-weight:700;">What You Gain</h4>
                <ul style="margin:0;padding-left:18px;">${gains.map(g => `<li style="font-size:13px;color:#334155;margin-bottom:6px;line-height:1.5;">${g}</li>`).join("")}</ul>
              </div>
            ` : ""}
            ${risks.length > 0 ? `
              <div style="padding:16px;border-radius:8px;background:#fef2f2;border:1px solid #fecaca;">
                <h4 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#dc2626;font-weight:700;">What You Risk</h4>
                <ul style="margin:0;padding-left:18px;">${risks.map(r => `<li style="font-size:13px;color:#334155;margin-bottom:6px;line-height:1.5;">${r}</li>`).join("")}</ul>
              </div>
            ` : ""}
          </div>
        </div>
      ` : ""}

      <!-- Strategic Advice -->
      ${c.strategicPlacementAdvice ? `
        <div style="margin-bottom:24px;padding:16px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;">
          <h3 class="section-title" style="color:#1e40af;">Strategic Placement Advice</h3>
          <p style="margin:0;font-size:13px;color:#334155;line-height:1.6;">${c.strategicPlacementAdvice}</p>
        </div>
      ` : ""}

      <!-- Combination Impact -->
      ${(c.idealPairing || c.toxicPairing) ? `
        <div style="margin-bottom:24px;">
          <h3 class="section-title">Leadership Combination Forecast</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            ${c.idealPairing ? `
              <div style="padding:16px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;">
                <h4 style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#1e40af;font-weight:700;">Ideal Pairing</h4>
                <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">${c.idealPairing}</p>
              </div>
            ` : ""}
            ${c.toxicPairing ? `
              <div style="padding:16px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;">
                <h4 style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#d97706;font-weight:700;">Toxic Pairing</h4>
                <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">${c.toxicPairing}</p>
              </div>
            ` : ""}
          </div>
        </div>
      ` : ""}

      <!-- Audit Trail -->
      ${auditTrail.length > 0 ? `
        <div style="margin-bottom:24px;">
          <h3 class="section-title">Explainability Audit Trail</h3>
          ${auditTrail.map(entry => `
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;margin-bottom:8px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
              <div style="padding:12px;background:#eff6ff;">
                <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e40af;">AI Claim</span>
                <p style="margin:6px 0 0;font-size:12px;color:#334155;line-height:1.5;">${entry.claim || "N/A"}</p>
              </div>
              <div style="padding:12px;background:#f8fafc;">
                <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Evidence from CV</span>
                <p style="margin:6px 0 0;font-size:12px;color:#475569;line-height:1.5;">${entry.evidence_from_cv || "N/A"}</p>
              </div>
              <div style="padding:12px;background:#f8fafc;">
                <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Scenario Impact</span>
                <p style="margin:6px 0 0;font-size:12px;color:#475569;line-height:1.5;">${entry.impact_on_scenario || "N/A"}</p>
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- Missing Data Warning -->
      ${c.missingData ? `
        <div style="margin-bottom:24px;padding:16px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;">
          <h4 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#d97706;font-weight:700;">⚠ Missing Data Warning</h4>
          ${typeof c.missingData === "string"
            ? `<p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">${c.missingData}</p>`
            : `<ul style="margin:0;padding-left:18px;">${(c.missingData as string[]).map(d => `<li style="font-size:13px;color:#334155;margin-bottom:4px;">${d}</li>`).join("")}</ul>`
          }
        </div>
      ` : ""}

      <!-- Interview Probes -->
      ${interviewProbes.length > 0 ? `
        <div style="margin-bottom:24px;">
          <h3 class="section-title">Board-Level Interview Probes</h3>
          <ol style="margin:0;padding-left:20px;">
            ${interviewProbes.map(q => `<li style="font-size:13px;color:#334155;margin-bottom:8px;line-height:1.6;">${q}</li>`).join("")}
          </ol>
        </div>
      ` : ""}
    </div>
  `;
}

function buildReportHtml(candidates: SynthesisCandidate[]): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BMW Group — Executive Synthesis Report</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 0;
      color: #0f172a;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px;
    }
    .cover {
      text-align: center;
      padding: 80px 40px;
      border-bottom: 3px solid #1e40af;
      margin-bottom: 40px;
    }
    .cover h1 {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px;
      letter-spacing: 1px;
    }
    .cover p {
      font-size: 13px;
      color: #64748b;
      margin: 4px 0;
    }
    .cover .badge {
      display: inline-block;
      margin-top: 16px;
      padding: 6px 16px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #1e40af;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748b;
      margin: 0 0 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    .score-box {
      padding: 12px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }
    .score-label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 8px;
    }
    @media print {
      body { background: #fff; }
      .page { padding: 20px; max-width: 100%; }
      .cover { padding: 40px 20px; }
      .candidate { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="cover">
      <h1>BMW Group</h1>
      <p style="font-size:16px;font-weight:600;color:#334155;">Executive Synthesis Report</p>
      <p>Generated ${date} · ${candidates.length} Candidate${candidates.length !== 1 ? "s" : ""} Evaluated</p>
      <span class="badge">Clearance Level: Executive</span>
    </div>

    ${candidates.map((c, i) => candidateSection(c, i)).join("")}

    <div style="text-align:center;padding:24px 0;border-top:1px solid #e2e8f0;margin-top:40px;">
      <p style="font-size:10px;color:#94a3b8;margin:0;">BMW Group — Executive Decision Intelligence · Confidential</p>
    </div>
  </div>
</body>
</html>`;
}
