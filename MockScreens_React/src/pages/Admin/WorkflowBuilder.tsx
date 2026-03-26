import { useState } from 'react';
import { GitBranch, PlayCircle, PlusCircle, Copy, Archive, ChevronRight, Clock, AlertCircle, CheckCircle2, Zap, Bell, Filter } from 'lucide-react';
import { workflowDefinitions, type WorkflowDefinition } from '../../data/mockData';

const categoryColors: Record<string, string> = {
  Leave: 'bg-blue-100 text-blue-700',
  Expense: 'bg-green-100 text-green-700',
  Promotion: 'bg-purple-100 text-purple-700',
  Offboarding: 'bg-red-100 text-red-700',
  'Payroll Override': 'bg-orange-100 text-orange-700',
  Recruitment: 'bg-indigo-100 text-indigo-700',
};

const stepTypeIcon = (type: string) => {
  if (type === 'Approver') return <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center"><CheckCircle2 size={14} className="text-blue-600" /></div>;
  if (type === 'Condition') return <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center"><Filter size={14} className="text-yellow-600" /></div>;
  if (type === 'Notification') return <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center"><Bell size={14} className="text-purple-600" /></div>;
  return <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center"><Zap size={14} className="text-green-600" /></div>;
};

const stepTypeBadge: Record<string, string> = {
  Approver: 'bg-blue-100 text-blue-700',
  Condition: 'bg-yellow-100 text-yellow-700',
  Notification: 'bg-purple-100 text-purple-700',
  'Auto-Action': 'bg-green-100 text-green-700',
};

