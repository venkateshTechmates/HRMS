# Product Requirements Document
## HR Management System (HRMS)

**Version:** 1.0  
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
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [System Architecture Overview](#9-system-architecture-overview)
10. [Data Model Overview](#10-data-model-overview)
11. [User Flows](#11-user-flows)
12. [Security & Compliance](#12-security--compliance)
13. [Assumptions & Constraints](#13-assumptions--constraints)
14. [Open Questions](#14-open-questions)
15. [Milestones & Phased Rollout](#15-milestones--phased-rollout)
16. [Appendix](#16-appendix)

---

## 1. Executive Summary

The HR Management System (HRMS) is a unified, cloud-native platform designed to digitize, automate, and centralize all human resource operations across the organization. It will replace fragmented spreadsheets, siloed tools, and manual HR workflows with a single source of truth — eliminating inefficiencies, reducing compliance risk, and enabling data-driven people decisions.

The platform will serve employees, managers, HR Business Partners (HRBPs), and executives, scaling from small teams to enterprise deployments across multiple geographies, currencies, and legal jurisdictions.

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

### Root Cause

The organization has grown but its HR tooling has not scaled. The absence of an integrated system creates data silos, manual rework, and an inability to track the employee lifecycle holistically.

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

---

## 4. Stakeholders

| Stakeholder | Role | Interest |
|---|---|---|
| CHRO / VP of HR | Executive Sponsor | Strategic people goals, compliance, cost |
| HR Business Partners | Primary Users | Employee lifecycle, policy enforcement |
| Payroll Team | Primary Users | Accurate, timely payroll processing |
| IT / Engineering | Implementation Partner | Security, integrations, infrastructure |
| Finance | Secondary Users | Headcount costs, budget forecasting |
| Department Managers | Secondary Users | Team performance, leave approvals |
| Employees | End Users | Self-service, payslips, leave requests |
| Legal / Compliance | Reviewer | GDPR, labor law, data governance |
| C-Suite / Board | Consumers | Workforce analytics, org health metrics |

---

## 5. User Personas

### Persona 1 — Ananya, HR Manager
- **Age:** 34 | **Experience:** 8 years in HR
- **Goals:** Process payroll accurately, maintain compliance, handle employee grievances.
- **Frustrations:** Spends 70% of time on administrative tasks. Cannot find historical employee data easily. Gets audit surprises.
- **Needs:** Automated workflows, audit logs, bulk data operations, compliance dashboards.

### Persona 2 — Ravi, Department Manager
- **Age:** 42 | **Experience:** 12 years, manages a team of 18
- **Goals:** Approve leaves quickly, track team performance, manage headcount.
- **Frustrations:** Approves leave requests via email. Cannot see real-time attendance. Performance reviews are annual, not continuous.
- **Needs:** Mobile approvals, team dashboards, performance check-ins, org chart visibility.

### Persona 3 — Priya, Employee
- **Age:** 27 | **Experience:** 2 years at the company
- **Goals:** View payslips, apply for leave, track her appraisal status.
- **Frustrations:** Must email HR for every query. Has no visibility into leave balance. Finds performance review process opaque.
- **Needs:** Mobile-first self-service, leave calendar, payslip downloads, appraisal tracker.

### Persona 4 — Vikram, CHRO
- **Age:** 51 | **Experience:** 20+ years in HR leadership
- **Goals:** Align workforce strategy to business goals, reduce attrition, enable growth.
- **Frustrations:** Cannot get real-time headcount or attrition data. Workforce decisions are based on stale reports.
- **Needs:** Executive dashboards, predictive attrition analytics, DEI metrics, budget vs actual.

---

## 6. Scope

### In Scope — Phase 1 (MVP)

- Employee records & org chart
- Attendance & leave management
- Payroll processing (single-country)
- Basic performance reviews
- Employee self-service portal
- Role-based access control
- Core reporting & dashboards

### In Scope — Phase 2

- Recruitment (ATS) & onboarding
- Multi-country / multi-currency payroll
- Learning Management System (LMS)
- Advanced analytics & predictive insights
- Mobile native app (iOS + Android)
- Third-party integrations (Slack, Teams, Jira, etc.)

### Out of Scope

- Benefits broker integrations (Phase 3)
- Workforce planning / headcount forecasting (Phase 3)
- AI-powered talent intelligence (future roadmap)
- Hardware/biometric device management

---

## 7. Functional Requirements

### 7.1 Employee Lifecycle Management

**Overview:** The system must maintain a complete, accurate, and auditable record of every employee from pre-hire to separation.

#### 7.1.1 Employee Profile

- **FR-EMP-01:** The system shall maintain a canonical employee profile including: Employee ID, full name, date of birth, gender, nationality, contact details, emergency contacts, tax ID, bank details, employment type (full-time, part-time, contractor), department, designation, reporting manager, work location, and start date.
- **FR-EMP-02:** All profile changes must be version-controlled with timestamps, the editor's identity, and reason for change.
- **FR-EMP-03:** HR admins must be able to upload and attach documents (contracts, ID proofs, certificates) to employee profiles with file type and size validation.
- **FR-EMP-04:** The system shall support custom fields configurable by HR admins for organization-specific attributes.

#### 7.1.2 Org Chart & Hierarchy

- **FR-ORG-01:** The system shall auto-generate and maintain a live, visual org chart based on reporting manager relationships.
- **FR-ORG-02:** HR admins must be able to perform org restructuring (department transfers, manager changes) with an effective date.
- **FR-ORG-03:** Historical org chart snapshots must be retrievable for any past date.

#### 7.1.3 Transfers, Promotions & Separations

- **FR-EMP-05:** The system shall support configurable workflows for internal transfers, promotions, and role changes — including multi-level approvals.
- **FR-EMP-06:** On separation, the system shall trigger an automated offboarding checklist (asset return, access revocation, clearance, final settlement).
- **FR-EMP-07:** Separated employees must be retained in a read-only state for a configurable retention period (default: 7 years) for compliance purposes.

---

### 7.2 Attendance & Leave Management

#### 7.2.1 Attendance Tracking

- **FR-ATT-01:** The system shall support multiple attendance capture mechanisms: web clock-in/out, mobile GPS-based check-in, biometric device integration, and manual entry (with approval).
- **FR-ATT-02:** The system must detect and flag anomalies: late arrivals, early departures, missing punches, and overtime.
- **FR-ATT-03:** Managers and HR admins must be able to regularize attendance records with supporting justification and audit log.
- **FR-ATT-04:** The system shall support configurable shift schedules (fixed, rotational, flexi) and associate employees to shifts.

#### 7.2.2 Leave Management

- **FR-LEV-01:** The system shall support an unlimited number of configurable leave types (earned leave, sick leave, casual leave, maternity/paternity leave, bereavement, comp-off, LOP, etc.).
- **FR-LEV-02:** Leave policies must be configurable per country, location, department, employment type, and seniority level.
- **FR-LEV-03:** Leave accrual must be automated based on policy (monthly, quarterly, anniversary-based), with proration for mid-year joiners.
- **FR-LEV-04:** Employees must be able to apply for leave via web and mobile with date selection, reason, and document upload (for medical leave).
- **FR-LEV-05:** Leave requests must route through configurable multi-level approval workflows with SLA-based escalation.
- **FR-LEV-06:** The system must maintain real-time leave balances visible to employees, managers, and HR.
- **FR-LEV-07:** Leave calendar integration with Google Calendar / Outlook must be supported.
- **FR-LEV-08:** The system must support carry-forward, encashment, and lapse rules per leave type and policy.

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

#### 7.3.2 Compensation Management

- **FR-COMP-01:** The system shall maintain salary structure templates (CTC breakdowns) configurable by HR admins.
- **FR-COMP-02:** Salary revision workflows must be supported with effective date, reason code, and approval chain.
- **FR-COMP-03:** The system shall generate and distribute password-protected payslips (PDF) via email and in-app, on pay day.
- **FR-COMP-04:** Annual compensation review (ACR) cycles must be supported with bulk revision upload, manager recommendations, and approval tracking.

#### 7.3.3 Tax & Statutory Compliance

- **FR-TAX-01:** The system shall auto-generate statutory reports: Form 16, PF returns, ESI returns, PT returns (India); W-2, 1099, 941 (US).
- **FR-TAX-02:** Investment declaration by employees must be collected and applied to TDS calculations.
- **FR-TAX-03:** The system must support year-end finalization workflows for tax reconciliation.

---

### 7.4 Performance Management

#### 7.4.1 Goal Setting & OKRs

- **FR-PMS-01:** The system shall support goal-setting at organizational, team, and individual levels with cascading alignment.
- **FR-PMS-02:** Goals must have: title, description, category, KPIs, target value, timeline, and weight.
- **FR-PMS-03:** Mid-cycle goal amendments must be tracked with original vs. revised versions.

#### 7.4.2 Review Cycles

- **FR-PMS-04:** HR must be able to configure review cycles (annual, semi-annual, quarterly) with start/end dates and grace periods.
- **FR-PMS-05:** Review workflows must support: self-assessment → peer review → manager review → HRBP calibration → final rating.
- **FR-PMS-06:** Each review step must have configurable forms with rating scales (numeric, label-based), competency frameworks, and open-ended questions.
- **FR-PMS-07:** Bulk nudges and reminders must be sent automatically to pending reviewers based on deadlines.

#### 7.4.3 Continuous Feedback & 1:1s

- **FR-PMS-08:** Employees and managers must be able to give and receive real-time, structured feedback (strengths, improvements, recognition) at any time.
- **FR-PMS-09:** 1:1 meeting agendas, notes, and action items must be trackable within the system.
- **FR-PMS-10:** Employees must be able to request feedback from peers or cross-functional colleagues.

#### 7.4.4 Calibration & Bell Curve

- **FR-PMS-11:** HR and leadership must be able to view and adjust rating distributions with calibration views by department, level, and geography.
- **FR-PMS-12:** The system must enforce configurable rating quotas (e.g., max 10% "Exceeds Expectations") with guardrails and override capabilities for HR.

---

### 7.5 Recruitment & Onboarding

#### 7.5.1 Applicant Tracking System (ATS)

- **FR-REC-01:** Hiring managers must be able to raise manpower requisitions (MPRs) with: role details, headcount, budget, justification, and required start date.
- **FR-REC-02:** The system shall support a configurable recruitment pipeline: Applied → Screening → Interview Rounds → Offer → Accepted/Rejected.
- **FR-REC-03:** Job postings must be publishable to a branded careers page and distributable to integrated job boards (LinkedIn, Naukri, Indeed).
- **FR-REC-04:** Resume parsing must extract key fields (name, contact, experience, skills, education) and auto-populate candidate profiles.
- **FR-REC-05:** Interview scheduling must support calendar integration and automated email/SMS notifications to candidates and interviewers.
- **FR-REC-06:** Interviewers must submit structured feedback via scorecards linked to role-specific competencies.
- **FR-REC-07:** Offer letters must be generated from configurable templates, e-signed (DocuSign/Adobe Sign integration), and auto-archived.

#### 7.5.2 Onboarding

- **FR-ONB-01:** On offer acceptance, the system shall auto-trigger an onboarding workflow: document collection, IT provisioning tasks, system access requests, and buddy assignment.
- **FR-ONB-02:** New joiners must have access to a pre-boarding portal to complete paperwork, read policies, and watch welcome videos before Day 1.
- **FR-ONB-03:** A structured 30-60-90 day onboarding checklist must be assignable, with progress visible to both the new hire and their manager.
- **FR-ONB-04:** The system shall convert the offer record into an employee record on the joining date, eliminating re-data entry.

---

### 7.6 Learning & Development

- **FR-LMS-01:** The system shall support a content library for internal training courses in multiple formats: video, SCORM packages, PDFs, quizzes, and live sessions.
- **FR-LMS-02:** Courses must be assignable by HR (mandatory), by managers, or self-enrolled by employees.
- **FR-LMS-03:** Course completion, scores, and certificates must be tracked and linked to employee development profiles.
- **FR-LMS-04:** Learning paths (curated sequences of courses) must be configurable by role, level, or department.
- **FR-LMS-05:** The system must track training spend and ROI per employee and department.

---

### 7.7 Compliance & Policy Management

- **FR-COM-01:** HR must be able to upload, version, and publish company policies (HR policy, code of conduct, IT policy, etc.) with effective dates.
- **FR-COM-02:** Employees must acknowledge receipt of policies with e-signatures, and acknowledgement records must be stored.
- **FR-COM-03:** The system shall maintain a configurable compliance calendar for recurring statutory filing deadlines with assigned owners and status tracking.
- **FR-COM-04:** A grievance redressal module must allow employees to raise complaints confidentially, with case tracking and resolution SLAs.
- **FR-COM-05:** The system must support POSH (Prevention of Sexual Harassment) case management with restricted access and audit trails.

---

### 7.8 Self-Service Portal

- **FR-SS-01:** Every employee must have a self-service portal (web and mobile) where they can view and update personal information, apply for leave, download payslips, view appraisal status, and access company policies.
- **FR-SS-02:** Managers must have a team view with approval queues, team attendance, leave calendar, and performance snapshots.
- **FR-SS-03:** An in-app notification center must surface all pending actions, approvals, deadlines, and announcements.
- **FR-SS-04:** A search-enabled HR knowledge base / FAQ must be available to employees to reduce support tickets.
- **FR-SS-05:** A chatbot (or AI assistant) integration must be available for common queries (leave balance, payslip status, holiday list).

---

### 7.9 Analytics & Reporting

- **FR-RPT-01:** The system shall provide pre-built dashboards for: headcount & attrition, payroll cost, attendance, leave utilization, hiring funnel, and performance distribution.
- **FR-RPT-02:** HR admins must be able to build custom reports using a drag-and-drop report builder with filter, grouping, and cross-tabulation.
- **FR-RPT-03:** All reports must be exportable to CSV, Excel, and PDF.
- **FR-RPT-04:** Scheduled report delivery via email must be configurable (daily, weekly, monthly).
- **FR-RPT-05:** The system shall provide predictive analytics for: attrition risk scores, absenteeism patterns, and performance trajectory.
- **FR-RPT-06:** Executive dashboards must support real-time data with drill-down from org-level to individual employee.

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

### 8.2 Availability & Reliability

- System uptime: **99.9% SLA** (< 8.7 hrs downtime/year), excluding scheduled maintenance.
- Scheduled maintenance windows: Sundays 2:00–4:00 AM local time with prior notice.
- RPO (Recovery Point Objective): **1 hour.**
- RTO (Recovery Time Objective): **4 hours.**
- Active-active deployment across at least two availability zones.

### 8.3 Scalability

- Must horizontally scale to support 50,000+ employees without architecture change.
- Database must support multi-tenancy with data isolation per organization.
- Storage must scale elastically for document attachments (target: up to 10 TB per tenant).

### 8.4 Security

- All data at rest must be encrypted using **AES-256**.
- All data in transit must use **TLS 1.2+**.
- Role-Based Access Control (RBAC) must be enforced at every API and UI layer.
- Multi-Factor Authentication (MFA) must be supported and enforced for all HR admin roles.
- Session timeout: 30 minutes of inactivity.
- Penetration testing required quarterly.
- SOC 2 Type II certification target within 18 months of launch.

### 8.5 Usability

- WCAG 2.1 Level AA accessibility compliance.
- The system must be fully usable on latest versions of Chrome, Firefox, Safari, and Edge.
- Mobile web must support iOS 15+ and Android 10+ browsers.
- Native mobile apps (Phase 2) for iOS and Android.
- UI must support English, Hindi, and at least 3 other languages (Phase 2: localization framework in Phase 1).

### 8.6 Compliance

- **GDPR** (EU): Right to access, right to erasure, data portability.
- **India DPDP Act 2023:** Data localization, consent management, grievance officer.
- **SOC 2 Type II** (target): Security, availability, confidentiality controls.
- **ISO 27001:** Information security management.
- All audit logs must be immutable and retained for a minimum of **7 years**.

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
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│              DATA LAYER                                  │
│  PostgreSQL (transactional) | Redis (cache/sessions)     │
│  Elasticsearch (search)     | S3-compatible (documents)  │
│  Data Warehouse (analytics) | Message Queue (Kafka)      │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│         EXTERNAL INTEGRATIONS                            │
│  ERP | IdP (SSO) | Payroll Banks | Job Boards | DocuSign │
└──────────────────────────────────────────────────────────┘
```

---

## 10. Data Model Overview

### Core Entities

```
Organization
  ├── has many → Departments
  ├── has many → Locations
  └── has many → Employees

Employee
  ├── has one  → EmploymentDetails (type, status, dates)
  ├── has one  → Compensation (salary structure, bank details)
  ├── has many → Attendances
  ├── has many → LeaveRequests
  ├── has many → PayslipRecords
  ├── has many → PerformanceReviews
  ├── has many → Documents
  └── belongs to → Department, Manager (Employee)

LeavePolicy
  ├── has many → LeaveTypes
  └── applied to → Employees (via Department / Location / Role)

PayrollCycle
  ├── has many → PayrollRecords (per Employee)
  └── generates → PayslipRecords

PerformanceCycle
  ├── has many → ReviewForms
  └── has many → PerformanceReviews (per Employee)

JobRequisition
  ├── has many → Candidates
  └── Candidate → has many → InterviewRounds → generates → Offer → Employee
```

---

## 11. User Flows

### 11.1 Employee Leave Application Flow

```
Employee → Apply for Leave (self-service portal)
  └── System validates leave balance
      ├── Insufficient balance → Error notification to employee
      └── Sufficient balance
          └── Leave request routed to Manager (L1)
              ├── Manager approves → HR notified → Balance deducted → Employee notified
              ├── Manager rejects → Employee notified with reason
              └── Manager inactive for 48 hrs → Auto-escalate to L2 (skip-level)
```

### 11.2 Monthly Payroll Processing Flow

```
HR initiates payroll run
  └── System locks employee records
      └── Compute gross pay (salary + allowances + one-time payments)
          └── Compute deductions (PF, ESI, TDS, LOP, loans)
              └── Generate payroll register
                  └── HR review & pre-payroll checklist
                      ├── Exceptions found → HR resolves → Re-compute
                      └── Approved
                          └── Trigger bank transfer file
                              └── Mark payroll as disbursed
                                  └── Generate & distribute payslips
                                      └── Post journal entries to ERP
```

### 11.3 Performance Review Cycle Flow

```
HR creates review cycle (dates, participants, forms)
  └── Employees receive self-assessment task
      └── Employee submits self-assessment
          └── Peer reviewers assigned & complete peer feedback
              └── Manager completes manager review
                  └── HRBP calibration session
                      └── Final ratings locked by HR
                          └── Rating & feedback shared with employee
                              └── Performance outcomes linked to compensation review
```

---

## 12. Security & Compliance

### 12.1 Role-Based Access Control (RBAC) Matrix

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

### 12.2 Audit Logging

- Every create, update, and delete operation on sensitive records (employee, payroll, compensation, leave) must generate an immutable audit log entry containing: timestamp (UTC), actor user ID, IP address, action type, entity type, entity ID, old value, and new value.
- Audit logs must be accessible to HR Admins and Super Admins with filter and export capability.
- Audit logs must be stored in a separate, append-only data store.

### 12.3 Data Privacy

- Personally Identifiable Information (PII) fields must be masked in logs and non-authorized views.
- Data subject access requests (DSAR) must be fulfillable within **72 hours** by HR Admins.
- Data deletion (right to erasure) must anonymize PII while retaining anonymized records for statutory purposes.

---

## 13. Assumptions & Constraints

### Assumptions

- The organization will designate an internal HRMS project owner who is empowered to make configuration decisions.
- Employee master data can be migrated from existing systems via Excel/CSV bulk upload.
- The organization will enforce SSO adoption for all employees within 90 days of go-live.
- Internet connectivity is available at all work locations; offline support is not required in Phase 1.
- Legal counsel will review and approve payroll calculation logic for each jurisdiction before go-live.

### Constraints

- Phase 1 payroll must support India only; multi-country expansion begins in Phase 2.
- Phase 1 mobile experience will be mobile-web only; native apps are a Phase 2 deliverable.
- All third-party integration credentials and costs are the responsibility of the organization.
- The system must be deployable on AWS, Azure, or GCP — a specific cloud preference must be defined in the infrastructure kickoff.

---

## 14. Open Questions

| # | Question | Owner | Target Date |
|---|---|---|---|
| 1 | What is the preferred cloud provider and region for data hosting? | IT Lead | Week 2 |
| 2 | Which countries must be supported in Phase 2 payroll? | CHRO | Week 3 |
| 3 | Is biometric device integration required in Phase 1 or Phase 2? | HR Manager | Week 2 |
| 4 | Should the system support a union-specific pay structure? | Legal + HR | Week 4 |
| 5 | What is the preferred e-signature vendor (DocuSign vs Adobe Sign)? | IT Lead | Week 3 |
| 6 | Are contractor/gig worker payroll requirements in scope? | CHRO | Week 4 |
| 7 | What ERP system requires integration for payroll journal entries? | Finance Lead | Week 2 |
| 8 | Is there a preference for an in-house chatbot vs. a third-party solution? | Product Owner | Week 5 |

---

## 15. Milestones & Phased Rollout

### Phase 1 — Foundation (Months 1–6)

| Milestone | Deliverable | Timeline |
|---|---|---|
| M1 | Employee records, org chart, RBAC, SSO | Month 2 |
| M2 | Attendance & leave management | Month 3 |
| M3 | India payroll (single entity) | Month 4 |
| M4 | Basic performance reviews | Month 5 |
| M5 | Employee self-service portal + core dashboards | Month 6 |
| M6 | UAT, security audit, go-live | Month 6 |

### Phase 2 — Growth (Months 7–12)

| Milestone | Deliverable | Timeline |
|---|---|---|
| M7 | Recruitment (ATS) + structured onboarding | Month 8 |
| M8 | LMS — course library and learning paths | Month 9 |
| M9 | Multi-country / multi-currency payroll | Month 10 |
| M10 | Native mobile apps (iOS + Android) | Month 11 |
| M11 | Advanced analytics & predictive attrition | Month 12 |

### Phase 3 — Intelligence (Months 13–18)

| Milestone | Deliverable | Timeline |
|---|---|---|
| M12 | Benefits administration | Month 14 |
| M13 | Workforce planning & headcount forecasting | Month 15 |
| M14 | AI talent intelligence (skills gaps, succession) | Month 18 |
| M15 | SOC 2 Type II certification | Month 18 |

---

## 16. Appendix

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

### B. Related Documents

- Technical Architecture Specification (TBD)
- Data Migration Plan (TBD)
- Security & Compliance Framework (TBD)
- Payroll Tax Calculation Logic Document (TBD)
- UI/UX Design System & Prototypes (TBD)
- QA Test Plan (TBD)
- Rollout & Change Management Plan (TBD)

### C. Revision History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 0.1 | Jan 2026 | Product Team | Initial draft |
| 0.5 | Feb 2026 | Product + HR | Stakeholder review, personas added |
| 0.9 | Mar 2026 | Product + Legal | Compliance section expanded |
| 1.0 | Mar 2026 | Product Owner | Approved for development |

---

*This document is confidential and intended for internal use only. For questions or contributions, contact the Product Management team.*
