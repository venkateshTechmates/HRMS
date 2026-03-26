import { Plus, Edit2, TrendingUp } from 'lucide-react';
import { employees } from '../../data/mockData';

const salaryBands = [
  { level: 'L1 — Junior', range: '₹4L – ₹8L', count: 42 },
  { level: 'L2 — Mid', range: '₹8L – ₹15L', count: 78 },
  { level: 'L3 — Senior', range: '₹15L – ₹28L', count: 65 },
  { level: 'L4 — Lead', range: '₹28L – ₹45L', count: 38 },
  { level: 'L5 — Director+', range: '₹45L – ₹1Cr', count: 17 },
];

const revisions = [
  { id: 'REV001', employee: 'Priya Sharma', dept: 'Engineering', oldCTC: '₹18L', newCTC: '₹22L', hike: '+22.2%', effectiveDate: '2026-04-01', status: 'Pending Approval', reason: 'Annual Appraisal' },
  { id: 'REV002', employee: 'Dev Iyer', dept: 'Engineering', oldCTC: '₹9L', newCTC: '₹12L', hike: '+33.3%', effectiveDate: '2026-04-01', status: 'Approved', reason: 'Promotion' },
  { id: 'REV003', employee: 'Nisha Gupta', dept: 'HR', oldCTC: '₹6.5L', newCTC: '₹8.5L', hike: '+30.8%', effectiveDate: '2026-04-01', status: 'Approved', reason: 'Promotion' },
];

const salaryComponents = [
  { component: 'Basic Salary', percent: '40%', type: 'Earning', taxable: true },
  { component: 'HRA', percent: '20%', type: 'Earning', taxable: false },
  { component: 'Special Allowance', percent: '20%', type: 'Earning', taxable: true },
  { component: 'Transport Allowance', percent: '5%', type: 'Earning', taxable: false },
  { component: 'Medical Allowance', percent: '5%', type: 'Earning', taxable: false },
  { component: 'PF (Employee)', percent: '12% of Basic', type: 'Deduction', taxable: false },
  { component: 'PF (Employer)', percent: '12% of Basic', type: 'Employer', taxable: false },
  { component: 'Professional Tax', percent: '₹200/month', type: 'Deduction', taxable: false },
];

const statusColors: Record<string, string> = {
  'Pending Approval': 'badge-yellow',
  'Approved': 'badge-green',
  'Rejected': 'badge-red',
};

export default function CompensationManagement() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg CTC', value: '₹18.2L', sub: 'Across all employees', color: 'text-blue-600' },
          { label: 'Median CTC', value: '₹14.5L', sub: 'P50 benchmark', color: 'text-purple-600' },
          { label: 'Total Payroll/Year', value: '₹45.2Cr', sub: 'Annual payroll cost', color: 'text-green-600' },
          { label: 'Pending Revisions', value: '14', sub: 'Awaiting approval', color: 'text-orange-600' },
        ].map(s => (
          <div key={s.label} className="card">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Bands */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Salary Bands & Distribution</h2>
            <button className="btn-secondary text-xs py-1.5"><Edit2 size=  {13} /> Edit Bands</button>
          </div>
          <div className="space-y-3">
            {salaryBands.map(band => (
              <div key={band.level} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">{band.level}</p>
                    <span className="text-xs font-medium text-gray-600">{band.count} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: `${(band.count / 80) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-24 text-right">{band.range}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Structure Template */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Salary Structure Template</h2>
            <button className="btn-primary text-xs py-1.5"><Plus size={13} /> New Template</button>
          </div>
          <p className="text-xs text-gray-500 mb-3">Standard CTC Breakup (% of Annual CTC)</p>
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="table-header">Component</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Type</th>
                <th className="table-header">Taxable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {salaryComponents.map(c => (
                <tr key={c.component} className="hover:bg-gray-50">
                  <td className="table-cell text-gray-900 font-medium">{c.component}</td>
                  <td className="table-cell text-gray-600">{c.percent}</td>
                  <td className="table-cell">
                    <span className={`badge text-[10px] ${c.type === 'Earning' ? 'bg-green-100 text-green-700' : c.type === 'Deduction' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="table-cell">
                    {c.taxable ? <span className="badge-red text-[10px]">Taxable</span> : <span className="badge-green text-[10px]">Exempt</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Revisions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Salary Revision Requests</h2>
          <button className="btn-primary text-xs py-1.5"><TrendingUp size={13} /> Initiate Revision</button>
        </div>
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">Department</th>
              <th className="table-header">Current CTC</th>
              <th className="table-header">Revised CTC</th>
              <th className="table-header">Hike %</th>
              <th className="table-header">Reason</th>
              <th className="table-header">Effective Date</th>
              <th className="table-header">Status</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {revisions.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium text-gray-900">{r.employee}</td>
                <td className="table-cell text-gray-600">{r.dept}</td>
                <td className="table-cell text-gray-600">{r.oldCTC}</td>
                <td className="table-cell font-semibold text-gray-900">{r.newCTC}</td>
                <td className="table-cell"><span className="text-green-600 font-bold">{r.hike}</span></td>
                <td className="table-cell text-gray-600">{r.reason}</td>
                <td className="table-cell text-gray-600">{r.effectiveDate}</td>
                <td className="table-cell"><span className={statusColors[r.status]}>{r.status}</span></td>
                <td className="table-cell">
                  {r.status === 'Pending Approval' ? (
                    <div className="flex gap-1.5">
                      <button className="text-xs btn-primary py-1">Approve</button>
                    </div>
                  ) : (
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
