# Admin Role Setup Guide - Google OAuth

This guide explains how to set up one of your Google OAuth email addresses as an admin user who can manage courses.

## Overview

- **Admin Users**: Can create, edit, and delete courses
- **Student Users**: Can only view courses
- **Default Role**: All new Google OAuth users are assigned "student" role

## Setup Steps

### Step 1: Configure Admin Email in Backend

Edit the `AuthService.java` file:

```bash
backend/src/main/java/com/example/academic/service/AuthService.java
```

Find this line:
```java
private static final String ADMIN_EMAIL = "abhijeet.rai3009@gmail.com";
```

Replace `abhijeet.rai3009@gmail.com` with your desired admin email address.

### Step 2: Update Existing Users in Database (If Needed)

If you already have users in the database, run the SQL script:

```bash
mysql -u abhijeet -p academic_db < update_admin_user.sql
```

Or manually in MySQL:

```sql
USE academic_db;

-- Set your email as admin
UPDATE users 
SET role = 'admin' 
WHERE email = 'your.email@gmail.com';

-- Set all other Google users as students
UPDATE users 
SET role = 'student' 
WHERE provider = 'google' AND (role IS NULL OR role = '');
```

### Step 3: Rebuild and Restart Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Step 4: Test the Setup

1. **Login with Admin Email**:
   - Open frontend at `http://localhost:3000`
   - Click "Sign in with Google"
   - Use the email you configured as admin
   - You should see "Add Course", "Edit", and "Delete" buttons

2. **Login with Regular Email**:
   - Logout from the admin account
   - Sign in with a different Google account
   - You should only see course listings without edit/delete options

## How It Works

### Backend Flow

1. User signs in with Google OAuth
2. `AuthService.googleLogin()` verifies the Google credential
3. If user doesn't exist, creates new user with role:
   - **Admin role** if email matches `ADMIN_EMAIL`
   - **Student role** otherwise
4. Returns `AuthResponseDTO` with token and role
5. Frontend stores role in localStorage

### Role-Based Access Control

The `CourseController` checks user role for:
- **POST** (Create): Requires admin role
- **PUT** (Update): Requires admin role
- **DELETE**: Requires admin role
- **GET** (List): Allowed for all authenticated users

If non-admin tries to perform admin action:
```json
{
  "error": "Only admins can create courses"
}
```

## Frontend Role Management

The frontend automatically:
- ✅ Shows "Add Course" button only for admins
- ✅ Shows "Edit" and "Delete" buttons only for admins
- ✅ Stores user role in `localStorage` as `authRole`
- ✅ Reads role from `AuthContext` for UI decisions

## Changing Admin After Setup

To change which email is admin:

1. **Update Backend Code**:
   ```java
   private static final String ADMIN_EMAIL = "new.admin@gmail.com";
   ```

2. **Update Database**:
   ```sql
   -- Remove old admin
   UPDATE users SET role = 'student' WHERE email = 'old.admin@gmail.com';
   
   -- Set new admin
   UPDATE users SET role = 'admin' WHERE email = 'new.admin@gmail.com';
   ```

3. **Restart Backend**:
   ```bash
   mvn spring-boot:run
   ```

## Troubleshooting

### Issue: Still seeing only student access after changes

**Solution**:
1. Clear browser localStorage:
   - Press F12 → Application → LocalStorage → Clear all
2. Logout and login again
3. Hard refresh page (Ctrl+Shift+R)

### Issue: All users showing as students

**Solution**:
1. Verify `ADMIN_EMAIL` in `AuthService.java`
2. Check database: `SELECT * FROM users;`
3. Verify role column has correct values
4. Restart backend service

### Issue: 403 Forbidden when trying to create course

**Solution**:
1. Check if your user role is "admin": `SELECT * FROM users WHERE email = 'your.email@gmail.com';`
2. Verify token is being sent: Open browser DevTools → Network → Check request headers
3. Ensure `X-Auth-Token` header is present in API requests

## API Endpoints

### Create Course (Admin Only)
```
POST /api/courses
Headers: X-Auth-Token: <your_token>
Body: { courseId, courseCode, name, description, year, term, faculty, credits, capacity }
Response: 201 Created or 403 Forbidden
```

### Update Course (Admin Only)
```
PUT /api/courses/{id}
Headers: X-Auth-Token: <your_token>
Body: { courseId, courseCode, name, description, year, term, faculty, credits, capacity }
Response: 200 OK or 403 Forbidden
```

### Delete Course (Admin Only)
```
DELETE /api/courses/{id}
Headers: X-Auth-Token: <your_token>
Response: 200 OK or 403 Forbidden
```

### List Courses (All Users)
```
GET /api/courses
Headers: X-Auth-Token: <your_token>
Response: 200 OK with course array
```

## Security Notes

- ⚠️ The current implementation uses in-memory token storage (not persistent across server restarts)
- ⚠️ For production, implement JWT tokens with proper expiration
- ⚠️ Never commit sensitive configuration like admin emails in production code
- ✅ All write operations (create/update/delete) are protected with role checks
