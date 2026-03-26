import { useState } from 'react';
import { Plus, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { performanceGoals } from '../../data/mockData';

const statusColors: Record<string, string> = {
  'On Track': 'badge-green',
  'At Risk': 'badge-yellow',
  'Completed': 'badge-blue',
  'Not Started': 'badge-gray',
};

const statusBar: Record<string, string> = {
  'On Track': 'bg-green-500',
  'At Risk': 'bg-yellow-500',
  'Completed': 'bg-blue-500',
  'Not Started': 'bg-gray-300',
};

const companyOKRs = [
  { objective: 'Scale to 500 Enterprise Customers', progress: 68, owner: 'Sales Team', keyResults: ['280 → 340 enterprise logos', 'ARR growth 40% YoY', 'NRR > 118%'] },
  { objective: 'Achieve Product-Market Fit for APAC', progress: 45, owner: 'Product Team', keyResults: ['Launch in 3 new countries', '50 design partner customers', 'CSAT > 4.2/5'] },
  { objective: 'Build a World-Class Engineering Team', progress: 82, owner: 'Engineering', keyResults: ['Hire 30 senior engineers', 'Reduce time-to-deploy < 2 hrs', 'Zero P0 bugs in production'] },
];

export default function GoalsOKRs() {
  const [activeTab, setActiveTab] = useState('individual');

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Goals', value: performanceGoals.length, icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'On Track', value: performanceGoals.filter(g => g.status === 'On Track').length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'At Risk', value: performanceGoals.filter(g => g.status === 'At Risk').length, icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Completed', value: performanceGoals.filter(g => g.status === 'Completed').length, icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className={s.color} />
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
          {['individual', 'company', 'team'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
              {tab === 'individual' ? 'My Goals' : tab === 'company' ? 'Company OKRs' : 'Team Goals'}
            </button>
          ))}
        </div>
        <button className="btn-primary text-xs py-1.5"><Plus size={13} /> Add Goal</button>
      </div>

      {activeTab === 'individual' && (
        <div className="space-y-4">
          {performanceGoals.map(goal => (
            <div key={goal.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{goal.category} · Due {goal.dueDate}</p>
                </div>
                <span className={statusColors[goal.status]}>{goal.status}</span>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Target: {goal.target}</span>
                  <span className="font-semibold text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${statusBar[goal.status]} rounded-full h-2.5 transition-all`} style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Update Progress</button>
                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'company' && (
        <div className="space-y-4">
          {companyOKRs.map((okr, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{okr.objective}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Owner: {okr.owner} · Q1 2026</p>
                </div>
                <span className={okr.progress >= 70 ? 'badge-green' : okr.progress >= 50 ? 'badge-yellow' : 'badge-red'}>
                  {okr.progress >= 70 ? 'On Track' : okr.progress >= 50 ? 'At Risk' : 'Behind'}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-bold text-gray-900">{okr.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className={`rounded-full h-3 transition-all ${okr.progress >= 70 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${okr.progress}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Results</p>
                {okr.keyResults.map((kr, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                    <p className="text-sm text-gray-700">{kr}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { team: 'Engineering', goals: 24, onTrack: 18, atRisk: 4, completed: 2, avgProgress: 72 },
            { team: 'Sales', goals: 18, onTrack: 14, atRisk: 2, completed: 2, avgProgress: 80 },
            { team: 'HR', goals: 12, onTrack: 9, atRisk: 1, completed: 2, avgProgress: 68 },
            { team: 'Finance', goals: 10, onTrack: 7, atRisk: 2, completed: 1, avgProgress: 65 },
          ].map(team => (
            <div key={team.team} className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{team.team}</h3>
                <span className="text-lg font-bold text-gray-900">{team.avgProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className={`rounded-full h-2 ${team.avgProgress >= 70 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${team.avgProgress}%` }} />
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div><p className="font-bold text-gray-900">{team.goals}</p><p className="text-gray-500">Total</p></div>
                <div><p className="font-bold text-green-600">{team.onTrack}</p><p className="text-gray-500">On Track</p></div>
                <div><p className="font-bold text-yellow-600">{team.atRisk}</p><p className="text-gray-500">At Risk</p></div>
                <div><p className="font-bold text-blue-600">{team.completed}</p><p className="text-gray-500">Done</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
