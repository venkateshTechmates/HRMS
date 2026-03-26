import { useState } from 'react';
import { Plus, Play, CheckCircle, Clock, Users, Bell } from 'lucide-react';
import { reviewCycles } from '../../data/mockData';

const statusColors: Record<string, string> = {
  Completed: 'badge-green',
  'In Progress': 'badge-blue',
  Upcoming: 'badge-gray',
};

const reviewWorkflow = [
  { step: 'Self Assessment', icon: '🧑', status: 'Completed' },
  { step: 'Peer Review', icon: '👥', status: 'In Progress' },
  { step: 'Manager Review', icon: '👔', status: 'Not Started' },
  { step: 'HRBP Calibration', icon: '⚖️', status: 'Not Started' },
  { step: 'Final Rating', icon: '⭐', status: 'Not Started' },
];

const reviewees = [
  { name: 'Priya Sharma', selfDone: true, peerDone: false, managerDone: false, rating: null, dept: 'Engineering' },
  { name: 'Dev Iyer', selfDone: true, peerDone: true, managerDone: false, rating: null, dept: 'Engineering' },
  { name: 'Arjun Mehta', selfDone: false, peerDone: false, managerDone: false, rating: null, dept: 'Sales' },
  { name: 'Nisha Gupta', selfDone: true, peerDone: true, managerDone: true, rating: 4, dept: 'HR' },
];

export default function ReviewCycles() {
  const [selectedCycle, setSelectedCycle] = useState(reviewCycles[1]);

  return (
    <div className="space-y-6">
      {/* Cycle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviewCycles.map(cycle => (
          <div
            key={cycle.id}
            onClick={() => setSelectedCycle(cycle)}
            className={`card cursor-pointer transition-all hover:shadow-md ${selectedCycle.id === cycle.id ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={statusColors[cycle.status]}>{cycle.status}</span>
              <span className="badge-gray">{cycle.type}</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">{cycle.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{cycle.startDate} → {cycle.endDate}</p>
            {cycle.status !== 'Upcoming' && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Completion</span>
                  <span className="font-bold text-gray-900">{cycle.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`rounded-full h-1.5 ${cycle.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${cycle.completionRate}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{cycle.participants} participants</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Cycle Detail */}
      {selectedCycle && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Details & Actions */}
          <div className="space-y-4 lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">{selectedCycle.name}</h2>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs py-1.5"><Bell size={13} /> Send Reminders</button>
                  {selectedCycle.status === 'In Progress' && (
                    <button className="btn-primary text-xs py-1.5"><Play size={13} /> Continue Review</button>
                  )}
                  {selectedCycle.status === 'Upcoming' && (
                    <button className="btn-primary text-xs py-1.5"><Plus size={13} /> Launch Cycle</button>
                  )}
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {reviewWorkflow.map((step, i) => (
                  <div key={step.step} className="flex items-center flex-shrink-0">
                    <div className={`flex flex-col items-center p-3 rounded-xl text-center w-28 border-2 ${
                      step.status === 'Completed' ? 'bg-green-50 border-green-200' :
                      step.status === 'In Progress' ? 'bg-blue-50 border-blue-300' :
                      'bg-gray-50 border-gray-100'
                    }`}>
                      <span className="text-2xl">{step.icon}</span>
                      <p className={`text-[11px] font-medium mt-1.5 leading-tight ${
                        step.status === 'Completed' ? 'text-green-700' :
                        step.status === 'In Progress' ? 'text-blue-700' :
                        'text-gray-400'
                      }`}>{step.step}</p>
                      {step.status === 'Completed' && <CheckCircle size={12} className="text-green-500 mt-1" />}
                      {step.status === 'In Progress' && <Clock size={12} className="text-blue-500 mt-1" />}
                    </div>
                    {i < reviewWorkflow.length - 1 && (
                      <div className={`w-6 h-0.5 mx-1 flex-shrink-0 ${step.status === 'Completed' ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Reviewee Table */}
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="table-header">Employee</th>
                    <th className="table-header text-center">Self</th>
                    <th className="table-header text-center">Peer</th>
                    <th className="table-header text-center">Manager</th>
                    <th className="table-header text-center">Final Rating</th>
                    <th className="table-header">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {reviewees.map(r => (
                    <tr key={r.name} className="hover:bg-gray-50">
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-xs font-bold">
                            {r.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{r.name}</p>
                            <p className="text-xs text-gray-400">{r.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell text-center">
                        {r.selfDone ? <CheckCircle size={16} className="text-green-500 mx-auto" /> : <Clock size={16} className="text-gray-300 mx-auto" />}
                      </td>
                      <td className="table-cell text-center">
                        {r.peerDone ? <CheckCircle size={16} className="text-green-500 mx-auto" /> : <Clock size={16} className="text-gray-300 mx-auto" />}
                      </td>
                      <td className="table-cell text-center">
                        {r.managerDone ? <CheckCircle size={16} className="text-green-500 mx-auto" /> : <Clock size={16} className="text-gray-300 mx-auto" />}
                      </td>
                      <td className="table-cell text-center">
                        {r.rating ? (
                          <div className="flex justify-center gap-0.5">
                            {[1,2,3,4,5].map(star => (
                              <span key={star} className={star <= r.rating! ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                            ))}
                          </div>
                        ) : <span className="text-gray-400 text-xs">Pending</span>}
                      </td>
                      <td className="table-cell">
                        <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                          {!r.managerDone ? 'Write Review' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="section-title mb-3">Completion Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Self Assessment', value: 72, color: 'bg-blue-500' },
                  { label: 'Peer Reviews', value: 45, color: 'bg-purple-500' },
                  { label: 'Manager Reviews', value: 28, color: 'bg-green-500' },
                  { label: 'Final Ratings', value: 8, color: 'bg-yellow-500' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="font-semibold text-gray-900">{s.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${s.color} rounded-full h-2`} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="section-title mb-3">Pending Actions</h3>
              <div className="space-y-2">
                {[
                  { action: 'Write manager review', count: 14, urgent: true },
                  { action: 'Complete self assessment', count: 68, urgent: false },
                  { action: 'Submit peer feedback', count: 42, urgent: false },
                  { action: 'Calibration sign-off', count: 3, urgent: true },
                ].map(a => (
                  <div key={a.action} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-700">{a.action}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.urgent ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>
                      {a.count}
                    </span>
                  </div>
                ))}
              </div>
              <button className="btn-secondary w-full justify-center mt-3 text-xs py-1.5">
                <Bell size={12} /> Send All Reminders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
