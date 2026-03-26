import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';

import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeDirectory from './pages/Employees/EmployeeDirectory';
import OrgChart from './pages/Employees/OrgChart';
import TransfersPromotions from './pages/Employees/TransfersPromotions';
import Attendance from './pages/Attendance/Attendance';
import LeaveManagement from './pages/Attendance/LeaveManagement';
import PayrollProcessing from './pages/Payroll/PayrollProcessing';
import CompensationManagement from './pages/Payroll/CompensationManagement';
import TaxCompliance from './pages/Payroll/TaxCompliance';
import GoalsOKRs from './pages/Performance/GoalsOKRs';
import ReviewCycles from './pages/Performance/ReviewCycles';
import FeedbackOneOnOnes from './pages/Performance/FeedbackOneOnOnes';
import Calibration from './pages/Performance/Calibration';
import JobPostings from './pages/Recruitment/JobPostings';
import ATS from './pages/Recruitment/ATS';
import Onboarding from './pages/Recruitment/Onboarding';
import LMS from './pages/Learning/LMS';
import PolicyManagement from './pages/Compliance/PolicyManagement';
import SelfServicePortal from './pages/SelfService/SelfServicePortal';
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />

          {/* Employees */}
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="employees/org-chart" element={<OrgChart />} />
          <Route path="employees/transfers" element={<TransfersPromotions />} />

          {/* Attendance & Leave */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<LeaveManagement />} />

          {/* Payroll */}
          <Route path="payroll" element={<PayrollProcessing />} />
          <Route path="payroll/compensation" element={<CompensationManagement />} />
          <Route path="payroll/tax" element={<TaxCompliance />} />

          {/* Performance */}
          <Route path="performance/goals" element={<GoalsOKRs />} />
          <Route path="performance/reviews" element={<ReviewCycles />} />
          <Route path="performance/feedback" element={<FeedbackOneOnOnes />} />
          <Route path="performance/calibration" element={<Calibration />} />

          {/* Recruitment */}
          <Route path="recruitment/jobs" element={<JobPostings />} />
          <Route path="recruitment/ats" element={<ATS />} />
          <Route path="recruitment/onboarding" element={<Onboarding />} />

          {/* Learning */}
          <Route path="learning" element={<LMS />} />

          {/* Compliance */}
          <Route path="compliance" element={<PolicyManagement />} />

          {/* Self-Service */}
          <Route path="self-service" element={<SelfServicePortal />} />

          {/* Analytics */}
          <Route path="analytics" element={<AnalyticsDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
