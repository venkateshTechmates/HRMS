# Product Requirements Document
## HR Management System (HRMS)

**Version:** 2.0
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

### Anti-Goals (What Success Is NOT)

- Replacing all third-party tools (we integrate, not replace everything)
- Full automation of all HR judgment calls (system supports, not substitutes)
- 100% offline functionality in Phase 1

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
- **Goals:** Approve leaves quickly, track team performance, manage headcount.
- **Frustrations:** Approves leave requests via email. Cannot see real-time attendance. Performance reviews are annual, not continuous.
- **Needs:** Mobile approvals, team dashboards, performance check-ins, org chart visibility.
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
- **Goals:** Align workforce strategy to business goals, reduce attrition, enable growth, improve DEI representation.
- **Frustrations:** Cannot get real-time headcount or attrition data. Workforce decisions are based on stale reports.
- **Needs:** Executive dashboards, predictive attrition analytics, DEI metrics, budget vs actual.
- **Tech comfort:** Low-medium — relies on summaries; needs no-code dashboards.
- **Usage frequency:** Weekly reviews, monthly deep-dives.

### Persona 5 — Sanjay, Payroll Admin
- **Age:** 38 | **Experience:** 10 years in payroll | **Location:** Bangalore HQ
- **Goals:** Run payroll on time, zero errors, statutory compliance.
- **Frustrations:** Manual reconciliation every cycle; errors only found after disbursement; no audit trail.
- **Needs:** Automated statutory calculations, pre-payroll checklist, reconciliation reports, bank file export.
- **Tech comfort:** High — deep domain expertise in payroll tools.
- **Usage frequency:** Daily during payroll cycle, bi-weekly otherwise.

---

## 6. Scope

### In Scope — Phase 1 (MVP)

- Employee records & org chart
- Attendance & leave management
- Payroll processing (single-country — India)
- Basic performance reviews
- Employee self-service portal (web)
- Employee helpdesk & ticketing
- Role-based access control
- Core reporting & dashboards
- Notifications framework (email + in-app)

### In Scope — Phase 2

- Recruitment (ATS) & structured onboarding
- Multi-country / multi-currency payroll
- Learning Management System (LMS)
- Advanced analytics & predictive insights
- Mobile native app (iOS + Android)
- Third-party integrations (Slack, Teams, Jira, etc.)
- DEI tracking module

### In Scope — Phase 3

- Benefits broker integrations
- Workforce planning / headcount forecasting
- AI-powered talent intelligence (skills gaps, succession planning)
- Compensation benchmarking with market data

### Out of Scope (All Phases)

- Hardware/biometric device manufacturing or management
- Payroll for gig/freelance workers (evaluated separately)
- Full ERP replacement (HRMS integrates with ERP, not replaces it)

---

## 7. Functional Requirements

### 7.1 Employee Lifecycle Management

**Overview:** The system must maintain a complete, accurate, and auditable record of every employee from pre-hire to separation.

#### 7.1.1 Employee Profile

- **FR-EMP-01:** The system shall maintain a canonical employee profile including: Employee ID, full name, date of birth, gender, nationality, contact details, emergency contacts, tax ID, bank details, employment type (full-time, part-time, contractor), department, designation, reporting manager, work location, and start date.
- **FR-EMP-02:** All profile changes must be version-controlled with timestamps, the editor's identity, and reason for change.
- **FR-EMP-03:** HR admins must be able to upload and attach documents (contracts, ID proofs, certificates) to employee profiles with file type and size validation (max 10 MB per file, allowed types: PDF, JPEG, PNG, DOCX).
- **FR-EMP-04:** The system shall support custom fields configurable by HR admins for organization-specific attributes (text, dropdown, date, boolean, numeric).
- **FR-EMP-05:** The system shall support a configurable probation period tracker with alerts at 30, 60, and 90 days and a confirmation/extension workflow.

#### 7.1.2 Org Chart & Hierarchy

- **FR-ORG-01:** The system shall auto-generate and maintain a live, visual org chart based on reporting manager relationships.
- **FR-ORG-02:** HR admins must be able to perform org restructuring (department transfers, manager changes) with an effective date.
- **FR-ORG-03:** Historical org chart snapshots must be retrievable for any past date.
- **FR-ORG-04:** The org chart must be searchable by name, role, department, or location.
- **FR-ORG-05:** Org chart must be exportable as PNG, PDF, or structured JSON for integration use.

