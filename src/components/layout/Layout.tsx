import { Outlet } from 'react-router-dom'
import {Menu} from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Common icon classes for color and hover


  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mobile Header - Hidden on desktop */}
      <header className="h-16 border-b flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-background z-20 lg:hidden">
        {/* Left: Spacer */}
        <div className="w-5" />

        {/* Center: Logo */}
        <div className="flex items-center">
          <img
            src="/logo_main.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Right: Burger Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-accent rounded-md"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20 mt-16 lg:mt-0">
        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
          <div className="p-6">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
      
      <Toaster />
    </div>
  )
} 