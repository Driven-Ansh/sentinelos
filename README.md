# SentinelOS — The Operating System for Autonomous Agents

[![Deploy Status](https://img.shields.io/badge/Render-Live-success?style=flat-square&logo=render&logoColor=white)](https://sentinelos-platform.onrender.com)
[![Next.js Version](https://img.shields.io/badge/Next.js-15/16-blue?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React Version](https://img.shields.io/badge/React-19-cyan?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

SentinelOS is a unified trust, identity, and runtime governance layer designed for autonomous AI agents. Built for the future where enterprise workflows are driven by AI, SentinelOS ensures that agents are secure, certified, and operate strictly within authorized scopes.

**Live Demo:** [https://sentinelos-platform.onrender.com](https://sentinelos-platform.onrender.com)

---

## 🌌 Core Features & Modules

### 1. Developer Hub & Certification Engine
* **Automated 12-Stage Pipeline**: Simulates checks from static code analysis, vulnerability scanning, and permission validation to adversarial prompt injection fuzzing and behavioral sandbox runs.
* **Dynamic Registries**: Developers can register and submit new agents. The system runs them through the automated certification flow, registers their cryptographic credentials, and dynamically inserts them into the Developer Hub list and Marketplace.

### 2. Master Agent Mission Control
* **Autonomous Decision Gating**: SentinelOS operates a supervisory Master Agent that intercepts security events and blocks threats 24/7.
* **Interactive Threat Simulator**: Allows operators to trigger real-world security scenarios (Prompt Injection, Data Exfiltration, Privilege Escalation) and observe the Master Agent's multi-step cognitive reasoning, dynamic statistics changes, and real-time response.
* **SVG Relationship Graph**: Dynamically updates, highlights, and pulses nodes in red to visualize packet streams and threat hotspots when an incident occurs.

### 3. Permission Firewall
* **Granular Gates**: Visualizes agent-to-permission mappings in a reactive matrix.
* **Operator Approvals**: Intercepts elevated privilege requests (network, system write, database access) and routes them through the Master Agent for approval or quarantine.

### 4. Interactive Demo Agents
SentinelOS monitors and governs five specialized enterprise agents, each containing a fully-functional sub-dashboard:
* **🛡️ Cyber Defense Agent**: Features an interactive network topology graph, live threat feeds, and security configuration controls.
* **🌐 Disaster Intelligence Agent**: Visualizes disaster coordinates on a global map, with real-time response status feeds and damage metrics.
* **🔬 Research Intelligence Agent**: Builds interactive scientific research nodes, trend analytics, and automated abstract searches.
* **⚕️ Healthcare Intelligence Agent**: Tracks clinical patient assessments, risk matrices, and HIPAA compliance indicators.
* **📊 Financial Intelligence Agent**: Renders mock asset allocations, risk ratings, and live market price charts using Recharts.

---

## 🛠️ Technology Stack

* **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
* **Styling**: Tailwind CSS (with customized sleek dark mode and cybernetic glassmorphism styling tokens)
* **Animation & Visuals**: [Framer Motion](https://www.framer.com/motion/) (for page transitions, loading spinners, and graph packet animations)
* **Charts**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Driven-Ansh/sentinelos.git
   cd sentinelos
   ```

2. Install dependencies:
   Next.js 16 and React 19 utilize newer peer dependency boundaries. Install with:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Deployment

SentinelOS is configured for a **Static HTML Export**, allowing it to be compiled into zero-runtime static pages and served lightning-fast via CDN without spin-up delays.

### Build and Export

Compile and export the build into the static `out` folder:
```bash
npm run build
```

### Hosting on Render

This repository includes a `render.yaml` Blueprint specification for easy hosting on Render:
1. Render automatically installs dependencies using `.npmrc` configuration (`legacy-peer-deps=true`).
2. It builds the site using `npm run build` and serves files from the `out` directory as a static website.
