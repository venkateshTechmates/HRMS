import { useState } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit2, MoreVertical, Mail, Phone } from 'lucide-react';
import { employees, type Employee } from '../../data/mockData';
import { Link } from 'react-router-dom';

const deptColors: Record<string, string> = {
  Engineering: 'badge-blue',
  HR: 'badge-purple',
  Sales: 'badge-green',
  Finance: 'badge-yellow',
  Marketing: 'badge-red',
  Executive: 'badge-gray',
};

const statusColors: Record<string, string> = {
  Active: 'badge-green',
  'On Leave': 'badge-yellow',
  Separated: 'badge-gray',
};

const avatarBg = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500'];

export default function EmployeeDirectory() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];
  const statuses = ['All', 'Active', 'On Leave', 'Separated'];

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.designation.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || e.department === deptFilter;
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="form-input pl-9" placeholder="Search by name, ID, designation..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select w-auto" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="form-select w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn-secondary gap-2"><Filter size={14} /> Filter</button>
        <button className="btn-secondary gap-2"><Download size={14} /> Export</button>
        <button className="btn-primary gap-2"><Plus size={14} /> Add Employee</button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} employees</p>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setViewMode('table')} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Table</button>
          <button onClick={() => setViewMode('grid')} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Grid</button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="table-header">Employee</th>
                <th className="table-header">Department</th>
                <th className="table-header">Designation</th>
                <th className="table-header">Manager</th>
                <th className="table-header">Location</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${avatarBg[i % avatarBg.length]} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.id} · {emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell"><span className={deptColors[emp.department] ?? 'badge-gray'}>{emp.department}</span></td>
                  <td className="table-cell text-gray-700">{emp.designation}</td>
                  <td className="table-cell text-gray-600">{emp.manager}</td>
                  <td className="table-cell text-gray-600">{emp.location}</td>
                  <td className="table-cell"><span className={statusColors[emp.status]}>{emp.status}</span></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedEmployee(emp)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors" title="View Profile"><Eye size={14} /></button>
                      <button className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-md transition-colors" title="Edit"><Edit2 size={14} /></button>
                      <button className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-md transition-colors"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((emp, i) => (
            <div key={emp.id} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
              <div className="flex flex-col items-center text-center gap-3 pt-2">
                <div className={`w-14 h-14 ${avatarBg[i % avatarBg.length]} rounded-full flex items-center justify-center text-white text-lg font-bold`}>
                  {emp.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.designation}</p>
                  <span className={`${deptColors[emp.department] ?? 'badge-gray'} mt-2`}>{emp.department}</span>
                </div>
                <div className="w-full border-t border-gray-100 pt-3 grid grid-cols-2 gap-2">
                  <div className="text-xs text-gray-500">
                    <p className="font-medium text-gray-700">{emp.location}</p>
                    <p>Location</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className={statusColors[emp.status]}>{emp.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Employee Profile Drawer */}
      {selectedEmployee && (
        <EmployeeProfileDrawer employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} index={employees.indexOf(selectedEmployee)} />
      )}
    </div>
  );
}

function EmployeeProfileDrawer({ employee, onClose, index }: { employee: Employee; onClose: () => void; index: number }) {
  const avatarBg = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500'];
  const tabs = ['Overview', 'Documents', 'Employment History', 'Payroll'];
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-blue-200 hover:text-white text-xl">✕</button>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${avatarBg[index % avatarBg.length]} rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
              {employee.avatar}
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <p className="text-blue-200 text-sm">{employee.designation} · {employee.department}</p>
              <p className="text-blue-300 text-xs mt-1">{employee.id} · {employee.employmentType}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
              <Mail size={12} /> Email
            </button>
            <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
              <Phone size={12} /> Call
            </button>
            <button className="flex items-center gap-1.5 bg-white text-blue-700 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
              <Edit2 size={12} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-2 bg-white sticky top-0 z-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">
          {activeTab === 'Overview' && (
            <>
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Email', value: employee.email },
                    { label: 'Phone', value: employee.phone },
                    { label: 'Gender', value: employee.gender },
                    { label: 'Nationality', value: employee.nationality },
                    { label: 'Join Date', value: employee.joinDate },
                    { label: 'Location', value: employee.location },
                  ].map(field => (
                    <div key={field.label}>
                      <p className="text-xs text-gray-500">{field.label}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">{field.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Employment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Department', value: employee.department },
                    { label: 'Designation', value: employee.designation },
                    { label: 'Employment Type', value: employee.employmentType },
                    { label: 'Reporting Manager', value: employee.manager },
                    { label: 'Status', value: employee.status },
                    { label: 'Annual CTC', value: `₹${(employee.salary / 100000).toFixed(1)}L` },
                  ].map(field => (
                    <div key={field.label}>
                      <p className="text-xs text-gray-500">{field.label}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">{field.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Leave Balance</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Earned Leave', used: 8, total: 21 },
                    { type: 'Sick Leave', used: 2, total: 10 },
                    { type: 'Casual Leave', used: 4, total: 10 },
                    { type: 'Comp Off', used: 1, total: 3 },
                  ].map(lb => (
                    <div key={lb.type} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{lb.type}</p>
                      <p className="text-lg font-bold text-gray-900">{lb.total - lb.used} <span className="text-xs font-normal text-gray-500">/ {lb.total}</span></p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
                        <div className="bg-blue-500 rounded-full h-1" style={{ width: `${((lb.total - lb.used) / lb.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'Documents' && (
            <div className="space-y-3">
              {['Employment Contract', 'Offer Letter', 'PAN Card', 'Aadhaar Card', 'Educational Certificates'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">PDF</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc}</p>
                      <p className="text-xs text-gray-500">Uploaded 15 Mar 2026</p>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Download</button>
                </div>
              ))}
              <button className="btn-secondary w-full justify-center mt-2"><Plus size={14} /> Upload Document</button>
            </div>
          )}

          {activeTab === 'Employment History' && (
            <div className="space-y-4">
              {[
                { date: '2022-03-15', event: 'Joined as Senior Engineer', dept: 'Engineering' },
                { date: '2023-04-01', event: 'Promoted to Senior Engineer Level 2', dept: 'Engineering' },
                { date: '2024-01-01', event: 'Annual Appraisal — Rating: Exceeds Expectations', dept: 'Engineering' },
                { date: '2025-01-01', event: 'Annual Appraisal — Rating: Meets Expectations', dept: 'Engineering' },
              ].map((ev, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1 flex-shrink-0" />
                    <div className="w-px bg-gray-200 flex-1 my-1" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">{ev.event}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ev.date} · {ev.dept}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Payroll' && (
            <div className="space-y-3">
              {['March 2026', 'February 2026', 'January 2026'].map(month => (
                <div key={month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{month}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Net Pay: ₹{(121500).toLocaleString()}</p>
                  </div>
                  <button className="btn-secondary text-xs py-1.5">Download Payslip</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
