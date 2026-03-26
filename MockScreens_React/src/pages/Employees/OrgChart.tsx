import { orgChartData } from '../../data/mockData';

interface OrgNode {
  id: string;
  name: string;
  designation: string;
  department: string;
  avatar: string;
  children: OrgNode[];
}

const deptColors: Record<string, string> = {
  Engineering: 'border-blue-400 bg-blue-50',
  HR: 'border-purple-400 bg-purple-50',
  Sales: 'border-green-400 bg-green-50',
  Finance: 'border-yellow-400 bg-yellow-50',
  Marketing: 'border-pink-400 bg-pink-50',
  Executive: 'border-gray-400 bg-gray-50',
};

const avatarColors: Record<string, string> = {
  Engineering: 'bg-blue-600',
  HR: 'bg-purple-600',
  Sales: 'bg-green-600',
  Finance: 'bg-yellow-600',
  Marketing: 'bg-pink-600',
  Executive: 'bg-gray-700',
};

function OrgCard({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const borderBg = deptColors[node.department] ?? 'border-gray-300 bg-gray-50';
  const avatarBg = avatarColors[node.department] ?? 'bg-gray-600';

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div className={`border-2 ${borderBg} rounded-xl p-3 w-44 shadow-sm hover:shadow-md transition-shadow cursor-pointer group`}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`w-11 h-11 ${avatarBg} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
            {node.avatar}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 leading-tight">{node.name}</p>
            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{node.designation}</p>
            <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-white border border-gray-200 rounded-full text-gray-600">
              {node.department}
            </span>
          </div>
        </div>
      </div>

      {/* Children */}
      {node.children.length > 0 && (
        <>
          {/* Vertical line down */}
          <div className="w-px h-6 bg-gray-300" />
          {/* Horizontal bar */}
          {node.children.length > 1 && (
            <div className="relative flex items-start">
              <div
                className="absolute top-0 left-0 right-0 h-px bg-gray-300"
                style={{ width: '100%' }}
              />
            </div>
          )}
          <div className="flex items-start gap-6 relative">
            {/* Top horizontal connector */}
            {node.children.length > 1 && (
              <div
                className="absolute top-0 bg-gray-300"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: `calc(${(node.children.length - 1)} * (176px + 24px))`,
                  height: '1px',
                }}
              />
            )}
            {node.children.map(child => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-gray-300" />
                <OrgCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OrgChart() {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Employees', value: '248', color: 'text-blue-600' },
          { label: 'Engineering', value: '98', color: 'text-blue-600' },
          { label: 'Sales', value: '55', color: 'text-green-600' },
          { label: 'Finance', value: '28', color: 'text-yellow-600' },
          { label: 'HR & Others', value: '67', color: 'text-purple-600' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="card py-3 flex flex-wrap gap-4">
        {Object.entries(deptColors).map(([dept, cls]) => (
          <div key={dept} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 ${cls}`} />
            <span className="text-xs text-gray-600">{dept}</span>
          </div>
        ))}
      </div>

      {/* Org Chart Canvas */}
      <div className="card overflow-auto">
        <div className="flex justify-center p-8 min-w-max">
          <OrgCard node={orgChartData as OrgNode} />
        </div>
      </div>
    </div>
  );
}
