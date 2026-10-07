import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { NotificationDrawer } from './NotificationDrawer';
import { ToastContainer } from '../common/ToastContainer';
import { AiAssistantDrawer } from '../ai/AiAssistantDrawer';

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sidebar (Desktop persistent, Mobile off-canvas) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all duration-200">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Modals & Overlays */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <ToastContainer />
      <AiAssistantDrawer />
    </div>
  );
};
