import { useState } from 'react';
import { UserMinus, CheckCircle2, Clock, AlertTriangle, FileText, ChevronDown, ChevronUp, DollarSign, MessageSquare } from 'lucide-react';
import { offboardingRecords, type OffboardingRecord } from '../../data/mockData';

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Pending FnF': 'bg-yellow-100 text-yellow-700',
};

const taskStatusIcon = (s: string) => {
  if (s === 'Done') return <CheckCircle2 size={14} className="text-green-500" />;
  if (s === 'Overdue') return <AlertTriangle size={14} className="text-red-500" />;
  return <Clock size={14} className="text-yellow-500" />;
};

const streamColors: Record<string, string> = {
  IT: 'bg-purple-100 text-purple-700',
  HR: 'bg-blue-100 text-blue-700',
  Finance: 'bg-green-100 text-green-700',
  Manager: 'bg-orange-100 text-orange-700',
  Facilities: 'bg-gray-100 text-gray-700',
};

export default function Offboarding() {
  const [expanded, setExpanded] = useState<string | null>('OFF001');
  const [filter, setFilter] = useState('All');

  const statuses = ['All', 'In Progress', 'Pending FnF', 'Completed'];
  const filtered = filter === 'All' ? offboardingRecords : offboardingRecords.filter(r => r.status === filter);

  const summary = {
    total: offboardingRecords.length,
    inProgress: offboardingRecords.filter(r => r.status === 'In Progress').length,
    pendingFnF: offboardingRecords.filter(r => r.status === 'Pending FnF').length,
    completed: offboardingRecords.filter(r => r.status === 'Completed').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offboarding</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage separations, F&F settlements, and offboarding task streams</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserMinus size={16} />
          Initiate Separation
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Active', value: summary.total, color: 'text-gray-900', bg: 'bg-white' },
          { label: 'In Progress', value: summary.inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending F&F', value: summary.pendingFnF, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Completed (MTD)', value: summary.completed, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(c => (
          <div key={c.label} className={`card ${c.bg}`}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Records */}
      <div className="space-y-4">
        {filtered.map((rec: OffboardingRecord) => {
          const isOpen = expanded === rec.id;
          const done = rec.tasks.filter(t => t.status === 'Done').length;
          const overdue = rec.tasks.filter(t => t.status === 'Overdue').length;
          const pct = Math.round((done / rec.tasks.length) * 100);

          return (
            <div key={rec.id} className="card">
              {/* Row header */}
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setExpanded(isOpen ? null : rec.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {rec.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{rec.employeeName}</p>
                    <p className="text-xs text-gray-500">{rec.designation} · {rec.department}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6 ml-6">
                    <div>
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="text-sm font-medium text-gray-700">{rec.separationType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Last Working Day</p>
                      <p className="text-sm font-medium text-gray-700">{rec.lastWorkingDay}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Notice Served</p>
                      <p className="text-sm font-medium text-gray-700">{rec.noticeServed}/{rec.noticePeriod} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">F&F Amount</p>
                      <p className="text-sm font-medium text-gray-700">₹{rec.fnfAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {overdue > 0 && (
                    <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                      <AlertTriangle size={12} /> {overdue} overdue
                    </span>
                  )}
                  <span className={`badge ${statusColors[rec.status]}`}>{rec.status}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Offboarding tasks: {done}/{rec.tasks.length} complete</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : overdue > 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                  {/* Task grid */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Offboarding Task Streams</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {rec.tasks.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <div className="pt-0.5">{taskStatusIcon(t.status)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded font-medium ${streamColors[t.stream] || 'bg-gray-100 text-gray-600'}`}>{t.stream}</span>
                              <span className={`text-xs font-medium ${t.status === 'Overdue' ? 'text-red-600' : t.status === 'Done' ? 'text-green-700' : 'text-gray-700'}`}>{t.status}</span>
                            </div>
                            <p className="text-sm text-gray-800 mt-0.5">{t.task}</p>
                            <p className="text-xs text-gray-400">Owner: {t.owner}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button className="btn-secondary flex items-center gap-1.5 text-sm">
                      <FileText size={14} /> Generate Relieving Letter
                    </button>
                    <button className="btn-secondary flex items-center gap-1.5 text-sm">
                      <DollarSign size={14} /> View F&F Settlement
                    </button>
                    {!rec.exitInterviewDone && (
                      <button className="btn-secondary flex items-center gap-1.5 text-sm">
                        <MessageSquare size={14} /> Schedule Exit Interview
                      </button>
                    )}
                    {rec.exitInterviewDone && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 size={13} /> Exit interview completed
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exit Interview Insights */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Exit Interview Insights (Last 90 Days)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Primary Reason: Better Opportunity', pct: 42 },
            { label: 'Compensation Concerns', pct: 28 },
            { label: 'Work-Life Balance', pct: 18 },
            { label: 'Management / Culture', pct: 12 },
          ].map(item => (
            <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-gray-800">{item.pct}%</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
