import { useState } from 'react';
import { User, FileText, Calendar, Clock, CheckCircle, Bell, MessageSquare, Download, Send, ChevronRight } from 'lucide-react';
import { employees, leaveBalances, payrollRecords, notifications, leaveRequests } from '../../data/mockData';

const me = employees[0];
const myPayroll = payrollRecords[0];
const myApprovals = leaveRequests.slice(0, 3);

const faqItems = [
  { q: 'How do I apply for leave?', a: 'Navigate to Attendance & Leave → Leave Management and click "Apply Leave".' },
  { q: 'When is payroll credited?', a: 'Salary is credited by the last working day of each month.' },
  { q: 'How to update my bank account?', a: 'Go to My Profile → Banking Details and submit a change request.' },
  { q: 'Who is my HR Business Partner?', a: 'Your HRBP is Ananya Singh. Email: ananya.singh@company.com' },
];

export default function SelfServicePortal() {
  const [activeTab, setActiveTab] = useState<'employee' | 'manager' | 'notifications' | 'help'>('employee');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi Priya! I\'m your HR assistant. How can I help you today?' },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { from: 'user', text: chatInput },
      { from: 'bot', text: 'Thanks for your message! Our HR team will respond within 1 business day, or check the FAQ below for quick answers.' },
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {([
          { key: 'employee', label: 'My Profile & ESS' },
          { key: 'manager', label: 'Manager View' },
          { key: 'notifications', label: 'Notifications' },
          { key: 'help', label: 'Help & FAQ' },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Employee Self-Service */}
      {activeTab === 'employee' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="card text-center xl:col-span-1">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {me.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{me.name}</h3>
            <p className="text-sm text-gray-500">{me.designation}</p>
              <p className="text-xs text-gray-400 mt-0.5">{me.department} · {me.id}</p>
            <div className="mt-4 space-y-2 text-left text-sm">
              {[
                { label: 'Email', value: me.email },
                { label: 'Mobile', value: me.phone },
                { label: 'Location', value: me.location },
                { label: 'Reporting To', value: me.manager },
                { label: 'Date of Joining', value: me.joinDate },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="text-gray-900 font-medium text-right max-w-[60%] truncate">{row.value}</span>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full justify-center mt-4 text-sm">Edit Profile</button>
          </div>

          {/* Quick actions + Leave + Payslip */}
          <div className="xl:col-span-2 space-y-4">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="section-title mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Calendar, label: 'Apply Leave', color: 'bg-blue-50 text-blue-600', href: '#' },
                  { icon: FileText, label: 'Download Payslip', color: 'bg-green-50 text-green-600', href: '#' },
                  { icon: User, label: 'Update Info', color: 'bg-purple-50 text-purple-600', href: '#' },
                  { icon: CheckCircle, label: 'IT Request', color: 'bg-orange-50 text-orange-600', href: '#' },
                ].map(action => (
                  <button key={action.label} className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                    <div className={`${action.color} p-3 rounded-xl`}>
                      <action.icon size={18} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Leave Balances */}
            <div className="card">
              <h3 className="section-title mb-3">Leave Balances</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {leaveBalances.map(lb => (
                  <div key={lb.type} className="p-3 bg-gray-50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-600">{lb.remaining}</p>
                    <p className="text-xs text-gray-500">{lb.type}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-blue-400 rounded-full h-1" style={{ width: `${(lb.remaining / lb.total) * 100}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{lb.used} used of {lb.total}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payslip */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="section-title">Latest Payslip — {myPayroll.payPeriod}</h3>
                <button className="btn-secondary flex items-center gap-1 text-xs py-1.5"><Download size={13} />Download</button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-xl font-bold text-green-700">₹{(myPayroll.grossSalary / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Gross</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xl font-bold text-red-600">₹{(myPayroll.deductions / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Deductions</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xl font-bold text-blue-700">₹{(myPayroll.netPay / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Net Pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manager View */}
      {activeTab === 'manager' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Approval Queue */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title">Pending Approvals</h3>
              <span className="badge-yellow">{myApprovals.length} pending</span>
            </div>
            <div className="space-y-3">
              {myApprovals.map(req => (
                <div key={req.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 text-sm">{req.employeeName}</p>
                    <span className="badge-yellow">{req.type}</span>
                  </div>
                    <p className="text-xs text-gray-500 mb-3">{req.from} → {req.to} · {req.days} day(s)</p>
                  <div className="flex gap-2">
                    <button className="btn-primary text-xs py-1.5 flex-1 justify-center">Approve</button>
                    <button className="btn-danger text-xs py-1.5 flex-1 justify-center">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Overview */}
          <div className="card">
            <h3 className="section-title mb-4">My Team — Today's Status</h3>
            <div className="space-y-2">
              {employees.slice(0, 6).map(emp => {
                const statuses = ['Present', 'WFH', 'Leave', 'Present', 'Present', 'WFH'];
                const idx = parseInt(emp.id.replace('EMP', '')) % 6;
                const status = statuses[idx] || 'Present';
                return (
                  <div key={emp.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.designation}</p>
                      </div>
                    </div>
                    <span className={status === 'Present' ? 'badge-green' : status === 'WFH' ? 'badge-blue' : 'badge-yellow'}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="card max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Notification Center</h3>
            <button className="text-sm text-blue-600 hover:underline">Mark all read</button>
          </div>
          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl ${!n.read ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className={`mt-0.5 flex-shrink-0 ${!n.read ? 'text-blue-500' : 'text-gray-400'}`}>
                  {n.type === 'warning' && <Bell size={18} />}
                  {n.type === 'success' && <FileText size={18} />}
                  {n.type === 'info' && <Bell size={18} />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help & FAQ */}
      {activeTab === 'help' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* FAQ */}
          <div className="card">
            <h3 className="section-title mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqItems.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                    <ChevronRight size={16} className={`text-gray-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-3 text-sm text-gray-600 bg-gray-50">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* HR Chatbot */}
          <div className="card flex flex-col" style={{ minHeight: 380 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
              <div>
                <h3 className="section-title text-sm">HR Assistant</h3>
                <p className="text-xs text-green-500 font-medium">● Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-56">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="form-input flex-1 text-sm"
                placeholder="Ask anything about HR policies…"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
              />
              <button onClick={sendChat} className="btn-primary px-3">
                <Send size={16} />
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              {['Leave balance?', 'Payslip download', 'POSH policy'].map(s => (
                <button key={s} onClick={() => { setChatInput(s); }} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