#### 7.1.3 Transfers, Promotions & Separations

- **FR-EMP-06:** The system shall support configurable workflows for internal transfers, promotions, and role changes — including multi-level approvals.
- **FR-EMP-07:** On separation, the system shall trigger an automated offboarding checklist (asset return, access revocation, clearance, full and final settlement computation, experience letter generation).
- **FR-EMP-08:** Separated employees must be retained in a read-only state for a configurable retention period (default: 7 years) for compliance purposes.
- **FR-EMP-09:** The system must support voluntary resignation, involuntary termination, retirement, and contract end as distinct separation types, each with its own workflow.
- **FR-EMP-10:** An exit interview module must be available to collect and report on exit reasons, with anonymized trend analysis.

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
- **FR-TAX-02:** Investment declaration by employees must be collected via a self-service module and applied to TDS calculations (both Old and New Tax Regime).
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
- **FR-COM-02:** Employees must acknowledge receipt of policies with e-signatures, and acknowledgement records must be stored with timestamps and IP address.
- **FR-COM-03:** The system shall maintain a configurable compliance calendar for recurring statutory filing deadlines with assigned owners and status tracking.
- **FR-COM-04:** A grievance redressal module must allow employees to raise complaints confidentially, with case tracking, response SLAs (72-hour acknowledgement, 30-day resolution), and escalation.
- **FR-COM-05:** The system must support POSH (Prevention of Sexual Harassment) case management with restricted access, investigation tracking, and audit trails.
- **FR-COM-06:** The system must support document expiry tracking (visa, work permits, professional certifications) with configurable alerts at 90, 60, 30, and 7 days before expiry.

---

### 7.8 Self-Service Portal

- **FR-SS-01:** Every employee must have a self-service portal (web and mobile) where they can view and update personal information, apply for leave, download payslips, view appraisal status, and access company policies.
- **FR-SS-02:** Managers must have a team view with approval queues, team attendance, leave calendar, and performance snapshots.
- **FR-SS-03:** An in-app notification center must surface all pending actions, approvals, deadlines, and announcements with read/unread state.
- **FR-SS-04:** A search-enabled HR knowledge base / FAQ must be available to employees to reduce support tickets.
- **FR-SS-05:** A chatbot (or AI assistant) integration must be available for common queries (leave balance, payslip status, holiday list, IT asset details).
- **FR-SS-06:** Employees must be able to update their bank account details, emergency contacts, and address through the portal — subject to HR approval for sensitive fields.
- **FR-SS-07:** A company announcements board must be available for HR/Leadership to publish organization-wide or department-specific announcements.

---

### 7.9 Analytics & Reporting

- **FR-RPT-01:** The system shall provide pre-built dashboards for: headcount & attrition, payroll cost, attendance, leave utilization, hiring funnel, performance distribution, and DEI metrics.
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
- Webhook support must be available for event-driven integrations (e.g., employee joined, payroll disbursed).
- A middleware/iPaaS layer must be available for transforming data to/from partner systems.
- Integration health monitoring with alerting on failures must be part of the admin panel.

---

### 7.11 Notifications & Alerts Framework

- **FR-NOTIF-01:** The system shall support a configurable, multi-channel notification engine supporting: in-app, email, SMS, WhatsApp, and Slack/Teams push.
- **FR-NOTIF-02:** Each notification type must be configurable per role — specifying which channels are used, the trigger event, and the delay/schedule.
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
- **FR-DEI-03:** Hiring funnel analytics must surface gender and diversity data at each pipeline stage (applied, shortlisted, interviewed, offered, hired) to identify drop-off points.
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

## 8. Non-Functional Requirements

### 8.1 Performance

| Requirement | Target |
|---|---|
| Page load time (P95) | < 2 seconds |
| API response time (P95) | < 300ms |
| Payroll processing (10,000 employees) | < 15 minutes |
| Concurrent users supported | 5,000+ |
| Report generation (1M rows) | < 30 seconds |
| Search results | < 500ms |
| File upload (10 MB) | < 5 seconds |

