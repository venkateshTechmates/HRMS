import { Download, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

const taxDeclarations = [
  { id: 'EMP001', name: 'Priya Sharma', regime: 'New', totalInvestment: '₹1.5L', tdsApplicable: '₹18,200', status: 'Submitted', deadline: '2026-04-15' },
  { id: 'EMP002', name: 'Ravi Kumar', regime: 'Old', totalInvestment: '₹3.2L', tdsApplicable: '₹84,600', status: 'Submitted', deadline: '2026-04-15' },
  { id: 'EMP008', name: 'Dev Iyer', regime: 'New', totalInvestment: '₹0', tdsApplicable: '₹8,400', status: 'Pending', deadline: '2026-04-15' },
  { id: 'EMP004', name: 'Arjun Mehta', regime: 'Old', totalInvestment: '₹1.2L', tdsApplicable: '₹12,800', status: 'Pending', deadline: '2026-04-15' },
];

const statutoryCalendar = [
  { filing: 'PF Monthly Contribution', authority: 'EPFO', dueDate: '2026-04-15', status: 'Due', frequency: 'Monthly' },
  { filing: 'ESI Monthly Contribution', authority: 'ESIC', dueDate: '2026-04-15', status: 'Due', frequency: 'Monthly' },
  { filing: 'TDS Deposit (24Q)', authority: 'Income Tax Dept', dueDate: '2026-04-07', status: 'Overdue', frequency: 'Monthly' },
  { filing: 'Professional Tax', authority: 'State Govt', dueDate: '2026-04-30', status: 'Upcoming', frequency: 'Monthly' },
  { filing: 'Form 16 Issuance', authority: 'Income Tax Dept', dueDate: '2026-06-15', status: 'Upcoming', frequency: 'Annual' },
  { filing: 'PF Annual Return (Form 3A)', authority: 'EPFO', dueDate: '2026-09-25', status: 'Upcoming', frequency: 'Annual' },
];

const statutoryConfig = [
  { name: 'Provident Fund (PF)', employeeRate: '12% of Basic', employerRate: '12% of Basic', applicability: 'Basic salary ≤ ₹15,000', enabled: true },
  { name: 'ESI (Employee State Insurance)', employeeRate: '0.75% of Gross', employerRate: '3.25% of Gross', applicability: 'Gross salary ≤ ₹21,000/month', enabled: true },
  { name: 'Professional Tax', employeeRate: '₹200/month', employerRate: '—', applicability: 'All employees in applicable states', enabled: true },
  { name: 'TDS (Income Tax)', employeeRate: 'As per tax slab', employerRate: '—', applicability: 'Taxable income > basic exemption', enabled: true },
];

const statusColors: Record<string, string> = {
  Submitted: 'badge-green',
  Pending: 'badge-yellow',
  Due: 'badge-yellow',
  Overdue: 'badge-red',
  Upcoming: 'badge-blue',
  Completed: 'badge-green',
};

export default function TaxCompliance() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TDS This Month', value: '₹4.82L', color: 'text-blue-600' },
          { label: 'PF Contribution', value: '₹1.98L', color: 'text-purple-600' },
          { label: 'ESI Contribution', value: '₹34,200', color: 'text-green-600' },
          { label: 'Filings Overdue', value: '1', color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="card">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statutory Rates Config */}
        <div className="card">
          <h2 className="section-title mb-4">Statutory Configuration — India</h2>
          <div className="space-y-4">
            {statutoryConfig.map(c => (
              <div key={c.name} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <span className={c.enabled ? 'badge-green' : 'badge-gray'}>
                    {c.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Employee Rate</p>
                    <p className="font-medium text-gray-800 mt-0.5">{c.employeeRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Employer Rate</p>
                    <p className="font-medium text-gray-800 mt-0.5">{c.employerRate}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{c.applicability}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Calendar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Statutory Compliance Calendar</h2>
            <button className="btn-secondary text-xs py-1.5"><Download size={13} /> Export</button>
          </div>
          <div className="space-y-3">
            {statutoryCalendar.map(f => (
              <div key={f.filing} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  f.status === 'Overdue' ? 'bg-red-100' : f.status === 'Due' ? 'bg-yellow-100' : 'bg-blue-50'
                }`}>
                  {f.status === 'Overdue' ? <AlertCircle size={16} className="text-red-600" /> :
                   f.status === 'Due' ? <Clock size={16} className="text-yellow-600" /> :
                   <CheckCircle size={16} className="text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{f.filing}</p>
                  <p className="text-xs text-gray-500">{f.authority} · {f.frequency}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={statusColors[f.status]}>{f.status}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{f.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Declarations */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Investment Declarations (FY 2025-26)</h2>
          <div className="flex gap-2">
            <span className="badge-yellow">16 pending</span>
            <button className="btn-secondary text-xs py-1.5"><FileText size={13} /> Bulk Reminder</button>
          </div>
        </div>
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">Tax Regime</th>
              <th className="table-header">Total Investments</th>
              <th className="table-header">TDS Applicable</th>
              <th className="table-header">Declaration Status</th>
              <th className="table-header">Deadline</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {taxDeclarations.map(td => (
              <tr key={td.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium text-gray-900">{td.name}</td>
                <td className="table-cell">
                  <span className={td.regime === 'New' ? 'badge-blue' : 'badge-purple'}>{td.regime} Regime</span>
                </td>
                <td className="table-cell font-medium text-gray-900">{td.totalInvestment}</td>
                <td className="table-cell text-red-600 font-medium">{td.tdsApplicable}</td>
                <td className="table-cell"><span className={statusColors[td.status]}>{td.status}</span></td>
                <td className="table-cell text-gray-500 text-xs">{td.deadline}</td>
                <td className="table-cell">
                  {td.status === 'Pending' ? (
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Send Reminder</button>
                  ) : (
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reports */}
      <div className="card">
        <h2 className="section-title mb-4">Generate Statutory Reports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Form 16', 'PF ECR File', 'ESI Monthly', 'Form 24Q', 'PT Returns', 'Salary Register', 'TDS Summary', 'Annual 26AS'].map(report => (
            <button key={report} className="flex items-center gap-2 p-3 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm font-medium text-gray-700 hover:text-blue-700">
              <FileText size={15} className="text-gray-400" />
              {report}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
