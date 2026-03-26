import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back, Ananya — here\'s your HR overview' },
  '/employees': { title: 'Employee Directory', subtitle: 'Manage all employee records' },
  '/employees/org-chart': { title: 'Organization Chart', subtitle: 'Visual hierarchy of your organization' },
  '/employees/transfers': { title: 'Transfers & Promotions', subtitle: 'Manage employee movements' },
  '/attendance': { title: 'Attendance', subtitle: 'Track and manage daily attendance' },
  '/leave': { title: 'Leave Management', subtitle: 'Leave requests and balances' },
  '/payroll': { title: 'Payroll Processing', subtitle: 'Process and manage payroll runs' },
  '/payroll/compensation': { title: 'Compensation Management', subtitle: 'Salary structures and revisions' },
  '/payroll/tax': { title: 'Tax & Statutory Compliance', subtitle: 'Statutory filings and tax management' },
  '/performance/goals': { title: 'Goals & OKRs', subtitle: 'Track individual and team objectives' },
  '/performance/reviews': { title: 'Review Cycles', subtitle: 'Manage performance review cycles' },
  '/performance/feedback': { title: 'Feedback & 1:1s', subtitle: 'Continuous feedback and meeting notes' },
  '/performance/calibration': { title: 'Calibration', subtitle: 'Rating distribution and calibration' },
  '/recruitment/jobs': { title: 'Job Postings', subtitle: 'Manage open positions' },
  '/recruitment/ats': { title: 'Candidate Pipeline (ATS)', subtitle: 'Track candidates through hiring stages' },
  '/recruitment/onboarding': { title: 'Onboarding', subtitle: 'New hire onboarding workflows' },
  '/learning': { title: 'Learning & Development', subtitle: 'Training courses and learning paths' },
  '/compliance': { title: 'Compliance & Policies', subtitle: 'Policy management and grievances' },
  '/self-service': { title: 'Employee Self-Service', subtitle: 'Your profile, leave, payslips and more' },
  '/analytics': { title: 'Analytics & Reports', subtitle: 'Workforce insights and custom reports' },
};

export default function AppLayout() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] ?? { title: 'HRMS' };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
