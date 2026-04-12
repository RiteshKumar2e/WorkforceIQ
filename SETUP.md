# WorkforceIQ - Complete Setup Guide

## ✅ Quick Setup in 5 Steps

### Step 1: Install MongoDB

**Option A: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service
- Verify with: `mongo --version`

**Option B: MongoDB Atlas (Cloud)**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create free account
- Create cluster
- Get connection string

### Step 2: Frontend Installation

```bash
cd frontend
npm install
```

Create `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=WorkforceIQ
```

Start frontend:
```bash
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

### Step 3: Backend Installation

```bash
cd backend
npm install
```

Create `.env`:
```
MONGODB_URI=mongodb://localhost:27017/workforceiq
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

✅ Backend running at: **http://localhost:5000**

### Step 4: Seed Database

Open new terminal:
```bash
cd backend
npm run seed
```

✅ Database populated with sample data

### Step 5: Login & Test

Go to http://localhost:3000/login


---

## 🔧 Detailed Setup Instructions

### For Windows Users

#### 1. Install MongoDB

```powershell
# Using Chocolatey
choco install mongodb-community

# Or download from: https://www.mongodb.com/try/download/community
# Install with default options

# Verify installation
mongod --version
```

#### 2. Start MongoDB Service

```powershell
# If installed as service, it starts automatically
# If not, run:
mongod

# In another terminal, verify connection:
mongo
```

#### 3. Setup Frontend

```powershell
cd frontend
npm install
npm run dev
```

#### 4. Setup Backend

```powershell
cd backend
npm install
npm run dev
```

#### 5. Seed Data

```powershell
cd backend
npm run seed
```

### For Mac Users

#### 1. Install MongoDB

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start service
brew services start mongodb-community

# Verify
mongosh
```

#### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

#### 3. Setup Backend

```bash
cd backend
npm install
npm run dev
```

#### 4. Seed Data

```bash
cd backend
npm run seed
```

### For Linux Users

#### 1. Install MongoDB

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

#### 3. Setup Backend

```bash
cd backend
npm install
npm run dev
```

#### 4. Seed Data

```bash
cd backend
npm run seed
```

---

## 🐛 Troubleshooting

### Issue: "MongoDB connection error"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Update .env with correct connection string
MONGODB_URI=mongodb://localhost:27017/workforceiq
```

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Change port in vite.config.js
export default {
  server: {
    port: 3001
  }
}
```

### Issue: "npm packages not found"

**Solution:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error connecting frontend to backend"

**Solution:**
- Ensure backend is running on port 5000
- Check .env VITE_API_BASE_URL is http://localhost:5000
- Verify backend has CORS enabled (it should by default)

### Issue: "JWT token expired"

**Solution:**
```bash
# Clear browser localStorage and login again
# In browser console:
localStorage.clear()
```

---

## 📱 Using the Application

### Dashboard Features

After login, you'll see:

1. **Employee List** - View all employees
2. **Employee Profile** - Detailed employee information
3. **Team Builder** - Analyze team composition
4. **Promotion Readiness** - Track promotion pipeline
5. **Training Alerts** - View training needs
6. **Assessments** - Schedule assessments
7. **Reports** - Generate reports
8. **Settings** - User profile management

### Sample Data Included

After seeding, database has:
- 3 users (Shift Manager, Line Manager, HR Admin)
- 5 employees with competency scores
- 2 training flags
- Sample assess profiles

---

## 🔑 Environment Variables Reference

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=WorkforceIQ
```

### Backend (.env)
```
# Database
MONGODB_URI=mongodb://localhost:27017/workforceiq
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workforceiq

# JWT
JWT_SECRET=your_secret_key_here_use_strong_string

# Server
PORT=5000
NODE_ENV=development
```

---

## 🚀 API Testing with Postman

### 1. Register New User

```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "shift_manager"
}
```

### 2. Login

```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "user@example.com",
  "password": "your_password"
}
Response: { token, user }
```

### 3. Get Employees (Authenticated)

```
GET http://localhost:5000/api/employees
Header: Authorization: Bearer <token>
```

### 4. Create Employee

```
POST http://localhost:5000/api/employees
Header: Authorization: Bearer <token>
Body (JSON):
{
  "name": "New Employee",
  "email": "emp@example.com",
  "employeeId": "E006",
  "department": "Production",
  "designation": "Operator"
}
```

---

## 📊 Database Connection Strings

### Local MongoDB
```
mongodb://localhost:27017/workforceiq
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://user:password@cluster.mongodb.net/workforceiq?retryWrites=true&w=majority
```

### Connection Steps for Atlas:
1. Create account at mongodb.com/cloud/atlas
2. Create M0 (free) cluster
3. Add IP address (0.0.0.0/0 for development)
4. Create database user
5. Connect → Copy connection string
6. Replace username and password
7. Paste in .env MONGODB_URI

---

## ✨ Features Overview

### For Shift Manager
- View employees
- Search employees
- View profiles
- See training alerts
- View dashboard

### For Line Manager
- All Shift Manager features
- Schedule assessments
- Team analysis
- Generate team reports

### For HR Admin
- All permissions
- Bulk assessments upload
- Company-wide reports
- System analytics

---

## 🔄 Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start with auto-reload
npm start            # Start production
npm run seed         # Seed database
```

---

## 📝 Common Tasks

### Reset Database

```bash
# Delete database and reseed
cd backend
npm run seed
```

### Change Admin Password

```bash
# Edit seed/seedData.js password field
# Then run npm run seed again
```

### Clear Browser Cache

```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Check Backend Health

```bash
curl http://localhost:5000/api/health
```

---

## 🎯 Next Steps

1. ✅ Complete setup following steps above
2. ✅ Test login with demo credentials
3. ✅ Explore all pages and features
4. ✅ Try creating new employees
5. ✅ Schedule assessments
6. ✅ Review training flags
7. ✅ Customize for your needs

---

## 📞 Getting Help

If you encounter issues:

1. Check troubleshooting section above
2. Verify MongoDB is running
3. Check .env files are correct
4. Look at browser console for errors
5. Check backend terminal for error logs

---

**Happy coding! 🚀**
