import { useState } from 'react';
import { Plus, Globe, Briefcase, MapPin, Clock, Eye, Edit2, Share2 } from 'lucide-react';
import { jobPostings } from '../../data/mockData';

const statusColors: Record<string, string> = {
  Open: 'badge-green',
  Closed: 'badge-gray',
  'On Hold': 'badge-yellow',
};

const typeColors: Record<string, string> = {
  'Full-time': 'badge-blue',
  'Part-time': 'badge-purple',
  'Contract': 'badge-yellow',
};

export default function JobPostings() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewJobForm, setShowNewJobForm] = useState(false);

  const filtered = filterStatus === 'All' ? jobPostings : jobPostings.filter(j => j.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Positions', value: jobPostings.filter(j => j.status === 'Open').length, color: 'text-green-600' },
          { label: 'Total Applications', value: jobPostings.reduce((s, j) => s + j.applications, 0), color: 'text-blue-600' },
          { label: 'Avg. Applications', value: Math.round(jobPostings.reduce((s, j) => s + j.applications, 0) / jobPostings.length), color: 'text-purple-600' },
          { label: 'Positions Closed', value: jobPostings.filter(j => j.status === 'Closed').length, color: 'text-gray-600' },
        ].map(s => (
          <div key={s.label} className="card">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {['All', 'Open', 'Closed', 'On Hold'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filterStatus === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setShowNewJobForm(true)} className="btn-primary"><Plus size={14} /> Post New Job</button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(job => (
          <div key={job.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{job.department} · {job.id}</p>
              </div>
              <span className={statusColors[job.status]}>{job.status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={typeColors[job.type]}>{job.type}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={11} /> {job.location}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Briefcase size={11} /> {job.experience}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={11} /> Posted {job.postedDate}
              </div>
              <div className="flex items-center gap-1 font-semibold text-gray-900">
                <Globe size={11} /> {job.applications} applicants
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Pipeline</span>
                <span>{job.applications} total</span>
              </div>
              <div className="flex gap-1">
                {['Applied', 'Screening', 'Interview', 'Offer'].map((stage, i) => {
                  const stageCount = Math.round(job.applications * [0.5, 0.25, 0.15, 0.1][i]);
                  return (
                    <div key={stage} className="flex-1 text-center">
                      <div className={`h-2 rounded-sm mb-1 ${['bg-gray-300', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400'][i]}`} />
                      <p className="text-[10px] text-gray-500">{stage}</p>
                      <p className="text-[10px] font-bold text-gray-700">{stageCount}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center text-xs py-1.5"><Eye size={12} /> View Candidates</button>
              <button className="btn-secondary text-xs py-1.5 px-2"><Edit2 size={12} /></button>
              <button className="btn-secondary text-xs py-1.5 px-2"><Share2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* New Job Modal */}
      {showNewJobForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowNewJobForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Post New Job</h2>
              <button onClick={() => setShowNewJobForm(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="form-label">Job Title</label>
                <input type="text" className="form-input" placeholder="e.g. Senior Backend Developer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Department</label>
                  <select className="form-select"><option>Engineering</option><option>Sales</option><option>HR</option><option>Finance</option></select>
                </div>
                <div>
                  <label className="form-label">Employment Type</label>
                  <select className="form-select"><option>Full-time</option><option>Part-time</option><option>Contract</option></select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" placeholder="Bengaluru / Remote" />
                </div>
                <div>
                  <label className="form-label">Min. Experience</label>
                  <input type="text" className="form-input" placeholder="e.g. 5-8 years" />
                </div>
              </div>
              <div>
                <label className="form-label">Job Description</label>
                <textarea className="form-input resize-none" rows={4} placeholder="Describe responsibilities, requirements..." />
              </div>
              <div>
                <label className="form-label">Publish To</label>
                <div className="flex flex-wrap gap-2">
                  {['Company Careers Page', 'LinkedIn', 'Naukri', 'Indeed'].map(b => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-700">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowNewJobForm(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={() => setShowNewJobForm(false)} className="btn-primary flex-1 justify-center">Publish Job</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