### 8.2 Availability & Reliability

- System uptime: **99.9% SLA** (< 8.7 hrs downtime/year), excluding scheduled maintenance.
- Scheduled maintenance windows: Sundays 2:00–4:00 AM local time with 48-hour prior notice to all admins.
- RPO (Recovery Point Objective): **1 hour.**
- RTO (Recovery Time Objective): **4 hours.**
- Active-active deployment across at least two availability zones.
- Payroll service must have a **99.95% uptime SLA** due to zero-tolerance for payroll delays.
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
- VAPT (Vulnerability Assessment and Penetration Testing) before every major release.
- All API keys and secrets must be stored in a secrets manager (AWS Secrets Manager / HashiCorp Vault).
- IP allowlisting must be supported for admin panel access.

### 8.5 Usability

- WCAG 2.1 Level AA accessibility compliance.
- The system must be fully usable on latest versions of Chrome, Firefox, Safari, and Edge.
- Mobile web must support iOS 15+ and Android 10+ browsers.
- Native mobile apps (Phase 2) for iOS and Android.
- UI must support English as the default; localization framework must be in place in Phase 1 for Phase 2 language rollout.
- All form errors must be shown inline with clear, actionable messages.
- Keyboard navigation must be supported throughout the application.

### 8.6 Compliance

- **GDPR** (EU): Right to access, right to erasure, data portability, consent management.
- **India DPDP Act 2023:** Data localization (data stored in India for Indian employees), consent management, grievance officer designation.
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

---

## 9. System Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│     Web App (React)     |     Mobile App (React Native)  │
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
│  ┌──────────┐ ┌──────────────────────────────────────┐   │
│  │Helpdesk  │ │  DEI Service  |  Audit Service        │   │
│  │ Service  │ └──────────────────────────────────────┘   │
│  └──────────┘                                            │
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
  └── belongs to → Department, Manager (Employee)

LeavePolicy
  ├── has many → LeaveTypes
  └── applied to → Employees (via Department / Location / Role)

PayrollCycle
  ├── has many → PayrollRecords (per Employee)
  ├── has many → OneTimePayments
  └── generates → PayslipRecords + BankTransferFile

PerformanceCycle
  ├── has many → ReviewForms
  ├── has many → Goals
  └── has many → PerformanceReviews (per Employee)

JobRequisition
  ├── has many → Candidates
  └── Candidate → has many → InterviewRounds
      └── InterviewRound → generates → Offer
          └── Offer accepted → creates → Employee

HelpDeskTicket
  ├── belongs to → Employee (requester)
  ├── assigned to → HRAgent
  └── has many → TicketResponses, TicketAttachments

Notification
  ├── belongs to → Employee (recipient)
  ├── triggered by → Event (leave, payroll, review, etc.)
  └── delivered via → Channel (email, in-app, SMS, WhatsApp)
```

---

## 11. API Design Principles

The HRMS will expose a RESTful API layer consumed by the web app, mobile app, and third-party integrations.

### 11.1 API Standards

- **Protocol:** REST over HTTPS
- **Format:** JSON (application/json) for all requests and responses
- **Authentication:** OAuth 2.0 (Authorization Code flow for users; Client Credentials for service-to-service)
- **Versioning:** URI-based versioning — `/api/v1/`, `/api/v2/`
- **Rate Limiting:** 1000 requests/min per client for standard; 10,000/min for trusted integrations
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
| Helpdesk | `/api/v1/helpdesk` | tickets, responses, CSAT |
| Notifications | `/api/v1/notifications` | preferences, history, mark-read |
| Analytics | `/api/v1/analytics` | dashboards, reports, exports |
| Webhooks | `/api/v1/webhooks` | register, list, delete, logs |

### 11.3 Webhook Events

The following events will emit webhooks for integration consumers:

```
employee.created          employee.updated         employee.separated
leave.requested           leave.approved           leave.rejected
payroll.initiated         payroll.disbursed        payslip.generated
review.cycle.started      review.submitted         rating.finalized
offer.sent                offer.accepted           candidate.rejected
ticket.created            ticket.resolved          policy.published
```

---

## 12. User Flows

### 12.1 Employee Leave Application Flow

```
Employee → Apply for Leave (self-service portal)
  └── System validates leave balance & team coverage
      ├── Insufficient balance → Error notification to employee
      ├── Team coverage conflict → Warning shown (not blocked)
      └── Sufficient balance
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
          └── Compute gross pay (salary + allowances + one-time payments)
              └── Compute deductions (PF, ESI, TDS, PT, loans, advances)
                  └── Generate payroll register (preview mode)
                      └── HR reviews pre-payroll checklist
                          ├── Exceptions found → HR resolves → Re-compute
                          └── All clear → HR approves
                              └── Generate bank transfer file
                                  └── Disburse salaries
                                      └── Mark payroll as disbursed
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
          └── Laptop, email ID, system access requests created in Jira
      └── Buddy assigned by HR/Manager
      └── Day 1: Candidate becomes Employee in HRMS
          └── 30-60-90 day checklist activated
              └── Day 7 onboarding survey sent
                  └── Day 30 onboarding survey sent
                      └── Day 90 survey sent → Onboarding closed
