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


## Example Demo Data
### Example Mandate
 
> **Lead the 2030 manufacturing pivot** by integrating software-defined quality controls into legacy assembly lines without losing production velocity.
 
---
 
### Example Candidates
 
#### Candidate 1 — Elena Rostova


 Chief EV Supply Chain & Scaling Officer, VoltDynamics
Executive Summary
A hyper-growth scaling executive bringing Silicon Valley speed to legacy hardware problems. I specialize
in rapid EV transitions, software-defined manufacturing, and bypassing bureaucratic bottlenecks to get
products to market. I build agile, autonomous teams that move fast and break legacy constraints.
Professional Experience
VoltDynamics 2020 – Present
Chief EV Supply Chain & Scaling Officer
• Scaled EV production from 5,000 to 120,000 units annually in 3 years.
• Vertically integrated battery packaging and software-hardware integration, bypassing traditional
Tier-1 suppliers.
• Bypassed Board risk parameters to greenlight unproven, high-yield manufacturing tech, resulting
in 30% faster time-to-market.
TechDrive Mobility 2014 – 2020
VP of Advanced Prototyping
• Led the transition from ICE (Internal Combustion) to battery-electric architecture.
• Prioritized rapid iteration and software patches over traditional 6-year development cycles.
Education
MS in Mechanical Engineering, MIT


---
 
#### Candidate 2 — Marcus Vanc


Manufacturing Restructuring, AutoTech Heavy Industrie

Executive Summary
A ruthless optimizer and turnaround specialist with 15+ years of experience salvaging distressed manufacturing assets. Known for executing aggressive cost-reduction mandates, restructuring bloated middle management, and driving immediate bottom-line impact.
Professional Experience
AutoTech Heavy Industries — 2019–Present
SVP Global Manufacturing Restructuring

Mandated by the Board to stop bleeding capital across 4 European plants.
Executed a $400M cost-out program within 18 months via 22% reduction in force and aggressive supplier renegotiation.
Increased output efficiency by 18% by dismantling union-friendly schedules and enforcing rigid, data-driven KPIs.

Stahl & Söhne Industrials — 2012–2019
VP of Operations

Consolidated 3 regional facilities into 1 mega-plant; maintained operations through two major union strikes.
Replaced the entire legacy leadership team within 6 months to enforce a culture of "metrics over feelings."

Education
MBA, London Business School
BS in Industrial Engineering
---
 
#### Candidate 3 — Julian Thorne
 
Executive SummaryA seasoned, stabilizing leader with 25 years of experience in European automotive manufacturing. Specialist in high-quality steady-state operations and complex stakeholder alignment. Philosophy: sustainable growth requires total consensus between board, workers’ council, and local governments.Professional ExperienceLegacyMotors GmbH 2015 – PresentHead of European Production Operations• Manage a stable, highly tenured workforce of 12,000 across Germany and France.• Negotiated three major union contracts without strikes, prioritizing job security in exchange for
phased automation.• Led 5-year hybrid-vehicle integration roadmap; consistently hit all quality and safety targets.LegacyMotors GmbH 2005 – 2015Plant Director, Munich Facility• Maintained highest quality-control rating in the global network for 7 consecutive years.• Fostered a loyal management team with a 2% turnover rate.EducationDiplom-Ingenieur (Mechanical Engineering), Technical University of Munich



## Demo  Video


https://github.com/user-attachments/assets/b9a20e2d-44a7-4fe3-93af-8448fe4c2733
