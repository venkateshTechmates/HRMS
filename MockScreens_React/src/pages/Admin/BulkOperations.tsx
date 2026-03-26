import { useState } from 'react';
import { Upload, Download, Play, Clock, CheckCircle, XCircle, AlertTriangle, FileText, Users, Bell, Calendar, ChevronDown, ChevronUp, RefreshCw, Trash2 } from 'lucide-react';
import { bulkOperations, bulkTemplates } from '../../data/mockData';

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Completed: { color: 'badge-success', icon: CheckCircle },
  Failed: { color: 'badge-danger', icon: XCircle },
  Scheduled: { color: 'bg-blue-100 text-blue-700', icon: Clock },
  'In Progress': { color: 'badge-warning', icon: RefreshCw },
};

const typeIcon: Record<string, React.ElementType> = {
  Import: Upload,
  Update: RefreshCw,
  Notification: Bell,
  Scheduled: Calendar,
};

const tabs = ['Operation History', 'Templates', 'New Operation'];

export default function BulkOperations() {
  const [activeTab, setActiveTab] = useState('Operation History');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [opType, setOpType] = useState('Import');
  const [entity, setEntity] = useState('Employees');
  const [dryRun, setDryRun] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Completed', 'In Progress', 'Scheduled', 'Failed'];
  const filtered = statusFilter === 'All' ? bulkOperations : bulkOperations.filter(o => o.status === statusFilter);

  const kpis = [
    { label: 'Total Operations', value: bulkOperations.length, icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active / Scheduled', value: bulkOperations.filter(o => o.status === 'Scheduled' || o.status === 'In Progress').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Failed (This Month)', value: bulkOperations.filter(o => o.status === 'Failed').length, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: 'Templates Available', value: bulkTemplates.length, icon: Download, color: 'text-green-600 bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Operations</h1>
          <p className="text-sm text-gray-500 mt-0.5">Import, update, and manage records at scale</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Upload size={16} /> New Bulk Operation
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                <p className="text-xs text-gray-500">{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Operation History */}
      {activeTab === 'Operation History' && (
        <div className="space-y-4">
          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="card overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Operation', 'Type', 'Entity', 'Status', 'Records', 'Initiated By', 'Date', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(op => {
                  const cfg = statusConfig[op.status];
                  const StatusIcon = cfg?.icon ?? CheckCircle;
                  const TypeIcon = typeIcon[op.type] ?? FileText;
                  const isExpanded = expandedId === op.id;
                  const successRate = op.records > 0 ? Math.round((op.success / op.records) * 100) : 0;

                  return (
                    <>
                      <tr key={op.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{op.name}</p>
                          <p className="text-xs text-gray-400">{op.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <TypeIcon size={14} />
                            {op.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{op.entity}</td>
                        <td className="px-4 py-3">
                          <span className={`badge flex items-center gap-1 w-fit ${cfg?.color}`}>
                            <StatusIcon size={11} />
                            {op.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {op.records > 0 ? (
                            <div>
                              <p className="text-gray-700 font-medium">{op.records} total</p>
                              <div className="flex gap-2 text-xs mt-0.5">
                                <span className="text-green-600">{op.success} ok</span>
                                {op.failed > 0 && <span className="text-red-500">{op.failed} failed</span>}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{op.initiatedBy}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          <p>{op.initiatedOn}</p>
                          {op.scheduledFor && <p className="text-blue-500">Sched: {op.scheduledFor}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : op.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${op.id}-expanded`} className="bg-blue-50">
                          <td colSpan={8} className="px-6 py-4">
                            <div className="grid grid-cols-3 gap-6">
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Details</p>
                                <dl className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Mode</dt>
                                    <dd className="font-medium text-gray-800">Live</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Template Used</dt>
                                    <dd className="font-medium text-gray-800">Standard</dd>
                                  </div>
                                </dl>
                              </div>
                              {op.records > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Success Rate</p>
                                  <p className="text-3xl font-bold text-gray-900">{successRate}%</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                      className={`h-2 rounded-full ${successRate >= 90 ? 'bg-green-500' : successRate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                      style={{ width: `${successRate}%` }}
                                    />
                                  </div>                                </div>
                              )}
                              <div className="flex items-end gap-2">
                                {op.status === 'Scheduled' && (
                                  <>
                                    <button className="btn-secondary text-xs">Edit Schedule</button>
                                    <button className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs flex items-center gap-1">
                                      <Trash2 size={12} /> Cancel
                                    </button>
                                  </>
                                )}
                                {op.status === 'Failed' && (
                                  <button className="btn-primary text-xs flex items-center gap-1">
                                    <RefreshCw size={12} /> Retry
                                  </button>
                                )}
                                {op.status === 'Completed' && (
                                  <button className="btn-secondary text-xs flex items-center gap-1">
                                    <Download size={12} /> Download Report
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Templates */}
      {activeTab === 'Templates' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Download CSV/XLSX templates for bulk data operations. Each template includes headers, validation rules, and example rows.</p>
          <div className="grid grid-cols-3 gap-4">
            {bulkTemplates.map(tpl => (
              <div key={tpl.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-blue-600" />
                  </div>
                  <span className={`badge text-xs ${tpl.format === 'CSV' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {tpl.format}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tpl.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{tpl.entity} · {tpl.fields} fields</p>
                <p className="text-xs text-gray-400 mb-4">Updated {tpl.lastUpdated}</p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary text-xs flex items-center justify-center gap-1.5">
                    <Download size={13} /> Download
                  </button>
                  <button className="btn-secondary text-xs px-3">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Operation Wizard */}
      {activeTab === 'New Operation' && (
        <div className="max-w-2xl space-y-6">
          <div className="card space-y-5">
            <h2 className="font-semibold text-gray-900">Configure Bulk Operation</h2>

            {/* Operation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
              <div className="grid grid-cols-4 gap-3">
                {['Import', 'Update', 'Notification', 'Scheduled'].map(t => {
                  const TIcon = typeIcon[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setOpType(t)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium flex flex-col items-center gap-2 transition-all ${opType === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      <TIcon size={18} />
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Entity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Entity</label>
              <select
                value={entity}
                onChange={e => setEntity(e.target.value)}
                className="input-field"
              >
                {['Employees', 'Attendance', 'Payroll', 'Leave Balances', 'Goals', 'Training Assignments'].map(e => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            {(opType === 'Import' || opType === 'Update') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Upload size={28} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-600">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-1">CSV or XLSX · Max 10MB · Max 50,000 rows</p>
                  <button className="btn-secondary text-xs mt-3">Browse Files</button>
                </div>
              </div>
            )}

            {/* Notification Config */}
            {opType === 'Notification' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <input className="input-field" placeholder="Notification subject line..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea className="input-field" rows={4} placeholder="Message body..." />
                </div>
              </div>
            )}

            {/* Schedule */}
            {opType === 'Scheduled' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Schedule DateTime</label>
                <input type="datetime-local" className="input-field" />
              </div>
            )}

            {/* Options */}
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div>
                <p className="text-sm font-semibold text-amber-800">Dry Run Mode</p>
                <p className="text-xs text-amber-600 mt-0.5">Validate data without applying changes. Recommended for first-time operations.</p>
              </div>
              <button
                onClick={() => setDryRun(!dryRun)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dryRun ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dryRun ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button className="btn-primary flex items-center gap-2">
                <Play size={15} /> {dryRun ? 'Run Dry Run' : 'Execute Operation'}
              </button>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>

          {/* Tips */}
          <div className="card bg-blue-50 border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Best Practices</h3>
            <ul className="space-y-1.5 text-xs text-blue-700">
              <li className="flex items-start gap-1.5"><CheckCircle size={13} className="mt-0.5 shrink-0" /> Always run a dry run before a live import to catch validation errors.</li>
              <li className="flex items-start gap-1.5"><CheckCircle size={13} className="mt-0.5 shrink-0" /> Use the provided template to ensure column headers match expected fields.</li>
              <li className="flex items-start gap-1.5"><CheckCircle size={13} className="mt-0.5 shrink-0" /> Schedule large operations during off-peak hours to minimize system impact.</li>
              <li className="flex items-start gap-1.5"><CheckCircle size={13} className="mt-0.5 shrink-0" /> Download the post-operation report to audit changes record-by-record.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