```

### 12.5 HR Helpdesk Ticket Flow

```
Employee raises ticket (portal / chatbot / email)
  └── System categorizes ticket (AI-assist + employee selection)
      └── Auto-assigned to HR queue by category + location
          └── HR agent picks up ticket
              └── Agent responds (within SLA)
                  ├── Resolved → Employee notified → CSAT survey sent
                  └── Escalated → Senior HR / Manager loop-in
                      └── Resolved → Closed → CSAT survey sent
                          └── Resolution added to knowledge base
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

### 13.2 Audit Logging

- Every create, update, and delete operation on sensitive records (employee, payroll, compensation, leave) must generate an immutable audit log entry containing: timestamp (UTC), actor user ID, IP address, action type, entity type, entity ID, old value, and new value.
- Audit logs must be accessible to HR Admins and Super Admins with filter and export capability.
- Audit logs must be stored in a separate, append-only data store (e.g., append-only PostgreSQL table + S3 archive after 90 days).
- Failed login attempts must be logged and MFA bypass attempts must trigger real-time alerts to Super Admins.

### 13.3 Data Privacy

- Personally Identifiable Information (PII) fields must be masked in logs, API responses, and any non-authorized views.
- Data subject access requests (DSAR) must be fulfillable within **72 hours** by HR Admins via an automated data export.
- Data deletion (right to erasure) must anonymize PII while retaining anonymized records for statutory purposes — with a documented data map identifying all PII fields and storage locations.
- A Privacy Impact Assessment (PIA) must be completed before any new data collection is introduced.
- Employee consent for voluntary DEI data must be separately captured, revocable at any time.

### 13.4 Incident Response

- A documented Security Incident Response Plan (SIRP) must be maintained, covering: detection, containment, eradication, recovery, and post-mortem.
- Personal data breaches must be reported to affected data subjects and regulators (CERT-In in India, DPA in EU) within **72 hours** of discovery.
- All security incidents must be tracked with severity, root cause, resolution, and prevention steps.

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

### Phase 1 — Mobile Web

- The web application must be fully responsive and usable on mobile browsers (iOS 15+, Android 10+).
- Critical workflows optimized for mobile: leave application, payslip download, approval actions, attendance clock-in.
- Progressive Web App (PWA) capabilities: installable on home screen, offline page cache, push notifications.

### Phase 2 — Native Mobile Apps

- iOS app (Swift/SwiftUI) and Android app (Kotlin/Jetpack Compose) — or React Native cross-platform.
- Core features for Phase 2 app: leave management, attendance, payslip, notifications, approvals, org chart.
- Biometric authentication (Face ID, fingerprint) for app login.
- GPS-based attendance check-in with location verification.
- Offline mode: ability to view payslips and leave balance with last-synced data when offline.
- App distribution: App Store, Google Play Store. Enterprise distribution via MDM for company-managed devices.

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
- All business logic (payroll calculations, leave balance computation, tax rules) must have ≥ 90% unit test coverage.
- Tests must be automated and run in CI/CD pipeline on every pull request.

