// ─── Types ────────────────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contractor';
  status: 'Active' | 'On Leave' | 'Separated';
  joinDate: string;
  salary: number;
  avatar: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  grossSalary: number;
  deductions: number;
  netPay: number;
  payPeriod: string;
  status: 'Processed' | 'Pending' | 'On Hold';
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  postedDate: string;
  applications: number;
  status: 'Open' | 'Closed' | 'On Hold';
  experience: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
  experience: string;
  rating: number;
}

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  title: string;
  category: string;
  target: string;
  progress: number;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Completed' | 'Not Started';
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  format: 'Video' | 'SCORM' | 'PDF' | 'Live Session' | 'Quiz';
  enrolled: number;
  completionRate: number;
  mandatory: boolean;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  version: string;
  effectiveDate: string;
  status: 'Active' | 'Draft' | 'Archived';
  acknowledgements: number;
  totalEmployees: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'WFH';
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

export const employees: Employee[] = [
  { id: 'EMP001', name: 'Priya Sharma', email: 'priya.sharma@company.com', phone: '+91 98765 43210', department: 'Engineering', designation: 'Senior Engineer', manager: 'Ravi Kumar', location: 'Bengaluru', employmentType: 'Full-time', status: 'Active', joinDate: '2022-03-15', salary: 1800000, avatar: 'PS', gender: 'Female', nationality: 'Indian' },
  { id: 'EMP002', name: 'Ravi Kumar', email: 'ravi.kumar@company.com', phone: '+91 98765 43211', department: 'Engineering', designation: 'Engineering Manager', manager: 'Vikram Nair', location: 'Bengaluru', employmentType: 'Full-time', status: 'Active', joinDate: '2019-07-01', salary: 3200000, avatar: 'RK', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP003', name: 'Ananya Singh', email: 'ananya.singh@company.com', phone: '+91 98765 43212', department: 'HR', designation: 'HR Manager', manager: 'Vikram Nair', location: 'Mumbai', employmentType: 'Full-time', status: 'Active', joinDate: '2020-01-10', salary: 1600000, avatar: 'AS', gender: 'Female', nationality: 'Indian' },
  { id: 'EMP004', name: 'Arjun Mehta', email: 'arjun.mehta@company.com', phone: '+91 98765 43213', department: 'Sales', designation: 'Account Executive', manager: 'Sunita Reddy', location: 'Delhi', employmentType: 'Full-time', status: 'Active', joinDate: '2023-06-01', salary: 1200000, avatar: 'AM', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP005', name: 'Sunita Reddy', email: 'sunita.reddy@company.com', phone: '+91 98765 43214', department: 'Sales', designation: 'Sales Director', manager: 'Vikram Nair', location: 'Hyderabad', employmentType: 'Full-time', status: 'Active', joinDate: '2018-11-15', salary: 3800000, avatar: 'SR', gender: 'Female', nationality: 'Indian' },
  { id: 'EMP006', name: 'Karan Patel', email: 'karan.patel@company.com', phone: '+91 98765 43215', department: 'Finance', designation: 'Finance Analyst', manager: 'Meera Joshi', location: 'Bengaluru', employmentType: 'Full-time', status: 'On Leave', joinDate: '2021-04-20', salary: 1400000, avatar: 'KP', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP007', name: 'Meera Joshi', email: 'meera.joshi@company.com', phone: '+91 98765 43216', department: 'Finance', designation: 'CFO', manager: 'Vikram Nair', location: 'Mumbai', employmentType: 'Full-time', status: 'Active', joinDate: '2017-08-01', salary: 5200000, avatar: 'MJ', gender: 'Female', nationality: 'Indian' },
  { id: 'EMP008', name: 'Dev Iyer', email: 'dev.iyer@company.com', phone: '+91 98765 43217', department: 'Engineering', designation: 'Junior Developer', manager: 'Ravi Kumar', location: 'Bengaluru', employmentType: 'Full-time', status: 'Active', joinDate: '2024-01-08', salary: 900000, avatar: 'DI', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP009', name: 'Lakshmi Nair', email: 'lakshmi.nair@company.com', phone: '+91 98765 43218', department: 'Marketing', designation: 'Marketing Lead', manager: 'Vikram Nair', location: 'Mumbai', employmentType: 'Full-time', status: 'Active', joinDate: '2020-09-14', salary: 2100000, avatar: 'LN', gender: 'Female', nationality: 'Indian' },
  { id: 'EMP010', name: 'Rahul Bose', email: 'rahul.bose@company.com', phone: '+91 98765 43219', department: 'Engineering', designation: 'DevOps Engineer', manager: 'Ravi Kumar', location: 'Remote', employmentType: 'Contractor', status: 'Active', joinDate: '2023-03-01', salary: 2400000, avatar: 'RB', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP011', name: 'Vikram Nair', email: 'vikram.nair@company.com', phone: '+91 98765 43220', department: 'Executive', designation: 'CHRO', manager: 'CEO', location: 'Mumbai', employmentType: 'Full-time', status: 'Active', joinDate: '2016-01-01', salary: 8500000, avatar: 'VN', gender: 'Male', nationality: 'Indian' },
  { id: 'EMP012', name: 'Nisha Gupta', email: 'nisha.gupta@company.com', phone: '+91 98765 43221', department: 'HR', designation: 'HR Executive', manager: 'Ananya Singh', location: 'Delhi', employmentType: 'Full-time', status: 'Active', joinDate: '2022-11-01', salary: 700000, avatar: 'NG', gender: 'Female', nationality: 'Indian' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'LR001', employeeId: 'EMP001', employeeName: 'Priya Sharma', type: 'Earned Leave', from: '2026-04-07', to: '2026-04-09', days: 3, reason: 'Family function', status: 'Pending', appliedOn: '2026-03-25' },
  { id: 'LR002', employeeId: 'EMP006', employeeName: 'Karan Patel', type: 'Sick Leave', from: '2026-03-24', to: '2026-03-28', days: 5, reason: 'Medical treatment', status: 'Approved', appliedOn: '2026-03-23' },
  { id: 'LR003', employeeId: 'EMP008', employeeName: 'Dev Iyer', type: 'Casual Leave', from: '2026-03-30', to: '2026-03-30', days: 1, reason: 'Personal work', status: 'Pending', appliedOn: '2026-03-26' },
  { id: 'LR004', employeeId: 'EMP012', employeeName: 'Nisha Gupta', type: 'Earned Leave', from: '2026-04-14', to: '2026-04-18', days: 5, reason: 'Vacation', status: 'Approved', appliedOn: '2026-03-20' },
  { id: 'LR005', employeeId: 'EMP004', employeeName: 'Arjun Mehta', type: 'Comp Off', from: '2026-04-02', to: '2026-04-02', days: 1, reason: 'Worked on weekend', status: 'Rejected', appliedOn: '2026-03-28' },
];

export const leaveBalances = [
  { type: 'Earned Leave', total: 21, used: 8, remaining: 13 },
  { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
  { type: 'Casual Leave', total: 10, used: 4, remaining: 6 },
  { type: 'Comp Off', total: 3, used: 1, remaining: 2 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Priya Sharma', date: '2026-03-25', checkIn: '09:02', checkOut: '18:15', hoursWorked: 9.2, status: 'Present' },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Ravi Kumar', date: '2026-03-25', checkIn: '09:45', checkOut: '18:30', hoursWorked: 8.75, status: 'Late' },
  { id: 'ATT003', employeeId: 'EMP003', employeeName: 'Ananya Singh', date: '2026-03-25', checkIn: '08:55', checkOut: '17:55', hoursWorked: 9.0, status: 'Present' },
  { id: 'ATT004', employeeId: 'EMP004', employeeName: 'Arjun Mehta', date: '2026-03-25', checkIn: '10:05', checkOut: '14:00', hoursWorked: 4.0, status: 'Half Day' },
  { id: 'ATT005', employeeId: 'EMP006', employeeName: 'Karan Patel', date: '2026-03-25', checkIn: '-', checkOut: '-', hoursWorked: 0, status: 'Absent' },
  { id: 'ATT006', employeeId: 'EMP008', employeeName: 'Dev Iyer', date: '2026-03-25', checkIn: '09:10', checkOut: '18:10', hoursWorked: 9.0, status: 'WFH' },
  { id: 'ATT007', employeeId: 'EMP010', employeeName: 'Rahul Bose', date: '2026-03-25', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9.0, status: 'WFH' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: 'PAY001', employeeId: 'EMP001', employeeName: 'Priya Sharma', department: 'Engineering', grossSalary: 150000, deductions: 28500, netPay: 121500, payPeriod: 'March 2026', status: 'Processed' },
  { id: 'PAY002', employeeId: 'EMP002', employeeName: 'Ravi Kumar', department: 'Engineering', grossSalary: 266667, deductions: 62800, netPay: 203867, payPeriod: 'March 2026', status: 'Processed' },
  { id: 'PAY003', employeeId: 'EMP003', employeeName: 'Ananya Singh', department: 'HR', grossSalary: 133333, deductions: 24200, netPay: 109133, payPeriod: 'March 2026', status: 'Processed' },
  { id: 'PAY004', employeeId: 'EMP004', employeeName: 'Arjun Mehta', department: 'Sales', grossSalary: 100000, deductions: 16800, netPay: 83200, payPeriod: 'March 2026', status: 'Pending' },
  { id: 'PAY005', employeeId: 'EMP005', employeeName: 'Sunita Reddy', department: 'Sales', grossSalary: 316667, deductions: 78400, netPay: 238267, payPeriod: 'March 2026', status: 'Processed' },
  { id: 'PAY006', employeeId: 'EMP006', employeeName: 'Karan Patel', department: 'Finance', grossSalary: 116667, deductions: 20200, netPay: 96467, payPeriod: 'March 2026', status: 'On Hold' },
  { id: 'PAY007', employeeId: 'EMP007', employeeName: 'Meera Joshi', department: 'Finance', grossSalary: 433333, deductions: 118200, netPay: 315133, payPeriod: 'March 2026', status: 'Processed' },
];

export const jobPostings: JobPosting[] = [
  { id: 'JOB001', title: 'Senior React Developer', department: 'Engineering', location: 'Bengaluru', type: 'Full-time', postedDate: '2026-03-01', applications: 48, status: 'Open', experience: '5-8 years' },
  { id: 'JOB002', title: 'HR Business Partner', department: 'HR', location: 'Mumbai', type: 'Full-time', postedDate: '2026-03-10', applications: 27, status: 'Open', experience: '6-10 years' },
  { id: 'JOB003', title: 'Sales Account Manager', department: 'Sales', location: 'Delhi', type: 'Full-time', postedDate: '2026-02-20', applications: 63, status: 'Open', experience: '3-5 years' },
  { id: 'JOB004', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Contract', postedDate: '2026-03-15', applications: 19, status: 'Open', experience: '4-7 years' },
  { id: 'JOB005', title: 'Finance Controller', department: 'Finance', location: 'Mumbai', type: 'Full-time', postedDate: '2026-02-01', applications: 34, status: 'Closed', experience: '10+ years' },
  { id: 'JOB006', title: 'Marketing Specialist', department: 'Marketing', location: 'Bengaluru', type: 'Full-time', postedDate: '2026-03-18', applications: 41, status: 'Open', experience: '3-6 years' },
];

export const candidates: Candidate[] = [
  { id: 'CAN001', name: 'Rohan Verma', email: 'rohan.verma@gmail.com', role: 'Senior React Developer', stage: 'Interview', appliedDate: '2026-03-05', experience: '6 years', rating: 4 },
  { id: 'CAN002', name: 'Sneha Pillai', email: 'sneha.pillai@gmail.com', role: 'Senior React Developer', stage: 'Offer', appliedDate: '2026-03-06', experience: '7 years', rating: 5 },
  { id: 'CAN003', name: 'Aditya Roy', email: 'aditya.roy@gmail.com', role: 'HR Business Partner', stage: 'Screening', appliedDate: '2026-03-12', experience: '8 years', rating: 3 },
  { id: 'CAN004', name: 'Pooja Thomas', email: 'pooja.thomas@gmail.com', role: 'Sales Account Manager', stage: 'Applied', appliedDate: '2026-03-22', experience: '4 years', rating: 0 },
  { id: 'CAN005', name: 'Manish Dev', email: 'manish.dev@gmail.com', role: 'DevOps Engineer', stage: 'Interview', appliedDate: '2026-03-17', experience: '5 years', rating: 4 },
  { id: 'CAN006', name: 'Kavya Reddy', email: 'kavya.reddy@gmail.com', role: 'Marketing Specialist', stage: 'Hired', appliedDate: '2026-03-19', experience: '4 years', rating: 5 },
  { id: 'CAN007', name: 'Ajay Sinha', email: 'ajay.sinha@gmail.com', role: 'Senior React Developer', stage: 'Rejected', appliedDate: '2026-03-08', experience: '3 years', rating: 2 },
];

export const performanceGoals: PerformanceGoal[] = [
  { id: 'GOAL001', employeeId: 'EMP001', title: 'Deliver Q1 Feature Roadmap', category: 'Delivery', target: '100% on-time delivery', progress: 75, dueDate: '2026-03-31', status: 'On Track' },
  { id: 'GOAL002', employeeId: 'EMP001', title: 'Improve Test Coverage to 85%', category: 'Quality', target: '85% code coverage', progress: 60, dueDate: '2026-06-30', status: 'At Risk' },
  { id: 'GOAL003', employeeId: 'EMP001', title: 'Complete AWS Solutions Architect Cert', category: 'Learning', target: 'Certification achieved', progress: 40, dueDate: '2026-09-30', status: 'On Track' },
  { id: 'GOAL004', employeeId: 'EMP002', title: 'Hire 5 Engineers in Q1', category: 'People', target: '5 hires made', progress: 100, dueDate: '2026-03-31', status: 'Completed' },
  { id: 'GOAL005', employeeId: 'EMP002', title: 'Reduce Engineering MTTR to < 30 mins', category: 'Operational', target: 'MTTR < 30 minutes', progress: 50, dueDate: '2026-06-30', status: 'At Risk' },
];

export const reviewCycles = [
  { id: 'RC001', name: 'Annual Performance Review 2025', type: 'Annual', startDate: '2026-01-15', endDate: '2026-02-28', status: 'Completed', participants: 248, completionRate: 94 },
  { id: 'RC002', name: 'Q1 2026 Mid-Cycle Check-in', type: 'Quarterly', startDate: '2026-03-25', endDate: '2026-04-15', status: 'In Progress', participants: 248, completionRate: 32 },
  { id: 'RC003', name: 'H1 2026 Semi-Annual Review', type: 'Semi-Annual', startDate: '2026-07-01', endDate: '2026-07-31', status: 'Upcoming', participants: 0, completionRate: 0 },
];

export const courses: Course[] = [
  { id: 'CRS001', title: 'Cybersecurity Awareness 2026', category: 'Compliance', duration: '2 hours', format: 'Video', enrolled: 248, completionRate: 78, mandatory: true },
  { id: 'CRS002', title: 'Leadership Fundamentals', category: 'Leadership', duration: '8 hours', format: 'Video', enrolled: 64, completionRate: 55, mandatory: false },
  { id: 'CRS003', title: 'POSH Awareness Training', category: 'Compliance', duration: '1.5 hours', format: 'SCORM', enrolled: 248, completionRate: 92, mandatory: true },
  { id: 'CRS004', title: 'Effective Communication Skills', category: 'Soft Skills', duration: '4 hours', format: 'Live Session', enrolled: 120, completionRate: 68, mandatory: false },
  { id: 'CRS005', title: 'React Advanced Patterns', category: 'Technical', duration: '12 hours', format: 'Video', enrolled: 28, completionRate: 41, mandatory: false },
  { id: 'CRS006', title: 'Data Privacy & GDPR', category: 'Compliance', duration: '1 hour', format: 'Quiz', enrolled: 248, completionRate: 88, mandatory: true },
];

export const policies: Policy[] = [
  { id: 'POL001', title: 'HR Policy Handbook 2026', category: 'HR', version: '3.2', effectiveDate: '2026-01-01', status: 'Active', acknowledgements: 241, totalEmployees: 248 },
  { id: 'POL002', title: 'Code of Conduct', category: 'Ethics', version: '2.1', effectiveDate: '2025-06-01', status: 'Active', acknowledgements: 248, totalEmployees: 248 },
  { id: 'POL003', title: 'IT & Data Security Policy', category: 'IT', version: '4.0', effectiveDate: '2026-02-01', status: 'Active', acknowledgements: 235, totalEmployees: 248 },
  { id: 'POL004', title: 'Leave & Attendance Policy', category: 'HR', version: '2.5', effectiveDate: '2026-01-01', status: 'Active', acknowledgements: 244, totalEmployees: 248 },
  { id: 'POL005', title: 'Remote Work Policy 2026', category: 'HR', version: '1.3', effectiveDate: '2026-03-01', status: 'Draft', acknowledgements: 0, totalEmployees: 248 },
  { id: 'POL006', title: 'POSH Policy', category: 'Compliance', version: '1.1', effectiveDate: '2024-01-01', status: 'Active', acknowledgements: 248, totalEmployees: 248 },
];

export const grievances = [
  { id: 'GRV001', employeeId: 'EMP***', type: 'Workplace Harassment', submittedOn: '2026-03-10', status: 'Under Investigation', priority: 'High', assignedTo: 'Ananya Singh' },
  { id: 'GRV002', employeeId: 'EMP012', type: 'Pay Discrepancy', submittedOn: '2026-03-18', status: 'Resolved', priority: 'Medium', assignedTo: 'Karan Patel' },
  { id: 'GRV003', employeeId: 'EMP004', type: 'Manager Conflict', submittedOn: '2026-03-20', status: 'Open', priority: 'Medium', assignedTo: 'Ananya Singh' },
];

export const notifications = [
  { id: 1, title: 'Leave Request Pending', message: 'Priya Sharma has applied for 3 days leave', time: '2 hours ago', type: 'info', read: false },
  { id: 2, title: 'Payroll Cut-off Today', message: 'March 2026 payroll cut-off is today at 6 PM', time: '4 hours ago', type: 'warning', read: false },
  { id: 3, title: 'Performance Review Due', message: 'Q1 check-in reviews are due by April 15', time: '1 day ago', type: 'warning', read: true },
  { id: 4, title: 'New Policy Published', message: 'Remote Work Policy 2026 is now available for review', time: '2 days ago', type: 'info', read: true },
  { id: 5, title: 'Onboarding Task Completed', message: 'Kavya Reddy completed all pre-boarding tasks', time: '3 days ago', type: 'success', read: true },
];

export const orgChartData = {
  id: 'EMP011',
  name: 'Vikram Nair',
  designation: 'CHRO',
  department: 'Executive',
  avatar: 'VN',
  children: [
    {
      id: 'EMP002',
      name: 'Ravi Kumar',
      designation: 'Engineering Manager',
      department: 'Engineering',
      avatar: 'RK',
      children: [
        { id: 'EMP001', name: 'Priya Sharma', designation: 'Senior Engineer', department: 'Engineering', avatar: 'PS', children: [] },
        { id: 'EMP008', name: 'Dev Iyer', designation: 'Junior Developer', department: 'Engineering', avatar: 'DI', children: [] },
        { id: 'EMP010', name: 'Rahul Bose', designation: 'DevOps Engineer', department: 'Engineering', avatar: 'RB', children: [] },
      ]
    },
    {
      id: 'EMP003',
      name: 'Ananya Singh',
      designation: 'HR Manager',
      department: 'HR',
      avatar: 'AS',
      children: [
        { id: 'EMP012', name: 'Nisha Gupta', designation: 'HR Executive', department: 'HR', avatar: 'NG', children: [] },
      ]
    },
    {
      id: 'EMP005',
      name: 'Sunita Reddy',
      designation: 'Sales Director',
      department: 'Sales',
      avatar: 'SR',
      children: [
        { id: 'EMP004', name: 'Arjun Mehta', designation: 'Account Executive', department: 'Sales', avatar: 'AM', children: [] },
      ]
    },
    {
      id: 'EMP007',
      name: 'Meera Joshi',
      designation: 'CFO',
      department: 'Finance',
      avatar: 'MJ',
      children: [
        { id: 'EMP006', name: 'Karan Patel', designation: 'Finance Analyst', department: 'Finance', avatar: 'KP', children: [] },
      ]
    },
    {
      id: 'EMP009',
      name: 'Lakshmi Nair',
      designation: 'Marketing Lead',
      department: 'Marketing',
      avatar: 'LN',
      children: []
    },
  ]
};

export const dashboardMetrics = {
  totalEmployees: 248,
  activeEmployees: 241,
  newHires: 12,
  openPositions: 14,
  attendanceRate: 94.2,
  leavePending: 8,
  payrollMonth: 'March 2026',
  payrollStatus: 'In Progress',
  totalPayroll: 4820000,
  reviewCompletion: 32,
  trainingCompletion: 78,
  attritionRate: 4.8,
};

export const headcountTrend = [
  { month: 'Oct', count: 223 },
  { month: 'Nov', count: 229 },
  { month: 'Dec', count: 231 },
  { month: 'Jan', count: 238 },
  { month: 'Feb', count: 244 },
  { month: 'Mar', count: 248 },
];

export const departmentHeadcount = [
  { department: 'Engineering', count: 98 },
  { department: 'Sales', count: 55 },
  { department: 'Finance', count: 28 },
  { department: 'HR', count: 18 },
  { department: 'Marketing', count: 24 },
  { department: 'Operations', count: 25 },
];

export const attritionData = [
  { month: 'Oct', rate: 5.2 },
  { month: 'Nov', rate: 4.9 },
  { month: 'Dec', rate: 4.1 },
  { month: 'Jan', rate: 5.5 },
  { month: 'Feb', rate: 4.6 },
  { month: 'Mar', rate: 4.8 },
];

// ─── Offboarding ──────────────────────────────────────────────────────────────

export interface OffboardingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  avatar: string;
  separationType: 'Resignation' | 'Termination' | 'Retirement' | 'Contract End';
  lastWorkingDay: string;
  initiatedOn: string;
  noticeServed: number;
  noticePeriod: number;
  status: 'In Progress' | 'Completed' | 'Pending FnF';
  tasks: { stream: string; task: string; owner: string; status: 'Pending' | 'Done' | 'Overdue' }[];
  fnfAmount: number;
  exitInterviewDone: boolean;
}

export const offboardingRecords: OffboardingRecord[] = [
  {
    id: 'OFF001', employeeId: 'EMP013', employeeName: 'Tanvir Ahmed', department: 'Engineering',
    designation: 'Backend Engineer', avatar: 'TA', separationType: 'Resignation',
    lastWorkingDay: '2026-04-10', initiatedOn: '2026-03-11', noticeServed: 23, noticePeriod: 30,
    status: 'In Progress', fnfAmount: 218400, exitInterviewDone: true,
    tasks: [
      { stream: 'IT', task: 'Revoke email & VPN access', owner: 'IT Team', status: 'Done' },
      { stream: 'IT', task: 'Laptop return', owner: 'IT Team', status: 'Pending' },
      { stream: 'HR', task: 'Exit interview', owner: 'Ananya Singh', status: 'Done' },
      { stream: 'HR', task: 'Generate relieving letter', owner: 'HR Ops', status: 'Pending' },
      { stream: 'Finance', task: 'Loan recovery verification', owner: 'Finance', status: 'Done' },
      { stream: 'Manager', task: 'Knowledge transfer doc', owner: 'Ravi Kumar', status: 'Overdue' },
    ]
  },
  {
    id: 'OFF002', employeeId: 'EMP014', employeeName: 'Preethi Nair', department: 'Sales',
    designation: 'Regional Manager', avatar: 'PN', separationType: 'Resignation',
    lastWorkingDay: '2026-03-31', initiatedOn: '2026-03-01', noticeServed: 30, noticePeriod: 30,
    status: 'Pending FnF', fnfAmount: 412000, exitInterviewDone: true,
    tasks: [
      { stream: 'IT', task: 'Revoke all SaaS tool access', owner: 'IT Team', status: 'Done' },
      { stream: 'Facilities', task: 'Access card deactivation', owner: 'Facilities', status: 'Done' },
      { stream: 'HR', task: 'Exit interview', owner: 'HR Ops', status: 'Done' },
      { stream: 'Finance', task: 'F&F computation', owner: 'Payroll', status: 'Pending' },
      { stream: 'Manager', task: 'Handover checklist', owner: 'Sunita Reddy', status: 'Done' },
    ]
  },
  {
    id: 'OFF003', employeeId: 'EMP015', employeeName: 'Gopal Verma', department: 'Finance',
    designation: 'Controller', avatar: 'GV', separationType: 'Retirement',
    lastWorkingDay: '2026-03-31', initiatedOn: '2026-02-01', noticeServed: 60, noticePeriod: 60,
    status: 'Completed', fnfAmount: 648000, exitInterviewDone: true,
    tasks: [
      { stream: 'IT', task: 'Revoke email & ERP access', owner: 'IT Team', status: 'Done' },
      { stream: 'HR', task: 'Gratuity computation', owner: 'HR Ops', status: 'Done' },
      { stream: 'HR', task: 'Service certificate', owner: 'HR Ops', status: 'Done' },
      { stream: 'Finance', task: 'F&F settlement disbursed', owner: 'Payroll', status: 'Done' },
    ]
  },
];

// ─── Helpdesk ─────────────────────────────────────────────────────────────────

export interface HelpdeskTicket {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  category: 'Payroll Query' | 'Leave Dispute' | 'Policy Clarification' | 'IT Access' | 'Document Request' | 'Grievance' | 'Other';
  subject: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  createdOn: string;
  resolvedOn?: string;
  slaHours: number;
  elapsed: number;
  csat?: number;
}

export const helpdeskTickets: HelpdeskTicket[] = [
  { id: 'TKT001', employeeId: 'EMP001', employeeName: 'Priya Sharma', avatar: 'PS', category: 'Payroll Query', subject: 'March payslip shows incorrect HRA', priority: 'P1', status: 'In Progress', assignedTo: 'Ananya Singh', createdOn: '2026-03-24', slaHours: 24, elapsed: 18, },
  { id: 'TKT002', employeeId: 'EMP004', employeeName: 'Arjun Mehta', avatar: 'AM', category: 'Leave Dispute', subject: 'Comp off rejected without reason', priority: 'P2', status: 'Open', assignedTo: 'Nisha Gupta', createdOn: '2026-03-25', slaHours: 48, elapsed: 12, },
  { id: 'TKT003', employeeId: 'EMP008', employeeName: 'Dev Iyer', avatar: 'DI', category: 'IT Access', subject: 'Cannot access staging environment', priority: 'P1', status: 'Resolved', assignedTo: 'IT Support', createdOn: '2026-03-22', resolvedOn: '2026-03-23', slaHours: 24, elapsed: 22, csat: 5 },
  { id: 'TKT004', employeeId: 'EMP006', employeeName: 'Karan Patel', avatar: 'KP', category: 'Document Request', subject: 'Need salary certificate for bank loan', priority: 'P3', status: 'Closed', assignedTo: 'HR Ops', createdOn: '2026-03-20', resolvedOn: '2026-03-21', slaHours: 72, elapsed: 20, csat: 4 },
  { id: 'TKT005', employeeId: 'EMP012', employeeName: 'Nisha Gupta', avatar: 'NG', category: 'Policy Clarification', subject: 'Work from home policy for Fridays?', priority: 'P3', status: 'In Progress', assignedTo: 'Ananya Singh', createdOn: '2026-03-26', slaHours: 72, elapsed: 5, },
  { id: 'TKT006', employeeId: 'EMP009', employeeName: 'Lakshmi Nair', avatar: 'LN', category: 'Grievance', subject: 'Micromanagement issue with project delivery', priority: 'P2', status: 'Open', assignedTo: 'Vikram Nair', createdOn: '2026-03-25', slaHours: 48, elapsed: 30, },
  { id: 'TKT007', employeeId: 'EMP002', employeeName: 'Ravi Kumar', avatar: 'RK', category: 'IT Access', subject: 'New joiner EMP008 missing Jira access', priority: 'P1', status: 'Resolved', assignedTo: 'IT Support', createdOn: '2026-03-18', resolvedOn: '2026-03-18', slaHours: 24, elapsed: 6, csat: 5 },
];

// ─── DEI ─────────────────────────────────────────────────────────────────────

export const deiGenderByDept = [
  { department: 'Engineering', male: 72, female: 26, other: 0 },
  { department: 'Sales', male: 32, female: 23, other: 0 },
  { department: 'Finance', male: 14, female: 14, other: 0 },
  { department: 'HR', male: 4, female: 14, other: 0 },
  { department: 'Marketing', male: 10, female: 14, other: 0 },
  { department: 'Operations', male: 18, female: 7, other: 0 },
];

export const deiGenderByLevel = [
  { level: 'Individual Contributor', male: 118, female: 72 },
  { level: 'Team Lead', male: 18, female: 12 },
  { level: 'Manager', male: 10, female: 6 },
  { level: 'Director', male: 4, female: 2 },
  { level: 'VP / C-Suite', male: 4, female: 2 },
];

export const deiHiringFunnel = [
  { stage: 'Applied', male: 148, female: 62 },
  { stage: 'Screened', male: 88, female: 42 },
  { stage: 'Interviewed', male: 44, female: 24 },
  { stage: 'Offered', male: 18, female: 12 },
  { stage: 'Hired', male: 9, female: 6 },
];

export const deiPayEquity = [
  { role: 'Software Engineer', maleAvg: 1820000, femaleAvg: 1760000 },
  { role: 'Team Lead', maleAvg: 2650000, femaleAvg: 2580000 },
  { role: 'Engineering Manager', maleAvg: 3400000, femaleAvg: 3200000 },
  { role: 'Sales Account Exec', maleAvg: 1250000, femaleAvg: 1180000 },
  { role: 'Finance Analyst', maleAvg: 1450000, femaleAvg: 1420000 },
];

// ─── Workforce Planning ───────────────────────────────────────────────────────

export interface HeadcountPlan {
  department: string;
  planned: number;
  actual: number;
  open: number;
}

export const headcountPlan: HeadcountPlan[] = [
  { department: 'Engineering', planned: 110, actual: 98, open: 12 },
  { department: 'Sales', planned: 60, actual: 55, open: 5 },
  { department: 'Finance', planned: 30, actual: 28, open: 2 },
  { department: 'HR', planned: 20, actual: 18, open: 2 },
  { department: 'Marketing', planned: 28, actual: 24, open: 4 },
  { department: 'Operations', planned: 28, actual: 25, open: 3 },
];

export const attritionForecast = [
  { month: 'Apr', actual: null, forecast: 4.9 },
  { month: 'May', actual: null, forecast: 5.1 },
  { month: 'Jun', actual: null, forecast: 5.4 },
  { month: 'Jul', actual: null, forecast: 4.8 },
  { month: 'Aug', actual: null, forecast: 4.6 },
  { month: 'Sep', actual: null, forecast: 4.4 },
];

export const orgHealthScores = [
  { department: 'Engineering', engagement: 74, retention: 82, timeInRole: 18 },
  { department: 'Sales', engagement: 68, retention: 71, timeInRole: 14 },
  { department: 'Finance', engagement: 80, retention: 88, timeInRole: 22 },
  { department: 'HR', engagement: 85, retention: 91, timeInRole: 26 },
  { department: 'Marketing', engagement: 77, retention: 80, timeInRole: 19 },
  { department: 'Operations', engagement: 72, retention: 76, timeInRole: 16 },
];

// ─── Succession Planning ──────────────────────────────────────────────────────

export interface CriticalRole {
  id: string;
  title: string;
  department: string;
  incumbent: string;
  incumbentAvatar: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  successors: {
    name: string;
    avatar: string;
    readiness: 'Ready Now' | 'Ready in 1-2 Years' | 'Ready in 3-5 Years';
    developmentAreas: string[];
  }[];
  lastReviewed: string;
}

export const criticalRoles: CriticalRole[] = [
  {
    id: 'CR001', title: 'CHRO', department: 'Executive', incumbent: 'Vikram Nair', incumbentAvatar: 'VN',
    riskLevel: 'High', lastReviewed: '2026-01-15',
    successors: [
      { name: 'Ananya Singh', avatar: 'AS', readiness: 'Ready in 1-2 Years', developmentAreas: ['Strategic HR Planning', 'Board Presentation'] },
    ]
  },
  {
    id: 'CR002', title: 'Engineering Manager', department: 'Engineering', incumbent: 'Ravi Kumar', incumbentAvatar: 'RK',
    riskLevel: 'Medium', lastReviewed: '2026-01-15',
    successors: [
      { name: 'Priya Sharma', avatar: 'PS', readiness: 'Ready in 1-2 Years', developmentAreas: ['People Management', 'Budget Planning'] },
      { name: 'Dev Iyer', avatar: 'DI', readiness: 'Ready in 3-5 Years', developmentAreas: ['Technical Depth', 'Leadership', 'Communication'] },
    ]
  },
  {
    id: 'CR003', title: 'CFO', department: 'Finance', incumbent: 'Meera Joshi', incumbentAvatar: 'MJ',
    riskLevel: 'High', lastReviewed: '2025-10-10',
    successors: [
      { name: 'Karan Patel', avatar: 'KP', readiness: 'Ready in 3-5 Years', developmentAreas: ['Financial Strategy', 'Investor Relations', 'M&A'] },
    ]
  },
  {
    id: 'CR004', title: 'Sales Director', department: 'Sales', incumbent: 'Sunita Reddy', incumbentAvatar: 'SR',
    riskLevel: 'Medium', lastReviewed: '2026-01-15',
    successors: [
      { name: 'Arjun Mehta', avatar: 'AM', readiness: 'Ready in 3-5 Years', developmentAreas: ['Enterprise Sales', 'P&L Ownership', 'Channel Strategy'] },
    ]
  },
  {
    id: 'CR005', title: 'Marketing Lead', department: 'Marketing', incumbent: 'Lakshmi Nair', incumbentAvatar: 'LN',
    riskLevel: 'Low', lastReviewed: '2026-02-20',
    successors: []
  },
];

export const hipoEmployees = [
  { name: 'Priya Sharma', avatar: 'PS', department: 'Engineering', level: 'Senior IC', attritionRisk: 'Medium', taggedOn: '2026-01-15', validTill: '2027-01-15' },
  { name: 'Arjun Mehta', avatar: 'AM', department: 'Sales', level: 'IC', attritionRisk: 'Low', taggedOn: '2026-01-15', validTill: '2027-01-15' },
  { name: 'Nisha Gupta', avatar: 'NG', department: 'HR', level: 'IC', attritionRisk: 'Low', taggedOn: '2026-01-15', validTill: '2027-01-15' },
  { name: 'Dev Iyer', avatar: 'DI', department: 'Engineering', level: 'Junior IC', attritionRisk: 'High', taggedOn: '2026-01-15', validTill: '2027-01-15' },
];

// ─── Workflow Builder ─────────────────────────────────────────────────────────

export interface WorkflowDefinition {
  id: string;
  name: string;
  category: 'Leave' | 'Expense' | 'Promotion' | 'Offboarding' | 'Payroll Override' | 'Recruitment';
  status: 'Active' | 'Draft' | 'Archived';
  lastModified: string;
  version: string;
  steps: { id: string; type: 'Approver' | 'Condition' | 'Notification' | 'Auto-Action'; label: string; config: string }[];
  avgApprovalTime: string;
  slaBreach: number;
}

export const workflowDefinitions: WorkflowDefinition[] = [
  {
    id: 'WF001', name: 'Standard Leave Approval', category: 'Leave', status: 'Active', lastModified: '2026-02-10', version: 'v3', avgApprovalTime: '6h 24m', slaBreach: 4.2,
    steps: [
      { id: 's1', type: 'Condition', label: 'Check Leave Type', config: 'If Maternity/Paternity → Auto-approve' },
      { id: 's2', type: 'Condition', label: 'Check Balance', config: 'If balance < requested days → Reject' },
      { id: 's3', type: 'Approver', label: 'Line Manager (L1)', config: 'SLA: 48h, Escalate to skip-level' },
      { id: 's4', type: 'Notification', label: 'Notify Employee', config: 'Email + In-app on decision' },
    ]
  },
  {
    id: 'WF002', name: 'Expense Reimbursement', category: 'Expense', status: 'Active', lastModified: '2026-01-20', version: 'v2', avgApprovalTime: '14h 10m', slaBreach: 7.8,
    steps: [
      { id: 's1', type: 'Condition', label: 'Amount Check', config: 'If amount > ₹50,000 AND level < Manager → Finance Head' },
      { id: 's2', type: 'Approver', label: 'Department Manager', config: 'SLA: 72h' },
      { id: 's3', type: 'Auto-Action', label: 'Add to Payroll', config: 'Create one-time payment in next cycle' },
    ]
  },
  {
    id: 'WF003', name: 'Promotion Approval', category: 'Promotion', status: 'Active', lastModified: '2025-12-15', version: 'v1', avgApprovalTime: '2d 4h', slaBreach: 12.1,
    steps: [
      { id: 's1', type: 'Approver', label: 'Direct Manager', config: 'SLA: 5 days' },
      { id: 's2', type: 'Approver', label: 'Department Head', config: 'SLA: 3 days, parallel with HRBP' },
      { id: 's3', type: 'Approver', label: 'HRBP Review', config: 'Parallel with Dept Head' },
      { id: 's4', type: 'Auto-Action', label: 'Update Employee Record', config: 'Apply new designation + salary effective date' },
    ]
  },
  {
    id: 'WF004', name: 'Payroll Override', category: 'Payroll Override', status: 'Active', lastModified: '2026-03-01', version: 'v2', avgApprovalTime: '1h 45m', slaBreach: 2.0,
    steps: [
      { id: 's1', type: 'Approver', label: 'Payroll Admin (Initiator)', config: 'Dual control required' },
      { id: 's2', type: 'Approver', label: 'HR Manager (Reviewer)', config: 'SLA: 4h, Required dual sign-off' },
      { id: 's3', type: 'Auto-Action', label: 'Log Override', config: 'Immutable audit entry with reason' },
    ]
  },
  {
    id: 'WF005', name: 'Offboarding Parallel Streams', category: 'Offboarding', status: 'Active', lastModified: '2026-02-28', version: 'v1', avgApprovalTime: '4d 2h', slaBreach: 18.5,
    steps: [
      { id: 's1', type: 'Auto-Action', label: 'Trigger IT Stream', config: 'Create IT tasks in Jira' },
      { id: 's2', type: 'Auto-Action', label: 'Trigger HR Stream', config: 'Schedule exit interview, compute F&F' },
      { id: 's3', type: 'Auto-Action', label: 'Trigger Finance Stream', config: 'Compute loan recovery, asset check' },
      { id: 's4', type: 'Approver', label: 'HR Final Sign-off', config: 'All streams complete before F&F release' },
    ]
  },
  {
    id: 'WF006', name: 'Recruitment Offer Approval', category: 'Recruitment', status: 'Draft', lastModified: '2026-03-20', version: 'v1', avgApprovalTime: '-', slaBreach: 0,
    steps: [
      { id: 's1', type: 'Condition', label: 'Salary Band Check', config: 'If offer > band max → Escalate to Finance' },
      { id: 's2', type: 'Approver', label: 'Hiring Manager', config: 'SLA: 24h' },
      { id: 's3', type: 'Approver', label: 'HR Head', config: 'For offers above Director level' },
      { id: 's4', type: 'Auto-Action', label: 'Generate Offer Letter', config: 'DocuSign template with merge fields' },
    ]
  },
];

// ─── Bulk Operations ──────────────────────────────────────────────────────────

export interface BulkOperation {
  id: string;
  name: string;
  type: 'Import' | 'Update' | 'Notification' | 'Scheduled';
  entity: string;
  status: 'Completed' | 'Failed' | 'Scheduled' | 'In Progress';
  records: number;
  success: number;
  failed: number;
  initiatedBy: string;
  initiatedOn: string;
  scheduledFor?: string;
}

export const bulkOperations: BulkOperation[] = [
  { id: 'BLK001', name: 'Annual Compensation Revision FY26', type: 'Scheduled', entity: 'Employee Salary', status: 'Scheduled', records: 248, success: 0, failed: 0, initiatedBy: 'Ananya Singh', initiatedOn: '2026-03-20', scheduledFor: '2026-04-01 00:00' },
  { id: 'BLK002', name: 'Q1 Leave Credit - All Employees', type: 'Update', entity: 'Leave Balance', status: 'Completed', records: 248, success: 246, failed: 2, initiatedBy: 'Ananya Singh', initiatedOn: '2026-03-25' },
  { id: 'BLK003', name: 'Policy Acknowledgement Reminder', type: 'Notification', entity: 'All Employees', status: 'Completed', records: 248, success: 244, failed: 4, initiatedBy: 'Nisha Gupta', initiatedOn: '2026-03-22' },
  { id: 'BLK004', name: 'New Hire Batch - March Joining', type: 'Import', entity: 'Employee', status: 'Completed', records: 12, success: 12, failed: 0, initiatedBy: 'HR Ops', initiatedOn: '2026-03-10' },
  { id: 'BLK005', name: 'Department Restructuring - Transfer', type: 'Update', entity: 'Employee Department', status: 'Failed', records: 15, success: 0, failed: 15, initiatedBy: 'Ananya Singh', initiatedOn: '2026-03-18' },
  { id: 'BLK006', name: 'Performance Review Nudge - Q1', type: 'Notification', entity: 'Managers + Employees', status: 'Completed', records: 180, success: 178, failed: 2, initiatedBy: 'Nisha Gupta', initiatedOn: '2026-03-26' },
];

export const bulkTemplates = [
  { id: 'TPL001', name: 'Employee Onboarding Import', entity: 'Employee', fields: 24, lastUpdated: '2026-01-10', format: 'CSV' },
  { id: 'TPL002', name: 'Salary Revision Upload', entity: 'Compensation', fields: 8, lastUpdated: '2026-02-15', format: 'Excel' },
  { id: 'TPL003', name: 'Leave Balance Adjustment', entity: 'Leave', fields: 5, lastUpdated: '2026-01-20', format: 'CSV' },
  { id: 'TPL004', name: 'User Role Assignment', entity: 'RBAC', fields: 4, lastUpdated: '2026-03-01', format: 'CSV' },
  { id: 'TPL005', name: 'Department Transfer Bulk', entity: 'Employee', fields: 6, lastUpdated: '2026-02-28', format: 'Excel' },
];
