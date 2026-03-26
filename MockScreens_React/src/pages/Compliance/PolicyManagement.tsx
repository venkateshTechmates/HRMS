import { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, Clock, Download, Shield, Users, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { policies, grievances } from '../../data/mockData';


const grievanceStatusColors: Record<string, string> = {
  'Open': 'badge-yellow',
  'Under Investigation': 'badge-blue',
  'Resolved': 'badge-green',
  'Closed': 'badge-gray',
};

const complianceCalendar = [
  { task: 'POSH Training – Annual', due: 'Apr 30, 2026', status: 'Upcoming', dept: 'HR' },
  { task: 'PF Return (Form-5A)', due: 'Apr 25, 2026', status: 'Upcoming', dept: 'Finance' },
  { task: 'Safety Audit', due: 'Apr 10, 2026', status: 'Due Soon', dept: 'Admin' },
  { task: 'Data Privacy Policy Review', due: 'Mar 31, 2026', status: 'Overdue', dept: 'Legal' },
  { task: 'ESI Quarterly Filing', due: 'Apr 15, 2026', status: 'Due Soon', dept: 'Finance' },
];

export default function PolicyManagement() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'policies' | 'grievances' | 'calendar'>('policies');

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Policies', value: policies.length, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Acknowledgement Rate', value: `${Math.round(policies.reduce((s, p) => s + p.acknowledgements, 0) / policies.reduce((s, p) => s + p.totalEmployees, 0) * 100)}%`, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Overdue Signatures', value: 6, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Open Grievances', value: grievances.filter(g => g.status === 'Open').length, icon: Shield, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`${s.bg} p-3 rounded-xl`}>
              <s.icon size={22} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['policies', 'grievances', 'calendar'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {tab === 'calendar' ? 'Compliance Calendar' : tab === 'policies' ? 'Policy Documents' : 'Grievances / POSH'}
          </button>
        ))}
      </div>

      {/* Policy Documents */}
      {activeTab === 'policies' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Policy Documents</h2>
            <button className="btn-primary">+ Upload Policy</button>
          </div>
          <div className="space-y-3">
            {policies.map(policy => (
              <div key={policy.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(expanded === policy.id ? null : policy.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{policy.title}</p>
                      <p className="text-xs text-gray-500">v{policy.version} · Effective: {policy.effectiveDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={policy.status === 'Active' ? (policy.acknowledgements === policy.totalEmployees ? 'badge-green' : 'badge-yellow') : 'badge-gray'}>{policy.status === 'Active' ? (policy.acknowledgements === policy.totalEmployees ? 'Signed' : 'Pending') : policy.status}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users size={12} />
                      <span>{policy.acknowledgements}/{policy.totalEmployees}</span>
                    </div>
                    {expanded === policy.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>

                {/* Expanded details */}
                {expanded === policy.id && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">Acknowledgement Progress</span>
                          <span className="text-xs font-semibold text-gray-900">
                            {Math.round((policy.acknowledgements / policy.totalEmployees) * 100)}%
                          </span>
                        </div>
                        <div className="w-64 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2 transition-all"
                            style={{ width: `${(policy.acknowledgements / policy.totalEmployees) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="btn-secondary flex items-center gap-1 text-xs py-1.5">
                          <Download size={13} /> Download PDF
                        </button>
                        <button className="btn-secondary flex items-center gap-1 text-xs py-1.5">
                          <Eye size={13} /> View
                        </button>
                        <button className="btn-primary text-xs py-1.5">Request Signatures</button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Category: {policy.category} · Effective: {policy.effectiveDate}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grievances */}
      {activeTab === 'grievances' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Grievances & POSH Cases</h2>
            <button className="btn-primary">+ File Grievance</button>
          </div>

          {/* POSH Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5 flex items-start gap-3">
            <Shield size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800 text-sm">POSH Compliance Status</p>
              <p className="text-xs text-orange-700 mt-0.5">Internal Complaints Committee (ICC) constituted. POSH training completion: <strong>72%</strong>. Annual report due: <strong>Jan 31, 2027</strong>.</p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="table-header text-left">Case ID</th>
                <th className="table-header text-left">Type</th>
                <th className="table-header text-left">Filed By</th>
                <th className="table-header text-left">Against</th>
                <th className="table-header">Severity</th>
                <th className="table-header">Filed On</th>
                <th className="table-header">Status</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {grievances.map(g => (
                <tr key={g.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="table-cell font-mono text-xs text-gray-500">{g.id}</td>
                  <td className="table-cell">
                    <span className={g.type === 'POSH' ? 'badge-red' : g.type === 'Harassment' ? 'badge-orange' : 'badge-blue'}>
                      {g.type}
                    </span>
                  </td>
                  <td className="table-cell text-gray-800">{g.employeeId}</td>
                    <td className="table-cell text-gray-800">—</td>
                  <td className="table-cell text-center">
                    <span className={g.priority === 'High' ? 'badge-red' : g.priority === 'Medium' ? 'badge-yellow' : 'badge-gray'}>
                      {g.priority}
                    </span>
                  </td>
                  <td className="table-cell text-center text-gray-600">{g.submittedOn}</td>
                  <td className="table-cell text-center">
                    <span className={grievanceStatusColors[g.status] || 'badge-gray'}>{g.status}</span>
                  </td>
                  <td className="table-cell text-right">
                    <button className="text-xs text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compliance Calendar */}
      {activeTab === 'calendar' && (
        <div className="card">
          <h2 className="section-title mb-4">Compliance Calendar</h2>
          <div className="space-y-3">
            {complianceCalendar.map(item => (
              <div key={item.task} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.status === 'Overdue' ? 'bg-red-500' : item.status === 'Due Soon' ? 'bg-yellow-500' : 'bg-blue-400'}`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.task}</p>
                    <p className="text-xs text-gray-500">{item.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-600 flex items-center gap-1"><Clock size={11} />{item.due}</p>
                  </div>
                  <span className={item.status === 'Overdue' ? 'badge-red' : item.status === 'Due Soon' ? 'badge-yellow' : 'badge-blue'}>
                    {item.status}
                  </span>
                  <button className="text-xs text-blue-600 hover:underline">Mark Done</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