**Integration Testing**
- All inter-service communication must have integration tests covering happy paths and failure scenarios.
- Third-party integration mocks must be maintained for: bank file export, statutory portals, DocuSign.

**End-to-End (E2E) Testing**
- Critical user journeys must have automated E2E tests: leave application flow, payroll run, performance review cycle, employee onboarding.
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

---

## 18. Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R01 | Payroll calculation errors post-migration | High | Critical | Parallel payroll run for 1 full cycle pre-go-live; automated reconciliation |
| R02 | Low employee adoption of self-service | Medium | High | Change management program, training, champion network |
| R03 | Data migration quality issues | High | High | 4-week data cleansing sprint; dual validation with source team |
| R04 | Integration failures with ERP/banks | Medium | High | Mock-based integration testing; fallback to manual file export |
| R05 | Compliance regulation changes (tax rules) | Medium | Medium | Modular tax engine; dedicated compliance monitoring team |
| R06 | Vendor lock-in for critical integrations | Low | Medium | Contract protections; API abstraction layer |
| R07 | Security breach / data leak | Low | Critical | SOC 2 controls; pen testing; incident response plan |
| R08 | Key HR stakeholder turnover during rollout | Medium | Medium | Document decisions; involve backup owners in all major meetings |
| R09 | Scope creep extending Phase 1 timeline | High | Medium | Strict MoSCoW prioritization; change control process |
| R10 | Performance degradation at scale | Low | High | Load testing monthly; auto-scaling architecture |
| R11 | Statutory filing errors / penalties | Medium | Critical | Automated statutory calendar with alerts; legal review of calculations |
| R12 | Multi-country payroll complexity in Phase 2 | Medium | Medium | Engage local payroll consultants per country before Phase 2 start |

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
- Manager training: approvals, team dashboards, performance reviews.

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
| IT Team | Integration & admin panel | 4 hours | Technical workshop |
| HRMS Champions | Full platform + train-the-trainer | 1 day | Instructor-led |

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

### Constraints

- Phase 1 payroll must support India only; multi-country expansion begins in Phase 2.
- Phase 1 mobile experience will be mobile-web (PWA) only; native apps are a Phase 2 deliverable.
- All third-party integration credentials and costs are the responsibility of the organization.
- The system must be deployable on AWS, Azure, or GCP; a specific cloud preference must be defined at the infrastructure kickoff meeting.
- Budget is fixed at the approved envelope (see Section 23); any scope additions must go through change control.
- Go-live must not coincide with a payroll cycle cutoff date.

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
| 11 | What is the employee count projection for 24 months used for license/infrastructure sizing? | Finance | Week 2 | Open |
| 12 | Should salary data be visible to managers for their direct reports? | CHRO | Week 3 | Open |

---

## 22. Milestones & Phased Rollout

### Phase 1 — Foundation (Months 1–6)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M0 | Kickoff, infra setup, data audit | Month 1 | IT + Product |
| M1 | Employee records, org chart, RBAC, SSO | Month 2 | Engineering |
| M2 | Attendance & leave management | Month 3 | Engineering |
| M3 | India payroll (single entity) + tax | Month 4 | Engineering + Payroll |
| M4 | Basic performance reviews + feedback | Month 5 | Engineering |
| M5 | Employee self-service portal + helpdesk + core dashboards | Month 6 | Engineering |
| M6 | Notifications framework + integrations (ERP, bank) | Month 6 | Engineering |
| M7 | Data migration + UAT + security audit | Month 6 | All |
| M8 | Go-live + hypercare | Month 6 | Product + HR |

### Phase 2 — Growth (Months 7–12)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M9 | Recruitment (ATS) + structured onboarding | Month 8 | Engineering |
| M10 | LMS — course library and learning paths | Month 9 | Engineering |
| M11 | Multi-country / multi-currency payroll | Month 10 | Engineering + Legal |
| M12 | Native mobile apps (iOS + Android) | Month 11 | Mobile Team |
| M13 | Advanced analytics & predictive attrition + DEI dashboard | Month 12 | Data Team |

### Phase 3 — Intelligence (Months 13–18)

