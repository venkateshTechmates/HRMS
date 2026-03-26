import { ArrowRight, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const transfers = [
  { id: 'TR001', employee: 'Arjun Mehta', from: 'Sales - Delhi', to: 'Sales - Mumbai', type: 'Transfer', effectiveDate: '2026-04-01', status: 'Pending Approval', requestedBy: 'Sunita Reddy' },
  { id: 'TR002', employee: 'Dev Iyer', from: 'Junior Developer', to: 'Software Engineer', type: 'Promotion', effectiveDate: '2026-04-01', status: 'Approved', requestedBy: 'Ravi Kumar' },
  { id: 'TR003', employee: 'Nisha Gupta', from: 'HR Executive', to: 'Senior HR Executive', type: 'Promotion', effectiveDate: '2026-03-01', status: 'Completed', requestedBy: 'Ananya Singh' },
  { id: 'TR004', employee: 'Karan Patel', from: 'Finance - Mumbai', to: 'Finance - Bengaluru', type: 'Transfer', effectiveDate: '2026-03-15', status: 'Rejected', requestedBy: 'Meera Joshi' },
];

const separations = [
  { id: 'SEP001', employee: 'Ramesh Tiwari', department: 'Operations', separationType: 'Resignation', lastDay: '2026-03-31', noticePeriod: '60 days', clearance: 60, status: 'In Progress' },
  { id: 'SEP002', employee: 'Deepa Rao', department: 'Marketing', separationType: 'Contract End', lastDay: '2026-03-28', noticePeriod: 'N/A', clearance: 100, status: 'Completed' },
];

const statusColors: Record<string, string> = {
  'Pending Approval': 'badge-yellow',
  'Approved': 'badge-blue',
  'Completed': 'badge-green',
  'Rejected': 'badge-red',
  'In Progress': 'badge-yellow',
};

const typeColors: Record<string, string> = {
  'Transfer': 'badge-blue',
  'Promotion': 'badge-purple',
};

export default function TransfersPromotions() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Transfers', value: 1, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Promotions This Quarter', value: 8, icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Separations (MTD)', value: 3, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Completed This Month', value: 5, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transfers & Promotions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Transfers & Promotions</h2>
          <button className="btn-primary"><Plus size={14} /> Initiate Request</button>
        </div>
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">Type</th>
              <th className="table-header">From</th>
              <th className="table-header">To</th>
              <th className="table-header">Effective Date</th>
              <th className="table-header">Requested By</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transfers.map(t => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium text-gray-900">{t.employee}</td>
                <td className="table-cell"><span className={typeColors[t.type]}>{t.type}</span></td>
                <td className="table-cell text-gray-600 text-xs">{t.from}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-1">
                    <ArrowRight size={12} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{t.to}</span>
                  </div>
                </td>
                <td className="table-cell text-gray-600">{t.effectiveDate}</td>
                <td className="table-cell text-gray-600">{t.requestedBy}</td>
                <td className="table-cell"><span className={statusColors[t.status]}>{t.status}</span></td>
                <td className="table-cell">
                  {t.status === 'Pending Approval' && (
                    <div className="flex gap-1.5">
                      <button className="text-xs btn-primary py-1">Approve</button>
                      <button className="text-xs btn-danger py-1">Reject</button>
                    </div>
                  )}
                  {t.status !== 'Pending Approval' && (
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Separations */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Separations & Offboarding</h2>
          <button className="btn-secondary"><Plus size={14} /> Initiate Separation</button>
        </div>
        <div className="space-y-4">
          {separations.map(sep => (
            <div key={sep.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{sep.employee}</p>
                  <p className="text-sm text-gray-500">{sep.department} · {sep.separationType}</p>
                </div>
                <span className={statusColors[sep.status]}>{sep.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-gray-500">Last Working Day</p>
                  <p className="font-medium text-gray-900">{sep.lastDay}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Notice Period</p>
                  <p className="font-medium text-gray-900">{sep.noticePeriod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Clearance Progress</p>
                  <p className="font-medium text-gray-900">{sep.clearance}%</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Offboarding Checklist</span>
                  <span>{sep.clearance}% complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 transition-all ${sep.clearance === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${sep.clearance}%` }}
                  />
                </div>
              </div>
              {['Asset Return', 'IT Access Revoked', 'Exit Interview', 'Final Settlement', 'Clearance Certificate'].map((task, i) => (
                <div key={task} className="flex items-center gap-2 mt-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${i < Math.ceil(sep.clearance / 20) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {i < Math.ceil(sep.clearance / 20) ? <CheckCircle size={12} className="text-green-600" /> : <Clock size={12} className="text-gray-400" />}
                  </div>
                  <span className={`text-xs ${i < Math.ceil(sep.clearance / 20) ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{task}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
