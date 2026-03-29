# Apex Synthesis
### Decision Intelligence for C-Suite Hiring

> **Live Frontend:** [apex-synthesis.lovable.app](https://apex-synthesis.lovable.app)

Apex Synthesis is an AI-driven **Decision Intelligence** pipeline designed to evaluate executive candidates against high-stakes, real-world crises. It moves beyond standard CV filtering to simulate how a candidate would perform under extreme pressure — specifically a **40% geopolitical tariff hike** and an **unsanctioned wildcat strike**.

---

##  Architecture

The system utilises a modular **Agentic** architecture to ensure explainability and depth in every hiring decision.

### 1. Frontend — Lovable / React

A high-performance UI that allows users to input a strategic job mandate and candidate CVs. It visualises deep-dive analysis, risk ratings, and audit trails in real-time.

### 2. Orchestration — n8n & ngrok

The backend engine. A self-hosted **n8n** instance manages the data flow between four specialised AI agents. **ngrok** provides a secure tunnel for the Lovable frontend to communicate with the local n8n production environment.

### 3. AI Agents — Gemini 2.5 Flash

| Agent | Role | Responsibility |
|---|---|---|
| **Agent 1** | Mandate Profiler | Converts raw JDs into strategic rubrics |
| **Agent 2** | Playbook Synthesizer | Scans CVs for "scar tissue" and specific leadership dimensions |
| **Agent 3** | Stress-Tester | Generates custom "Pressure Test" scenarios and board-level interview probes |
| **Agent 4** | The Judge | Synthesises data to produce a final risk rating and baseline score |

---

##  Key Features

| Feature | Description |
|---|---|
| **Explainable AI (XAI)** | Every score includes an Audit Trail linking claims to specific evidence in the CV |
| **Risk-Based Scoring** | Separate ratings for "Weighted Baseline" vs. "Execution Risk" to highlight high-talent / high-danger candidates |
| **Trade-off Analysis** | Identifies exactly what the organisation gains and what it risks for every specific hire |
| **Board Probes** | Automatically generates targeted interview questions based on candidate weaknesses |

---

##  Setup & Integration

### Backend — n8n

1. Import the workflow into n8n.
2. Set the **Webhook** node to `POST` with the path `/hiring-pipeline`.
3. Ensure the **Aggregate** node is active to bundle multiple candidates into a single JSON response.
4. Toggle the workflow to **Active** to enable the Production URL.

### Tunneling — ngrok

Expose the local n8n instance:

```bash
ngrok http 5678
```

### Frontend — Lovable

| Setting | Value |
|---|---|
| **API Endpoint** | `https://nell-groved-alla.ngrok-free.dev/webhook/hiring-pipeline` |
| **Header** | `Content-Type: application/json` |
| **Header** | `ngrok-skip-browser-warning: true` |

---

##  The "Decision Intelligence" Difference

Unlike standard HR Tech Tool that looks for **keywords**, Apex Synthesis looks for **Strategic Alignment**. The output doesn't just provide a score — it offers a narrative:

> *"What you gain: Software-defined manufacturing expertise. What you risk: Friction with legacy hardware teams."*

This allows a Board of Directors to make a choice based on their specific **risk appetite**, not just a generic ranking.

---

##  Demo Instructions

1. Launch the **Apex Synthesis UI**.
2. Input the  mandate.
3. Paste CV text for candidates.
4. Click **Assess Candidates**.
5. Watch the AI flag high-risk profiles due to the specific strike scenario while promoting the top strategic choice.
