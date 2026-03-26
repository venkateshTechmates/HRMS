import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

const ratingDistribution = [
  { rating: 'Outstanding', count: 18, percent: 7.3, color: '#8b5cf6' },
  { rating: 'Exceeds Expectations', count: 34, percent: 13.7, color: '#3b82f6' },
  { rating: 'Meets Expectations', count: 121, percent: 48.8, color: '#10b981' },
  { rating: 'Needs Improvement', count: 62, percent: 25.0, color: '#f59e0b' },
  { rating: 'Below Expectations', count: 13, percent: 5.2, color: '#ef4444' },
];

const deptRatings = [
  { dept: 'Engineering', outstanding: 8, exceeds: 16, meets: 54, needs: 16, below: 4 },
  { dept: 'Sales', outstanding: 5, exceeds: 10, meets: 28, needs: 10, below: 2 },
  { dept: 'Finance', outstanding: 2, exceeds: 4, meets: 16, needs: 5, below: 1 },
  { dept: 'HR', outstanding: 1, exceeds: 2, meets: 12, needs: 2, below: 1 },
  { dept: 'Marketing', outstanding: 2, exceeds: 2, meets: 11, needs: 7, below: 2 },
];

const quotas = [
  { category: 'Outstanding', maxQuota: '5%', current: 7.3, status: 'Exceeded' },
  { category: 'Exceeds Expectations', maxQuota: '15%', current: 13.7, status: 'Within Limit' },
  { category: 'Meets Expectations', maxQuota: '50%', current: 48.8, status: 'Within Limit' },
  { category: 'Needs Improvement', maxQuota: '25%', current: 25.0, status: 'Within Limit' },
  { category: 'Below Expectations', maxQuota: '5%', current: 5.2, status: 'Exceeded' },
];

export default function Calibration() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {ratingDistribution.map(r => (
          <div key={r.rating} className="card text-center">
            <div className="text-2xl font-bold" style={{ color: r.color }}>{r.count}</div>
            <p className="text-[11px] font-medium text-gray-600 leading-tight mt-1">{r.rating}</p>
            <p className="text-xs text-gray-400 mt-0.5">{r.percent}%</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="card">
          <h2 className="section-title mb-4">Rating Distribution — Annual Review 2025</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ratingDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="rating" type="category" tick={{ fontSize: 11 }} width={130} axisLine={false} tickLine={false} />
              <Tooltip formatter={(val: number) => [`${val} employees`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {ratingDistribution.map(entry => (
                  <Cell key={entry.rating} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quota Guardrails */}
        <div className="card">
          <h2 className="section-title mb-4">Rating Quota Guardrails</h2>
          <div className="space-y-4">
            {quotas.map(q => (
              <div key={q.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-700">{q.category}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${q.status === 'Exceeded' ? 'text-red-600' : 'text-green-600'}`}>
                      {q.current}%
                    </span>
                    <span className="text-xs text-gray-400">/ max {q.maxQuota}</span>
                    <span className={q.status === 'Exceeded' ? 'badge-red' : 'badge-green'}>{q.status}</span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`rounded-full h-2.5 transition-all ${q.status === 'Exceeded' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(q.current * 4, 100)}%` }}
                  />
                  <div
                    className="absolute top-0 h-2.5 w-0.5 bg-blue-600 rounded-full"
                    style={{ left: `${parseFloat(q.maxQuota) * 4}%` }}
                    title={`Max: ${q.maxQuota}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs font-semibold text-yellow-800">⚠️ Action Required</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              "Outstanding" and "Below Expectations" categories exceed configured quota limits. HR override required to finalize ratings.
            </p>
          </div>
        </div>
      </div>

      {/* Department Calibration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Department-wise Calibration View</h2>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-1.5">Export to Excel</button>
            <button className="btn-primary text-xs py-1.5">Override & Finalize</button>
          </div>
        </div>
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="table-header">Department</th>
              <th className="table-header text-center text-purple-600">Outstanding</th>
              <th className="table-header text-center text-blue-600">Exceeds</th>
              <th className="table-header text-center text-green-600">Meets</th>
              <th className="table-header text-center text-yellow-600">Needs Impr.</th>
              <th className="table-header text-center text-red-600">Below</th>
              <th className="table-header text-center">Total</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {deptRatings.map(d => {
              const total = d.outstanding + d.exceeds + d.meets + d.needs + d.below;
              return (
                <tr key={d.dept} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-gray-900">{d.dept}</td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-purple-700">{d.outstanding}</span>
                    <span className="text-xs text-gray-400 ml-1">({((d.outstanding/total)*100).toFixed(0)}%)</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-blue-700">{d.exceeds}</span>
                    <span className="text-xs text-gray-400 ml-1">({((d.exceeds/total)*100).toFixed(0)}%)</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-green-700">{d.meets}</span>
                    <span className="text-xs text-gray-400 ml-1">({((d.meets/total)*100).toFixed(0)}%)</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-yellow-700">{d.needs}</span>
                    <span className="text-xs text-gray-400 ml-1">({((d.needs/total)*100).toFixed(0)}%)</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-red-700">{d.below}</span>
                    <span className="text-xs text-gray-400 ml-1">({((d.below/total)*100).toFixed(0)}%)</span>
                  </td>
                  <td className="table-cell text-center font-semibold text-gray-900">{total}</td>
                  <td className="table-cell">
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Calibrate</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="border-t-2 border-gray-200 bg-gray-50">
            <tr>
              <td className="table-cell font-bold text-gray-900">Total</td>
              {[18, 34, 121, 62, 13].map((v, i) => (
                <td key={i} className="table-cell text-center font-bold text-gray-900">{v}</td>
              ))}
              <td className="table-cell text-center font-bold text-gray-900">248</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
