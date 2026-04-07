# 🏨 HostelCare - Smart Hostel Issue Reporting System

## 📌 Project Description
HostelCare is a smart hostel complaint management system that allows students to report hostel issues such as electricity problems, water leakage, WiFi issues, furniture damage, and cleaning issues.

The system automatically assigns maintenance staff based on their skills and tracks complaint status until it is resolved.

---

## 🚀 Features

### 👨‍🎓 Student Dashboard
- Submit hostel complaints
- Select block and room number
- Choose issue type
- Set complaint priority
- Track complaint status
- View complaint history
- Give hostel feedback
- Emergency helpdesk contacts

### 👨‍💼 Admin Dashboard
- View all complaints
- Update complaint status
- Delete complaints
- View complaint statistics
- Manage maintenance staff
- Automatic staff allocation
- Staff availability tracking

---

## ⚙️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## 🧠 DAA Concepts Used

- **Priority Queue** → Complaints are handled based on priority level
- **Searching Algorithm** → Staff is selected based on skill
- **Sorting** → Complaints sorted by priority
- **Dynamic Allocation** → Staff automatically assigned to complaints

---

## 🗄 Database Tables

### Complaints Table
| Field | Description |
|------|-------------|
| id | Complaint ID |
| student | Student Name |
| block | Hostel Block |
| room | Room Number |
| issue | Complaint Type |
| priority | Priority Level |
| status | Complaint Status |
| staff | Assigned Staff |

### Staff Table
| Field | Description |
|------|-------------|
| id | Staff ID |
| name | Staff Name |
| skill | Staff Skill |
| status | Available / Busy |

---

## 📷 Screenshots

### Student Dashboard
Submit complaints and track status.
<img width="1894" height="912" alt="Image" src="https://github.com/user-attachments/assets/ef3e71be-2987-4cfc-85e2-33f361040227" />

### Admin Dashboard
Manage complaints and assign staff.
<img width="1915" height="905" alt="Image" src="https://github.com/user-attachments/assets/11590caa-c1af-4730-b31f-165210b7b78f" />

---

## ▶️ How to Run the Project

### 1️⃣ Start MySQL (XAMPP)

Start MySQL from XAMPP Control Panel.

### 2️⃣ Create Database

Run in phpMyAdmin:

```sql
CREATE DATABASE hostelcare;
