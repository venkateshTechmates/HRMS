import { useState } from 'react';
import { Ticket, Search, Clock, CheckCircle2, AlertTriangle, Star, MessageSquare, ChevronRight, TrendingDown, Filter } from 'lucide-react';
import { helpdeskTickets, type HelpdeskTicket } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const priorityColors: Record<string, string> = {
  P0: 'bg-red-100 text-red-700 border border-red-200',
  P1: 'bg-orange-100 text-orange-700 border border-orange-200',
  P2: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  P3: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const statusColors: Record<string, string> = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-purple-100 text-purple-700',
  Resolved: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-100 text-gray-500',
};

const categoryVolume = [
  { category: 'Payroll Query', count: 18 },
  { category: 'IT Access', count: 14 },
  { category: 'Leave Dispute', count: 11 },
  { category: 'Document Request', count: 9 },
  { category: 'Policy Clarification', count: 7 },
  { category: 'Grievance', count: 4 },
  { category: 'Other', count: 3 },
];

function SLABar({ elapsed, sla }: { elapsed: number; sla: number }) {
  const pct = Math.min((elapsed / sla) * 100, 100);
  const color = pct >= 100 ? 'bg-red-500' : pct >= 75 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-0.5">
        <span>{elapsed}h elapsed / {sla}h SLA</span>
        <span className={pct >= 100 ? 'text-red-600 font-semibold' : ''}>{pct >= 100 ? 'BREACHED' : `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Helpdesk() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selected, setSelected] = useState<HelpdeskTicket | null>(null);

  const filtered = helpdeskTickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const open = helpdeskTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const breached = helpdeskTickets.filter(t => (t.status === 'Open' || t.status === 'In Progress') && t.elapsed >= t.slaHours).length;
  const avgCSAT = (() => { const rated = helpdeskTickets.filter(t => t.csat); return rated.length ? (rated.reduce((s, t) => s + (t.csat || 0), 0) / rated.length).toFixed(1) : '-'; })();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Helpdesk & Ticketing</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and resolve employee HR support requests</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Ticket size={15} /> Raise Ticket
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Tickets', value: open, color: 'text-blue-600' },
          { label: 'SLA Breached', value: breached, color: 'text-red-600' },
          { label: 'Resolved (MTD)', value: helpdeskTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length, color: 'text-green-600' },
          { label: 'Avg CSAT', value: `${avgCSAT} / 5`, color: 'text-purple-600' },
        ].map(c => (
          <div key={c.label} className="card">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: ticket list */}
        <div className="col-span-8 space-y-4">
          {/* Search + filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets or employees..."
                className="input-field pl-9 w-full"
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field">
              <option>All</option>
              {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="input-field">
              <option>All</option>
              {['P0', 'P1', 'P2', 'P3'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Ticket list */}
          <div className="space-y-2">
            {filtered.map(t => (
              <button
                key={t.id}
                onClick={() => setSelected(selected?.id === t.id ? null : t)}
                className={`w-full text-left card hover:border-blue-200 transition-all cursor-pointer ${selected?.id === t.id ? 'border-blue-300 bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {t.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-gray-400">{t.id}</span>
                        <span className={`badge ${priorityColors[t.priority]}`}>{t.priority}</span>
                        <span className={`badge ${statusColors[t.status]}`}>{t.status}</span>
                        <span className="badge bg-gray-100 text-gray-600">{t.category}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mt-1 truncate">{t.subject}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.employeeName} · Assigned: {t.assignedTo} · {t.createdOn}</p>
                      {(t.status === 'Open' || t.status === 'In Progress') && (
                        <div className="mt-2">
                          <SLABar elapsed={t.elapsed} sla={t.slaHours} />
                        </div>
                      )}
                      {(t.status === 'Resolved' || t.status === 'Closed') && t.csat && (
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={11} className={i < (t.csat || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">CSAT</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1" />
                </div>

                {/* Expanded detail */}
                {selected?.id === t.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div><p className="text-xs text-gray-400">Ticket ID</p><p className="font-medium">{t.id}</p></div>
                      <div><p className="text-xs text-gray-400">Created On</p><p className="font-medium">{t.createdOn}</p></div>
                      <div><p className="text-xs text-gray-400">Resolved On</p><p className="font-medium">{t.resolvedOn || '—'}</p></div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button className="btn-primary text-sm flex items-center gap-1.5">
                        <MessageSquare size={13} /> Respond
                      </button>
                      <button className="btn-secondary text-sm flex items-center gap-1.5">
                        <ChevronRight size={13} /> Escalate
                      </button>
                      {(t.status === 'Open' || t.status === 'In Progress') && (
                        <button className="btn-secondary text-sm flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 text-gray-400">No tickets match your filters</div>
            )}
          </div>
        </div>

        {/* Right: charts */}
        <div className="col-span-4 space-y-4">
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Volume by Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryVolume} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} width={110} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">SLA Compliance</h3>
            <div className="space-y-3">
              {[
                { label: 'P0 — Critical (4h)', total: 0, met: 0 },
                { label: 'P1 — High (24h)', total: 3, met: 2 },
                { label: 'P2 — Medium (48h)', total: 2, met: 1 },
                { label: 'P3 — Low (72h)', total: 2, met: 2 },
              ].map(s => {
                const pct = s.total ? Math.round((s.met / s.total) * 100) : 100;
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{s.label}</span>
                      <span className="font-semibold">{s.total ? `${s.met}/${s.total} met` : 'N/A'}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className={`h-2 rounded-full ${pct === 100 ? 'bg-green-500' : pct >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card bg-green-50 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-green-600" />
              <p className="text-sm font-semibold text-green-800">Knowledge Base Impact</p>
            </div>
            <p className="text-xs text-green-700">
              The chatbot / FAQ deflected <strong>34 tickets</strong> this month — saving an estimated <strong>68 agent-hours</strong>. Top deflected: "WFH Policy" (12), "Leave Balance" (9), "Payslip Download" (8).
            </p>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Agent Performance</h3>
            <div className="space-y-2">
              {[
                { name: 'Ananya Singh', resolved: 14, avgTime: '8.2h', csat: 4.6 },
                { name: 'Nisha Gupta', resolved: 11, avgTime: '11.4h', csat: 4.2 },
                { name: 'IT Support', resolved: 9, avgTime: '6.1h', csat: 4.8 },
                { name: 'HR Ops', resolved: 7, avgTime: '18.0h', csat: 3.9 },
              ].map(a => (
                <div key={a.name} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                  <span className="font-medium text-gray-700 truncate mr-2">{a.name}</span>
                  <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                    <span>{a.resolved} resolved</span>
                    <span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400" />{a.csat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
