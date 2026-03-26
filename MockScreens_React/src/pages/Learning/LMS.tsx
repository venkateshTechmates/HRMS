import { useState } from 'react';
import { BookOpen, Play, Award, Clock, Users, ChevronRight, Search, Lock, CheckCircle } from 'lucide-react';
import { courses } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const completionData = [
  { dept: 'Engineering', pct: 82 },
  { dept: 'HR', pct: 95 },
  { dept: 'Sales', pct: 68 },
  { dept: 'Finance', pct: 74 },
  { dept: 'Marketing', pct: 61 },
];

const learningPaths = [
  { name: 'Leadership Essentials', courses: 5, duration: '12 hrs', enrolled: 34, required: false, color: 'bg-purple-500' },
  { name: 'New Employee Orientation', courses: 8, duration: '6 hrs', enrolled: 120, required: true, color: 'bg-blue-500' },
  { name: 'Technical Skills – React & Node', courses: 12, duration: '40 hrs', enrolled: 22, required: false, color: 'bg-green-500' },
  { name: 'Compliance & Data Privacy', courses: 4, duration: '3 hrs', enrolled: 180, required: true, color: 'bg-red-500' },
];

const formatBadgeStyle: Record<string, string> = {
  Video: 'badge-blue',
  SCORM: 'badge-purple',
  PDF: 'badge-yellow',
  Quiz: 'badge-green',
  'Live Session': 'badge-red',
};

export default function LMS() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'mandatory' | 'optional'>('all');

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'mandatory' ? c.mandatory : !c.mandatory);
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Avg. Completion Rate', value: '76%', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Certificates Issued', value: 48, icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Active Learners', value: 134, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`${s.bg} p-3 rounded-xl`}>
              <s.icon size={22} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Paths */}
      <div className="card">
        <h2 className="section-title mb-4">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningPaths.map(path => (
            <div key={path.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
              <div className={`${path.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <BookOpen size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-gray-900 text-sm truncate">{path.name}</p>
                  {path.required && <span className="badge-red text-xs py-0">Required</span>}
                </div>
                <p className="text-xs text-gray-500">{path.courses} courses · {path.duration} · {path.enrolled} enrolled</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Course Library + Completion Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="section-title">Course Library</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="form-input pl-8 py-1.5 text-sm"
                  placeholder="Search courses…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select className="form-select py-1.5 text-sm" value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
                <option value="all">All</option>
                <option value="mandatory">Mandatory</option>
                <option value="optional">Optional</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 text-xs ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}>Grid</button>
                <button onClick={() => setView('list')} className={`px-2.5 py-1.5 text-xs ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}>List</button>
              </div>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(course => (
                <div key={course.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className={formatBadgeStyle[course.format] || 'badge-gray'}>{course.format}</span>
                    {course.mandatory && <span className="badge-red">Mandatory</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{course.enrolled} enrolled</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Completion</span>
                      <span className="font-medium text-gray-900">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-500 rounded-full h-1.5" style={{ width: `${course.completionRate}%` }} />
                    </div>
                  </div>
                  <button className="btn-secondary w-full justify-center text-xs py-1.5 flex items-center gap-1">
                    <Play size={12} />Launch
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="table-header text-left">Course</th>
                  <th className="table-header">Format</th>
                  <th className="table-header">Duration</th>
                  <th className="table-header">Enrolled</th>
                  <th className="table-header">Completion</th>
                  <th className="table-header">Rating</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(course => (
                  <tr key={course.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{course.title}</p>
                        {course.mandatory && <span className="badge-red text-xs py-0">Req.</span>}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <span className={formatBadgeStyle[course.format] || 'badge-gray'}>{course.format}</span>
                    </td>
                    <td className="table-cell text-center text-gray-600">{course.duration}</td>
                    <td className="table-cell text-center text-gray-600">{course.enrolled}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div className="bg-blue-500 rounded-full h-1.5" style={{ width: `${course.completionRate}%` }} />
                        </div>
                        <span className="text-xs font-medium w-9 text-right text-gray-700">{course.completionRate}%</span>
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <span className="text-xs text-gray-500">—</span>
                    </td>
                    <td className="table-cell text-right">
                      <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Play size={11} />Launch</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Sidebar: completion chart + certificates */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="section-title mb-4">Completion by Dept.</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={completionData} layout="vertical" barSize={10}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={75} />
                <Tooltip formatter={(val) => [`${val}%`, 'Completion']} />
                <Bar dataKey="pct" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">Upcoming Live Sessions</h3>
            <div className="space-y-3">
              {[
                { title: 'Leadership Fundamentals', date: 'Apr 5 · 3:00 PM', seats: 8 },
                { title: 'Data Privacy & GDPR', date: 'Apr 10 · 11:00 AM', seats: 15 },
                { title: 'Agile & Scrum', date: 'Apr 18 · 2:00 PM', seats: 3 },
              ].map(s => (
                <div key={s.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{s.title}</p>
                    <p className="text-xs text-gray-500">{s.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-blue-600">{s.seats} seats left</p>
                    <button className="text-xs text-blue-600 hover:underline">Enroll</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">My Certificates</h3>
            <div className="space-y-2">
              {[
                { name: 'React Advanced', date: 'Mar 2025', locked: false },
                { name: 'POSH Awareness', date: 'Jan 2025', locked: false },
                { name: 'Leadership 101', date: '—', locked: true },
              ].map(cert => (
                <div key={cert.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {cert.locked ? <Lock size={14} className="text-gray-300" /> : <Award size={14} className="text-yellow-500" />}
                    <p className={cert.locked ? 'text-gray-400' : 'text-gray-700 font-medium'}>{cert.name}</p>
                  </div>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
