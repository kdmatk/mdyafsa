
import { ReactNode } from 'react';

interface DashboardContentProps {
  children: ReactNode;
}

export const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
};
