# Product Requirements Document
## HR Management System (HRMS)

**Version:** 3.0
**Status:** Draft
**Owner:** Product Management
**Last Updated:** March 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Stakeholders](#4-stakeholders)
5. [User Personas](#5-user-personas)
6. [Scope](#6-scope)
7. [Functional Requirements](#7-functional-requirements)
   - 7.0 General Functional Requirements (Approval Workflows)
   - 7.1 Employee Lifecycle Management
   - 7.2 Attendance & Leave Management
   - 7.3 Payroll & Compensation
   - 7.4 Performance Management
   - 7.5 Recruitment & Onboarding
   - 7.6 Learning & Development
   - 7.7 Compliance & Policy Management
   - 7.8 Self-Service Portal
   - 7.9 Analytics & Reporting
   - 7.10 Integrations
   - 7.11 Notifications & Alerts Framework
   - 7.12 Employee Helpdesk & Ticketing
   - 7.13 Diversity, Equity & Inclusion (DEI)
   - 7.14 Workforce Planning & Headcount Management
   - 7.15 Succession Planning & Talent Pipelines
   - 7.16 Bulk Operations & Templates
   - 7.17 Contractor Management
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [System Architecture Overview](#9-system-architecture-overview)
10. [Data Model Overview](#10-data-model-overview)
11. [API Design Principles](#11-api-design-principles)
12. [User Flows](#12-user-flows)
13. [Security & Compliance](#13-security--compliance)
14. [Localization & Internationalization](#14-localization--internationalization)
15. [Mobile Strategy](#15-mobile-strategy)
16. [Data Migration Plan](#16-data-migration-plan)
17. [Testing Strategy](#17-testing-strategy)
18. [Risk Register](#18-risk-register)
19. [Change Management & Training](#19-change-management--training)
20. [Assumptions & Constraints](#20-assumptions--constraints)
21. [Open Questions](#21-open-questions)
22. [Milestones & Phased Rollout](#22-milestones--phased-rollout)
23. [Budget & Cost Estimates](#23-budget--cost-estimates)
24. [Vendor Evaluation Criteria](#24-vendor-evaluation-criteria)
25. [Appendix](#25-appendix)

---

## 1. Executive Summary

The HR Management System (HRMS) is a unified, cloud-native platform designed to digitize, automate, and centralize all human resource operations across the organization. It will replace fragmented spreadsheets, siloed tools, and manual HR workflows with a single source of truth — eliminating inefficiencies, reducing compliance risk, and enabling data-driven people decisions.

The platform will serve employees, managers, HR Business Partners (HRBPs), and executives, scaling from small teams to enterprise deployments across multiple geographies, currencies, and legal jurisdictions.

### Why Now

The organization has crossed 500 employees across 3 locations and is projected to grow 40% YoY. Legacy processes cannot scale. The cost of inaction — payroll errors, compliance penalties, attrition from poor employee experience — now exceeds the cost of building the right system.

### Investment Thesis

A fully integrated HRMS is expected to deliver:
- **₹1.8 Cr+/year** in saved HR admin hours
- **60–70% reduction** in payroll processing time
- **< 0.5% payroll error rate** (from 4.1% today)
- **+23 point eNPS improvement** within 12 months of go-live

---

## 2. Problem Statement

### Current Pain Points

| Pain Area | Impact |
|---|---|
| Manual payroll processing via spreadsheets | High error rate, compliance risk, >40 hrs/month wasted |
| No centralized employee records | Inconsistent data across departments; audit failures |
| Attendance tracked in disparate systems | Inaccurate leave balances; disputes |
| Performance reviews done via email/Word docs | No visibility, no historical benchmarking |
| Recruitment managed through email threads | Long time-to-hire; poor candidate experience |
| No self-service for employees | HR team overwhelmed with routine queries |
| Zero real-time workforce analytics | Executives making people decisions without data |
| No DEI tracking | Inability to measure and improve representation |
| No unified helpdesk | Employee HR queries untracked, unresolved SLAs |
| No structured offboarding | Knowledge loss, access revocation gaps, legal exposure |
| No succession planning | Leadership gaps unaddressed; key-person risk unmanaged |
| No bulk operation tooling | HR spends hours on repetitive one-by-one updates |

### Root Cause

The organization has grown but its HR tooling has not scaled. The absence of an integrated system creates data silos, manual rework, and an inability to track the employee lifecycle holistically. HR spends over 70% of its capacity on administrative tasks, leaving almost no time for strategic people work.

### As-Is vs. To-Be

| Dimension | As-Is | To-Be |
|---|---|---|
| Employee records | Multiple Excel sheets across departments | Single HRMS source of truth |
| Payroll | Manual computation in spreadsheets | Automated engine with statutory compliance |
| Leave management | WhatsApp/email approvals | Self-service portal with workflow automation |
| Performance reviews | Annual, ad-hoc, email-based | Structured cycles, continuous feedback |
| Reporting | Manual exports, stale data | Real-time dashboards and predictive analytics |
| Onboarding | Paper-based, inconsistent | Digital pre-boarding, 30-60-90 day plans |
| Succession planning | Undocumented, informal | Structured talent pipelines with bench strength reporting |
| Offboarding | Ad-hoc checklists via email | Automated multi-stream offboarding workflows |

---

## 3. Goals & Success Metrics

### Strategic Goals

- **Operational Efficiency:** Reduce HR administrative burden by 60% through automation.
- **Employee Experience:** Deliver a modern, mobile-friendly self-service experience.
- **Data Integrity:** Achieve a single source of truth for all employee data.
- **Compliance:** Maintain 100% regulatory compliance across all operating regions.
- **Scalability:** Support 100 to 50,000+ employees without architectural changes.

### Key Performance Indicators (KPIs)

| Metric | Baseline | Target (12 months) |
|---|---|---|
| Payroll processing time | 5 days/cycle | < 1 day/cycle |
| HR ticket resolution time | 3.2 days avg | < 4 hours avg |
| Time-to-hire | 47 days avg | < 28 days |
| Employee self-service adoption | 0% | > 80% |
| Payroll error rate | 4.1% | < 0.5% |
| Compliance audit pass rate | 72% | 100% |
| Employee satisfaction (eNPS) | 22 | > 45 |
| Onboarding completion rate (30 days) | Not tracked | > 95% |
| Attrition in first year | 28% | < 18% |
| DEI gender representation (leadership) | Not tracked | Baseline set in Q1 |
| HR-to-employee ratio | 1:42 | 1:80 (via automation) |
| Critical roles with 2+ successors identified | 0% | > 80% |
| Succession plan review compliance | Not tracked | > 90% quarterly |

### Anti-Goals (What Success Is NOT)

- Replacing all third-party tools (we integrate, not replace everything)
- Full automation of all HR judgment calls (system supports, not substitutes)
- 100% offline functionality in Phase 1
- Managing contractor/gig worker payroll (separate evaluation required)

---

## 4. Stakeholders

| Stakeholder | Role | Interest | RACI |
|---|---|---|---|
| CHRO / VP of HR | Executive Sponsor | Strategic people goals, compliance, cost | A |
| HR Business Partners | Primary Users | Employee lifecycle, policy enforcement | R |
| Payroll Team | Primary Users | Accurate, timely payroll processing | R |
| IT / Engineering | Implementation Partner | Security, integrations, infrastructure | R |
| Finance | Secondary Users | Headcount costs, budget forecasting | C |
| Department Managers | Secondary Users | Team performance, leave approvals | C |
| Employees | End Users | Self-service, payslips, leave requests | I |
| Legal / Compliance | Reviewer | GDPR, labor law, data governance | C |
| C-Suite / Board | Consumers | Workforce analytics, org health metrics | I |
| Product Owner | Decision Maker | Backlog, scope, priority calls | A |

> **RACI:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## 5. User Personas

### Persona 1 — Ananya, HR Manager
- **Age:** 34 | **Experience:** 8 years in HR | **Location:** Bangalore HQ
- **Goals:** Process payroll accurately, maintain compliance, handle employee grievances.
- **Frustrations:** Spends 70% of time on administrative tasks. Cannot find historical employee data easily. Gets audit surprises.
- **Needs:** Automated workflows, audit logs, bulk data operations, compliance dashboards.
- **Tech comfort:** High — uses Excel, G-Suite, HRM tools daily.
- **Usage frequency:** Daily, 6–8 hrs/day.

### Persona 2 — Ravi, Department Manager
- **Age:** 42 | **Experience:** 12 years, manages a team of 18 | **Location:** Hyderabad
- **Goals:** Approve leaves quickly, track team performance, manage headcount, identify successors.
- **Frustrations:** Approves leave requests via email. Cannot see real-time attendance. Performance reviews are annual, not continuous.
- **Needs:** Mobile approvals, team dashboards, performance check-ins, org chart visibility, succession nominations.
- **Tech comfort:** Medium — prefers mobile over desktop for approvals.
- **Usage frequency:** 3–5 times/week, 30–45 min/session.

### Persona 3 — Priya, Employee (Individual Contributor)
- **Age:** 27 | **Experience:** 2 years at the company | **Location:** Remote (Pune)
- **Goals:** View payslips, apply for leave, track her appraisal status.
- **Frustrations:** Must email HR for every query. Has no visibility into leave balance. Finds performance review process opaque.
- **Needs:** Mobile-first self-service, leave calendar, payslip downloads, appraisal tracker.
- **Tech comfort:** High — mobile-first user.
- **Usage frequency:** Weekly, 10–15 min/session.

### Persona 4 — Vikram, CHRO
- **Age:** 51 | **Experience:** 20+ years in HR leadership | **Location:** Mumbai
- **Goals:** Align workforce strategy to business goals, reduce attrition, enable growth, improve DEI representation, ensure leadership bench strength.
- **Frustrations:** Cannot get real-time headcount or attrition data. Workforce decisions are based on stale reports. Succession plans are informal and undocumented.
- **Needs:** Executive dashboards, predictive attrition analytics, DEI metrics, budget vs actual, talent pipeline health.
- **Tech comfort:** Low-medium — relies on summaries; needs no-code dashboards.
- **Usage frequency:** Weekly reviews, monthly deep-dives.

### Persona 5 — Sanjay, Payroll Admin
- **Age:** 38 | **Experience:** 10 years in payroll | **Location:** Bangalore HQ
- **Goals:** Run payroll on time, zero errors, statutory compliance.
- **Frustrations:** Manual reconciliation every cycle; errors only found after disbursement; no audit trail.
- **Needs:** Automated statutory calculations, pre-payroll checklist, reconciliation reports, bank file export, payroll-specific audit logs.
- **Tech comfort:** High — deep domain expertise in payroll tools.
- **Usage frequency:** Daily during payroll cycle, bi-weekly otherwise.

---

## 6. Scope

### In Scope — Phase 1 (MVP)

- Employee records & org chart
- Attendance & leave management
- Payroll processing (single-country — India)
- Basic performance reviews
- Employee self-service portal (web / PWA)
- Employee helpdesk & ticketing
- Role-based access control
- Core reporting & dashboards
- Notifications framework (email + in-app)
- Bulk operations framework
- Conditional approval workflow builder

### In Scope — Phase 2

- Recruitment (ATS) & structured onboarding
- Multi-country / multi-currency payroll
- Learning Management System (LMS)
- Advanced analytics & predictive insights
- Native mobile app (iOS + Android) with offline mode
- Third-party integrations (Slack, Teams, Jira, etc.)
- DEI tracking module
- Succession planning module
- Expense reimbursement integration

### In Scope — Phase 3

- Benefits broker integrations
- Workforce planning / headcount forecasting (advanced)
- AI-powered talent intelligence (skills gaps, succession)
- Compensation benchmarking with market data
- SOC 2 Type II certification

### Out of Scope (All Phases)

- Hardware/biometric device manufacturing or management
- Payroll for gig/freelance workers (evaluated separately — see §7.17)
- Full ERP replacement (HRMS integrates with ERP, not replaces it)

---

## 7. Functional Requirements

---

### 7.0 General Functional Requirements

The following requirements apply across all modules unless otherwise specified.

#### 7.0.1 Approval Workflows (Conditional Logic)

- **FR-WF-01:** All approval workflows must support conditional branching based on employee attributes (department, level, location, employment type, tenure), request attributes (amount, leave type, reason category), time-based triggers (SLA escalation), and combination logic (AND/OR) with nested conditions.
- **FR-WF-02:** Example conditional workflows the engine must support:
  - "If expense amount > ₹50,000 AND requester level < Manager → route to Finance Head; else → Department Manager"
  - "If leave type = Maternity OR Paternity → auto-approve and notify HR"
  - "If employee tenure < 6 months AND leave type = Earned Leave → route to HR for review"
- **FR-WF-03:** HR admins must be able to design and modify approval workflows using a visual workflow builder (drag-and-drop) without engineering involvement.
- **FR-WF-04:** Workflow templates must be provided for common scenarios (leave approval, expense reimbursement, travel request, promotion, etc.) that can be copied and customized.
- **FR-WF-05:** All workflow definitions must be version-controlled. Changes to live workflows apply only to new requests; in-flight requests continue with the workflow version active at submission.
- **FR-WF-06:** Workflow test/dry-run mode must allow admins to simulate requests to validate routing before publishing.

#### 7.0.2 Parallel & Sequential Approvals

- **FR-WF-07:** Workflows must support both sequential (linear) and parallel approval stages.
- **FR-WF-08:** For parallel approvals, configurable completion rules must be supported: all approvals required, any approval sufficient, or majority approval (with tie-breaking rules).

#### 7.0.3 Escalation & Delegation

- **FR-WF-09:** Each approval step must have configurable SLAs with escalation paths:
  - Initial reminder: 24 hours before deadline
  - First escalation: At deadline (notify approver + manager)
  - Second escalation: 48 hours overdue (notify skip-level manager + HR)
  - Third escalation: 72 hours overdue (notify HRBP + department head)
- **FR-WF-10:** Approvers must be able to delegate approval authority temporarily with date ranges, reason, and optional delegation limits.
- **FR-WF-11:** Delegation must be visible to requesters and other approvers in the workflow.

#### 7.0.4 Workflow Analytics

- **FR-WF-12:** The system must track workflow metrics: average approval time per workflow type, bottlenecks (approvers with high pending times), SLA breach rate, and workflow abandonment rate.

---

### 7.1 Employee Lifecycle Management

**Overview:** The system must maintain a complete, accurate, and auditable record of every employee from pre-hire to separation.

#### 7.1.1 Employee Profile

- **FR-EMP-01:** The system shall maintain a canonical employee profile including: Employee ID, full name, date of birth, gender, nationality, contact details, emergency contacts, tax ID, bank details, employment type (full-time, part-time, contractor), department, designation, reporting manager, work location, and start date.
- **FR-EMP-02:** All profile changes must be version-controlled with timestamps, the editor's identity, and reason for change.
- **FR-EMP-03:** HR admins must be able to upload and attach documents (contracts, ID proofs, certificates) to employee profiles with file type and size validation (max 10 MB per file; allowed types: PDF, JPEG, PNG, DOCX).
- **FR-EMP-04:** The system shall support custom fields configurable by HR admins (text, dropdown, date, boolean, numeric).
- **FR-EMP-05:** The system shall support a configurable probation period tracker with alerts at 30, 60, and 90 days and a confirmation/extension workflow.

#### 7.1.2 Org Chart & Hierarchy

- **FR-ORG-01:** The system shall auto-generate and maintain a live, visual org chart based on reporting manager relationships.
- **FR-ORG-02:** HR admins must be able to perform org restructuring (department transfers, manager changes) with an effective date.
- **FR-ORG-03:** Historical org chart snapshots must be retrievable for any past date.
- **FR-ORG-04:** The org chart must be searchable by name, role, department, or location.
- **FR-ORG-05:** Org chart must be exportable as PNG, PDF, or structured JSON for integration use.

#### 7.1.3 Transfers, Promotions, Separations & Offboarding

- **FR-EMP-06:** The system shall support configurable workflows for internal transfers, promotions, and role changes — including multi-level approvals.

**Offboarding & Separation Management**

- **FR-OFF-01:** The system must support distinct separation types, each with configurable workflows: voluntary resignation (with notice period tracking), involuntary termination (for cause, performance, restructuring), retirement (superannuation, early retirement), contract end (fixed-term employees), and death in service (with special handling for benefits and final settlement).
- **FR-OFF-02:** On separation initiation, the system must capture: last working day, reason for separation (configurable reason codes), exit interview availability, and notice period details (served, waived, or paid in lieu).
- **FR-OFF-03:** The system shall trigger an automated offboarding workflow with parallel task streams:
  - **IT Stream:** Access revocation (email, VPN, SaaS tools, ERP), laptop return, data transfer
  - **Facilities Stream:** Access card deactivation, parking pass return, locker clearance
  - **HR Stream:** Exit interview scheduling, final settlement computation, experience letter generation
  - **Finance Stream:** Loan/advance recovery, asset handover confirmation
  - **Manager Stream:** Knowledge transfer documentation, handover checklist, team communication
- **FR-OFF-04:** Each offboarding task must have: assigned owner, due date (relative to last working day), status tracker, and escalation rules for overdue tasks.
- **FR-OFF-05:** The system must auto-calculate full and final settlement including: last month's prorated salary, leave encashment, bonus/commission payout (prorated), notice period pay or recovery, loan/advance recovery, asset damage recovery (if applicable), and gratuity (if eligible).
- **FR-OFF-06:** Final settlement must be locked until all offboarding tasks are marked complete by respective owners.
- **FR-OFF-07:** The system must auto-generate: experience letter, relieving letter, service certificate (for employees completing minimum tenure), and Form 16 (post final settlement).
- **FR-OFF-08:** A knowledge transfer checklist must be assigned to the departing employee and their manager, capturing: active projects and status, key stakeholder contacts, pending deliverables, documentation locations, and transition plan to successor.
- **FR-OFF-09:** An exit interview module must be available (online form or in-person scheduling) capturing: reason for leaving (primary and secondary), feedback on manager/culture/compensation/growth, eNPS, suggestions for improvement, and optional future contact details.
- **FR-OFF-10:** Exit interview responses must be anonymized for aggregate reporting while retaining original responses for HR review with restricted access.
- **FR-OFF-11:** Separated employees must be retained in a read-only state for a configurable retention period (default: 7 years). Alumni records must be created with: last known contact details, employment history, final settlement details, optional email forwarding rule, and alumni portal access (if applicable).
- **FR-OFF-12:** The system must enforce that final settlement is not processed until all offboarding tasks are marked complete and exit interview is conducted (for voluntary separations).

---

### 7.2 Attendance & Leave Management

#### 7.2.1 Attendance Tracking

- **FR-ATT-01:** The system shall support multiple attendance capture mechanisms: web clock-in/out, mobile GPS-based check-in, biometric device integration, and manual entry (with approval).
- **FR-ATT-02:** The system must detect and flag anomalies: late arrivals, early departures, missing punches, and overtime.
- **FR-ATT-03:** Managers and HR admins must be able to regularize attendance records with supporting justification and audit log.
- **FR-ATT-04:** The system shall support configurable shift schedules (fixed, rotational, flexi) and associate employees to shifts.
- **FR-ATT-05:** Overtime tracking must be configurable per location and role — with optional automatic OT pay computation.
- **FR-ATT-06:** The system must generate a daily attendance summary report auto-sent to managers at 10:00 AM.

#### 7.2.2 Leave Management

- **FR-LEV-01:** The system shall support an unlimited number of configurable leave types (earned leave, sick leave, casual leave, maternity/paternity leave, bereavement, comp-off, LOP, etc.).
- **FR-LEV-02:** Leave policies must be configurable per country, location, department, employment type, and seniority level.
- **FR-LEV-03:** Leave accrual must be automated based on policy (monthly, quarterly, anniversary-based), with proration for mid-year joiners.
- **FR-LEV-04:** Employees must be able to apply for leave via web and mobile with date selection, reason, and document upload (for medical leave).
- **FR-LEV-05:** Leave requests must route through configurable multi-level approval workflows with SLA-based escalation (default: 48-hour SLA with auto-escalation to skip-level).
- **FR-LEV-06:** The system must maintain real-time leave balances visible to employees, managers, and HR.
- **FR-LEV-07:** Leave calendar integration with Google Calendar / Outlook must be supported.
- **FR-LEV-08:** The system must support carry-forward, encashment, and lapse rules per leave type and policy.
- **FR-LEV-09:** Holiday calendars must be configurable per location/state with support for floating/optional holidays.
- **FR-LEV-10:** A team leave calendar view must be available to managers to avoid approval conflicts and ensure coverage.
- **FR-LEV-11:** The system must support country-specific leave policies with configurable minimum statutory leave entitlements, working week definitions, and part-time/pro-rated leave calculations.
- **FR-LEV-12:** Holiday calendars must be importable from government sources (CSV/API) and support optional holidays with employee selection (max N per year).
- **FR-LEV-13:** Leave accrual rules must support multiple models: monthly accrual, annual upfront, accrual based on hours worked (part-time/contractors), no accrual (unlimited PTO), and anniversary-based accrual.
- **FR-LEV-14:** The system must support international assignees and cross-border employees with ability to assign primary employment location (for payroll) and secondary work location (for leave policy), with leave policy selection configurable per home or host country.

**Maternity, Paternity & Parental Leave**

- **FR-LEV-15:** Maternity leave must support: configurable duration per country (India: 26 weeks; US: 12 weeks FMLA; UK: 52 weeks statutory), eligibility rules (min. 80 days of service in preceding 12 months for India), flexible start date (pre-delivery, delivery date, or requested date), option to split leave, medical certification upload, benefits continuation tracking (medical insurance, PF contributions during leave), and return-to-work checklist.
- **FR-LEV-16:** Paternity leave must support: configurable duration per country, eligibility rules (spouse's delivery, adoption), flexible availing window (e.g., within 6 months of child's birth), and option to split leave.
- **FR-LEV-17:** Adoption and surrogacy leaves must be configurable with duration, eligibility based on adoption completion date, and document upload support.
- **FR-LEV-18:** Parental leave workflows must: auto-notify HR, Payroll, and IT upon leave initiation; track leave balance separately (not deducted from regular leave); prevent leave approval conflicts for simultaneous parental leaves; and auto-generate return-to-work reminders.
- **FR-LEV-19:** The system must generate parental leave reports for statutory compliance (Maternity Benefit Act in India), DEI monitoring (utilization by gender, level, department), and budget forecasting (temporary backfill costs).

---

### 7.3 Payroll & Compensation

#### 7.3.1 Payroll Processing

- **FR-PAY-01:** The system shall support a fully automated, configurable payroll processing engine supporting monthly, bi-weekly, and weekly pay cycles.
- **FR-PAY-02:** Payroll calculation must include: gross salary, allowances (HRA, transport, meal, special), deductions (PF, ESI, PT, income tax, loans, advances), and net pay.
- **FR-PAY-03:** The system must auto-calculate applicable statutory deductions based on country-specific tax rules (India: TDS, PF, ESI, PT; US: FICA, federal/state income tax; etc.).
- **FR-PAY-04:** Loss of Pay (LOP) deductions must be automatically computed from approved leave-without-pay records.
- **FR-PAY-05:** The system shall support one-time payments: bonuses, incentives, arrears, and reimbursements — processable mid-cycle or on the next cycle.
- **FR-PAY-06:** Payroll must support multi-currency processing for international employees.
- **FR-PAY-07:** Pre-payroll checklist and a lock mechanism must be implemented to prevent accidental changes after cut-off.
- **FR-PAY-08:** Payroll must be auditable with a full reconciliation report showing changes vs. prior cycle.
- **FR-PAY-09:** The system shall generate a bank transfer file in formats supported by major Indian banks (ICICI, HDFC, SBI, Axis) and NEFT/RTGS standards.
- **FR-PAY-10:** Salary advance and loan management must be supported, with configurable repayment schedules and automatic EMI deductions each cycle.

#### 7.3.2 Compensation Management

- **FR-COMP-01:** The system shall maintain salary structure templates (CTC breakdowns) configurable by HR admins.
- **FR-COMP-02:** Salary revision workflows must be supported with effective date, reason code, and approval chain.
- **FR-COMP-03:** The system shall generate and distribute password-protected payslips (PDF) via email and in-app, on pay day.
- **FR-COMP-04:** Annual compensation review (ACR) cycles must be supported with bulk revision upload, manager recommendations, and approval tracking.
- **FR-COMP-05:** A total compensation statement (TCS) must be generatable per employee showing CTC breakup, benefits value, and equity (if applicable).

#### 7.3.3 Tax & Statutory Compliance

- **FR-TAX-01:** The system shall auto-generate statutory reports: Form 16, PF returns (ECR), ESI returns, PT returns (India); W-2, 1099, 941 (US).
- **FR-TAX-02:** Investment declaration by employees must be collected via self-service and applied to TDS calculations (both Old and New Tax Regime).
- **FR-TAX-03:** The system must support year-end finalization workflows for tax reconciliation.
- **FR-TAX-04:** The system must alert the payroll team with a compliance calendar for all statutory filing deadlines with 7-day and 1-day advance reminders.

---

### 7.4 Performance Management

#### 7.4.1 Goal Setting & OKRs

- **FR-PMS-01:** The system shall support goal-setting at organizational, team, and individual levels with cascading alignment.
- **FR-PMS-02:** Goals must have: title, description, category, KPIs, target value, timeline, and weight.
- **FR-PMS-03:** Mid-cycle goal amendments must be tracked with original vs. revised versions.
- **FR-PMS-04:** Employees must be able to check in on goal progress (update % completion, add notes) on a weekly/monthly cadence.

#### 7.4.2 Review Cycles

- **FR-PMS-05:** HR must be able to configure review cycles (annual, semi-annual, quarterly) with start/end dates and grace periods.
- **FR-PMS-06:** Review workflows must support: self-assessment → peer review → manager review → HRBP calibration → final rating.
- **FR-PMS-07:** Each review step must have configurable forms with rating scales (numeric, label-based), competency frameworks, and open-ended questions.
- **FR-PMS-08:** Bulk nudges and reminders must be sent automatically to pending reviewers based on deadlines (7 days, 3 days, 1 day, overdue).

#### 7.4.3 Continuous Feedback & 1:1s

- **FR-PMS-09:** Employees and managers must be able to give and receive real-time, structured feedback (strengths, improvements, recognition) at any time.
- **FR-PMS-10:** 1:1 meeting agendas, notes, and action items must be trackable within the system with persistence across sessions.
- **FR-PMS-11:** Employees must be able to request feedback from peers or cross-functional colleagues.
- **FR-PMS-12:** A recognition wall / kudos module must allow any employee to publicly recognize a colleague.

#### 7.4.4 Calibration & Bell Curve

- **FR-PMS-13:** HR and leadership must be able to view and adjust rating distributions with calibration views by department, level, and geography.
- **FR-PMS-14:** The system must enforce configurable rating quotas (e.g., max 10% "Exceeds Expectations") with guardrails and override capabilities for HR.
- **FR-PMS-15:** Post-calibration, final ratings must be communicated to employees with a manager-authored narrative — tracked as delivered/pending.

---

### 7.5 Recruitment & Onboarding

#### 7.5.1 Applicant Tracking System (ATS)

- **FR-REC-01:** Hiring managers must be able to raise manpower requisitions (MPRs) with: role details, headcount, budget, justification, and required start date.
- **FR-REC-02:** The system shall support a configurable recruitment pipeline: Applied → Screening → Interview Rounds → Offer → Accepted/Rejected.
- **FR-REC-03:** Job postings must be publishable to a branded careers page and distributable to integrated job boards (LinkedIn, Naukri, Indeed).
- **FR-REC-04:** Resume parsing must extract key fields (name, contact, experience, skills, education) and auto-populate candidate profiles.
- **FR-REC-05:** Interview scheduling must support calendar integration and automated email/SMS notifications to candidates and interviewers.
- **FR-REC-06:** Interviewers must submit structured feedback via scorecards linked to role-specific competencies within 24 hours of the interview.
- **FR-REC-07:** Offer letters must be generated from configurable templates, e-signed (DocuSign/Adobe Sign integration), and auto-archived.
- **FR-REC-08:** A candidate self-service portal must allow applicants to track their application status and upload requested documents.
- **FR-REC-09:** The system must track source effectiveness (referral, job board, agency, direct) with cost-per-hire reporting.

#### 7.5.2 Onboarding

- **FR-ONB-01:** On offer acceptance, the system shall auto-trigger an onboarding workflow: document collection, IT provisioning tasks, system access requests, and buddy assignment.
- **FR-ONB-02:** New joiners must have access to a pre-boarding portal to complete paperwork, read policies, and watch welcome videos before Day 1.
- **FR-ONB-03:** A structured 30-60-90 day onboarding checklist must be assignable, with progress visible to both the new hire and their manager.
- **FR-ONB-04:** The system shall convert the offer record into an employee record on the joining date, eliminating re-data entry.
- **FR-ONB-05:** Onboarding satisfaction surveys must be triggered automatically at Day 7, Day 30, and Day 90.

---

### 7.6 Learning & Development

- **FR-LMS-01:** The system shall support a content library for internal training courses in multiple formats: video, SCORM packages, PDFs, quizzes, and live sessions.
- **FR-LMS-02:** Courses must be assignable by HR (mandatory), by managers, or self-enrolled by employees.
- **FR-LMS-03:** Course completion, scores, and certificates must be tracked and linked to employee development profiles.
- **FR-LMS-04:** Learning paths (curated sequences of courses) must be configurable by role, level, or department.
- **FR-LMS-05:** The system must track training spend and ROI per employee and department.
- **FR-LMS-06:** A skills inventory must be maintained per employee, updatable via course completions, manager assessments, and self-declaration.
- **FR-LMS-07:** Individual Development Plans (IDPs) must be createable, with goals, timelines, and linked courses — reviewed in 1:1s and performance cycles.

---

### 7.7 Compliance & Policy Management

- **FR-COM-01:** HR must be able to upload, version, and publish company policies (HR policy, code of conduct, IT policy, etc.) with effective dates.
- **FR-COM-02:** Employees must acknowledge receipt of policies with e-signatures; acknowledgement records must be stored with timestamps and IP address.
- **FR-COM-03:** The system shall maintain a configurable compliance calendar for recurring statutory filing deadlines with assigned owners and status tracking.
- **FR-COM-04:** A grievance redressal module must allow employees to raise complaints confidentially, with case tracking, response SLAs (72-hour acknowledgement, 30-day resolution), and escalation.
- **FR-COM-05:** The system must support POSH (Prevention of Sexual Harassment) case management with restricted access, investigation tracking, and audit trails.
- **FR-COM-06:** The system must support document expiry tracking (visa, work permits, professional certifications) with configurable alerts at 90, 60, 30, and 7 days before expiry.

---

### 7.8 Self-Service Portal

- **FR-SS-01:** Every employee must have a self-service portal (web and mobile) to view/update personal information, apply for leave, download payslips, view appraisal status, and access company policies.
- **FR-SS-02:** Managers must have a team view with approval queues, team attendance, leave calendar, and performance snapshots.
- **FR-SS-03:** An in-app notification center must surface all pending actions, approvals, deadlines, and announcements with read/unread state.
- **FR-SS-04:** A search-enabled HR knowledge base / FAQ must be available to employees to reduce support tickets.
- **FR-SS-05:** A chatbot (or AI assistant) integration must be available for common queries (leave balance, payslip status, holiday list, IT asset details).
- **FR-SS-06:** Employees must be able to update bank account details, emergency contacts, and address through the portal — subject to HR approval for sensitive fields.
- **FR-SS-07:** A company announcements board must be available for HR/Leadership to publish organization-wide or department-specific announcements.

---

### 7.9 Analytics & Reporting

- **FR-RPT-01:** The system shall provide pre-built dashboards for: headcount & attrition, payroll cost, attendance, leave utilization, hiring funnel, performance distribution, DEI metrics, and succession bench strength.
- **FR-RPT-02:** HR admins must be able to build custom reports using a drag-and-drop report builder with filter, grouping, and cross-tabulation.
- **FR-RPT-03:** All reports must be exportable to CSV, Excel, and PDF.
- **FR-RPT-04:** Scheduled report delivery via email must be configurable (daily, weekly, monthly).
- **FR-RPT-05:** The system shall provide predictive analytics for: attrition risk scores (per employee), absenteeism patterns, and performance trajectory.
- **FR-RPT-06:** Executive dashboards must support real-time data with drill-down from org-level to individual employee.
- **FR-RPT-07:** People cost dashboards must integrate headcount × compensation data with department-level budget vs. actuals.
- **FR-RPT-08:** The system must support cohort analysis — tracking groups of employees (e.g., same joining batch, same department) across time dimensions.

---

### 7.10 Integrations

| Integration | Type | Purpose |
|---|---|---|
| ERP / Finance (SAP, Oracle, Tally) | API / File export | Payroll journal entries, cost center sync |
| Identity Provider (Okta, Azure AD) | SSO / SCIM | User provisioning and authentication |
| Slack / Microsoft Teams | API | Leave alerts, approval nudges, announcements |
| Jira / ServiceNow | API | IT access provisioning on joining/exit |
| LinkedIn / Naukri / Indeed | API | Job posting distribution |
| DocuSign / Adobe Sign | API | Offer letters, policy acknowledgements |
| Biometric Devices | SDK / API | Attendance capture |
| Google Calendar / Outlook | OAuth | Leave sync, interview scheduling |
| Background Verification Providers | API | Candidate pre-employment verification |
| Statutory Portals (EPFO, ESIC) | File export | Compliance filings |
| WhatsApp Business API | API | Approval nudges, urgent HR alerts |
| Payroll Banks (ICICI, HDFC, SBI) | File export | Salary disbursement files |
| Expense Management (Zoho, SAP Concur) | API | Reimbursement sync |

**Integration Principles:**
- All integrations must use REST APIs with OAuth 2.0 or API key authentication.
- Webhook support must be available for event-driven integrations.
- A middleware/iPaaS layer must be available for transforming data to/from partner systems.
- Integration health monitoring with alerting on failures must be part of the admin panel.

#### 7.10.1 Expense Reimbursement Integration

- **FR-EXP-01:** The system must receive expense reimbursement data from integrated expense management platforms (Zoho Expense, SAP Concur, Expensify, Fyle, or custom) via REST API (real-time or batch), webhook notifications on approval, or scheduled file import (SFTP/CSV) as fallback.
- **FR-EXP-02:** Approved reimbursement data must include: employee identifier, expense category, total approved amount, expense period, approval timestamp, reimbursement type (one-time or recurring), and supporting documentation reference.
- **FR-EXP-03:** Upon receiving approved expense data, the system must: validate employee exists and is active, flag duplicate submissions within the same payroll cycle, auto-create a one-time payment record in the employee's next payroll run, and notify the employee via in-app and email.
- **FR-EXP-04:** The system must support configurable cut-off dates for expense inclusion in the current payroll cycle.
- **FR-EXP-05:** Employees must be able to view in the self-service portal: reimbursement history (past 12 months), status of pending reimbursements, expected payout date, and reimbursement breakdown by category.
- **FR-EXP-06:** The system must support mileage and per diem rate configuration: per-kilometer rates (configurable by vehicle type, location, and date range) and per diem rates (configurable by country, city, and employee level).
- **FR-EXP-07:** Expense data must be included in payroll reconciliation reports and audit logs, with clear traceability from expense approval to payslip line item.
- **FR-EXP-08:** The system must flag expense amounts exceeding configurable thresholds for secondary review before payroll inclusion.

#### 7.10.2 Integration Resilience & Error Handling

- **FR-INT-01:** All outbound integration calls must implement exponential backoff retry logic: 1 second → 2 seconds → 5 seconds; maximum 3 retries before marking as failed; ±20% jitter to prevent thundering herd.
- **FR-INT-02:** Circuit breaker pattern must be implemented for each integration endpoint: open after 5 consecutive failures within 60 seconds; half-open after 30 seconds; closed after successful test call; admin alert on circuit open.
- **FR-INT-03:** Idempotency keys must be supported for all state-changing integration endpoints (payroll disbursement, offer letter generation, candidate status updates) to prevent duplicate processing.
- **FR-INT-04:** Failed integration calls must be logged with: timestamp, integration name and endpoint, request payload (sanitized of PII), response status and error details, retry attempts count.
- **FR-INT-05:** Integration failures must trigger alerts based on severity:

| Severity | Criteria | Alert Channel |
|---|---|---|
| Critical | Payroll bank file failure, SSO outage | PagerDuty/SMS to on-call engineer + IT lead |
| High | ERP posting failure, statutory filing failure | Email to IT lead + HR ops |
| Medium | Job board posting failure, calendar sync failure | Dashboard alert, daily digest email |
| Low | Background check API timeout, resume parse failure | Logged, no immediate alert |

- **FR-INT-06:** An integration health dashboard must show: status of each integration, success/failure rates (last 1 hour, 24 hours, 7 days), average response times, and recent errors with drill-down capability.
- **FR-INT-07:** A dead letter queue (DLQ) must capture integration events that cannot be processed after maximum retries.
- **FR-INT-08:** The DLQ dashboard must allow admins to: view failed events with payload and error details, retry individual events or batch, manually edit payload before retry, and discard events with reason logging.
- **FR-INT-09:** Events in DLQ exceeding 7 days must trigger escalation to engineering for root cause analysis.
- **FR-INT-10:** All third-party API keys, secrets, and certificates must be stored in a secrets manager (AWS Secrets Manager, HashiCorp Vault) — never in code or environment variables.
- **FR-INT-11:** Secrets must be rotated automatically every 90 days with 7-day grace period, admin alert on failure, and rollback capability.
- **FR-INT-12:** Integration credential expiry must be monitored with alerts at 30, 14, and 7 days before expiry.
- **FR-INT-13:** For critical data flows (payroll to ERP, employee creation to IdP), the system must implement two-phase commit or compensating transactions to maintain data consistency.
- **FR-INT-14:** Reconciliation reports must be available for each integration comparing records processed vs. expected, success vs. failure counts, and data volume summaries.

---

### 7.11 Notifications & Alerts Framework

- **FR-NOTIF-01:** The system shall support a configurable, multi-channel notification engine: in-app, email, SMS, WhatsApp, and Slack/Teams push.
- **FR-NOTIF-02:** Each notification type must be configurable per role — specifying channels, trigger event, and delay/schedule.
- **FR-NOTIF-03:** Employees must be able to configure their own notification preferences (opt-in/opt-out) for non-critical alerts.
- **FR-NOTIF-04:** Notification templates must be HTML-based and manageable by HR admins without engineering involvement.
- **FR-NOTIF-05:** A notification audit log must capture every notification sent — recipient, channel, timestamp, delivery status, and open/click status.
- **FR-NOTIF-06:** Digest notifications must be supported — summarizing multiple events into a single daily or weekly email.

**Core Notification Events (minimum required):**

| Event | Recipients | Channels |
|---|---|---|
| Leave request submitted | Manager | In-app, email |
| Leave approved / rejected | Employee | In-app, email, SMS |
| Leave SLA breached (48 hrs) | Skip-level + HR | Email |
| Payslip generated | Employee | In-app, email |
| Performance review due | Employee, Manager | In-app, email |
| Review deadline overdue | Reviewer + HR | Email, Slack |
| New policy published | All employees | In-app, email |
| Offer letter sent | Candidate | Email |
| Document expiry approaching | HR, Employee | Email, in-app |
| Helpdesk ticket status change | Employee | In-app, email |
| Compliance filing due | Payroll Admin | Email |
| Onboarding task pending | New hire, Manager | In-app, email |
| Succession plan review due | HR, Manager | Email, in-app |
| Critical role successor left org | HR, CHRO | Email, in-app |

---

### 7.12 Employee Helpdesk & Ticketing

- **FR-HD-01:** Employees must be able to raise HR support tickets via: self-service portal, chatbot, email, and (Phase 2) mobile app.
- **FR-HD-02:** Tickets must be categorizable by type: payroll query, leave dispute, policy clarification, IT access, document request, grievance, and others.
- **FR-HD-03:** Tickets must be auto-assigned to the relevant HR team queue based on category, employee location, and department.
- **FR-HD-04:** SLAs must be configurable per ticket category with auto-escalation on breach (default: 4-hour acknowledgement, 48-hour resolution for standard; 24-hour for payroll issues).
- **FR-HD-05:** HR agents must be able to respond within the portal, view employee history, and attach documents to responses.
- **FR-HD-06:** A knowledge base of resolved tickets must power smart search and chatbot suggestions to reduce repeat ticket volume.
- **FR-HD-07:** Ticket analytics (volume by category, resolution time, SLA compliance, agent performance) must be available on the HR ops dashboard.
- **FR-HD-08:** Employees must receive CSAT survey prompts after ticket closure; results must feed into HR service quality reporting.

---

### 7.13 Diversity, Equity & Inclusion (DEI)

- **FR-DEI-01:** The system shall capture voluntary self-identification data for: gender, gender identity, ethnicity, disability status, and veteran status — with appropriate consent and privacy controls.
- **FR-DEI-02:** A DEI dashboard must display real-time representation metrics by gender, seniority level, department, and location.
- **FR-DEI-03:** Hiring funnel analytics must surface gender and diversity data at each pipeline stage to identify drop-off points.
- **FR-DEI-04:** Pay equity analysis must be available — comparing compensation across gender and ethnicity cohorts with controls for role, level, and tenure.
- **FR-DEI-05:** DEI data must be anonymized in all aggregate reports to prevent individual identification below a minimum cohort size (default: 5 employees).
- **FR-DEI-06:** The system must support DEI goal-setting at organizational level with progress tracking against defined targets.

---

### 7.14 Workforce Planning & Headcount Management

- **FR-WFP-01:** HR and Finance must be able to create and track an annual headcount plan by department, role, and location.
- **FR-WFP-02:** Actual headcount must be compared against plan in real time, with variance flagging.
- **FR-WFP-03:** Open position aging (days a role has been open) must be visible in the recruitment dashboard.
- **FR-WFP-04:** Attrition forecasting must project 3-month and 6-month headcount changes based on historical trends and risk scores.
- **FR-WFP-05:** Org health scores (engagement, retention, time-in-role) must be visualized at department level for leadership reviews.

---

### 7.15 Succession Planning & Talent Pipelines

**Overview:** The system must enable proactive identification, development, and tracking of talent pipelines to ensure business continuity for critical roles and reduce leadership gap risks.

#### 7.15.1 Critical Role Identification

- **FR-SUCC-01:** HR admins must be able to designate roles as "critical" based on: business impact, difficulty to fill, regulatory requirement, or key-person risk.
- **FR-SUCC-02:** Critical roles must be flagged throughout the system — in org charts, reports, and succession planning views.
- **FR-SUCC-03:** The system must maintain a succession planning view for each critical role showing: current incumbent, potential successors (minimum 2 per role), readiness levels, and development status.

#### 7.15.2 Successor Identification & Readiness

- **FR-SUCC-04:** Managers and HR must be able to nominate successors for roles in their reporting hierarchy, supporting nominations for both direct and indirect reports.
- **FR-SUCC-05:** Each successor nomination must include: readiness level (Ready Now, Ready in 1–2 Years, Ready in 3–5 Years, Not Ready), readiness justification, and development areas.
- **FR-SUCC-06:** Successors must be viewable in calibration sessions with the ability to compare candidates side-by-side.
- **FR-SUCC-07:** The system must prevent circular nominations (e.g., Employee A is successor to Employee B while Employee B is successor to Employee A).

#### 7.15.3 High-Potential (HiPo) Identification

- **FR-SUCC-08:** HR and leadership must be able to tag employees as "High Potential" (HiPo) during performance calibration sessions.
- **FR-SUCC-09:** HiPo tags must be time-bound (valid for 12 months) with mandatory annual review.
- **FR-SUCC-10:** HiPo employees must be surfaced in talent reviews, development program assignments, and succession planning views.
- **FR-SUCC-11:** The system must track HiPo movement: promotions, lateral moves, development milestones, and attrition — providing cohort analysis on HiPo retention rates.

#### 7.15.4 Talent Pipeline Dashboards

- **FR-SUCC-12:** A talent pipeline dashboard must visualize: coverage ratio (successors per critical role, target: 2+), readiness distribution across the organization, bench strength per department and role family, HiPo density by department/level/location, and critical roles with zero successors (highlighted in red).
- **FR-SUCC-13:** The system must generate alerts when: a critical role becomes vacant without a "Ready Now" successor, a successor leaves the organization, a HiPo employee's attrition risk score exceeds threshold, or a successor's readiness status has not been reviewed in over 12 months.

#### 7.15.5 Succession Plan Reviews

- **FR-SUCC-14:** Succession plans must be reviewed on a configurable cadence (default: quarterly for leadership roles, annually for all critical roles).
- **FR-SUCC-15:** Each review cycle must capture: participants, date, decisions made, and action items.
- **FR-SUCC-16:** Version history of succession plans must be maintained, allowing comparison across review periods.
- **FR-SUCC-17:** Post-review, action items (development plans, mentoring assignments, stretch projects) must be automatically created and assigned to relevant parties.

#### 7.15.6 Development Planning for Successors

- **FR-SUCC-18:** The system must link successors to Individual Development Plans (IDPs) with milestones tied to readiness progression.
- **FR-SUCC-19:** Mentorship assignments must be trackable, with mentor-mentee relationships visible in succession views.
- **FR-SUCC-20:** The system must recommend development actions based on readiness gaps (e.g., "Complete leadership program to move from Ready in 2 Years to Ready Now").
- **FR-SUCC-21:** Development progress must be visible to both the successor and their manager, with periodic check-ins.

---

### 7.16 Bulk Operations & Templates

**Overview:** HR administrators must be able to perform operations on multiple records simultaneously to reduce manual effort and ensure consistency.

#### 7.16.1 Bulk Data Import

- **FR-BULK-01:** HR admins must be able to perform bulk operations via CSV/Excel upload for: employee creation (mass hiring), employee updates (transfers, manager changes, location updates), salary revisions (ACR cycles), leave credits (manual adjustments), user role assignments (RBAC), and custom field updates.
- **FR-BULK-02:** All bulk import templates must be downloadable from the system with current field definitions and valid value lists.
- **FR-BULK-03:** Before committing, the system must display a preview screen showing: number of records to be created/updated, sample of changes (first 10 rows), validation errors per row with clear error messages, and warnings for potential duplicates or conflicts.
- **FR-BULK-04:** Users must be able to download error reports for failed imports, allowing correction and re-upload.
- **FR-BULK-05:** Bulk operations must support dry-run mode that validates data without committing changes.

#### 7.16.2 Bulk Updates

- **FR-BULK-06:** HR admins must be able to perform bulk updates directly in the UI by selecting multiple records (checkboxes) and applying changes to: status, manager assignments, department assignments, and custom fields.
- **FR-BULK-07:** Bulk update confirmation must show impact summary before commit.

#### 7.16.3 Bulk Notifications & Communications

- **FR-BULK-08:** HR admins must be able to send bulk notifications to employees via email and in-app messages with targeting by: department(s), location(s), employment type(s), custom filters (e.g., "all employees with probation ending in next 30 days"), and saved segments (reusable audience groups).
- **FR-BULK-09:** Bulk notifications must support rich text formatting, attachments, and link tracking.
- **FR-BULK-10:** The system must track delivery statistics for bulk notifications (delivered, opened, clicked) with downloadable reports.

#### 7.16.4 Templates

- **FR-BULK-11:** The system must support configurable templates for: email notifications (with merge fields), offer letters, experience/relieving letters, performance review forms, and contract agreements.
- **FR-BULK-12:** Templates must be HTML-based with WYSIWYG editor for non-technical HR users.
- **FR-BULK-13:** Templates must support merge fields (e.g., `{{employee_name}}`, `{{joining_date}}`, `{{salary}}`) that auto-populate from the system.
- **FR-BULK-14:** Template versioning must be maintained, with preview of changes and rollback to previous versions.

#### 7.16.5 Scheduled Bulk Operations

- **FR-BULK-15:** HR admins must be able to schedule bulk operations to run at a future date/time (e.g., "Apply annual compensation changes effective April 1").
- **FR-BULK-16:** Scheduled operations must be reviewable, editable, and cancellable before execution, with notifications sent upon completion or failure.

---

### 7.17 Contractor Management

**Decision:** Contractor management is explicitly out of scope for HRMS Phase 1 and Phase 2 due to: fundamental differences in contractor lifecycle (no performance reviews, no leave accrual, different tax treatment), legal segregation requirements (contractors are not employees under labor law), and existing processes managed by Procurement/Finance.

If contractor management becomes a business requirement in Phase 3, the following requirements will apply:

- **FR-CON-01:** The system must support contractor profiles with: contract start/end dates, billing rate (hourly, daily, or fixed), vendor/agency association and PO number, work location and manager assignment, and limited system access (no performance reviews, no leave accrual, no equity/benefits).
- **FR-CON-02:** Contractors must have access to a limited self-service portal: timesheet submission, invoice submission, contract documents, and basic profile updates.
- **FR-CON-03:** The system must track contract expiry with automated renewal workflows and alerts at 30, 14, 7 days before expiry.
- **FR-CON-04:** Contractor payments must be processed through a separate payroll run or integrated with accounts payable — not mixed with employee payroll — and reportable separately from employee headcount and cost.
- **FR-CON-05:** Headcount reports must clearly distinguish employees from contractors with optional grouping/segmentation.
- **FR-CON-06:** Contractor offboarding must trigger: access revocation, asset return tracking, vendor notification, and final invoice processing.
- **FR-CON-07:** The system must not apply labor law compliance rules (PF, ESI, leave accrual) to contractor records.

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Requirement | Target |
|---|---|
| Page load time (P95) | < 2 seconds |
| API response time — read operations (P95) | < 300ms |
| API response time — write operations (P95) | < 1 second |
| Payroll processing (10,000 employees) | < 15 minutes |
| Concurrent users supported | 5,000+ |
| Report generation (<100K rows) | < 10 seconds |
| Report generation (1M rows) | < 30 seconds |
| Search results | < 500ms |
| Leave balance query (cached) | < 100ms |
| File upload (10 MB) | < 5 seconds |

### 8.2 Availability & Reliability

| Service Component | Uptime Target | Monthly Allowed Downtime |
|---|---|---|
| Payroll Engine | 99.95% | 21.6 minutes |
| Employee Self-Service Portal | 99.9% | 43.2 minutes |
| Leave & Attendance | 99.9% | 43.2 minutes |
| Approval Workflows | 99.9% | 43.2 minutes |
| API Gateway | 99.95% | 21.6 minutes |
| Reporting & Analytics | 99.5% | 3.6 hours |
| Admin Panel (HR-facing) | 99.5% | 3.6 hours |

- Scheduled maintenance: Sundays 2:00–4:00 AM local time; limited to one 2-hour window per month maximum; 48-hour prior notice to all admins.
- RPO (Recovery Point Objective): **1 hour.**
- RTO (Recovery Time Objective): **4 hours.**
- Active-active deployment across at least two availability zones.
- Circuit breakers must be implemented on all third-party integration calls to prevent cascading failures.

### 8.3 Scalability

- Must horizontally scale to support 50,000+ employees without architecture change.
- Database must support multi-tenancy with strict data isolation per organization.
- Storage must scale elastically for document attachments (target: up to 10 TB per tenant).
- Payroll engine must support parallel processing of multiple pay groups simultaneously.

### 8.4 Security

- All data at rest must be encrypted using **AES-256**.
- All data in transit must use **TLS 1.2+** (TLS 1.3 preferred).
- Role-Based Access Control (RBAC) must be enforced at every API endpoint and UI layer.
- Multi-Factor Authentication (MFA) must be supported and enforced for all HR admin and payroll roles.
- Session timeout: 30 minutes of inactivity for standard users; 15 minutes for admin roles.
- Penetration testing required quarterly by an accredited third-party vendor.
- SOC 2 Type II certification target within 18 months of launch.
- VAPT before every major release.
- All API keys and secrets must be stored in a secrets manager (AWS Secrets Manager / HashiCorp Vault).
- IP allowlisting must be supported for admin panel access.

### 8.5 Usability

- WCAG 2.1 Level AA accessibility compliance.
- Fully usable on latest versions of Chrome, Firefox, Safari, and Edge.
- Mobile web must support iOS 15+ and Android 10+ browsers.
- Native mobile apps (Phase 2) for iOS and Android.
- UI must support English as the default; localization framework must be in place in Phase 1 for Phase 2 language rollout.
- All form errors must be shown inline with clear, actionable messages.
- Keyboard navigation must be supported throughout the application.

### 8.6 Compliance

- **GDPR** (EU): Right to access, right to erasure, data portability, consent management.
- **India DPDP Act 2023:** Data localization, consent management, grievance officer designation.
- **SOC 2 Type II** (target): Security, availability, confidentiality trust service criteria.
- **ISO 27001:** Information security management system alignment.
- All audit logs must be immutable and retained for a minimum of **7 years**.
- Personal data of EU residents must be stored in EU-region data centers.

### 8.7 Disaster Recovery

- The system must maintain a hot standby in a secondary region updated via async replication.
- Daily automated backups with point-in-time recovery (PITR) enabled for the last 30 days.
- Quarterly DR drills must be conducted and documented; RTO/RPO must be validated.
- A runbook for each critical failure scenario (DB failure, region outage, payroll engine crash) must be maintained and tested annually.
- Payroll data must have a separate, independent backup pipeline with encryption and offsite storage.

### 8.8 API-First Design

- All features must be accessible via the REST API — no functionality that is UI-only.
- API documentation (OpenAPI / Swagger spec) must be auto-generated and kept in sync with implementation.
- Breaking API changes must be versioned and communicated with a minimum 6-month deprecation notice.

### 8.9 Service Level Agreements (SLA)

#### 8.9.1 Support SLAs

| Priority | Definition | Response Time | Resolution Time | Channels |
|---|---|---|---|---|
| P0 — Critical | System down, payroll cannot run, data loss, security breach | 15 minutes (24×7) | 4 hours (24×7) | Phone, PagerDuty, ticket |
| P1 — High | Major feature broken, integration failure affecting >50 users | 2 hours (business hours) | 24 hours | Ticket, Slack |
| P2 — Medium | Feature degraded, workaround exists | 8 hours (business hours) | 3 business days | Ticket |
| P3 — Low | Minor UI issues, cosmetic bugs, enhancement requests | 24 hours | Next sprint or backlog | Ticket |

> Support coverage: Monday–Friday, 9:00 AM–6:00 PM IST for standard. P0 support is 24×7×365.

#### 8.9.2 SLA Exclusions

- Force majeure events (natural disasters, war, etc.)
- Cloud provider outages beyond our control
- Scheduled maintenance with 48-hour notice
- Customer-side issues (internet connectivity, browser compatibility, incorrect configuration)

#### 8.9.3 SLA Remedies

- Any P0 breach in a calendar month: 10% credit on monthly infrastructure cost.
- Consecutive P0 breaches in 2 months: 20% credit on monthly infrastructure cost.
- 3 consecutive P0 breaches: Business review with escalation to vendor management.

---

## 9. System Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│     Web App (React/PWA)  |  Mobile App (React Native)    │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS / TLS 1.3
┌────────────────────▼─────────────────────────────────────┐
│                   API GATEWAY                            │
│     Rate Limiting | Auth (JWT/OAuth2) | Routing          │
│     WAF | DDoS Protection | Request Logging              │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│              MICROSERVICES LAYER                         │
│  ┌──────────┐ ┌────────┐ ┌─────────┐ ┌───────────────┐  │
│  │ Employee │ │Payroll │ │  Leave  │ │  Performance  │  │
│  │ Service  │ │Service │ │ Service │ │   Service     │  │
│  └──────────┘ └────────┘ └─────────┘ └───────────────┘  │
│  ┌──────────┐ ┌────────┐ ┌─────────┐ ┌───────────────┐  │
│  │Recruit-  │ │  LMS   │ │Notif.   │ │  Analytics    │  │
│  │ment Svc  │ │Service │ │Service  │ │   Service     │  │
│  └──────────┘ └────────┘ └─────────┘ └───────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │
│  │Helpdesk  │ │Succession│ │   DEI    │ │   Audit    │  │
│  │ Service  │ │ Service  │ │ Service  │ │  Service   │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘  │
└────────────────────┬─────────────────────────────────────┘
                     │ Event Bus (Kafka)
┌────────────────────▼─────────────────────────────────────┐
│              DATA LAYER                                  │
│  PostgreSQL (transactional) | Redis (cache/sessions)     │
│  Elasticsearch (search)     | S3-compatible (documents)  │
│  Data Warehouse (analytics) | Kafka (event streaming)    │
│  Secrets Manager            | CDN (static assets)        │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│         EXTERNAL INTEGRATIONS                            │
│  ERP | IdP (SSO/SCIM) | Payroll Banks | Job Boards       │
│  DocuSign | WhatsApp API | Background Verif. | EPFO/ESIC │
│  Expense Mgmt | DLQ (Dead Letter Queue)                  │
└──────────────────────────────────────────────────────────┘
```

**Key Architectural Decisions:**

| Decision | Rationale |
|---|---|
| Microservices architecture | Independent scaling, deployability, and fault isolation per domain |
| Event-driven via Kafka | Decouples services; enables audit trail, notifications, and analytics in real time |
| PostgreSQL per service | Strong ACID guarantees for financial/payroll data |
| Redis for session & cache | Sub-millisecond reads for leave balance, user sessions |
| S3-compatible object storage | Elastic, durable document storage with presigned URL access |
| Elasticsearch | Full-text search across employee records, policies, and helpdesk |
| Dead Letter Queue (DLQ) | Prevents silent data loss on integration failures |
| Circuit breakers | Isolate third-party failures from core platform stability |

---

## 10. Data Model Overview

### Core Entities

```
Organization
  ├── has many → Departments
  ├── has many → Locations
  ├── has many → Employees
  └── has many → Policies

Employee
  ├── has one  → EmploymentDetails (type, status, dates, probation)
  ├── has one  → Compensation (salary structure, bank details)
  ├── has many → Attendances
  ├── has many → LeaveRequests
  ├── has many → PayslipRecords
  ├── has many → PerformanceReviews
  ├── has many → Documents
  ├── has many → HelpDeskTickets
  ├── has one  → DEIProfile (voluntary, anonymized)
  ├── has one  → SkillsInventory
  ├── has many → SuccessionNominations (as nominee)
  ├── has many → SeparationRecords (FR-OFF-*)
  └── belongs to → Department, Manager (Employee)

LeavePolicy
  ├── has many → LeaveTypes (including parental leave types)
  └── applied to → Employees (via Department / Location / Role)

PayrollCycle
  ├── has many → PayrollRecords (per Employee)
  ├── has many → OneTimePayments (including expense reimbursements)
  ├── has many → PayrollAuditLogs (immutable)
  └── generates → PayslipRecords + BankTransferFile

PerformanceCycle
  ├── has many → ReviewForms
  ├── has many → Goals
  └── has many → PerformanceReviews (per Employee)

SuccessionPlan
  ├── belongs to → CriticalRole
  ├── has many → SuccessorNominations (Employee + ReadinessLevel + DevelopmentPlan)
  └── has many → SuccessionReviews (quarterly)

JobRequisition
  ├── has many → Candidates
  └── Candidate → has many → InterviewRounds
      └── InterviewRound → generates → Offer
          └── Offer accepted → creates → Employee (+ triggers Onboarding workflow)

HelpDeskTicket
  ├── belongs to → Employee (requester)
  ├── assigned to → HRAgent
  └── has many → TicketResponses, TicketAttachments, CSATSurvey

Notification
  ├── belongs to → Employee (recipient)
  ├── triggered by → Event (leave, payroll, review, etc.)
  └── delivered via → Channel (email, in-app, SMS, WhatsApp)

WorkflowDefinition
  ├── has many → WorkflowSteps (sequential or parallel)
  ├── has many → ConditionalBranches
  └── versioned → WorkflowVersion (active version applied to new requests)

DataRetentionPolicy
  ├── configurable per → DataType, LegalEntity
  └── triggers → AutoPurgeJobs (monthly), DSARExports (on demand)
```

---

## 11. API Design Principles

The HRMS will expose a RESTful API layer consumed by the web app, mobile app, and third-party integrations.

### 11.1 API Standards

- **Protocol:** REST over HTTPS
- **Format:** JSON (application/json) for all requests and responses
- **Authentication:** OAuth 2.0 (Authorization Code flow for users; Client Credentials for service-to-service)
- **Versioning:** URI-based versioning — `/api/v1/`, `/api/v2/`
- **Rate Limiting:** 1,000 requests/min per client for standard; 10,000/min for trusted integrations
- **Pagination:** Cursor-based pagination for all list endpoints (`?cursor=&limit=`)
- **Error Format:** RFC 7807 Problem Details (`type`, `title`, `status`, `detail`, `instance`)

### 11.2 Key API Domains

| Domain | Base Path | Key Endpoints |
|---|---|---|
| Employees | `/api/v1/employees` | GET, POST, PATCH, DELETE (soft) |
| Attendance | `/api/v1/attendance` | clock-in, clock-out, regularize |
| Leave | `/api/v1/leave` | apply, approve, reject, balance |
| Payroll | `/api/v1/payroll` | run, preview, approve, payslips |
| Performance | `/api/v1/performance` | cycles, reviews, goals, feedback |
| Recruitment | `/api/v1/recruitment` | requisitions, candidates, offers |
| Succession | `/api/v1/succession` | critical-roles, nominees, hipo-tags |
| Helpdesk | `/api/v1/helpdesk` | tickets, responses, CSAT |
| Notifications | `/api/v1/notifications` | preferences, history, mark-read |
| Analytics | `/api/v1/analytics` | dashboards, reports, exports |
| Webhooks | `/api/v1/webhooks` | register, list, delete, logs |
| Bulk | `/api/v1/bulk` | import, validate, dry-run, status |

### 11.3 Webhook Events

```
employee.created          employee.updated         employee.separated
leave.requested           leave.approved           leave.rejected
payroll.initiated         payroll.disbursed        payslip.generated
review.cycle.started      review.submitted         rating.finalized
offer.sent                offer.accepted           candidate.rejected
ticket.created            ticket.resolved          policy.published
succession.review.due     hipo.tagged              successor.departed
expense.received          expense.payroll.included offboarding.initiated
offboarding.completed     bulk.operation.completed retention.purge.scheduled
```

---

## 12. User Flows

### 12.1 Employee Leave Application Flow

```
Employee → Apply for Leave (self-service portal)
  └── Conditional workflow engine evaluates rules
      ├── Insufficient balance → Error notification to employee
      ├── Parental leave type → Auto-approve + notify HR + notify Payroll
      ├── Tenure < 6 months + Earned Leave → Route to HR for review
      └── Standard case:
          └── Leave request routed to Manager (L1)
              ├── Manager approves
              │   └── HR notified → Balance deducted
              │       └── Calendar synced → Employee notified → Webhook fired
              ├── Manager rejects
              │   └── Employee notified with reason
              └── Manager inactive for 48 hrs
                  └── Auto-escalate to L2 (skip-level) → L2 notified
```

### 12.2 Monthly Payroll Processing Flow

```
HR initiates payroll run (initiates cycle lock)
  └── System locks employee salary records
      └── Pull attendance & leave data → Compute LOP
          └── Pull approved expense reimbursements → Add to one-time payments
              └── Compute gross pay (salary + allowances + one-time payments)
                  └── Compute deductions (PF, ESI, TDS, PT, loans, advances)
                      └── Generate payroll register (preview mode)
                          └── HR reviews pre-payroll checklist
                              ├── Exceptions found → HR resolves → Re-compute
                              └── All clear → HR approves (dual control for overrides)
                                  └── Generate bank transfer file
                                      └── Disburse salaries
                                          └── Mark payroll as disbursed → Hash/seal audit log
                                              └── Generate & distribute payslips
                                                  └── Post journal entries to ERP
                                                      └── Send statutory filings (PF/ESI)
```

### 12.3 Performance Review Cycle Flow

```
HR creates review cycle (dates, participants, forms, weightages)
  └── System sends self-assessment tasks to all employees
      └── Employee submits self-assessment (deadline: Day 10)
          └── Peer reviewers auto-assigned (or manager-assigned)
              └── Peer reviews completed (deadline: Day 15)
                  └── Manager reviews submitted (deadline: Day 20)
                      └── HRBP calibration session
                          └── HiPo tags updated during calibration
                              └── Succession nominations reviewed
                                  └── Forced distribution / bell curve applied
                                      └── Final ratings locked by HR
                                          └── Manager shares feedback with employee (deadline: Day 30)
                                              └── Employee acknowledges → Cycle closed
                                                  └── Ratings linked to compensation review cycle
```

### 12.4 Employee Onboarding Flow

```
Offer letter signed by candidate
  └── System auto-creates pre-boarding record
      └── Candidate receives pre-boarding portal access
          ├── Document upload (Aadhaar, PAN, degree certificates)
          ├── Bank details, emergency contacts filled
          └── Policy reads & e-signature acknowledgements
      └── IT provisioning tasks auto-assigned to IT team
      └── Buddy assigned by HR/Manager
      └── Day 1: Candidate becomes Employee in HRMS
          └── 30-60-90 day checklist activated
              ├── Day 7 onboarding survey sent
              ├── Day 30 onboarding survey sent
              └── Day 90 survey sent → Onboarding closed
```

### 12.5 HR Helpdesk Ticket Flow

```
Employee raises ticket (portal / chatbot / email)
  └── System categorizes ticket (AI-assist + employee selection)
      └── Auto-assigned to HR queue by category + location
          └── HR agent picks up ticket (within SLA)
              ├── Resolved → Employee notified → CSAT survey sent
              │   └── Resolution added to knowledge base
              └── Escalated → Senior HR / Manager loop-in
                  └── Resolved → Closed → CSAT survey sent
```

### 12.6 Offboarding Flow

```
Resignation/termination initiated by HR or Employee
  └── Separation type selected + last working day confirmed
      └── Notice period tracker activated
          └── Parallel offboarding streams triggered:
              ├── IT: Access revocation tasks created in Jira
              ├── Facilities: Badge/parking/locker return tasks
              ├── Finance: Loan/advance recovery computed
              ├── Manager: Knowledge transfer checklist activated
              └── HR: Exit interview scheduled + F&F computation initiated
          └── Exit interview completed
              └── All offboarding tasks marked complete
                  └── F&F settlement approved → locked
                      └── Experience letter + relieving letter generated
                          └── Payroll: Final settlement processed in last payroll cycle
                              └── Employee record → Alumni record (read-only, 7-year retention)
```

### 12.7 Succession Planning Review Flow

```
Quarterly succession review triggered (system alert)
  └── HR schedules talent review session
      └── Succession dashboard pulled: critical roles, bench strength, HiPo cohort
          └── Calibration session:
              ├── Update readiness levels per successor
              ├── Tag new HiPo employees
              ├── Identify critical roles with zero "Ready Now" successors → flag for action
              └── Create action items (development plans, mentoring assignments)
          └── Review signed off and versioned in system
              └── Successors linked to IDPs with updated milestones
                  └── Auto-notifications sent to mentors and managers
```

---

## 13. Security & Compliance

### 13.1 Role-Based Access Control (RBAC) Matrix

| Feature | Employee | Manager | HRBP | HR Admin | Payroll Admin | Super Admin |
|---|---|---|---|---|---|---|
| View own profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit own profile | Partial | Partial | ✅ | ✅ | ✅ | ✅ |
| View team profiles | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Approve leaves | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Run payroll | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| View all payslips | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Configure policies | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Access analytics | ❌ | Team only | Org-wide | Org-wide | Limited | ✅ |
| System configuration | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| View DEI dashboard | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Manage helpdesk | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| View audit logs | ❌ | ❌ | ❌ | ✅ | Limited | ✅ |
| Manage integrations | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| View succession plans | ❌ | Own team | ✅ | ✅ | ❌ | ✅ |
| Nominate successors | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Tag HiPo employees | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Manage data retention | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Manage bulk operations | ❌ | ❌ | ❌ | ✅ | Partial | ✅ |

### 13.2 Audit Logging

- **FR-AUDIT-01:** Every create, update, and delete operation on sensitive records must generate an immutable audit log entry containing: timestamp (UTC), actor user ID and IP address, action type (CREATE, UPDATE, DELETE, VIEW for sensitive records), entity type and entity ID, old value (serialized JSON), new value (serialized JSON), and reason/justification (required for payroll overrides).

**Payroll-Specific Audit**

- **FR-AUDIT-02:** Payroll audit logs must capture, for each employee per payroll cycle: gross salary components (breakdown by head), allowances and one-time payments, deductions (statutory, voluntary, recovery), net pay, all intermediate calculation values, and bank account details used for disbursement.
- **FR-AUDIT-03:** Payroll registers must be cryptographically hashed (or hash-chained) at the time of finalization to prevent post-hoc tampering. The hash must be stored in an immutable audit store.
- **FR-AUDIT-04:** Any override or manual adjustment to payroll calculations must: require dual control (two authorized users), log the reason for override, capture both original and adjusted values, and flag the payroll run as "adjusted" in all reports.
- **FR-AUDIT-05:** Payroll audit logs must be retained for the statutory retention period (India: 7 years as per Income Tax Act and PF Act; other jurisdictions: configurable, minimum 7 years).
- **FR-AUDIT-06:** Payroll audit logs must be stored in write-once-read-many (WORM) storage or an append-only database with no delete or update capability for the retention period.

**General Audit Requirements**

- **FR-AUDIT-07:** Audit logs must be accessible to HR Admins and Super Admins with: filtering by date range, entity type, actor, action type; full-text search; and export to CSV/JSON for offline analysis.
- **FR-AUDIT-08:** Failed login attempts must be logged with: timestamp, username attempted, IP address, and failure reason (invalid password, account locked, MFA failure).
- **FR-AUDIT-09:** MFA bypass or account recovery events must trigger real-time alerts to Super Admins.
- **FR-AUDIT-10:** Audit logs must be retained for a minimum of 7 years regardless of employee separation status.

### 13.3 Data Privacy

- Personally Identifiable Information (PII) fields must be masked in logs, API responses, and any non-authorized views.
- Data subject access requests (DSAR) must be fulfillable within **72 hours** by HR Admins via an automated data export.
- Data deletion (right to erasure) must anonymize PII while retaining anonymized records for statutory purposes — with a documented data map identifying all PII fields and storage locations.
- A Privacy Impact Assessment (PIA) must be completed before any new data collection is introduced.
- Employee consent for voluntary DEI data must be separately captured and revocable at any time.

### 13.4 Incident Response

- A documented Security Incident Response Plan (SIRP) must be maintained, covering: detection, containment, eradication, recovery, and post-mortem.
- Personal data breaches must be reported to affected data subjects and regulators (CERT-In in India, DPA in EU) within **72 hours** of discovery.
- All security incidents must be tracked with severity, root cause, resolution, and prevention steps.

### 13.5 Data Retention & Disposal

**Retention Periods by Data Type**

- **FR-RET-01:** The system must support configurable retention periods per data type with the following minimum defaults:

| Data Type | Retention Period | Rationale |
|---|---|---|
| Active employee records | Indefinite (while active) | Operational necessity |
| Separated employee records | 7 years post-separation | Income Tax Act, labor law claims |
| Payroll records (individual) | 7 years | Income Tax Act, PF Act |
| Payroll registers (summary) | Permanent | Audit trail, statutory requirement |
| Attendance logs | 3 years | Shops & Establishment Act |
| Leave application history | 7 years | Labor dispute evidence |
| Performance reviews | 5 years | Talent history, litigation defense |
| Recruitment candidate data (not hired) | 2 years | GDPR/DPDP data minimization |
| Offer letters (accepted) | 7 years post-separation | Contract retention |
| Offer letters (rejected) | 1 year | No legal retention need |
| Helpdesk tickets | 2 years after closure | Support history, trend analysis |
| Audit logs | 7 years | Security investigation, compliance |
| DEI self-identification data | Anonymized after 3 years | Privacy by design |
| System logs (application) | 90 days | Operational debugging |
| API access logs | 1 year | Security monitoring |

- **FR-RET-02:** Retention periods must be configurable per legal entity to accommodate jurisdictional differences.
- **FR-RET-03:** The system must provide automated data purging with: scheduled purging based on retention rules (monthly), preview of records to be purged before execution, approval workflow for purging, grace period (configurable), and email notification to data owners before purge.
- **FR-RET-04:** Purged data must be archived to cold storage (e.g., S3 Glacier) with a 12-month archive before permanent deletion, retrieval mechanism for compliance audits, and index of archived records.
- **FR-RET-05:** Permanent deletion must overwrite data to prevent recovery.
- **FR-RET-06:** For data where regulatory retention is required but PII must be minimized, the system must support anonymization: replace name with anonymized ID, nullify contact details/address/bank details, retain employment dates/roles/performance history. Anonymization must be irreversible.
- **FR-RET-07:** Anonymization must be irreversible; original data must not be recoverable.
- **FR-RET-08:** The system must support automated DSAR fulfillment: one-click export of all personal data (JSON + PDF), delivery via secure portal with 30-day expiry, and logging of all DSAR requests and fulfillments.
- **FR-RET-09:** Right to erasure must be supported with anonymization of personal data (excluding data required for statutory retention), confirmation to user upon completion, and 72-hour response SLA.
- **FR-RET-10:** HR admins must be able to view and modify retention policies via admin panel, with changes requiring approval and logging.
- **FR-RET-11:** The system must generate quarterly retention compliance reports.
- **FR-RET-12:** Retention policy violations must trigger alerts to HR and Legal.

---

## 14. Localization & Internationalization

- **FR-I18N-01:** The system must use a localization framework (i18n) from Phase 1 such that all UI strings are externalized — Phase 2 will load translated string files without code changes.
- **FR-I18N-02:** Phase 1 must support English (default). Phase 2 must add: Hindi, Telugu, Tamil, and Kannada.
- **FR-I18N-03:** Date formats, number formats, and currency symbols must be locale-aware (DD/MM/YYYY for India; MM/DD/YYYY for US).
- **FR-I18N-04:** Multi-currency payroll must display amounts in the employee's local currency with exchange rate audit trails.
- **FR-I18N-05:** Holiday calendars must support state-level public holidays for all Indian states.
- **FR-I18N-06:** Statutory calculation rules must be modular per jurisdiction — adding a new country must not require core payroll engine changes.
- **FR-I18N-07:** Time zone-aware scheduling must apply to all notifications, approvals, and payroll cycles (employees in different time zones see local times).

---

## 15. Mobile Strategy

### Phase 1 — Mobile Web (Months 1–6)

- The web application must be fully responsive and usable on mobile browsers (iOS 15+, Android 10+).
- Critical workflows optimized for mobile: leave application, payslip download, approval actions, attendance clock-in.
- Progressive Web App (PWA) capabilities: installable on home screen, offline page cache, push notifications.

### Phase 2 — Native Mobile Apps (Months 7–12)

- iOS app (Swift/SwiftUI) and Android app (Kotlin/Jetpack Compose) — or React Native cross-platform.
- Core features: leave management, attendance, payslip, notifications, approvals, org chart.
- Biometric authentication (Face ID, fingerprint) for app login.
- GPS-based attendance check-in with location verification.
- App distribution: App Store, Google Play Store; enterprise distribution via MDM for company-managed devices.

### 15.1 Offline Mode Requirements

- **FR-MOBILE-01:** Native mobile apps must support offline mode for: previously downloaded payslips (last 12 months cached), current leave balance (cached, with timestamp), upcoming holiday calendar (cached monthly), team roster for managers (cached weekly), draft leave requests (saved locally, submitted when online), draft feedback or recognition messages, and saved documents (policies, offer letters).
- **FR-MOBILE-02:** Attendance clock-in/out must support offline mode: capture timestamp and GPS location at the time of action, store locally on device with encryption, sync to server when connectivity is restored, flag offline entries for manager review (to prevent location spoofing), and allow maximum 5 offline entries per user before requiring sync.
- **FR-MOBILE-03:** Offline data must be encrypted at rest on the device using device-level encryption (iOS Keychain, Android Keystore).
- **FR-MOBILE-04:** Conflict resolution rules must be defined for offline edits:
  - Leave balance: If leave balance changed while offline, warn user on sync and recalculate before submission.
  - Profile updates: If profile field changed by HR while offline, user's offline edit is discarded with notification.
  - Approvals: Offline approvals sync with timestamp; if status changed by another approver while offline, notify user of conflict.
- **FR-MOBILE-05:** The app must display sync status (last sync time, pending changes count) prominently, with manual sync trigger available.
- **FR-MOBILE-06:** Sync failures must be surfaced with clear error messages and retry options.
- **FR-MOBILE-07:** Offline mode must be usable even when logged out for cached data; login must be performed online for security validation.

### 15.2 Push Notifications

- **FR-MOBILE-08:** Mobile apps must support push notifications for: approval requests, approval reminders and escalations, payslip generation, performance review deadlines, announcements, helpdesk ticket updates, and succession review alerts.
- **FR-MOBILE-09:** Users must be able to configure notification preferences per category within the app.

---

## 16. Data Migration Plan

### Scope

Data must be migrated from existing systems (Excel, legacy HRMS, payroll tool) into the new HRMS before go-live.

### Migration Approach

**Phase 1: Discovery (Week 1–2)**
- Audit all existing data sources: HR spreadsheets, payroll files, attendance records, policy documents.
- Identify data quality issues: duplicates, missing fields, inconsistent formats, encoding issues.
- Create a master data dictionary mapping source fields to HRMS fields.

**Phase 2: Cleansing (Week 3–4)**
- Deduplicate employee records.
- Standardize formats (dates, phone numbers, PAN formats).
- Fill mandatory missing fields with HR team.
- Obtain sign-off from HR lead on cleansed data.

**Phase 3: Migration (Week 5–6)**
- Load employees via bulk CSV import API.
- Load historical leave balances (current cycle).
- Load last 3 months of payroll records for reconciliation reference.
- Load active compliance documents.
- Migrate last 1 year of attendance records.

**Phase 4: Validation (Week 7)**
- Run parallel payroll — compare HRMS output against legacy tool for 1 full cycle.
- Validate leave balances for a 10% sample of employees.
- Conduct spot checks on 50 employee profiles across departments.
- Obtain written UAT sign-off from HR, Payroll, and IT leads.

### Migration Rules

| Data Type | History Scope | Notes |
|---|---|---|
| Employee profiles | All active employees | Separated employees: 3-year history |
| Payroll records | Last 12 months | Current year for tax computation |
| Leave balances | Current cycle only | Historical leave records: optional |
| Attendance | Last 6 months | Earlier data archived, not migrated |
| Documents | Active documents only | Historical contracts: optional Phase 2 |

---

## 17. Testing Strategy

### 17.1 Testing Levels

**Unit Testing**
- All business logic (payroll calculations, leave balance computation, tax rules, conditional workflow routing) must have ≥ 90% unit test coverage.
- Tests must be automated and run in CI/CD pipeline on every pull request.

**Integration Testing**
- All inter-service communication must have integration tests covering happy paths and failure scenarios.
- Third-party integration mocks must be maintained for: bank file export, statutory portals, DocuSign, expense management tools.

**End-to-End (E2E) Testing**
- Critical user journeys must have automated E2E tests: leave application flow (including conditional routing), payroll run, performance review cycle, employee onboarding, offboarding, and succession plan review.
- E2E suite must run on staging before every production release.

**Performance Testing**
- Load tests must simulate 5,000 concurrent users and validate P95 response times meet NFR targets.
- Payroll engine stress test must process 10,000 employees within 15 minutes.
- Run monthly on staging; mandatory before every major release.

**Security Testing**
- SAST (Static Application Security Testing) integrated into CI/CD.
- DAST (Dynamic Application Security Testing) on staging environment weekly.
- OWASP Top 10 checklist validated before each release.
- Annual third-party penetration test.

**UAT (User Acceptance Testing)**
- UAT must be conducted with real users: 2 HR admins, 2 managers, 5 employees, 1 payroll admin.
- UAT sign-off required from HR lead, Payroll lead, and IT lead before go-live.
- UAT defects must be triaged: P0/P1 defects block release; P2/P3 scheduled for next sprint.

### 17.2 Defect Severity Classification

| Priority | Definition | SLA to Fix |
|---|---|---|
| P0 — Critical | System down, data loss, incorrect payroll | 4 hours |
| P1 — High | Core feature broken, data integrity risk | 24 hours |
| P2 — Medium | Feature degraded, workaround exists | 1 week |
| P3 — Low | Minor UI issues, cosmetic bugs | Next sprint |

### 17.3 UAT Sign-off Criteria

UAT sign-off requires all of the following conditions to be met:

| Criteria | Requirement | Owner |
|---|---|---|
| Test coverage | 100% of defined test scenarios executed with documented results | QA Lead |
| P0 defects | 0 open P0 (Critical) defects | Engineering |
| P1 defects | 0 open P1 (High) defects | Engineering |
| P2 defects | ≥ 95% resolved or deferred with business sign-off | Product Owner |
| Critical workflows | All critical workflows tested in staging: payroll run, leave approval chain, performance cycle, onboarding, separation, offboarding | HR Lead + Payroll Lead |
| Parallel payroll | 1 full parallel cycle with ≤ 0.1% variance vs. legacy system; reconciliation report approved | Payroll Lead |
| Data migration | 100% of active employee records verified (min. 50 sampled); leave balances verified for all employees | HR Ops |
| Performance | Load test results: P95 < 2 sec, 5,000 concurrent users; payroll 10K employees < 15 min | Engineering |
| Security | SAST scan: no critical vulnerabilities; DAST scan: no critical vulnerabilities | Security |
| Integrations | All integrations tested: ERP posting, bank file generation, SSO, job boards, DocuSign | Engineering + IT |
| DR drill | DR drill executed with RPO ≤ 1 hour and RTO ≤ 4 hours documented | IT/DevOps |
| Documentation | User guides, admin guides, and video walkthroughs published | Product + HR |
| Training | HR admins trained and certified; manager and employee training delivered | HR + Product |
| Rollback plan | Rollback plan documented and tested | Engineering |

**UAT Sign-off Approvers:**

| Role | Signature |
|---|---|
| HR Lead | _________________ |
| Payroll Lead | _________________ |
| IT Lead | _________________ |
| Product Owner | _________________ |
| CHRO (final approval) | _________________ |

---

## 18. Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R01 | Payroll calculation errors post-migration | High | Critical | Parallel payroll run for 1 full cycle pre-go-live; automated reconciliation; dual-control override |
| R02 | Low employee adoption of self-service | Medium | High | Change management program, training, champion network |
| R03 | Data migration quality issues | High | High | 4-week data cleansing sprint; dual validation with source team |
| R04 | Integration failures with ERP/banks | Medium | High | Mock-based integration testing; fallback to manual file export; DLQ monitoring |
| R05 | Compliance regulation changes (tax rules) | Medium | Medium | Modular tax engine; dedicated compliance monitoring team |
| R06 | Vendor lock-in for critical integrations | Low | Medium | Contract protections; API abstraction layer |
| R07 | Security breach / data leak | Low | Critical | SOC 2 controls; pen testing; incident response plan; WORM audit storage |
| R08 | Key HR stakeholder turnover during rollout | Medium | Medium | Document decisions; involve backup owners in all major meetings |
| R09 | Scope creep extending Phase 1 timeline | High | Medium | Strict MoSCoW prioritization; change control process |
| R10 | Performance degradation at scale | Low | High | Load testing monthly; auto-scaling architecture; circuit breakers |
| R11 | Statutory filing errors / penalties | Medium | Critical | Automated statutory calendar with alerts; legal review of calculations |
| R12 | Multi-country payroll complexity in Phase 2 | Medium | Medium | Engage local payroll consultants per country before Phase 2 start |
| R13 | Offline sync conflicts in mobile app | Medium | Medium | Conflict resolution framework defined; user-visible sync status |
| R14 | Succession data sensitivity / leak | Low | High | Restricted RBAC for succession data; audit logs on all access |
| R15 | Integration DLQ overflow (silent data loss) | Medium | High | DLQ monitoring dashboard; 7-day escalation trigger; weekly DLQ review by IT |

---

## 19. Change Management & Training

### 19.1 Change Management Strategy

**Awareness Phase (Month 1–2)**
- CHRO communication to all employees about the upcoming system change.
- Town halls per department explaining benefits and timelines.
- FAQ document published on intranet.

**Readiness Phase (Month 3–5)**
- Identify "HRMS Champions" — 1–2 per department — trained first to support their teams.
- HR team undergoes deep-dive admin training on all modules.
- Manager training: approvals, team dashboards, performance reviews, succession nominations.

**Go-Live Phase (Month 6)**
- Hypercare support: dedicated helpdesk for HRMS queries for first 30 days post go-live.
- Daily stand-up with implementation team for first 2 weeks.
- Quick-reference guides and video walkthroughs published.

**Adoption Phase (Month 7+)**
- Monthly adoption dashboards tracking login rates, self-service utilization, ticket volume trends.
- Quarterly retrospectives with HR leads and champions.
- Feedback loops from helpdesk data feeding into product improvements.

### 19.2 Training Plan

| Audience | Training Format | Duration | Delivery |
|---|---|---|---|
| HR Admins | Deep-dive workshop (all modules) | 3 days | Instructor-led (in-person) |
| Payroll Admins | Payroll & tax module workshop | 1 day | Instructor-led (in-person) |
| Managers | Manager portal + approvals walkthrough | 2 hours | Live webinar + recording |
| Employees | Self-service portal walkthrough | 30 min | Video + quick guide |
| IT Team | Integration, admin panel, DLQ management | 4 hours | Technical workshop |
| HRMS Champions | Full platform + train-the-trainer | 1 day | Instructor-led |

### 19.3 Support Model

**Tier Structure:**

| Tier | Description | Audience | Coverage | Channels |
|---|---|---|---|---|
| Tier 0 — Self-Service | Knowledge base, FAQ, chatbot, video tutorials, in-app guidance | All users | 24×7 | Portal, chatbot |
| Tier 1 — HR Helpdesk | Dedicated HRMS support team for user queries | All users | Business hours (8×5) | Email, portal ticket, chat |
| Tier 2 — HR Super-Users | Internal HR power users with admin access | HR team | Business hours | Slack, phone |
| Tier 3 — Vendor/Engineering | Technical support for bugs, integrations, infrastructure | IT, Engineering, Payroll | 24×7 for P0 | Ticket, Slack, PagerDuty |

- **FR-SUPPORT-01:** A searchable knowledge base must contain: how-to articles, video walkthroughs (< 3 minutes each), policy documents, FAQ categorized by topic, and troubleshooting guides.
- **FR-SUPPORT-02:** The knowledge base must be continuously updated based on Tier 1 ticket trends.
- **FR-SUPPORT-03:** A chatbot must handle Tier 0 queries with natural language understanding and escalation to Tier 1 when unable to resolve.
- **FR-SUPPORT-04:** A dedicated HRMS support team must be staffed with 2+ trained agents during business hours.
- **FR-SUPPORT-05:** 3–5 HR power users (HRBPs, HR Ops) must be designated as HRMS Champions with advanced troubleshooting capability and authority to escalate to Tier 3.
- **FR-SUPPORT-06:** P0 issues must have 24×7 on-call rotation with defined escalation chain.
- **FR-SUPPORT-07:** All Tier 1+ tickets must be tracked with: unique ticket ID, category/sub-category, priority (P0–P3), assignment history, status, resolution notes, and CSAT survey link.

**Hypercare Period (First 30 Days Post Go-Live)**

- **FR-SUPPORT-08:** A dedicated hypercare team must be available for the first 30 days post go-live: 2+ Tier 1 agents dedicated full-time, 1+ Tier 2 super-user dedicated full-time, on-site engineering presence (or dedicated Slack channel with 1-hour response SLA), daily war room calls for first 14 days, and extended hours coverage (8:00 AM–8:00 PM IST).
- **FR-SUPPORT-09:** Hypercare metrics must be tracked daily: ticket volume, resolution time by tier, CSAT scores, and repeat issue rate.

---

## 20. Assumptions & Constraints

### Assumptions

- The organization will designate an internal HRMS project owner empowered to make configuration decisions.
- Employee master data can be migrated from existing systems via Excel/CSV bulk upload.
- The organization will enforce SSO adoption for all employees within 90 days of go-live.
- Internet connectivity is available at all work locations; offline support is not required in Phase 1.
- Legal counsel will review and approve payroll calculation logic for each jurisdiction before go-live.
- Employees have access to email and smartphones for notification delivery.
- The organization will commit at least 2 HR admins and 1 IT resource to the implementation project.
- Critical roles for succession planning will be defined by CHRO and department heads within the first 30 days of Phase 2.

### Constraints

- Phase 1 payroll must support India only; multi-country expansion begins in Phase 2.
- Phase 1 mobile experience will be mobile-web (PWA) only; native apps are a Phase 2 deliverable.
- All third-party integration credentials and costs are the responsibility of the organization.
- The system must be deployable on AWS, Azure, or GCP; a specific cloud preference must be defined at the infrastructure kickoff meeting.
- Budget is fixed at the approved envelope (see Section 23); any scope additions must go through change control.
- Go-live must not coincide with a payroll cycle cutoff date.
- Contractor management is explicitly excluded from Phases 1 and 2; re-evaluation for Phase 3 requires a separate business case.

---

## 21. Open Questions

| # | Question | Owner | Target Date | Status |
|---|---|---|---|---|
| 1 | What is the preferred cloud provider and region for data hosting? | IT Lead | Week 2 | Open |
| 2 | Which countries must be supported in Phase 2 payroll? | CHRO | Week 3 | Open |
| 3 | Is biometric device integration required in Phase 1 or Phase 2? | HR Manager | Week 2 | Open |
| 4 | Should the system support a union-specific pay structure? | Legal + HR | Week 4 | Open |
| 5 | What is the preferred e-signature vendor (DocuSign vs Adobe Sign)? | IT Lead | Week 3 | Open |
| 6 | Are contractor/gig worker payroll requirements in scope? | CHRO | Week 4 | Open |
| 7 | What ERP system requires integration for payroll journal entries? | Finance Lead | Week 2 | Open |
| 8 | Is there a preference for an in-house chatbot vs. a third-party solution? | Product Owner | Week 5 | Open |
| 9 | What is the organization's policy on data residency for non-Indian employees? | Legal | Week 3 | Open |
| 10 | Will DEI data be voluntary only, or mandatory for certain roles? | CHRO + Legal | Week 4 | Open |
| 11 | What is the employee count projection for 24 months used for infrastructure sizing? | Finance | Week 2 | Open |
| 12 | Should salary data be visible to managers for their direct reports? | CHRO | Week 3 | Open |
| 13 | How many critical roles will be designated in Phase 1 for succession planning? | CHRO | Week 4 | Open |
| 14 | Should succession planning data be visible to the successors themselves? | CHRO + HR | Week 5 | Open |
| 15 | What is the preferred expense management platform for reimbursement integration? | Finance Lead | Week 3 | Open |
| 16 | Is dual-control (4-eyes) approval required for all payroll overrides, or only above a threshold? | Payroll Lead | Week 3 | Open |

---

## 22. Milestones & Phased Rollout

### Phase 1 — Foundation (Months 1–6)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M0 | Kickoff, infra setup, data audit | Month 1 | IT + Product |
| M1 | Employee records, org chart, RBAC, SSO, bulk import | Month 2 | Engineering |
| M2 | Attendance & leave management (incl. parental leave) | Month 3 | Engineering |
| M3 | India payroll (single entity) + tax + expense reimbursement integration | Month 4 | Engineering + Payroll |
| M4 | Basic performance reviews + feedback + conditional workflow builder | Month 5 | Engineering |
| M5 | Employee self-service portal (PWA) + helpdesk + core dashboards | Month 6 | Engineering |
| M6 | Notifications framework + ERP/bank integrations + WORM audit store | Month 6 | Engineering |
| M7 | Data migration + UAT (incl. parallel payroll) + security audit + DR drill | Month 6 | All |
| M8 | Go-live + 30-day hypercare | Month 6 | Product + HR |

### Phase 2 — Growth (Months 7–12)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M9 | Recruitment (ATS) + structured onboarding | Month 8 | Engineering |
| M10 | LMS — course library, learning paths, skills inventory, IDPs | Month 9 | Engineering |
| M11 | Multi-country / multi-currency payroll | Month 10 | Engineering + Legal |
| M12 | Native mobile apps (iOS + Android) with offline mode | Month 11 | Mobile Team |
| M13 | Advanced analytics + predictive attrition + DEI dashboard | Month 12 | Data Team |
| M14 | Succession planning module (critical roles, HiPo, talent pipelines) | Month 12 | Engineering |

### Phase 3 — Intelligence (Months 13–18)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M15 | Benefits administration module | Month 14 | Engineering |
| M16 | Workforce planning & advanced headcount forecasting | Month 15 | Data + Product |
| M17 | AI talent intelligence (skills gaps, succession AI recommendations) | Month 17 | AI Team |
| M18 | Compensation benchmarking with market data | Month 17 | Engineering |
| M19 | Contractor management module (if business case approved) | Month 18 | Engineering |
| M20 | SOC 2 Type II certification | Month 18 | IT + Security |

---

## 23. Budget & Cost Estimates

> **Note:** Figures below are illustrative estimates for planning purposes. Actual costs must be confirmed after vendor selection and infrastructure sizing.

### 23.1 Implementation Costs (One-Time)

| Item | Estimated Cost |
|---|---|
| Product engineering (internal team, 12 months) | ₹80–120 Lakhs |
| UX/UI design | ₹8–12 Lakhs |
| Data migration & cleansing | ₹4–6 Lakhs |
| Security audit + pen testing | ₹3–5 Lakhs |
| Training & change management | ₹2–4 Lakhs |
| **Total One-Time** | **₹97–147 Lakhs** |

### 23.2 Annual Operating Costs (Recurring)

| Item | Estimated Annual Cost |
|---|---|
| Cloud infrastructure (AWS/Azure/GCP) | ₹12–20 Lakhs/year |
| Third-party integrations (DocuSign, WhatsApp API, etc.) | ₹4–8 Lakhs/year |
| SMS / email delivery (Twilio, SendGrid) | ₹2–4 Lakhs/year |
| Security tools (SAST, DAST, WAF, secrets manager) | ₹3–5 Lakhs/year |
| Annual pen test | ₹2–4 Lakhs/year |
| Cold storage archive (S3 Glacier for audit/compliance) | ₹1–2 Lakhs/year |
| **Total Annual Opex** | **₹24–43 Lakhs/year** |

### 23.3 ROI Projection

| Benefit | Year 1 Savings |
|---|---|
| HR admin time saved (60% reduction × ₹35L payroll) | ₹21 Lakhs |
| Payroll error corrections eliminated | ₹8 Lakhs |
| Compliance penalty risk reduction | ₹10–30 Lakhs |
| Recruitment efficiency (time-to-hire improvement) | ₹12 Lakhs |
| Attrition reduction (1% point × avg replacement cost) | ₹15–25 Lakhs |
| Leadership continuity (succession planning reducing key-person risk) | ₹5–15 Lakhs |
| **Projected Year 1 Benefit** | **₹71–111 Lakhs** |

**Estimated payback period: 15–22 months.**

---

## 24. Vendor Evaluation Criteria

In the event a commercial off-the-shelf (COTS) HRMS is evaluated alongside or instead of a custom build, the following criteria apply:

### 24.1 Functional Fit (60% weight)

| Criterion | Weight |
|---|---|
| India payroll & statutory compliance out-of-the-box | 25% |
| Leave & attendance management completeness | 15% |
| Self-service portal quality | 10% |
| Performance management flexibility | 10% |
| ATS / onboarding capabilities | 10% |
| Succession planning module | 10% |
| Bulk operations and workflow builder | 10% |
| Offline mobile support | 10% |

### 24.2 Technical & Security (25% weight)

| Criterion | Weight |
|---|---|
| REST API coverage and webhook support | 15% |
| SSO / SCIM support | 10% |
| SOC 2 / ISO 27001 certification | 25% |
| Data residency in India | 15% |
| WORM audit storage capability | 15% |
| Integration DLQ / resilience features | 10% |
| Offline mobile app capability | 10% |

### 24.3 Vendor Health (15% weight)

| Criterion | Evaluation Points |
|---|---|
| Years in market | > 5 years preferred |
| India customer base | > 100 enterprise customers |
| Support SLA | 24×7 for P0; 8×5 for standard |
| Implementation partner ecosystem | 3+ certified partners |
| Pricing model | Per-employee-per-month (PEPM) preferred |
| Roadmap alignment | Succession planning, AI features on roadmap |

---

## 25. Appendix

### A. Glossary

| Term | Definition |
|---|---|
| HRMS | Human Resource Management System |
| HRBP | HR Business Partner |
| CTC | Cost to Company — total annual compensation package |
| LOP | Loss of Pay — unpaid leave deducted from salary |
| PF | Provident Fund — statutory retirement savings contribution |
| ESI | Employees' State Insurance — statutory health/disability scheme |
| PT | Professional Tax — state-level tax on employment income |
| TDS | Tax Deducted at Source — income tax withheld from salary |
| ATS | Applicant Tracking System |
| LMS | Learning Management System |
| SCORM | Sharable Content Object Reference Model — e-learning standard |
| OKR | Objectives and Key Results |
| RBAC | Role-Based Access Control |
| DSAR | Data Subject Access Request |
| POSH | Prevention of Sexual Harassment |
| RPO | Recovery Point Objective |
| RTO | Recovery Time Objective |
| MFA | Multi-Factor Authentication |
| eNPS | Employee Net Promoter Score |
| DEI | Diversity, Equity & Inclusion |
| PEPM | Per Employee Per Month (SaaS pricing unit) |
| MPR | Manpower Requisition |
| ACR | Annual Compensation Review |
| IDP | Individual Development Plan |
| DPDP | Digital Personal Data Protection Act (India, 2023) |
| CSAT | Customer Satisfaction Score |
| VAPT | Vulnerability Assessment and Penetration Testing |
| PWA | Progressive Web App |
| PITR | Point-in-Time Recovery |
| SIRP | Security Incident Response Plan |
| ECR | Electronic Challan cum Return (EPFO filing) |
| PIA | Privacy Impact Assessment |
| HiPo | High Potential Employee |
| WORM | Write-Once Read-Many (immutable storage) |
| DLQ | Dead Letter Queue |
| F&F | Full and Final settlement |
| FMLA | Family and Medical Leave Act (US) |
| VMS | Vendor Management System |
| MDM | Mobile Device Management |
| iPaaS | Integration Platform as a Service |

### B. Compliance Reference Matrix

| Regulation | Region | Key Requirements | HRMS Coverage |
|---|---|---|---|
| DPDP Act 2023 | India | Data localization, consent, grievance officer, retention | ✅ Phase 1 |
| GDPR | EU | Right to access/erasure, portability, DPA, retention | ✅ Phase 1 |
| POSH Act 2013 | India | ICC, case management, annual report | ✅ Phase 1 |
| PF Act 1952 | India | 12% employer contribution, ECR filing | ✅ Phase 1 |
| ESI Act 1948 | India | 3.25% employer contribution, returns | ✅ Phase 1 |
| Income Tax Act | India | TDS, Form 16, investment declarations | ✅ Phase 1 |
| Shops & Establishments | India (per state) | Working hours, leave entitlements | ✅ Phase 1 |
| Maternity Benefit Act 1961 | India | 26 weeks maternity leave, reporting | ✅ Phase 1 |
| Gratuity Act 1972 | India | Gratuity computation on separation | ✅ Phase 1 |
| SOC 2 Type II | Global | Security, availability, confidentiality | 🔄 Phase 3 |
| ISO 27001 | Global | ISMS alignment | 🔄 Phase 2 |
| FMLA | US | 12 weeks parental/medical leave | 🔄 Phase 2 |

### C. Related Documents

| Document | Status | Owner |
|---|---|---|
| Technical Architecture Specification | TBD | Engineering Lead |
| Data Migration Plan (detailed) | TBD | Data Team |
| Security & Compliance Framework | TBD | IT Security |
| Payroll Tax Calculation Logic Document | TBD | Payroll Lead + Legal |
| UI/UX Design System & Prototypes | TBD | Design Lead |
| QA Test Plan | TBD | QA Lead |
| Rollout & Change Management Plan | TBD | HR + Product |
| Integration Specifications | TBD | Engineering Lead |
| API Documentation (OpenAPI spec) | TBD | Engineering |
| DR Runbook | TBD | IT/DevOps |
| Workflow Builder Admin Guide | TBD | Product + HR |
| Succession Planning Admin Guide | TBD | HR + Product |
| Data Retention Policy Document | TBD | Legal + IT |
| Mobile App Security Architecture | TBD | Mobile Team + Security |

### D. Revision History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 0.1 | Jan 2026 | Product Team | Initial draft |
| 0.5 | Feb 2026 | Product + HR | Stakeholder review, personas added |
| 0.9 | Mar 2026 | Product + Legal | Compliance section expanded |
| 1.0 | Mar 2026 | Product Owner | Approved for development |
| 2.0 | Mar 2026 | Product Team | Added: Notifications framework, Helpdesk module, DEI module, Workforce Planning, API design, Mobile strategy, Data migration plan, Testing strategy, Risk register, Change management, Budget estimates, Vendor evaluation, Persona 5, Exit interview module, expanded NFRs, compliance matrix, i18n section, expanded RBAC matrix |
| 3.0 | Mar 2026 | Product Team | Added: §7.0 Conditional approval workflow engine, §7.15 Succession Planning & Talent Pipelines (HiPo, bench strength, talent review), §7.16 Bulk Operations & Templates (scheduled bulk ops, template versioning), §7.17 Contractor Management (explicit out-of-scope + Phase 3 requirements), §7.10.1 Expense Reimbursement Integration, §7.10.2 Integration Resilience & Error Handling (circuit breakers, DLQ, credential rotation), §7.2.2 expanded parental/international leave (maternity, paternity, adoption, surrogacy, FMLA), §8.9 SLA framework (service-level targets, support tiers, remedies), §13.5 Data Retention & Disposal (WORM audit, DSAR automation, anonymization), §15.1 Mobile Offline Mode Requirements, §15.2 Push Notifications, §17.3 UAT Sign-off Criteria (formal sign-off matrix), §19.3 Support Model (3-tier support + hypercare), expanded RBAC matrix, new user flows (Offboarding, Succession Review), 3 new risks added (R13, R14, R15), 3 new open questions added (Q14–Q16) |

---

*This document is confidential and intended for internal use only. For questions or contributions, contact the Product Management team.*
