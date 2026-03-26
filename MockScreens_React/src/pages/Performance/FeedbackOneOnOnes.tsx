import { useState } from 'react';
import { Plus, ThumbsUp, MessageSquare, Star } from 'lucide-react';

const feedbackItems = [
  { id: 1, from: 'Ravi Kumar', to: 'Priya Sharma', type: 'Strength', content: 'Priya consistently delivers high-quality code with excellent test coverage. Her attention to detail in code reviews is commendable.', date: '2026-03-20', tags: ['Technical Excellence', 'Ownership'] },
  { id: 2, from: 'Dev Iyer', to: 'Priya Sharma', type: 'Recognition', content: 'Thank you for mentoring me on the microservices migration. Your patience and guidance made a big difference!', date: '2026-03-18', tags: ['Mentorship', 'Collaboration'] },
  { id: 3, from: 'Priya Sharma', to: 'Ravi Kumar', type: 'Improvement', content: 'More structured sprint planning could help the team be better aligned on priorities before mid-week.', date: '2026-03-15', tags: ['Communication', 'Planning'] },
];

const oneOnOnes = [
  { id: 1, manager: 'Ravi Kumar', employee: 'Priya Sharma', scheduledDate: '2026-03-27 10:00 AM', status: 'Upcoming', agendaItems: ['Q1 goal progress', 'Career development', 'Team dynamics feedback'] },
  { id: 2, manager: 'Ravi Kumar', employee: 'Dev Iyer', scheduledDate: '2026-03-28 2:00 PM', status: 'Upcoming', agendaItems: ['Onboarding feedback', 'Technical skill gaps', 'Personal goals'] },
  { id: 3, manager: 'Ananya Singh', employee: 'Nisha Gupta', scheduledDate: '2026-03-24 11:00 AM', status: 'Completed', agendaItems: ['Performance check', 'Promotion discussion', 'Training needs'], notes: 'Nisha is ready for L3. Will initiate promotion request by April 1.' },
];

const feedbackBadges: Record<string, string> = {
  Strength: 'badge-green',
  Improvement: 'badge-yellow',
  Recognition: 'badge-purple',
};

const statusColors: Record<string, string> = {
  Upcoming: 'badge-blue',
  Completed: 'badge-green',
};

export default function FeedbackOneOnOnes() {
  const [activeTab, setActiveTab] = useState('feedback');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Feedback Given (MTD)', value: 28, icon: ThumbsUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Feedback Received', value: 15, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: '1:1s This Week', value: 6, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Requests', value: 4, icon: Plus, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {['feedback', '1on1'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
              {tab === 'feedback' ? 'Feedback Wall' : '1:1 Meetings'}
            </button>
          ))}
        </div>
        <button onClick={() => setShowFeedbackForm(true)} className="btn-primary text-xs py-1.5">
          <Plus size={13} /> {activeTab === 'feedback' ? 'Give Feedback' : 'Schedule 1:1'}
        </button>
      </div>

      {activeTab === 'feedback' && (
        <div className="space-y-4">
          {feedbackItems.map(item => (
            <div key={item.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                    {item.from.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{item.from}</span>
                      <span className="text-gray-500"> → </span>
                      <span className="font-semibold">{item.to}</span>
                    </p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
                <span className={feedbackBadges[item.type]}>{item.type}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                "{item.content}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="badge-gray text-[11px]">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === '1on1' && (
        <div className="space-y-4">
          {oneOnOnes.map(meeting => (
            <div key={meeting.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {meeting.manager}
                    <span className="text-gray-400">↔</span>
                    {meeting.employee}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{meeting.scheduledDate}</p>
                </div>
                <span className={statusColors[meeting.status]}>{meeting.status}</span>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Agenda</p>
                <div className="space-y-1">
                  {meeting.agendaItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {meeting.notes && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Meeting Notes</p>
                  <p className="text-xs text-green-800">{meeting.notes}</p>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                {meeting.status === 'Upcoming' ? (
                  <>
                    <button className="btn-primary text-xs py-1.5">Start Meeting</button>
                    <button className="btn-secondary text-xs py-1.5">Edit Agenda</button>
                  </>
                ) : (
                  <button className="btn-secondary text-xs py-1.5">View Notes</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Give Feedback Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowFeedbackForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Give Feedback</h2>
              <button onClick={() => setShowFeedbackForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="form-label">Feedback For</label>
                <select className="form-select">
                  <option>Priya Sharma</option>
                  <option>Dev Iyer</option>
                  <option>Ravi Kumar</option>
                  <option>Arjun Mehta</option>
                </select>
              </div>
              <div>
                <label className="form-label">Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Strength', 'Improvement', 'Recognition'].map(type => (
                    <button key={type} className="p-2 border-2 border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Your Feedback</label>
                <textarea className="form-input resize-none" rows={4} placeholder="Be specific and constructive. Focus on behaviors and outcomes..." />
              </div>
              <div>
                <label className="form-label">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {['Leadership', 'Technical', 'Communication', 'Ownership', 'Collaboration', 'Mentorship'].map(tag => (
                    <button key={tag} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowFeedbackForm(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={() => setShowFeedbackForm(false)} className="btn-primary flex-1 justify-center">Submit Feedback</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
