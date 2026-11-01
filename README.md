# BranchFlow AI
### Intelligent Branch Service Load & Customer Experience Optimizer

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**BranchFlow AI** is an enterprise-grade AI-powered banking branch operations command center. It empowers branch directors and regional operations managers to forecast footfall, identify service bottlenecks in real time, reallocate workforce dynamically, eliminate customer waiting times, and deflect visitors to digital banking channels.

---

## 🚀 Key Modules & Capabilities

1. **Operations Command Center (`/dashboard`)**
   - 5 Real-Time KPI Cards (Current Footfall, Average Wait Time, Branch Load %, Available Staff, Customer Satisfaction CSAT).
   - Neural Customer Load Forecast with interactive timeframes (*Today*, *Tomorrow*, *Next 7 Days*) and peak threshold alerts.
   - Live service counter telemetry across 5 core banking desks.
   - Automated AI Bottleneck Detection callouts with 1-click mitigation actions.

2. **AI Workforce Optimization (`/staff-optimization`)**
   - Algorithmic before-and-after staff allocation matrix.
   - Projected SLA impact (-45.8% wait time reduction without increasing payroll hours).
   - 1-click workforce rebalancing with instant recalculation.

3. **Customer Flow & Digital Redirection (`/customer-flow`)**
   - Channel suitability matrix classifying queue demand into digital-eligible vs in-person mandatory.
   - Interactive Recharts Donut & Grouped Bar Chart comparisons.
   - Mobile SMS deep-link dispatch simulation to deflect routine tasks (balance inquiries, statements) to mobile banking.

4. **What-If Operational Simulator (`/simulator`)**
   - Real-time sandbox to simulate the operational impact of adding staff, deflecting customers digitally, or activating standby counters.
   - Side-by-side comparative analytics chart.
   - 1-click "Apply Simulation as Action Plan" to commit simulated parameters to live branch operations.

5. **Customer Experience Self-Service Kiosk (`/customer-experience`)**
   - Lobby terminal mode for arriving customers.
   - Service selection with live wait estimates.
   - Digital fast-track alternative with scannable QR pass (2 min completion vs 24 min in-branch wait).
   - Real-time nearby branch load comparison (Hyderabad Central, Financial District, Gachibowli).

6. **Historical Analytics & Executive Intelligence (`/analytics`)**
   - Multi-dimensional trends (day-wise footfall, wait time curves, capacity utilization).
   - Date range and service filters.
   - Executive AI summaries highlighting weekly patterns and operational risks.

7. **Floating AI Operations Co-Pilot**
   - Context-aware chatbot with pre-configured quick prompts.
   - Synthesizes answers using real-time branch telemetry and embeds 1-click action triggers inside chat.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (Fintech design system with slate navy, financial blue, and emerald accents)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Tooling**: Vite 8, PostCSS, Autoprefixer

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vibhishan-kumar/TCS_HACKATHON.git
cd TCS_HACKATHON

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
# Typecheck and build for production
npm run build

# Preview production bundle
npm run preview
```

---

## 🏢 Demo Flow

1. **Login**: Click **"1-Click Demo Login"** on `/login` to enter as Branch Director.
2. **Dashboard**: Observe the Account Opening bottleneck alert (94% load, 24 min wait).
3. **Optimize**: Click **"Reallocate 1 Staff Immediately"** to see live metrics drop to 13 min wait.
4. **Simulate**: Navigate to **What-If Simulator**, tweak parameters, and apply the action plan.
5. **Kiosk**: Switch to **Customer Experience** to view the self-service flow and nearby branch options.

# Made with love from UoH students !
Contributors: Vibhishan, Rishabh, Lokesh, Ashish, Manas
