import { useState } from 'react';
import { Shield, Star, AlertTriangle, CheckCircle2, TrendingUp, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { criticalRoles, hipoEmployees, type CriticalRole } from '../../data/mockData';

const readinessColors: Record<string, string> = {
  'Ready Now': 'bg-green-100 text-green-700 border border-green-200',
  'Ready in 1-2 Years': 'bg-blue-100 text-blue-700 border border-blue-200',
  'Ready in 3-5 Years': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
};

const riskColors: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const attritionRiskColors: Record<string, string> = {
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-green-600',
};

export default function SuccessionPlanning() {
  const [activeTab, setActiveTab] = useState<'critical-roles' | 'hipo' | 'pipeline'>('critical-roles');
  const [expanded, setExpanded] = useState<string | null>('CR001');

  const readyNowCount = criticalRoles.filter(r => r.successors.some(s => s.readiness === 'Ready Now')).length;
  const zeroSuccessors = criticalRoles.filter(r => r.successors.length === 0).length;
  const hipoAtRisk = hipoEmployees.filter(h => h.attritionRisk === 'High').length;
  const coverageRatio = (criticalRoles.reduce((s, r) => s + r.successors.length, 0) / criticalRoles.length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Succession Planning</h1>
          <p className="text-sm text-gray-500 mt-0.5">Critical role coverage, HiPo talent tracking, and talent pipeline health</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Shield size={15} /> Designate Critical Role
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Star size={15} /> Tag HiPo Employee
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Critical Roles', value: criticalRoles.length, color: 'text-gray-900', sub: 'Designated as critical' },
          { label: 'Avg Successors / Role', value: coverageRatio, color: 'text-blue-600', sub: 'Target: 2.0+' },
          { label: 'Roles with Zero Successors', value: zeroSuccessors, color: 'text-red-600', sub: 'Immediate attention needed', warn: true },
          { label: 'HiPo Employees at Risk', value: hipoAtRisk, color: 'text-orange-600', sub: 'High attrition risk score', warn: true },
        ].map(c => (
          <div key={c.label} className={`card ${c.warn && (c.label === 'Roles with Zero Successors' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100')}`}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Stale review alert */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-amber-800">Succession Review Overdue</p>
          <p className="text-amber-700 text-xs mt-0.5">
            <strong>CFO</strong> succession plan was last reviewed on Oct 10, 2025 — over 5 months ago. 
            Quarterly cadence requires an updated review by March 31, 2026. Please schedule a calibration session.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'critical-roles', label: 'Critical Roles' },
          { key: 'hipo', label: 'HiPo Employees' },
          { key: 'pipeline', label: 'Pipeline Health' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t.key ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'critical-roles' && (
        <div className="space-y-3">
          {criticalRoles.map((role: CriticalRole) => {
            const isOpen = expanded === role.id;
            return (
              <div key={role.id} className={`card ${role.successors.length === 0 ? 'border-red-200 bg-red-50/30' : ''}`}>
                <button className="w-full flex items-center justify-between" onClick={() => setExpanded(isOpen ? null : role.id)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {role.incumbentAvatar}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{role.title}</p>
                        <span className="text-xs text-gray-400">·</span>
                        <p className="text-sm text-gray-500">{role.department}</p>
                        <span className={`badge ${riskColors[role.riskLevel]}`}>{role.riskLevel} Risk</span>
                        {role.successors.length === 0 && (
                          <span className="badge bg-red-100 text-red-700">⚠ No Successors</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Incumbent: {role.incumbent} · Last reviewed: {role.lastReviewed}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-3">
                      <p className="text-xs text-gray-400">Successors</p>
                      <p className={`text-lg font-bold ${role.successors.length >= 2 ? 'text-green-600' : role.successors.length === 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {role.successors.length}
                      </p>
                    </div>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Successors */}
                {isOpen && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    {role.successors.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">Successor Nominations</h4>
                        {role.successors.map((s, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                              {s.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-gray-800">{s.name}</p>
                                <span className={`badge ${readinessColors[s.readiness]}`}>{s.readiness}</span>
                              </div>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {s.developmentAreas.map(d => (
                                  <span key={d} className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded-full text-gray-600">{d}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button className="text-xs text-blue-600 font-medium hover:underline">View IDP</button>
                              <button className="text-xs text-gray-400 hover:text-gray-600">Edit</button>
                            </div>
                          </div>
                        ))}
                        {role.successors.length < 2 && (
                          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-xs text-yellow-700">
                            <AlertTriangle size={13} />
                            Only {role.successors.length} successor identified. Target is 2+ per critical role. Consider nominating additional candidates.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                        <AlertTriangle size={16} className="text-red-600 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-red-800">No successors identified</p>
                          <p className="text-xs text-red-700 mt-0.5">This critical role has no succession coverage. Escalate to CHRO and schedule a talent review session.</p>
                        </div>
                        <button className="ml-auto btn-primary text-sm shrink-0">Nominate Successor</button>
                      </div>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button className="btn-secondary text-sm">Schedule Review</button>
                      <button className="btn-secondary text-sm">Compare Candidates</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'hipo' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">High Potential (HiPo) Employee Tracker</h3>
            <p className="text-xs text-gray-400 mb-4">HiPo tags are time-bound (12 months) and require annual review. 
              Employees are tagged during performance calibration sessions.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100">
                    <th className="pb-2 text-left font-medium">Employee</th>
                    <th className="pb-2 text-left font-medium">Department</th>
                    <th className="pb-2 text-left font-medium">Level</th>
                    <th className="pb-2 text-center font-medium">Attrition Risk</th>
                    <th className="pb-2 text-center font-medium">Tagged On</th>
                    <th className="pb-2 text-center font-medium">Valid Till</th>
                    <th className="pb-2 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {hipoEmployees.map(h => (
                    <tr key={h.name}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {h.avatar}
                          </div>
                          <span className="font-medium text-gray-800">{h.name}</span>
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">{h.department}</td>
                      <td className="py-3 text-gray-600">{h.level}</td>
                      <td className="py-3 text-center">
                        <span className={`font-semibold ${attritionRiskColors[h.attritionRisk]}`}>{h.attritionRisk}</span>
                      </td>
                      <td className="py-3 text-center text-gray-500 text-xs">{h.taggedOn}</td>
                      <td className="py-3 text-center text-gray-500 text-xs">{h.validTill}</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-xs text-blue-600 hover:underline">View IDP</button>
                          <button className="text-xs text-gray-400 hover:text-gray-600">Renew</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card bg-red-50 border border-red-100">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800">HiPo Attrition Alert</p>
                <p className="text-xs text-red-700 mt-0.5">
                  <strong>Dev Iyer</strong> (HiPo, Engineering) has a <strong>High</strong> attrition risk score based on tenure, 
                  recent performance feedback, and compensation benchmarking. Recommend immediate manager conversation and retention offer review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="space-y-5">
          {/* Readiness distribution */}
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Bench Strength: Readiness Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Ready Now', count: criticalRoles.reduce((s, r) => s + r.successors.filter(x => x.readiness === 'Ready Now').length, 0), color: 'bg-green-500', textColor: 'text-green-700' },
                { label: 'Ready in 1-2 Years', count: criticalRoles.reduce((s, r) => s + r.successors.filter(x => x.readiness === 'Ready in 1-2 Years').length, 0), color: 'bg-blue-500', textColor: 'text-blue-700' },
                { label: 'Ready in 3-5 Years', count: criticalRoles.reduce((s, r) => s + r.successors.filter(x => x.readiness === 'Ready in 3-5 Years').length, 0), color: 'bg-yellow-500', textColor: 'text-yellow-700' },
              ].map(c => (
                <div key={c.label} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className={`text-3xl font-bold ${c.textColor}`}>{c.count}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.label}</div>
                  <div className={`w-10 h-1 ${c.color} rounded-full mx-auto mt-2`} />
                </div>
              ))}
            </div>
          </div>

          {/* Coverage ratio per dept */}
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Coverage Ratio by Department</h3>
            <div className="space-y-3">
              {[
                { dept: 'Engineering', roles: 1, successors: 2 },
                { dept: 'Executive', roles: 1, successors: 1 },
                { dept: 'Finance', roles: 1, successors: 1 },
                { dept: 'Sales', roles: 1, successors: 1 },
                { dept: 'Marketing', roles: 1, successors: 0 },
              ].map(row => {
                const ratio = row.successors / (row.roles * 2); // target is 2x
                const pct = Math.round(ratio * 100);
                return (
                  <div key={row.dept}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span className="font-medium">{row.dept}</span>
                      <span>{row.successors} successors / {row.roles} role · Target: {row.roles * 2}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-2 rounded-full ${pct >= 100 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action items */}
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recommended Actions</h3>
            <div className="space-y-2">
              {[
                { action: 'Nominate 2 successors for Marketing Lead role', priority: 'High', owner: 'Vikram Nair', due: '2026-04-15' },
                { action: 'Update CFO succession plan (overdue since Oct 2025)', priority: 'High', owner: 'Ananya Singh', due: '2026-03-31' },
                { action: 'Create IDP for Dev Iyer linked to Engineering Manager succession', priority: 'Medium', owner: 'Ravi Kumar', due: '2026-04-30' },
                { action: 'Schedule HiPo retention conversation with Dev Iyer', priority: 'High', owner: 'HR + Ravi Kumar', due: '2026-03-31' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{item.action}</p>
                    <div className="flex gap-3 mt-1 text-xs text-gray-400">
                      <span>Owner: {item.owner}</span>
                      <span>Due: {item.due}</span>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 hover:underline shrink-0">Assign</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
