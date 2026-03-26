import { CheckCircle, Clock, Circle } from 'lucide-react';

const newHires = [
  { id: 'NH001', name: 'Kavya Reddy', role: 'Marketing Specialist', startDate: '2026-04-01', manager: 'Lakshmi Nair', status: 'Pre-boarding', buddyAssigned: true, checklistProgress: 80 },
  { id: 'NH002', name: 'Manish Dev', role: 'DevOps Engineer', startDate: '2026-04-07', manager: 'Ravi Kumar', status: 'Offer Accepted', buddyAssigned: false, checklistProgress: 30 },
  { id: 'NH003', name: 'Sneha Pillai', role: 'Senior React Developer', startDate: '2026-04-14', manager: 'Ravi Kumar', status: 'Offer Sent', buddyAssigned: false, checklistProgress: 10 },
];

const checklistTasks = [
  { category: 'Pre-boarding (Before Day 1)', tasks: [
    { task: 'Send welcome email & login credentials', done: true },
    { task: 'Collect KYC & bank documents', done: true },
    { task: 'Sign employment contract (e-signature)', done: true },
    { task: 'Assign buddy / mentor', done: false },
    { task: 'Share first-week schedule', done: false },
  ]},
  { category: 'Day 1', tasks: [
    { task: 'Office / workstation setup', done: false },
    { task: 'IT equipment provisioning', done: false },
    { task: 'System access (email, HRMS, Slack, Jira)', done: false },
    { task: 'HR orientation session', done: false },
    { task: 'Team introduction meeting', done: false },
  ]},
  { category: '30-Day Milestones', tasks: [
    { task: 'Complete mandatory compliance trainings', done: false },
    { task: 'Shadow team members on key processes', done: false },
    { task: '30-day check-in with manager', done: false },
    { task: 'Submit initial OKRs / goals', done: false },
  ]},
];

export default function Onboarding() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'New Hires This Month', value: 3, color: 'text-blue-600' },
          { label: 'Pre-boarding', value: 1, color: 'text-purple-600' },
          { label: 'Starting This Week', value: 1, color: 'text-green-600' },
          { label: 'Avg. Onboarding Score', value: '4.2/5', color: 'text-orange-600' },
        ].map(s => (
          <div key={s.label} className="card">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* New Hire Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {newHires.map((hire, i) => {
          const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];
          return (
            <div key={hire.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 ${avatarColors[i]} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {hire.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{hire.name}</p>
                  <p className="text-xs text-gray-500">{hire.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <p className="text-gray-400">Start Date</p>
                  <p className="font-medium text-gray-900">{hire.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Manager</p>
                  <p className="font-medium text-gray-900">{hire.manager}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <span className={hire.status === 'Pre-boarding' ? 'badge-blue' : hire.status === 'Offer Accepted' ? 'badge-green' : 'badge-yellow'}>
                    {hire.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400">Buddy</p>
                  <span className={hire.buddyAssigned ? 'badge-green' : 'badge-yellow'}>
                    {hire.buddyAssigned ? 'Assigned' : 'Not Assigned'}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Checklist Progress</span>
                  <span className="font-semibold text-gray-900">{hire.checklistProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: `${hire.checklistProgress}%` }} />
                </div>
              </div>

              <button className="btn-secondary w-full justify-center mt-3 text-xs py-1.5">View Onboarding Plan</button>
            </div>
          );
        })}
      </div>

      {/* 30-60-90 Day Checklist */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Onboarding Checklist — Kavya Reddy</h2>
          <div className="flex items-center gap-2">
            <span className="badge-blue">Pre-boarding</span>
            <span className="text-xs text-gray-500">Starts April 1, 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checklistTasks.map(section => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b border-gray-100 pb-2">{section.category}</h3>
              <div className="space-y-2">
                {section.tasks.map(task => (
                  <div key={task.task} className={`flex items-start gap-2 p-2.5 rounded-lg ${task.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                    {task.done
                      ? <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                      : <Circle size={15} className="text-gray-300 mt-0.5 flex-shrink-0" />}
                    <p className={`text-xs leading-snug ${task.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {task.task}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-boarding Portal Preview */}
      <div className="card bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Pre-boarding Portal</h2>
          <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">New Hire View</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Upload Documents', icon: '📄', done: true },
            { label: 'Read Policies', icon: '📋', done: true },
            { label: 'Watch Welcome Video', icon: '🎥', done: false },
            { label: 'Fill Your Profile', icon: '👤', done: false },
          ].map(item => (
            <div key={item.label} className={`p-4 rounded-xl border text-center transition-all ${item.done ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'}`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              {item.done && <p className="text-xs text-green-300 mt-1">✓ Done</p>}
              {!item.done && <p className="text-xs text-blue-200 mt-1">Pending</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
