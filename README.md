# Academic ERP Project

A comprehensive full-stack Academic Enterprise Resource Planning (ERP) application built with **Spring Boot** (Backend) and **React** (Frontend).

## 🚀 Quick Start Guide

Follow these steps to get the project running in minutes.

### 1. Database Setup
Open a terminal and log in to MySQL as root:
```bash
mysql -u root -p
```
Run the following commands inside the MySQL shell:
```sql
-- 1. Create User and Database
source setup_database.sql;

-- 2. Create Tables
source create.sql;

-- 3. Insert Dummy Data (Users, Courses, Specializations)
source insert.sql;

exit;
```

### 2. Start Backend
Open a **new terminal** and run:
```bash
cd backend
mvn spring-boot:run
```
*Server starts at: `http://localhost:8080`*

### 3. Start Frontend
Open a **new terminal** and run:
```bash
cd frontend
npm install --legacy-peer-deps  # Only required for first run
npm start
```
*App opens at: `http://localhost:3000`*

---

## 📋 Prerequisites

-   **Java JDK 17+**
-   **Maven**
-   **Node.js** (v16+) & **npm**
-   **MySQL Server**

## 🔑 Login Credentials

The `insert.sql` script creates these default users:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@academic.edu` | `Admin@1234` |
| **Employee** | `employee@academic.edu` | `Employee@1234` |
| **Student** | `student1@academic.edu` | `Student@1234` |
| **Faculty** | `faculty@academic.edu` | `Faculty@1234` |

*Note: You can also log in using **Google OAuth**.*

## ⚙️ Google OAuth Configuration (Optional)

To enable "Sign in with Google":

1.  **Google Cloud Console**: Create a project and OAuth 2.0 Client ID.
    -   Authorized Origin: `http://localhost:3000`
2.  **Backend**: Update `backend/src/main/resources/application.properties`:
    ```properties
    google.client.id=YOUR_CLIENT_ID
    ```
3.  **Frontend**: Update `frontend/src/components/containers/LoginContainer.tsx`:
    ```javascript
    client_id: 'YOUR_CLIENT_ID'
    ```

## 🛠️ Tech Stack

-   **Backend**: Spring Boot 3.1.4, Spring Security, JPA, MySQL
-   **Frontend**: React 18, TypeScript, Bootstrap 5

## 🔧 Troubleshooting

-   **Port Conflicts**:
    ```bash
    fuser -k 8080/tcp  # Kill backend port
    fuser -k 3000/tcp  # Kill frontend port
    ```
-   **Database Errors**: Ensure you ran `setup_database.sql` to create the `abhijeet` user with the correct permissions.
