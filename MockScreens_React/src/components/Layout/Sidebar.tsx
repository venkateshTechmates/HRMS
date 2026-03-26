import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Clock, CreditCard, Target, Briefcase,
  BookOpen, Shield, UserCircle, BarChart3, ChevronDown, ChevronRight,
  Building2
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  {
    label: 'Employees', icon: Users, children: [
      { label: 'Employee Directory', path: '/employees' },
      { label: 'Org Chart', path: '/employees/org-chart' },
      { label: 'Transfers & Promotions', path: '/employees/transfers' },
    ]
  },
  {
    label: 'Attendance & Leave', icon: Clock, children: [
      { label: 'Attendance', path: '/attendance' },
      { label: 'Leave Management', path: '/leave' },
    ]
  },
  {
    label: 'Payroll', icon: CreditCard, children: [
      { label: 'Payroll Processing', path: '/payroll' },
      { label: 'Compensation', path: '/payroll/compensation' },
      { label: 'Tax & Statutory', path: '/payroll/tax' },
    ]
  },
  {
    label: 'Performance', icon: Target, children: [
      { label: 'Goals & OKRs', path: '/performance/goals' },
      { label: 'Review Cycles', path: '/performance/reviews' },
      { label: 'Feedback & 1:1s', path: '/performance/feedback' },
      { label: 'Calibration', path: '/performance/calibration' },
    ]
  },
  {
    label: 'Recruitment', icon: Briefcase, children: [
      { label: 'Job Postings', path: '/recruitment/jobs' },
      { label: 'Candidates (ATS)', path: '/recruitment/ats' },
      { label: 'Onboarding', path: '/recruitment/onboarding' },
    ]
  },
  { label: 'Learning & Dev', path: '/learning', icon: BookOpen },
  { label: 'Compliance', path: '/compliance', icon: Shield },
  { label: 'Self-Service', path: '/self-service', icon: UserCircle },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(['Employees']);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const isGroupActive = (children: { path: string }[]) =>
    children.some(c => location.pathname === c.path || location.pathname.startsWith(c.path + '/'));

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
          <Building2 size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">HRMS Pro</p>
          <p className="text-xs text-gray-500">HR Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;

          if (item.path) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          }

          const isOpen = openGroups.includes(item.label);
          const active = item.children ? isGroupActive(item.children) : false;

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleGroup(item.label)}
                className={`sidebar-link w-full justify-between ${active ? 'text-blue-600 bg-blue-50' : 'sidebar-link-inactive'}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {item.label}
                </span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {isOpen && item.children && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.children.map(child => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">Ananya Singh</p>
            <p className="text-xs text-gray-500 truncate">HR Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
