import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Target } from 'lucide-react';
import {
  headcountPlan, orgHealthScores, attritionForecast, headcountTrend, attritionData, departmentHeadcount
} from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid, ComposedChart, ReferenceLine
} from 'recharts';

const tabs = ['Headcount Plan', 'Attrition Forecast', 'Org Health'];

const healthColor = (v: number) => v >= 80 ? 'text-green-600' : v >= 65 ? 'text-yellow-600' : 'text-red-600';
const healthBg = (v: number) => v >= 80 ? 'bg-green-500' : v >= 65 ? 'bg-yellow-500' : 'bg-red-500';

export default function WorkforcePlanning() {
  const [activeTab, setActiveTab] = useState('Headcount Plan');

  const totalPlanned = headcountPlan.reduce((s, r) => s + r.planned, 0);
  const totalActual = headcountPlan.reduce((s, r) => s + r.actual, 0);
  const totalOpen = headcountPlan.reduce((s, r) => s + r.open, 0);
  const fillRate = Math.round((totalActual / totalPlanned) * 100);

  // Combine historical + forecast for chart
  const combinedTrend = [
    ...headcountTrend.map(h => ({ ...h, type: 'Actual' })),
    { month: 'Apr', count: 251, type: 'Forecast' },
    { month: 'May', count: 255, type: 'Forecast' },
    { month: 'Jun', count: 260, type: 'Forecast' },
  ];

  const attritionCombined = [
    ...attritionData,
    ...attritionForecast.map(f => ({ month: f.month, rate: f.forecast, forecast: true })),
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workforce Planning</h1>
          <p className="text-sm text-gray-500 mt-0.5">Headcount plans, attrition forecasts, and org health scores</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Target size={15} /> Update Headcount Plan
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Annual Headcount Plan', value: totalPlanned, sub: 'FY 2026 target', icon: Target },
          { label: 'Actual (Current)', value: totalActual, sub: `${fillRate}% filled`, icon: Users },
          { label: 'Open Positions', value: totalOpen, sub: 'Across all departments', icon: TrendingUp },
          { label: 'Variance', value: totalPlanned - totalActual, sub: 'Plan vs actual gap', icon: AlertTriangle, warn: true },
        ].map(c => {
          const Icon = c.icon;
          return (
            <div key={c.label} className={`card ${c.warn ? 'border-yellow-100 bg-yellow-50' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500">{c.label}</p>
                <Icon size={14} className={c.warn ? 'text-yellow-500' : 'text-gray-400'} />
              </div>
              <p className={`text-3xl font-bold ${c.warn ? 'text-yellow-700' : 'text-gray-900'}`}>{c.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Headcount Plan' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Plan vs Actual vs Open — By Department</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={headcountPlan} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" name="Planned" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="open" name="Open Positions" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-4 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Department Fill Rate</h3>
            <div className="space-y-3">
              {headcountPlan.map(row => {
                const pct = Math.round((row.actual / row.planned) * 100);
                const color = pct >= 90 ? 'bg-green-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div key={row.department}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span className="font-medium">{row.department}</span>
                      <span>{row.actual}/{row.planned} <span className="text-gray-400">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                    {row.open > 0 && (
                      <p className="text-xs text-yellow-600 mt-0.5">{row.open} open position{row.open > 1 ? 's' : ''}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Headcount Trend (Actual + 3-Month Forecast)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={combinedTrend} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[210, 270]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <ReferenceLine x="Apr" stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Forecast →', fontSize: 10, fill: '#94a3b8' }} />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Attrition Forecast' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Attrition Rate: Historical + 6-Month Forecast</h3>
            <p className="text-xs text-gray-400 mb-4">Historical (Oct–Mar) is actual. Apr–Sep is model-predicted based on attrition risk scores.</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={attritionCombined} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[3, 7]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'Attrition Rate']} />
                <ReferenceLine x="Apr" stroke="#94a3b8" strokeDasharray="4 4" />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '5% threshold', fontSize: 10, fill: '#ef4444', position: 'right' }} />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} name="Actual / Forecast" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-4 space-y-4">
            <div className="card">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Forecast Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Apr forecast</span><span className="font-semibold text-yellow-600">4.9%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Peak (Jun)</span><span className="font-semibold text-red-600">5.4%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Trend (Sep)</span><span className="font-semibold text-green-600">4.4%</span></div>
                <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-gray-500">Projected exits (6mo)</span><span className="font-semibold">14–18 FTEs</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Replacement cost est.</span><span className="font-semibold">₹68–88L</span></div>
              </div>
            </div>

            <div className="card bg-red-50 border border-red-100">
              <div className="flex items-start gap-2">
                <AlertTriangle size={15} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">High Risk Departments</p>
                  <ul className="text-xs text-red-700 mt-1 space-y-1">
                    <li>• Engineering: 6.2% predicted (Jun)</li>
                    <li>• Sales: 7.1% predicted (May)</li>
                  </ul>
                  <p className="text-xs text-red-600 mt-2">Recommend targeted retention programs and manager check-ins for high-risk cohorts.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Attrition Risk Factors</h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[
                  { factor: 'Tenure 1–2 years', impact: 'High' },
                  { factor: 'No recent promotion', impact: 'High' },
                  { factor: 'Manager NPS < 6', impact: 'Medium' },
                  { factor: 'Below-market comp', impact: 'High' },
                  { factor: 'Low learning activity', impact: 'Medium' },
                ].map(f => (
                  <div key={f.factor} className="flex justify-between">
                    <span>{f.factor}</span>
                    <span className={`font-semibold ${f.impact === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>{f.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Org Health' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Org Health Scores by Department</h3>
            <p className="text-xs text-gray-400 mb-4">Engagement: pulse survey score. Retention: % staying 12+ months. Time in Role: avg months in current role.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100">
                    <th className="pb-2 text-left font-medium">Department</th>
                    <th className="pb-2 text-center font-medium">Engagement Score</th>
                    <th className="pb-2 text-center font-medium">12-Month Retention</th>
                    <th className="pb-2 text-center font-medium">Avg Time in Role</th>
                    <th className="pb-2 text-center font-medium">Overall Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orgHealthScores.map(row => {
                    const overall = Math.round((row.engagement + row.retention) / 2);
                    return (
                      <tr key={row.department}>
                        <td className="py-3 font-medium text-gray-800">{row.department}</td>
                        <td className="py-3 text-center">
                          <span className={`font-semibold ${healthColor(row.engagement)}`}>{row.engagement}</span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full mx-auto mt-1">
                            <div className={`h-1.5 rounded-full ${healthBg(row.engagement)}`} style={{ width: `${row.engagement}%` }} />
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`font-semibold ${healthColor(row.retention)}`}>{row.retention}%</span>
                        </td>
                        <td className="py-3 text-center text-gray-600">{row.timeInRole} months</td>
                        <td className="py-3 text-center">
                          <span className={`badge ${overall >= 80 ? 'bg-green-100 text-green-700' : overall >= 65 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {overall >= 80 ? 'Healthy' : overall >= 65 ? 'Watch' : 'At Risk'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Engagement vs Retention Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={orgHealthScores} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={75} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#94a3b8' }} />
                <Bar dataKey="engagement" name="Engagement Score" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="retention" name="Retention %" fill="#22c55e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
