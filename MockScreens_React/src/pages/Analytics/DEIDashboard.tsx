import { useState } from 'react';
import { Users, TrendingUp, AlertCircle, Info } from 'lucide-react';
import {
  deiGenderByDept, deiGenderByLevel, deiHiringFunnel, deiPayEquity
} from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';

const tabs = ['Overview', 'Hiring Funnel', 'Pay Equity', 'Goals'];

export default function DEIDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const totalMale = deiGenderByDept.reduce((s, d) => s + d.male, 0);
  const totalFemale = deiGenderByDept.reduce((s, d) => s + d.female, 0);
  const totalHeadcount = totalMale + totalFemale;
  const femPct = Math.round((totalFemale / totalHeadcount) * 100);

  const leadershipFemale = deiGenderByLevel.slice(2).reduce((s, d) => s + d.female, 0);
  const leadershipTotal = deiGenderByLevel.slice(2).reduce((s, d) => s + d.male + d.female, 0);
  const leaderFemPct = Math.round((leadershipFemale / leadershipTotal) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diversity, Equity & Inclusion</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time representation metrics, pay equity analysis and DEI goals</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700">
          <Info size={14} />
          <span>Self-identified data only · Min cohort size: 5</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Headcount', value: totalHeadcount, sub: 'All employees' },
          { label: 'Women in Workforce', value: `${femPct}%`, sub: `${totalFemale} of ${totalHeadcount}` },
          { label: 'Women in Leadership', value: `${leaderFemPct}%`, sub: 'Manager level & above' },
          { label: 'Pay Equity Gap (Avg)', value: '3.4%', sub: 'Male vs Female adjusted', warn: true },
        ].map(c => (
          <div key={c.label} className={`card ${c.warn ? 'border-yellow-200 bg-yellow-50' : ''}`}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.warn ? 'text-yellow-700' : 'text-gray-900'}`}>{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
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

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Gender Distribution by Department</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={deiGenderByDept} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#ec4899" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-5 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Representation by Level</h3>
            <div className="space-y-3">
              {deiGenderByLevel.map(row => {
                const total = row.male + row.female;
                const femalePct = Math.round((row.female / total) * 100);
                return (
                  <div key={row.level}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span className="font-medium">{row.level}</span>
                      <span>{femalePct}% female ({row.female}/{total})</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="bg-blue-400 h-full rounded-l-full" style={{ width: `${100 - femalePct}%` }} />
                      <div className="bg-pink-400 h-full rounded-r-full" style={{ width: `${femalePct}%` }} />
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400 inline-block" /> Male</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-pink-400 inline-block" /> Female</span>
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="col-span-12">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-sm">
              <AlertCircle size={16} className="text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-yellow-800">Representation Gap: Engineering</p>
                <p className="text-yellow-700 text-xs mt-0.5">
                  Engineering has only 26% female representation (26 of 98). 
                  The DEI goal is 35% by end of FY26. Current hiring pipeline shows 38% female candidates screened — tracking toward goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Hiring Funnel' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Gender Distribution Across Hiring Pipeline</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deiHiringFunnel} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#ec4899" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-4 card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Conversion Rates</h3>
            <div className="space-y-3">
              {deiHiringFunnel.map((row, idx) => {
                const total = row.male + row.female;
                const femalePct = Math.round((row.female / total) * 100);
                const prev = idx > 0 ? deiHiringFunnel[idx - 1] : null;
                const prevTotal = prev ? prev.male + prev.female : null;
                const convRate = prevTotal ? Math.round((total / prevTotal) * 100) : 100;
                return (
                  <div key={row.stage} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-700">{row.stage}</p>
                      <p className="text-xs text-gray-400">{femalePct}% female</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{total}</p>
                      {prevTotal && <p className="text-xs text-gray-400">{convRate}% conv.</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-pink-50 rounded-lg text-xs text-pink-700 border border-pink-100">
              Drop-off between <strong>Interview → Offer</strong> for female candidates (50%) is higher than male (41%). Consider bias review of interview feedback.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Pay Equity' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Pay Equity Analysis by Role</h3>
            <p className="text-xs text-gray-400 mb-4">Adjusted for role, level, location, and tenure. Gap = % difference in average compensation.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100">
                    <th className="pb-2 text-left font-medium">Role</th>
                    <th className="pb-2 text-right font-medium">Male Avg CTC</th>
                    <th className="pb-2 text-right font-medium">Female Avg CTC</th>
                    <th className="pb-2 text-right font-medium">Gap %</th>
                    <th className="pb-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {deiPayEquity.map(row => {
                    const gap = ((row.maleAvg - row.femaleAvg) / row.maleAvg * 100).toFixed(1);
                    const gapNum = parseFloat(gap);
                    return (
                      <tr key={row.role}>
                        <td className="py-3 font-medium text-gray-800">{row.role}</td>
                        <td className="py-3 text-right text-gray-600">₹{(row.maleAvg / 100000).toFixed(1)}L</td>
                        <td className="py-3 text-right text-gray-600">₹{(row.femaleAvg / 100000).toFixed(1)}L</td>
                        <td className={`py-3 text-right font-semibold ${gapNum > 4 ? 'text-red-600' : gapNum > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {gapNum > 0 ? '+' : ''}{gap}%
                        </td>
                        <td className="py-3 text-right">
                          <span className={`badge ${gapNum > 4 ? 'bg-red-100 text-red-600' : gapNum > 2 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                            {gapNum > 4 ? 'Review Required' : gapNum > 2 ? 'Monitor' : 'Equitable'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm">
            <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-red-800">Action Required: Engineering Manager Pay Gap</p>
              <p className="text-red-700 text-xs mt-0.5">
                A 5.9% pay gap exists for Engineering Manager role. This requires HRBP review and potential salary correction before next review cycle (Q2 ACR).
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Goals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-5">
            {[
              { goal: 'Women in Workforce', current: 38, target: 42, unit: '%', deadline: 'Dec 2026' },
              { goal: 'Women in Engineering', current: 26, target: 35, unit: '%', deadline: 'Dec 2026' },
              { goal: 'Women in Leadership', current: leaderFemPct, target: 40, unit: '%', deadline: 'Dec 2027' },
              { goal: 'Pay Equity Gap < 2%', current: 3.4, target: 2, unit: '%', deadline: 'Jun 2026', reverse: true },
            ].map(g => {
              const prog = g.reverse
                ? Math.round(((g.target / g.current) * 100))
                : Math.round((g.current / g.target) * 100);
              const onTrack = g.reverse ? g.current <= g.target * 1.3 : g.current >= g.target * 0.7;
              return (
                <div key={g.goal} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{g.goal}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Target by {g.deadline}</p>
                    </div>
                    <span className={`badge ${onTrack ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {onTrack ? 'On Track' : 'At Risk'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Current: <strong>{g.current}{g.unit}</strong></span>
                    <span className="text-gray-500">Target: <strong>{g.target}{g.unit}</strong></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${onTrack ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${Math.min(prog, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">{Math.min(prog, 100)}% of goal reached</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
