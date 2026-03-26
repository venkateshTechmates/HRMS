import {
  Users, UserCheck, TrendingUp, Briefcase, Clock, AlertCircle,
  CreditCard, Target, BookOpen, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  dashboardMetrics, headcountTrend, departmentHeadcount,
  attritionData, leaveRequests, payrollRecords
} from '../../data/mockData';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  'Engineering': '#3b82f6',
  'Sales': '#10b981',
  'Finance': '#f59e0b',
  'HR': '#8b5cf6',
  'Marketing': '#ec4899',
  'Operations': '#6b7280',
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  link?: string;
}

function MetricCard({ title, value, change, changeType, icon: Icon, iconBg, iconColor, link }: MetricCardProps) {
  const content = (
    <div className="metric-card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon size={20} className={iconColor} />
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            changeType === 'up' ? 'bg-green-100 text-green-700' :
            changeType === 'down' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
      </div>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}

export default function Dashboard() {
  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;
  const payrollPending = payrollRecords.filter(p => p.status === 'Pending' || p.status === 'On Hold').length;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Employees"
          value={dashboardMetrics.totalEmployees}
          change="+12 this month"
          changeType="up"
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          link="/employees"
        />
        <MetricCard
          title="Active Employees"
          value={dashboardMetrics.activeEmployees}
          change="97.2% active"
          changeType="up"
          icon={UserCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          link="/employees"
        />
        <MetricCard
          title="Open Positions"
          value={dashboardMetrics.openPositions}
          change="5 new this week"
          changeType="neutral"
          icon={Briefcase}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          link="/recruitment/jobs"
        />
        <MetricCard
          title="Attrition Rate"
          value={`${dashboardMetrics.attritionRate}%`}
          change="-0.3% vs last month"
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          link="/analytics"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Attendance"
          value={`${dashboardMetrics.attendanceRate}%`}
          change="223 present"
          changeType="up"
          icon={Clock}
          iconBg="bg-teal-100"
          iconColor="text-teal-600"
          link="/attendance"
        />
        <MetricCard
          title="Pending Leaves"
          value={pendingLeaves}
          change="Need approval"
          changeType="neutral"
          icon={AlertCircle}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          link="/leave"
        />
        <MetricCard
          title="Payroll Status"
          value={dashboardMetrics.payrollStatus}
          change={`${payrollPending} actions needed`}
          changeType="neutral"
          icon={CreditCard}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
          link="/payroll"
        />
        <MetricCard
          title="Review Completion"
          value={`${dashboardMetrics.reviewCompletion}%`}
          change="Q1 Check-in"
          changeType="neutral"
          icon={Target}
          iconBg="bg-rose-100"
          iconColor="text-rose-600"
          link="/performance/reviews"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount Trend */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Headcount Trend</h2>
            <span className="badge-blue">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={headcountTrend}>
              <defs>
                <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[200, 260]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} fill="url(#hcGrad)" name="Headcount" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">By Department</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={departmentHeadcount} dataKey="count" nameKey="department" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                {departmentHeadcount.map((entry) => (
                  <Cell key={entry.department} fill={statusColors[entry.department] ?? '#6b7280'} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attrition */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Attrition Rate</h2>
            <span className="badge-gray">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="rate" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Leave Approvals */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Pending Approvals</h2>
            <Link to="/leave" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {leaveRequests.filter(l => l.status === 'Pending').map(lr => (
              <div key={lr.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                  {lr.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{lr.employeeName}</p>
                  <p className="text-xs text-gray-500">{lr.type} · {lr.days} day{lr.days > 1 ? 's' : ''}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2.5 py-1 rounded-md font-medium transition-colors">Approve</button>
                  <button className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2.5 py-1 rounded-md font-medium transition-colors">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h2 className="section-title mb-4">Module Summary</h2>
          <div className="space-y-4">
            {[
              { label: 'Payroll Processed', value: `₹${(dashboardMetrics.totalPayroll / 100000).toFixed(1)}L`, sub: 'March 2026', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Training Completion', value: `${dashboardMetrics.trainingCompletion}%`, sub: 'Mandatory courses', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'New Hires (MTD)', value: dashboardMetrics.newHires, sub: 'This month', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Review Completion', value: `${dashboardMetrics.reviewCompletion}%`, sub: 'Q1 Check-in', icon: Target, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={16} className={item.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Targets */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">KPI Progress — Annual Targets</h2>
          <Link to="/analytics" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
            Full report <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Payroll Error Rate', current: '0.8%', target: '<0.5%', progress: 60, color: 'bg-blue-500' },
            { label: 'Time-to-Hire', current: '32 days', target: '<28 days', progress: 75, color: 'bg-green-500' },
            { label: 'Self-Service Adoption', current: '64%', target: '>80%', progress: 80, color: 'bg-purple-500' },
            { label: 'HR Ticket Resolution', current: '6.2 hrs', target: '<4 hrs', progress: 45, color: 'bg-yellow-500' },
            { label: 'Compliance Pass Rate', current: '89%', target: '100%', progress: 89, color: 'bg-teal-500' },
            { label: 'eNPS Score', current: '38', target: '>45', progress: 84, color: 'bg-pink-500' },
          ].map(kpi => (
            <div key={kpi.label} className="space-y-2">
              <p className="text-xs font-medium text-gray-600 leading-tight">{kpi.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-gray-900">{kpi.current}</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`${kpi.color} rounded-full h-1.5 transition-all`} style={{ width: `${kpi.progress}%` }} />
              </div>
              <p className="text-xs text-gray-400">Target: {kpi.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