export default function WorkflowBuilder() {
  const [selected, setSelected] = useState<WorkflowDefinition>(workflowDefinitions[0]);
  const [activeTab, setActiveTab] = useState<'canvas' | 'analytics'>('canvas');

  const analyticsData = [
    { name: 'Standard Leave Approval', avgTime: '6h 24m', sla: 4.2, volume: 48 },
    { name: 'Expense Reimbursement', avgTime: '14h 10m', sla: 7.8, volume: 23 },
    { name: 'Promotion Approval', avgTime: '2d 4h', sla: 12.1, volume: 6 },
    { name: 'Payroll Override', avgTime: '1h 45m', sla: 2.0, volume: 4 },
    { name: 'Offboarding Parallel Streams', avgTime: '4d 2h', sla: 18.5, volume: 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
          <p className="text-sm text-gray-500 mt-0.5">Design conditional approval workflows with drag-and-drop logic</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <PlayCircle size={15} /> Test / Dry-run
          </button>
          <button className="btn-primary flex items-center gap-2">
            <PlusCircle size={15} /> New Workflow
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['canvas', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === t ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'canvas' ? 'Workflow Canvas' : 'Analytics'}
          </button>
        ))}
      </div>

      {activeTab === 'canvas' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Left panel – workflow list */}
          <div className="col-span-3 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mb-2">Workflows ({workflowDefinitions.length})</p>
            {workflowDefinitions.map(wf => (
              <button
                key={wf.id}
                onClick={() => setSelected(wf)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${selected.id === wf.id ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${categoryColors[wf.category]}`}>{wf.category}</span>
                  <span className={`text-xs font-medium ${wf.status === 'Active' ? 'text-green-600' : wf.status === 'Draft' ? 'text-yellow-600' : 'text-gray-400'}`}>{wf.status}</span>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1">{wf.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">v{wf.version} · {wf.steps.length} steps</p>
              </button>
            ))}
          </div>

          {/* Right panel – canvas */}
          <div className="col-span-9 card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
                  <span className={`badge ${categoryColors[selected.category]}`}>{selected.category}</span>
                  <span className={`badge ${selected.status === 'Active' ? 'bg-green-100 text-green-700' : selected.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{selected.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Last modified: {selected.lastModified} · {selected.version} · Avg approval: {selected.avgApprovalTime || '—'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary text-sm flex items-center gap-1"><Copy size={13} /> Clone</button>
                <button className="btn-secondary text-sm flex items-center gap-1"><Archive size={13} /> Archive</button>
              </div>
            </div>

            {/* SLA breach alert */}
            {selected.slaBreach > 5 && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-700">
                <AlertCircle size={15} />
                SLA breach rate: <strong>{selected.slaBreach}%</strong> — Consider reducing approval steps or adding delegation
              </div>
            )}

            {/* Workflow canvas simulation */}
            <div className="relative">
              <div className="flex flex-col items-start gap-0 pl-3">
                {/* Start node */}
                <div className="flex items-center gap-3 mb-0">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <GitBranch size={14} className="text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">Trigger Event</div>
                  <span className="text-xs text-gray-400 ml-2">Employee or HR submits request</span>
                </div>

                {selected.steps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col items-start">
                    {/* Connector line */}
                    <div className="w-px h-6 bg-gray-200 ml-3.5" />
                    {/* Step node */}
                    <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl w-full hover:border-blue-200 hover:bg-blue-50/40 transition-colors cursor-pointer group">
                      <div className="mt-0.5">{stepTypeIcon(step.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${stepTypeBadge[step.type]}`}>{step.type}</span>
                          <span className="text-sm font-semibold text-gray-800">{step.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 font-mono">{step.config}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs text-blue-600 font-medium">Edit</button>
                      </div>
                      <span className="text-xs text-gray-400 ml-auto self-start">Step {idx + 1}</span>
                    </div>
                  </div>
                ))}

                {/* Connector + End node */}
                <div className="w-px h-6 bg-gray-200 ml-3.5" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">Workflow Complete</div>
                </div>
              </div>
            </div>

            {/* Add step ghost */}
            <button className="mt-4 w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
              <PlusCircle size={15} /> Add Step (Approver / Condition / Notification / Auto-Action)
            </button>

            {/* Step Type Legend */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              {[
                { type: 'Approver', color: stepTypeBadge['Approver'], desc: 'Human approval step' },
                { type: 'Condition', color: stepTypeBadge['Condition'], desc: 'Branch logic (IF/ELSE)' },
                { type: 'Notification', color: stepTypeBadge['Notification'], desc: 'Email / in-app alert' },
                { type: 'Auto-Action', color: stepTypeBadge['Auto-Action'], desc: 'System automated task' },
              ].map(l => (
                <div key={l.type} className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${l.color}`}>{l.type}</span>
                  <span className="text-xs text-gray-400">{l.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Active Workflows', value: workflowDefinitions.filter(w => w.status === 'Active').length, color: 'text-green-600' },
              { label: 'Avg SLA Breach Rate', value: '8.9%', color: 'text-red-600' },
              { label: 'Workflows by Category', value: workflowDefinitions.length, color: 'text-blue-600' },
            ].map(m => (
              <div key={m.label} className="card text-center">
                <p className="text-xs text-gray-500">{m.label}</p>
                <p className={`text-3xl font-bold mt-1 ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Workflow Performance Metrics</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-2 text-left font-medium">Workflow</th>
                  <th className="pb-2 text-right font-medium">Avg Approval Time</th>
                  <th className="pb-2 text-right font-medium">SLA Breach</th>
                  <th className="pb-2 text-right font-medium">Monthly Volume</th>
                  <th className="pb-2 text-right font-medium">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analyticsData.map(row => (
                  <tr key={row.name}>
                    <td className="py-3 font-medium text-gray-800">{row.name}</td>
                    <td className="py-3 text-right text-gray-600">
                      <span className="flex items-center gap-1 justify-end"><Clock size={12} className="text-gray-400" />{row.avgTime}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-semibold ${row.sla > 10 ? 'text-red-600' : row.sla > 5 ? 'text-yellow-600' : 'text-green-600'}`}>{row.sla}%</span>
                    </td>
                    <td className="py-3 text-right text-gray-600">{row.volume}</td>
                    <td className="py-3 text-right">
                      <span className={`badge ${row.sla > 10 ? 'bg-red-100 text-red-600' : row.sla > 5 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                        {row.sla > 10 ? 'Needs Attention' : row.sla > 5 ? 'Watch' : 'Healthy'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottleneck insight */}
          <div className="card bg-amber-50 border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Bottleneck Detected</p>
                <p className="text-xs text-amber-700 mt-1">
                  <strong>Offboarding Parallel Streams</strong> has an 18.5% SLA breach rate. The Manager stream (Knowledge Transfer task) is the primary bottleneck — average delay of 2.4 days.
                  Consider reducing Knowledge Transfer SLA from 7 days to 5 days or adding automatic escalation at day 4.
                </p>
                <button className="mt-2 text-xs text-amber-700 font-semibold underline flex items-center gap-1">
                  View Detailed Analysis <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
