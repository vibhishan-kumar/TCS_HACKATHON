import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BranchProvider } from './context/BranchContext';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveBranchPage } from './pages/LiveBranchPage';
import { ForecastPage } from './pages/ForecastPage';
import { BottlenecksPage } from './pages/BottlenecksPage';
import { StaffOptimizationPage } from './pages/StaffOptimizationPage';
import { CustomerFlowPage } from './pages/CustomerFlowPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { CustomerExperiencePage } from './pages/CustomerExperiencePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';

export function App() {
  return (
    <BranchProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Core Authenticated App Shell */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="live-branch" element={<LiveBranchPage />} />
            <Route path="forecast" element={<ForecastPage />} />
            <Route path="bottlenecks" element={<BottlenecksPage />} />
            <Route path="staff-optimization" element={<StaffOptimizationPage />} />
            <Route path="customer-flow" element={<CustomerFlowPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="customer-experience" element={<CustomerExperiencePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </BranchProvider>
  );
}

export default App;