| Milestone | Deliverable | Timeline | Owner |
|---|---|---|---|
| M14 | Benefits administration module | Month 14 | Engineering |
| M15 | Workforce planning & headcount forecasting | Month 15 | Data + Product |
| M16 | AI talent intelligence (skills gaps, succession) | Month 18 | AI Team |
| M17 | Compensation benchmarking with market data | Month 18 | Engineering |
| M18 | SOC 2 Type II certification | Month 18 | IT + Security |

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
| Security tools (SAST, DAST, WAF) | ₹3–5 Lakhs/year |
| Annual pen test | ₹2–4 Lakhs/year |
| **Total Annual Opex** | **₹23–41 Lakhs/year** |

### 23.3 ROI Projection

| Benefit | Year 1 Savings |
|---|---|
| HR admin time saved (60% reduction × ₹35L payroll) | ₹21 Lakhs |
| Payroll error corrections eliminated | ₹8 Lakhs |
| Compliance penalty risk reduction | ₹10–30 Lakhs |
| Recruitment efficiency (time-to-hire improvement) | ₹12 Lakhs |
| Attrition reduction (1% point × avg replacement cost) | ₹15–25 Lakhs |
| **Projected Year 1 Benefit** | **₹66–96 Lakhs** |

**Estimated payback period: 18–24 months.**

---

## 24. Vendor Evaluation Criteria

In the event a commercial off-the-shelf (COTS) HRMS is evaluated alongside or instead of a custom build, the following criteria apply:

### 24.1 Functional Fit

| Criterion | Weight |
|---|---|
| India payroll & statutory compliance out-of-the-box | 25% |
| Leave & attendance management completeness | 15% |
| Self-service portal quality | 10% |
| Performance management flexibility | 10% |
| ATS / onboarding capabilities | 10% |

### 24.2 Technical & Security

| Criterion | Weight |
|---|---|
| REST API coverage and webhook support | 10% |
| SSO / SCIM support | 5% |
| SOC 2 / ISO 27001 certification | 10% |
| Data residency in India | 5% |

### 24.3 Vendor Health

| Criterion | Evaluation Points |
|---|---|
| Years in market | > 5 years preferred |
| India customer base | > 100 enterprise customers |
| Support SLA | 24×7 for P0; 8×5 for standard |
| Implementation partner ecosystem | 3+ certified partners |
| Pricing model | Per-employee-per-month (PEPM) preferred |

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

### B. Compliance Reference Matrix

| Regulation | Region | Key Requirements | HRMS Coverage |
|---|---|---|---|
| DPDP Act 2023 | India | Data localization, consent, grievance officer | ✅ Phase 1 |
| GDPR | EU | Right to access/erasure, portability, DPA | ✅ Phase 1 |
| POSH Act 2013 | India | ICC, case management, annual report | ✅ Phase 1 |
| PF Act 1952 | India | 12% employer contribution, ECR filing | ✅ Phase 1 |
| ESI Act 1948 | India | 3.25% employer contribution, returns | ✅ Phase 1 |
| Income Tax Act | India | TDS, Form 16, investment declarations | ✅ Phase 1 |
| Shops & Establishments | India (per state) | Working hours, leave entitlements | ✅ Phase 1 |
| SOC 2 Type II | Global | Security, availability, confidentiality | 🔄 Phase 3 |
| ISO 27001 | Global | ISMS alignment | 🔄 Phase 2 |

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

### D. Revision History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 0.1 | Jan 2026 | Product Team | Initial draft |
| 0.5 | Feb 2026 | Product + HR | Stakeholder review, personas added |
| 0.9 | Mar 2026 | Product + Legal | Compliance section expanded |
| 1.0 | Mar 2026 | Product Owner | Approved for development |
| 2.0 | Mar 2026 | Product Team | Added: Notifications framework, Helpdesk module, DEI module, Workforce Planning, API design, Mobile strategy, Data migration plan, Testing strategy, Risk register, Change management, Budget estimates, Vendor evaluation, Persona 5, Exit interview module, expanded NFRs (DR, security incident response), compliance matrix, i18n section, RBAC matrix expanded |

---

*This document is confidential and intended for internal use only. For questions or contributions, contact the Product Management team.*
