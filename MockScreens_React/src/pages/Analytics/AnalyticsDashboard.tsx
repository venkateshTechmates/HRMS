import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { Download, RefreshCw, Filter, TrendingUp, TrendingDown, Users, DollarSign, Calendar, Target, AlertTriangle, BarChart2 } from 'lucide-react';
import { headcountTrend, departmentHeadcount, attritionData, employees } from '../../data/mockData';

const hiringFunnel = [
  { name: 'Applied', value: 320, fill: '#3b82f6' },
  { name: 'Screened', value: 185, fill: '#6366f1' },
  { name: 'Interviewed', value: 72, fill: '#8b5cf6' },
  { name: 'Offered', value: 28, fill: '#a855f7' },
  { name: 'Hired', value: 18, fill: '#22c55e' },
];

const performanceDist = [
  { rating: 'Outstanding (5)', count: 12 },
  { rating: 'Exceeds (4)', count: 38 },
  { rating: 'Meets (3)', count: 55 },
  { rating: 'Below (2)', count: 14 },
  { rating: 'Poor (1)', count: 4 },
];

const payrollCostTrend = [
  { month: 'Oct', cost: 42 }, { month: 'Nov', cost: 43 }, { month: 'Dec', cost: 45 },
  { month: 'Jan', cost: 44 }, { month: 'Feb', cost: 46 }, { month: 'Mar', cost: 47 },
];

const attritionRisk = employees.slice(0, 6).map((e, i) => ({
  name: e.name,
  dept: e.department,
  score: [82, 67, 55, 78, 45, 91][i],
  reason: ['Low engagement', 'Below market pay', 'No promotion', 'Excess OT', 'Healthy', 'Manager conflict'][i],
}));

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#14b8a6'];

const dashboards = ['Headcount & Attrition', 'Payroll Cost', 'Hiring Funnel', 'Performance Distribution', 'Attendance', 'Predictive Risk'];

