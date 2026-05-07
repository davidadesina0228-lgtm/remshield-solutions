import type { Metadata } from 'next';
import './dashboard.css';

export const metadata: Metadata = {
  title: 'Tenacious — Campaign Intelligence Center',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="dashboard-scope">{children}</div>;
}
