import { useState } from 'react';
import { Play, Lock, Download, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';
import { payrollRecords } from '../../data/mockData';

const statusColors: Record<string, string> = {
  Processed: 'badge-green',
  Pending: 'badge-yellow',
  'On Hold': 'badge-red',
};

const steps = [
  { id: 1, label: 'Attendance Lock', status: 'done' },
  { id: 2, label: 'Leave Deductions', status: 'done' },
  { id: 3, label: 'Variable Pay Entry', status: 'done' },
  { id: 4, label: 'Pre-Payroll Checklist', status: 'active' },
  { id: 5, label: 'Payroll Processing', status: 'pending' },
  { id: 6, label: 'Review & Approval', status: 'pending' },
  { id: 7, label: 'Disbursement', status: 'pending' },
  { id: 8, label: 'Payslip Distribution', status: 'pending' },
];

export default function PayrollProcessing() {
  const [filterStatus, setFilterStatus] = useState('All');
  const totalGross = payrollRecords.reduce((s, r) => s + r.grossSalary, 0);
  const totalDeductions = payrollRecords.reduce((s, r) => s + r.deductions, 0);
  const totalNet = payrollRecords.reduce((s, r) => s + r.netPay, 0);

  const filtered = filterStatus === 'All' ? payrollRecords : payrollRecords.filter(r => r.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Pay Period Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-blue-200 text-sm font-medium">Current Pay Period</p>
            <p className="text-2xl font-bold mt-0.5">March 2026</p>
            <p className="text-blue-200 text-sm mt-1">Processing deadline: 31 Mar 2026 · 241 active employees</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white text-blue-700 font-medium text-sm px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
              <Lock size={15} /> Lock Payroll
            </button>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors">
              <Play size={15} /> Run Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Payroll Pipeline */}
      <div className="card">
        <h2 className="section-title mb-4">Payroll Processing Pipeline</h2>
        <div className="flex items-center overflow-x-auto gap-0 pb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.status === 'done' ? 'bg-green-500 text-white' :
                  step.status === 'active' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'done' ? <CheckCircle size={16} /> : step.status === 'active' ? <Clock size={16} /> : step.id}
                </div>
                <p className={`text-[10px] mt-1.5 font-medium w-20 text-center leading-tight ${step.status === 'done' ? 'text-green-600' : step.status === 'active' ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-10 h-0.5 mb-5 flex-shrink-0 ${step.status === 'done' ? 'bg-green-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Gross Payroll', value: `₹${(totalGross / 100000).toFixed(2)}L`, sub: 'Before deductions', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Deductions', value: `₹${(totalDeductions / 100000).toFixed(2)}L`, sub: 'PF, ESI, TDS, etc.', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Net Payroll', value: `₹${(totalNet / 100000).toFixed(2)}L`, sub: 'Take-home amount', color: 'text-green-600', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className="card">
            <div className={`inline-flex items-center justify-center w-10 h-10 ${s.bg} rounded-xl mb-3`}>
              <span className={`text-lg font-bold ${s.color}`}>₹</span>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-600 font-medium mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Payroll Register — March 2026</h2>
          <div className="flex gap-2">
            <select className="form-select text-xs py-1.5 w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              {['All', 'Processed', 'Pending', 'On Hold'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="btn-secondary text-xs py-1.5"><Download size={13} /> Export</button>
          </div>
        </div>

        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">Department</th>
              <th className="table-header text-right">Gross Salary</th>
              <th className="table-header text-right">Deductions</th>
              <th className="table-header text-right">Net Pay</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                      {r.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{r.employeeName}</p>
                      <p className="text-xs text-gray-400">{r.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="table-cell text-gray-600">{r.department}</td>
                <td className="table-cell text-right font-medium text-gray-900">₹{r.grossSalary.toLocaleString()}</td>
                <td className="table-cell text-right text-red-600">-₹{r.deductions.toLocaleString()}</td>
                <td className="table-cell text-right font-bold text-green-700">₹{r.netPay.toLocaleString()}</td>
                <td className="table-cell"><span className={statusColors[r.status]}>{r.status}</span></td>
                <td className="table-cell">
                  <div className="flex gap-1.5">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Payslip</button>
                    {r.status === 'On Hold' && (
                      <button className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-0.5">
                        <AlertTriangle size={10} /> Resolve
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-gray-200 bg-gray-50">
            <tr>
              <td className="table-cell font-bold text-gray-900" colSpan={2}>Total ({filtered.length} employees)</td>
              <td className="table-cell text-right font-bold text-gray-900">₹{filtered.reduce((s, r) => s + r.grossSalary, 0).toLocaleString()}</td>
              <td className="table-cell text-right font-bold text-red-600">-₹{filtered.reduce((s, r) => s + r.deductions, 0).toLocaleString()}</td>
              <td className="table-cell text-right font-bold text-green-700">₹{filtered.reduce((s, r) => s + r.netPay, 0).toLocaleString()}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