export default function AnalyticsDashboard() {
  const [activeDashboard, setActiveDashboard] = useState(0);
  const [dateRange, setDateRange] = useState('Last 6 Months');

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {dashboards.map((d, i) => (
            <button
              key={d}
              onClick={() => setActiveDashboard(i)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${activeDashboard === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select className="form-select py-1.5 text-sm" value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>YTD</option>
            <option>Custom</option>
          </select>
          <button className="btn-secondary flex items-center gap-1 text-sm py-1.5"><RefreshCw size={14} />Refresh</button>
          <button className="btn-primary flex items-center gap-1 text-sm py-1.5"><Download size={14} />Export</button>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Headcount', value: employees.length, delta: '+3', deltaPos: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Monthly Payroll Cost', value: '₹47L', delta: '+₹1L', deltaPos: false, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Attrition (YTD)', value: '8.4%', delta: '-1.2%', deltaPos: true, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Avg. Performance', value: '3.4 / 5', delta: '+0.2', deltaPos: true, icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map(kpi => (
          <div key={kpi.label} className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className={`${kpi.bg} p-2.5 rounded-xl`}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <p className="text-xs text-gray-500">{kpi.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className={`text-xs mt-0.5 font-medium ${kpi.deltaPos ? 'text-green-600' : 'text-red-500'}`}>
              {kpi.delta} vs prev period
            </p>
          </div>
        ))}
      </div>

      {/* Headcount & Attrition View */}
      {activeDashboard === 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="section-title mb-4">Headcount Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={headcountTrend}>
                <defs>
                  <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#hcGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Department Headcount</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={departmentHeadcount} dataKey="count" nameKey="dept" cx="50%" cy="50%" outerRadius={85} label={({ dept, pct }) => `${dept} ${pct}%`} labelLine={false}>
                  {departmentHeadcount.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card xl:col-span-2">
            <h3 className="section-title mb-4">Monthly Attrition</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attritionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="voluntary" name="Voluntary" fill="#ef4444" radius={[3, 3, 0, 0]} />
                <Bar dataKey="involuntary" name="Involuntary" fill="#f97316" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Payroll Cost View */}
      {activeDashboard === 1 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card xl:col-span-2">
            <h3 className="section-title mb-4">Monthly Payroll Cost Trend (₹ Lakhs)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={payrollCostTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}L`} />
                <Tooltip formatter={v => [`₹${v}L`, 'Cost']} />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="section-title mb-4">Cost by Department</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentHeadcount} layout="vertical" barSize={12}>
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}L`} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Est. Cost (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="section-title mb-3">Payroll Cost Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Basic Salary', pct: 45, color: 'bg-blue-500' },
                { label: 'HRA', pct: 18, color: 'bg-indigo-400' },
                { label: 'Allowances', pct: 22, color: 'bg-purple-400' },
                { label: 'Employer PF/ESI', pct: 10, color: 'bg-green-400' },
                { label: 'Bonuses / Incentives', pct: 5, color: 'bg-yellow-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${item.color} rounded-full h-2`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hiring Funnel View */}
      {activeDashboard === 2 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="section-title mb-4">Hiring Funnel</h3>
            <div className="space-y-3">
              {hiringFunnel.map((stage, i) => (
                <div key={stage.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{stage.name}</span>
                    <span className="font-bold text-gray-900">{stage.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-5 relative">
                    <div
                      className="rounded-full h-5 transition-all"
                      style={{ width: `${(stage.value / 320) * 100}%`, backgroundColor: stage.fill }}
                    />
                    {i > 0 && (
                      <span className="absolute right-2 top-0 text-xs text-gray-600 leading-5">
                        {Math.round((stage.value / hiringFunnel[i - 1].value) * 100)}% conv.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="section-title mb-4">Hiring Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Time to Fill', value: '32 days', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Offer Acceptance', value: '64%', icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Cost per Hire', value: '₹28K', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Quality of Hire', value: '4.1/5', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`${m.bg} p-2.5 rounded-xl`}>
                    <m.icon size={18} className={m.color} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{m.value}</p>
                    <p className="text-xs text-gray-500">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Performance Distribution View */}
      {activeDashboard === 3 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="section-title mb-4">Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="rating" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Employees" radius={[4, 4, 0, 0]}>
                  {performanceDist.map((_, i) => <Cell key={i} fill={['#22c55e', '#84cc16', '#3b82f6', '#f59e0b', '#ef4444'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="section-title mb-4">Distribution Summary</h3>
            <div className="space-y-3">
              {performanceDist.map((d, i) => (
                <div key={d.rating} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ['#22c55e', '#84cc16', '#3b82f6', '#f59e0b', '#ef4444'][i] }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-700">{d.rating}</span>
                      <span className="font-semibold text-gray-900">{d.count} ({Math.round((d.count / 123) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="rounded-full h-1.5" style={{ width: `${(d.count / 55) * 100}%`, backgroundColor: ['#22c55e', '#84cc16', '#3b82f6', '#f59e0b', '#ef4444'][i] }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Attendance View */}
      {activeDashboard === 4 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card xl:col-span-2">
            <h3 className="section-title mb-4">Monthly Attendance Rate</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={headcountTrend.map((d, i) => ({ ...d, rate: 91 + (i % 3) }))}>
                <defs>
                  <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={v => [`${v}%`, 'Attendance Rate']} />
                <Area type="monotone" dataKey="rate" stroke="#22c55e" fill="url(#attGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="section-title mb-3">Absenteeism by Department</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentHeadcount.map(d => ({ ...d, absentPct: Math.round(Math.random() * 5 + 2) }))} layout="vertical" barSize={12}>
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="absentPct" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Absent %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="section-title mb-3">Late Arrivals (Top 5)</h3>
            <div className="space-y-3">
              {employees.slice(0, 5).map((e, i) => (
                <div key={e.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs w-4">{i + 1}.</span>
                    <span className="text-gray-900">{e.name}</span>
                  </div>
                  <span className="badge-yellow">{[6, 5, 4, 4, 3][i]} late days</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Predictive Analytics View */}
      {activeDashboard === 5 && (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800">Attrition Risk Alert</p>
              <p className="text-sm text-orange-700 mt-0.5">AI model identified <strong>3 employees</strong> at High attrition risk (score &gt; 75). Recommended: HR intervention within 30 days.</p>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Employee Attrition Risk Scores</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="table-header text-left">Employee</th>
                  <th className="table-header">Department</th>
                  <th className="table-header">Risk Score</th>
                  <th className="table-header">Risk Level</th>
                  <th className="table-header">Primary Reason</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {attritionRisk.sort((a, b) => b.score - a.score).map(emp => {
                  const level = emp.score >= 75 ? 'High' : emp.score >= 50 ? 'Medium' : 'Low';
                  return (
                    <tr key={emp.name} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="table-cell font-medium text-gray-900">{emp.name}</td>
                      <td className="table-cell text-center text-gray-600">{emp.dept}</td>
                      <td className="table-cell text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`rounded-full h-1.5 ${emp.score >= 75 ? 'bg-red-500' : emp.score >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${emp.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-800">{emp.score}</span>
                        </div>
                      </td>
                      <td className="table-cell text-center">
                        <span className={level === 'High' ? 'badge-red' : level === 'Medium' ? 'badge-yellow' : 'badge-green'}>{level}</span>
                      </td>
                      <td className="table-cell text-center text-gray-600 text-xs">{emp.reason}</td>
                      <td className="table-cell text-right">
                        <button className="text-xs text-blue-600 hover:underline">Intervene</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Scheduled Reports */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title">Scheduled Reports</h3>
              <button className="btn-primary text-sm">+ Schedule Report</button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Monthly HR Metrics', freq: 'Monthly', nextRun: 'Apr 1', recipients: 'CHRO, CFO', format: 'PDF' },
                { name: 'Weekly Attrition Dashboard', freq: 'Weekly', nextRun: 'Mon', recipients: 'HRBP Team', format: 'Excel' },
                { name: 'Payroll Summary', freq: 'Monthly', nextRun: 'Mar 31', recipients: 'Finance', format: 'CSV' },
              ].map(r => (
                <div key={r.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.freq} · Next: {r.nextRun} · To: {r.recipients}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="badge-blue">{r.format}</span>
                    <button className="text-xs text-blue-600 hover:underline">Edit</button>
                    <button className="text-xs text-gray-500 hover:underline">Pause</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
