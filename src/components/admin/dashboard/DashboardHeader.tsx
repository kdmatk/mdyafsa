
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface DashboardHeaderProps {
  language: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  language,
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
    <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-md text-mdyafae hover:bg-mdyafae/10 transition-colors"
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
          alt="MDYAF مضياف" 
          className="h-8 w-auto" 
        />
      </Link>
      <div> {/* Empty div for flex spacing */} </div>
    </div>
  );
};
