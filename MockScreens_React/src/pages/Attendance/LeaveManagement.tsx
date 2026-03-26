import { useState } from 'react';
import { Plus, Calendar, CheckCircle, XCircle, Clock, FileText, Download } from 'lucide-react';
import { leaveRequests, leaveBalances } from '../../data/mockData';

const statusColors: Record<string, string> = {
  Pending: 'badge-yellow',
  Approved: 'badge-green',
  Rejected: 'badge-red',
};

const leaveTypeColors: Record<string, string> = {
  'Earned Leave': 'bg-blue-100 text-blue-700',
  'Sick Leave': 'bg-red-100 text-red-700',
  'Casual Leave': 'bg-purple-100 text-purple-700',
  'Comp Off': 'bg-orange-100 text-orange-700',
  'Maternity Leave': 'bg-pink-100 text-pink-700',
  'LOP': 'bg-gray-100 text-gray-700',
};

const calendarData = [
  { date: 24, day: 'Mon', emp: 'Karan P.', type: 'SL', color: 'bg-red-100 text-red-700' },
  { date: 25, day: 'Tue', emp: '', type: '', color: '' },
  { date: 26, day: 'Wed', emp: '', type: '', color: '' },
  { date: 27, day: 'Thu', emp: '', type: '', color: '' },
  { date: 28, day: 'Fri', emp: '', type: '', color: '' },
  { date: 29, day: 'Sat', emp: '', type: 'WO', color: 'bg-gray-100 text-gray-500' },
  { date: 30, day: 'Sun', emp: '', type: 'WO', color: 'bg-gray-100 text-gray-500' },
];

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showApplyForm, setShowApplyForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Leave Balance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {leaveBalances.map(lb => (
          <div key={lb.type} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500">{lb.type}</p>
              <Calendar size={14} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{lb.remaining}</p>
            <p className="text-xs text-gray-400 mt-0.5">of {lb.total} days remaining</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-blue-500 rounded-full h-1.5" style={{ width: `${(lb.remaining / lb.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {['requests', 'team', 'history'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                  {tab === 'requests' ? 'Leave Requests' : tab === 'team' ? 'Team Schedule' : 'Leave History'}
                </button>
              ))}
            </div>
            <button onClick={() => setShowApplyForm(true)} className="btn-primary text-xs py-1.5">
              <Plus size={13} /> Apply Leave
            </button>
          </div>

          {activeTab === 'requests' && (
            <div className="space-y-3">
              {leaveRequests.map(lr => (
                <div key={lr.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                        {lr.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{lr.employeeName}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${leaveTypeColors[lr.type] ?? 'bg-gray-100 text-gray-700'}`}>{lr.type}</span>
                          <span className="text-xs text-gray-500">{lr.days} day{lr.days > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    <span className={statusColors[lr.status]}>{lr.status}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {lr.from} → {lr.to}</span>
                      <span className="flex items-center gap-1"><FileText size={11} /> {lr.reason}</span>
                    </div>
                    {lr.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md font-medium transition-colors">
                          <CheckCircle size={11} /> Approve
                        </button>
                        <button className="flex items-center gap-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md font-medium transition-colors">
                          <XCircle size={11} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {calendarData.map(d => (
                  <div key={d.date} className="text-center">
                    <p className="text-xs text-gray-400">{d.day}</p>
                    <p className="text-sm font-medium text-gray-700 my-1">{d.date}</p>
                    <div className={`text-[10px] rounded px-1 py-0.5 min-h-6 ${d.color}`}>
                      {d.emp || d.type}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {leaveRequests.filter(l => l.status === 'Approved').map(lr => (
                  <div key={lr.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{lr.employeeName}</span>
                    <span className="text-xs text-gray-500">{lr.from} – {lr.to}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ml-auto ${leaveTypeColors[lr.type] ?? ''}`}>{lr.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Financial Year 2025-26</p>
                <button className="btn-secondary text-xs py-1.5"><Download size={13} /> Export</button>
              </div>
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="table-header">Type</th>
                    <th className="table-header">Period</th>
                    <th className="table-header">Days</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Applied On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leaveRequests.map(lr => (
                    <tr key={lr.id} className="hover:bg-gray-50">
                      <td className="table-cell"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${leaveTypeColors[lr.type] ?? 'bg-gray-100 text-gray-700'}`}>{lr.type}</span></td>
                      <td className="table-cell text-gray-600 text-xs">{lr.from} – {lr.to}</td>
                      <td className="table-cell font-medium">{lr.days}</td>
                      <td className="table-cell"><span className={statusColors[lr.status]}>{lr.status}</span></td>
                      <td className="table-cell text-gray-500 text-xs">{lr.appliedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Policy Summary */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="section-title mb-3">Leave Policy</h3>
            <div className="space-y-3">
              {[
                { rule: 'Carry Forward', desc: 'Max 15 EL days carry forward to next year' },
                { rule: 'Encashment', desc: 'Up to 10 EL days can be encashed during appraisal' },
                { rule: 'Lapse', desc: 'Unused SL & CL lapse at year end' },
                { rule: 'Notice', desc: 'Minimum 2 days advance for EL; 1 day for CL' },
                { rule: 'LWP Deduction', desc: 'Salary deducted at daily rate for LWP days' },
              ].map(p => (
                <div key={p.rule} className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{p.rule}</p>
                    <p className="text-xs text-gray-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">Upcoming Holidays</h3>
            <div className="space-y-2">
              {[
                { date: 'Apr 14', name: 'Dr. Ambedkar Jayanti', type: 'National' },
                { date: 'Apr 18', name: 'Good Friday', type: 'National' },
                { date: 'May 1', name: 'Labour Day', type: 'National' },
                { date: 'Jun 7', name: 'Eid al-Adha', type: 'National' },
              ].map(h => (
                <div key={h.date} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 text-xs font-bold">{h.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{h.name}</p>
                    <p className="text-xs text-gray-500">{h.date} · {h.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowApplyForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Apply for Leave</h2>
              <button onClick={() => setShowApplyForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="form-label">Leave Type</label>
                <select className="form-select">
                  <option>Earned Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Comp Off</option>
                  <option>LOP</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">From Date</label>
                  <input type="date" className="form-input" defaultValue="2026-04-07" />
                </div>
                <div>
                  <label className="form-label">To Date</label>
                  <input type="date" className="form-input" defaultValue="2026-04-09" />
                </div>
              </div>
              <div>
                <label className="form-label">Reason</label>
                <textarea className="form-input resize-none" rows={3} placeholder="Briefly describe the reason for leave..." />
              </div>
              <div>
                <label className="form-label">Attach Document <span className="text-gray-400 font-normal">(optional, for medical leave)</span></label>
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <p className="text-xs text-gray-500">Click to upload or drag & drop PDF/JPG</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                <Clock size={12} className="inline mr-1" />
                <strong>3 days</strong> will be deducted from your <strong>Earned Leave</strong> balance (13 remaining)
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowApplyForm(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={() => setShowApplyForm(false)} className="btn-primary flex-1 justify-center">Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
