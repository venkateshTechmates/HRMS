import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { attendanceRecords } from '../../data/mockData';

const statusColors: Record<string, string> = {
  Present: 'badge-green',
  Late: 'badge-yellow',
  Absent: 'badge-red',
  'Half Day': 'badge-yellow',
  WFH: 'badge-blue',
};

const stats = [
  { label: 'Present', value: 214, total: 241, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Late Arrivals', value: 12, total: 241, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Absent', value: 8, total: 241, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Work From Home', value: 7, total: 241, icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const shifts = [
  { id: 'S1', name: 'General Shift', time: '09:00 – 18:00', employees: 180 },
  { id: 'S2', name: 'Morning Shift', time: '07:00 – 15:00', employees: 38 },
  { id: 'S3', name: 'Night Shift', time: '22:00 – 06:00', employees: 23 },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2026-03-25');
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Present', 'Late', 'Absent', 'Half Day', 'WFH'];

  const filtered = attendanceRecords.filter(r => filter === 'All' || r.status === filter);

  return (
    <div className="space-y-6">
      {/* Date Nav */}
      <div className="flex items-center gap-4">
        <button className="btn-secondary py-1.5 px-3"><ChevronLeft size={14} /></button>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
          className="form-input w-44" />
        <button className="btn-secondary py-1.5 px-3"><ChevronRight size={14} /></button>
        <span className="badge-blue">Today</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <span className="text-xs text-gray-400">{Math.round(s.value / s.total * 100)}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className={`rounded-full h-1.5 ${s.color.replace('text-', 'bg-')}`} style={{ width: `${s.value / s.total * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Table */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Attendance Log — {selectedDate}</h2>
            <div className="flex gap-2">
              <select className="form-select text-xs py-1.5 w-32" value={filter} onChange={e => setFilter(e.target.value)}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
              <button className="btn-secondary text-xs py-1.5"><Download size={13} /></button>
            </div>
          </div>
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="table-header">Employee</th>
                <th className="table-header">Check In</th>
                <th className="table-header">Check Out</th>
                <th className="table-header">Hours</th>
                <th className="table-header">Status</th>
                <th className="table-header">Action</th>
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
                      <span className="font-medium text-gray-900 text-sm">{r.employeeName}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={r.checkIn === '-' ? 'text-gray-400' : r.status === 'Late' ? 'text-yellow-600 font-medium' : 'text-gray-700'}>
                      {r.checkIn}
                    </span>
                  </td>
                  <td className="table-cell text-gray-700">{r.checkOut}</td>
                  <td className="table-cell">
                    <span className={r.hoursWorked >= 9 ? 'text-green-600 font-medium' : r.hoursWorked > 0 ? 'text-yellow-600 font-medium' : 'text-gray-400'}>
                      {r.hoursWorked > 0 ? `${r.hoursWorked}h` : '-'}
                    </span>
                  </td>
                  <td className="table-cell"><span className={statusColors[r.status]}>{r.status}</span></td>
                  <td className="table-cell">
                    {(r.status === 'Absent' || r.status === 'Late' || r.status === 'Half Day') && (
                      <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Regularize</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Shifts */}
          <div className="card">
            <h3 className="section-title mb-3">Active Shifts</h3>
            <div className="space-y-3">
              {shifts.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.time}</p>
                  </div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{s.employees}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Heatmap */}
          <div className="card">
            <h3 className="section-title mb-3">Weekly Attendance</h3>
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(d => (
                <div key={d} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{d}</p>
                  <div className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                    d === 'Sat' || d === 'Sun' ? 'bg-gray-100 text-gray-400' :
                    d === 'Wed' ? 'bg-green-500 text-white' :
                    'bg-green-400 text-white'
                  }`}>
                    {d === 'Sat' || d === 'Sun' ? '—' : '94%'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anomalies */}
          <div className="card">
            <h3 className="section-title mb-3">Flagged Anomalies</h3>
            <div className="space-y-2">
              {[
                { name: 'Ravi Kumar', issue: 'Late arrival — 45 min', severity: 'medium' },
                { name: 'Arjun Mehta', issue: 'Missing punch at checkout', severity: 'low' },
                { name: 'Karan Patel', issue: 'Absent without leave', severity: 'high' },
              ].map(a => (
                <div key={a.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.severity === 'high' ? 'bg-red-500' : a.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.issue}</p>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex-shrink-0">Act</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
