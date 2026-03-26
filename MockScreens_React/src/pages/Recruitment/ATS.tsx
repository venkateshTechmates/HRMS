import { useState } from 'react';
import { Search, Star, Mail, Phone, ArrowRight } from 'lucide-react';
import { candidates } from '../../data/mockData';

const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

const stageColors: Record<string, string> = {
  Applied: 'badge-gray',
  Screening: 'badge-blue',
  Interview: 'badge-yellow',
  Offer: 'badge-purple',
  Hired: 'badge-green',
  Rejected: 'badge-red',
};

const stageHeader: Record<string, string> = {
  Applied: 'bg-gray-100',
  Screening: 'bg-blue-100',
  Interview: 'bg-yellow-100',
  Offer: 'bg-purple-100',
  Hired: 'bg-green-100',
  Rejected: 'bg-red-100',
};

export default function ATS() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  const byStage = (stage: string) => filtered.filter(c => c.stage === stage);

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="form-input pl-9" placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select w-auto">
          <option>All Roles</option>
          <option>Senior React Developer</option>
          <option>HR Business Partner</option>
          <option>Sales Account Manager</option>
        </select>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setViewMode('kanban')} className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === 'kanban' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}>Kanban</button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}>List</button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageCands = byStage(stage);
            return (
              <div key={stage} className="flex-shrink-0 w-56">
                <div className={`${stageHeader[stage]} rounded-t-xl px-3 py-2.5 flex items-center justify-between`}>
                  <p className="text-xs font-semibold text-gray-700">{stage}</p>
                  <span className="text-xs font-bold bg-white rounded-full px-1.5 py-0.5 text-gray-700 shadow-sm">{stageCands.length}</span>
                </div>
                <div className="bg-gray-50 rounded-b-xl p-2 space-y-2 min-h-32">
                  {stageCands.map(c => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCandidate(c)}
                      className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{c.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">{c.experience}</span>
                        {c.rating > 0 && (
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <span key={s} className={`text-[10px] ${s <= c.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="table-header">Candidate</th>
                <th className="table-header">Applied Role</th>
                <th className="table-header">Experience</th>
                <th className="table-header">Stage</th>
                <th className="table-header">Rating</th>
                <th className="table-header">Applied On</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCandidate(c)}>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-gray-700">{c.role}</td>
                  <td className="table-cell text-gray-600">{c.experience}</td>
                  <td className="table-cell"><span className={stageColors[c.stage]}>{c.stage}</span></td>
                  <td className="table-cell">
                    {c.rating > 0 ? (
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <span key={s} className={`${s <= c.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>)}
                      </div>
                    ) : <span className="text-xs text-gray-400">Not rated</span>}
                  </td>
                  <td className="table-cell text-gray-500 text-xs">{c.appliedDate}</td>
                  <td className="table-cell">
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                      View <ArrowRight size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Candidate Detail Panel */}
      {selectedCandidate && (
        <div className="card">
          <h2 className="section-title mb-4">Candidate Detail — {selectedCandidate.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedCandidate.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCandidate.role}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={stageColors[selectedCandidate.stage]}>{selectedCandidate.stage}</span>
                    <span className="text-xs text-gray-500">{selectedCandidate.experience} experience</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                <a href={`mailto:${selectedCandidate.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Mail size={14} />{selectedCandidate.email}</a>
                <div className="flex items-center gap-2 text-gray-600"><Phone size={14} />+91 98765 43200</div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Application Timeline</p>
                <div className="space-y-2">
                  {[
                    { stage: 'Applied', date: selectedCandidate.appliedDate, done: true },
                    { stage: 'Resume Screened', date: '2026-03-08', done: selectedCandidate.stage !== 'Applied' },
                    { stage: 'Phone Screening', date: '2026-03-12', done: ['Interview', 'Offer', 'Hired'].includes(selectedCandidate.stage) },
                    { stage: 'Technical Interview', date: '2026-03-18', done: ['Offer', 'Hired'].includes(selectedCandidate.stage) },
                    { stage: 'Offer Made', date: '2026-03-22', done: ['Hired'].includes(selectedCandidate.stage) },
                  ].map(t => (
                    <div key={t.stage} className={`flex items-center gap-3 p-2.5 rounded-lg ${t.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.done ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-sm ${t.done ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{t.stage}</span>
                      <span className="text-xs text-gray-400 ml-auto">{t.done ? t.date : 'Pending'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Interviewer Scorecard</p>
                {[
                  { skill: 'Technical Skills', score: 4 },
                  { skill: 'Communication', score: 4 },
                  { skill: 'Problem Solving', score: 5 },
                  { skill: 'Culture Fit', score: 3 },
                ].map(s => (
                  <div key={s.skill} className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">{s.skill}</span>
                      <span className="font-bold text-gray-900">{s.score}/5</span>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= s.score ? 'bg-blue-500' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button className="btn-primary w-full justify-center">Move to Next Stage</button>
                <button className="btn-secondary w-full justify-center">Schedule Interview</button>
                <button className="btn-danger w-full justify-center">Reject Candidate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
