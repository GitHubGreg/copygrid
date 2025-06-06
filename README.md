# CopyGrid

A modern full-stack application built as a monorepo with React frontend and Node.js backend. Features Mock Service Worker (MSW) for seamless development and deployment workflow.

## 🏗️ Architecture

This is a **monorepo** containing:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + React Router + MSW
- **Backend**: Node.js + Express + TypeScript (ready for when you need real APIs)

## ✨ Features

- 🚀 **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🎭 **MSW (Mock Service Worker)** - API mocking for development and production
- 🚄 **Express.js** - Backend API server (ready to use)
- 📦 **Monorepo** - Organized workspace structure
- 🔧 **Modern tooling** - ESLint, TypeScript, PostCSS

## 🔧 Prerequisites: Git Setup

### 📋 What You'll Need
- A GitHub account (and access to this repository)
- Terminal/Command Prompt access
- About 10-15 minutes

### 🍎 For Mac Users

#### 1. Install Git
Git comes pre-installed on most modern Macs, but let's ensure you have the latest version:

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git
```

**Option B: Download from Git website**
1. Visit [git-scm.com/download/mac](https://git-scm.com/download/mac)
2. Download and install the latest version

**Verify installation:**
```bash
git --version
# Should show: git version 2.x.x or higher
```

#### 2. Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. Generate SSH Key
```bash
# Generate a new SSH key (replace with your GitHub email)
ssh-keygen -t ed25519 -C "your.email@example.com"

# When prompted for file location, press Enter for default
# When prompted for passphrase, you can press Enter for no passphrase or create one

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your SSH key to the agent
ssh-add ~/.ssh/id_ed25519

# Copy your public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

### 🪟 For Windows Users

#### 1. Install Git
**Option A: Git for Windows (Recommended)**
1. Visit [git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. During installation, choose these settings:
   - ✅ Use Git from the command line and also from 3rd-party software
   - ✅ Use bundled OpenSSH
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use Windows' default console window

**Option B: GitHub Desktop + Git**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. This automatically installs Git command line tools

**Verify installation:**
```bash
git --version
# Should show: git version 2.x.x or higher
```

#### 2. Configure Git
Open **Git Bash** (or Command Prompt/PowerShell) and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. Generate SSH Key
In **Git Bash**:
```bash
# Generate a new SSH key (replace with your GitHub email)
ssh-keygen -t ed25519 -C "your.email@example.com"

# When prompted for file location, press Enter for default
# When prompted for passphrase, you can press Enter for no passphrase or create one

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your SSH key to the agent
ssh-add ~/.ssh/id_ed25519

# Copy your public key to clipboard
clip < ~/.ssh/id_ed25519.pub
```

### 🔑 Add SSH Key to GitHub

1. **Open GitHub** in your browser and sign in
2. **Click your profile picture** → **Settings**
3. **In the left sidebar**, click **SSH and GPG keys**
4. **Click "New SSH key"**
5. **Add a title** (e.g., "My MacBook" or "Work Laptop")
6. **Paste your key** into the "Key" field (it should already be in your clipboard)
7. **Click "Add SSH key"**

### 🧪 Test SSH Connection
```bash
ssh -T git@github.com
```

You should see:
```
Hi YourUsername! You've successfully authenticated, but GitHub does not provide shell access.
```

### 📥 Clone the Repository

Now you can clone the CopyGrid repository:

```bash
# Navigate to where you want the project folder
cd ~/Desktop  # or wherever you keep your projects

# Clone the repository
git clone git@github.com:your-username/copygrid.git

# Navigate into the project
cd copygrid
```

**🎉 Success!** You now have the CopyGrid repository on your local machine.

### 🆘 Troubleshooting Git Setup

**"Permission denied (publickey)" error:**
- Make sure you copied the **public** key (`id_ed25519.pub`, not `id_ed25519`)
- Verify the key was added to GitHub correctly
- Try: `ssh-add -l` to see if your key is loaded

**Git command not found:**
- **Mac**: Restart Terminal after installation
- **Windows**: Make sure you're using Git Bash or that Git is in your PATH

**Can't find .ssh folder:**
- **Mac**: `ls -la ~/.ssh`
- **Windows**: `ls -la ~/.ssh` (in Git Bash)
- If it doesn't exist, the `ssh-keygen` command will create it

---

## 🚀 Quick Start

### For New Users (Recommended)

1. **Clone and install:**
   ```bash
   git clone git@github.com:your-username/copygrid.git
   cd copygrid
   npm install
   ```

2. **Create environment file:**
   ```bash
   echo "VITE_ENABLE_MSW=true" > frontend/.env.development
   ```

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:5173
   - Try the user management features!

That's it! The app runs completely in the browser with mocked APIs.

### For Full-Stack Development

When you're ready to work with the real backend:

1. **Create backend environment:**
   ```bash
   echo "PORT=3001
   FRONTEND_URL=http://localhost:5173" > backend/.env
   ```

2. **Update frontend environment:**
   ```bash
   echo "VITE_ENABLE_MSW=false" > frontend/.env.development
   ```

3. **Start both frontend and backend:**
   ```bash
   npm run dev:both
   ```

4. **Access the app:**
   - Frontend: http://localhost:5173 (now using real APIs)
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/health

## 📁 Project Structure

```
copygrid/
├── frontend/                   # React application
│   ├── public/
│   │   └── mockServiceWorker.js    # MSW service worker
│   ├── src/
│   │   ├── mocks/
│   │   │   ├── handlers.ts         # API mock handlers
│   │   │   └── browser.ts          # MSW browser setup
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx               # App entry point with MSW
│   │   └── index.css              # Tailwind directives
│   ├── .env.development           # Frontend environment config
│   └── package.json               # Frontend dependencies
├── backend/                    # Node.js API server
│   ├── src/
│   │   ├── routes/
│   │   │   └── users.ts           # User API routes
│   │   └── index.ts               # Express server setup
│   ├── .env                       # Backend environment config
│   └── package.json               # Backend dependencies
├── package.json                # Root workspace configuration
└── README.md                   # This file
```

## 🎯 Development Modes

### 1. MSW Mode (Default - Perfect for UI Development)
- ✅ **No backend needed** - APIs are mocked in the browser
- ✅ **Fast development** - Instant API responses
- ✅ **Works offline** - No network dependencies
- ✅ **Perfect for demos** - Stakeholders see full functionality
- 🎯 **Environment**: `VITE_ENABLE_MSW=true`

### 2. Full-Stack Mode (Real APIs)
- ✅ **Real API integration** - Connect to actual backend
- ✅ **Database ready** - Add PostgreSQL, MongoDB, etc.
- ✅ **Production-like** - Test real network calls
- ✅ **E2E testing** - Full application testing
- 🎯 **Environment**: `VITE_ENABLE_MSW=false`

## 💾 Data Persistence Options

The app offers **three different data persistence behaviors** depending on your needs:

### 1. **Browser Persistence** (Current Default)
- ✅ **Data persists across page refreshes** using localStorage
- ✅ **Great for development** - keep your test data while coding
- ✅ **Perfect for extended demos** - data stays during presentation
- 🔄 **Reset data**: Clear browser storage or run in console:
  ```javascript
  localStorage.removeItem('mockUsers')
  ```

### 2. **Session-Only Persistence** (Original Behavior)
- 🔄 **Data resets on every page refresh**
- ✅ **Always clean state** - perfect for predictable demos
- ✅ **No cleanup needed** - automatically fresh every time
- 🔧 **To enable**: Remove localStorage code from `frontend/src/mocks/handlers.ts`

### 3. **Real Database Persistence** (Full-Stack Mode)
- ✅ **True persistence** - data survives server restarts
- ✅ **Multi-user support** - shared data across sessions
- ✅ **Production ready** - real database integration
- 🎯 **To enable**: Set `VITE_ENABLE_MSW=false` and run `npm run dev:both`

### 🎛️ **Choosing Your Mode**

**For stakeholder demos**: Use session-only (always clean)
**For development work**: Use browser persistence (keeps test data)
**For production**: Use real database persistence

**Pro tip**: You can easily switch between modes by modifying the handlers or environment variables!

## 📜 Available Commands

### Root Commands (Recommended)
```bash
# Frontend only (MSW mode) - No backend needed
npm run dev              

# Both frontend and backend together
npm run dev:both         

# Build everything for production
npm run build:both       

# Individual builds
npm run build:frontend   
npm run build:backend    

# Production servers
npm run start:frontend   
npm run start:backend    

# Lint everything
npm run lint             

# Clean up
npm run clean            
```

### Workspace Commands (Advanced)
```bash
# Frontend only
cd frontend && npm run dev

# Backend only  
cd backend && npm run dev
```

## 🔌 API Endpoints

Your frontend makes the same API calls regardless of MSW vs real backend:

```typescript
// This code works in both modes!
const response = await fetch('/api/users')
const users = await response.json()

await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New User' })
})
```

### Available Endpoints
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID (backend only)
- `PUT /api/users/:id` - Update user (backend only)
- `DELETE /api/users/:id` - Delete user (backend only)

## 🚀 Deployment

### Option 1: Frontend Only (Recommended First Step)

**Vercel** (automatically configured):
```bash
vercel --prod
```

**Other static hosts** (Netlify, Cloudflare Pages):
1. Build: `npm run build:frontend`
2. Deploy: `frontend/dist` folder
3. Environment: `VITE_ENABLE_MSW=true`

### Option 2: Full-Stack Application

1. **Deploy Backend:**
   - Railway: `railway up` (from backend directory)
   - Render: Connect GitHub repo, set build path to `backend`
   - Heroku: `heroku create` and deploy

2. **Deploy Frontend:**
   - Set `VITE_ENABLE_MSW=false`
   - Set `VITE_API_URL=https://your-backend-url.com`
   - Deploy to Vercel/Netlify

## 🛠️ Environment Configuration

### Frontend Environment Files

**Development** (`frontend/.env.development`):
```env
VITE_ENABLE_MSW=true        # Use mocked APIs
```

**Production** (`frontend/.env.production`):
```env
VITE_ENABLE_MSW=false       # Use real backend
VITE_API_URL=https://your-backend-url.com  # Optional: custom backend URL
```

### Backend Environment File

**All environments** (`backend/.env`):
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Add when ready:
# DATABASE_URL=postgresql://user:pass@host:5432/db
# JWT_SECRET=your-secret-key
```

## 🤝 Team Workflow

### UI/UX Designers & Frontend Developers
```bash
npm run dev  # MSW mode - fully functional, no backend needed
```

### Backend Developers
```bash
npm run dev:backend  # API server only
```

### Full-Stack Teams
```bash
npm run dev:both  # Everything running together
```

### Stakeholder Demos
Deploy frontend with `VITE_ENABLE_MSW=true` - fully functional without backend costs!

## 🔄 Migration Path (The Beauty of This Setup)

### Phase 1: UI Development 📱
```bash
npm run dev
# Frontend with mocked APIs - fast iteration
```

### Phase 2: Backend Development 🚄
```bash
npm run dev:both
# Add real database, authentication, etc.
```

### Phase 3: Production 🚀
```bash
# Just flip environment variables!
# Frontend code never changes
```

## 🧪 Adding New Features

### 1. Start with MSW (Immediate Frontend Development)
```typescript
// frontend/src/mocks/handlers.ts
export const handlers = [
  // Add your new endpoint
  http.get('/api/new-feature', () => {
    return HttpResponse.json({ data: 'mock response' })
  }),
  // ... existing handlers
]
```

### 2. Build UI Components
Your frontend code works immediately with the mock API.

### 3. Implement Real Backend (When Ready)
```typescript
// backend/src/routes/newFeature.ts
router.get('/', (req, res) => {
  res.json({ data: 'real response' })
})
```

### 4. Switch Environments
Change `VITE_ENABLE_MSW=false` - your frontend code doesn't change!

## 🆘 Troubleshooting

### "Command not found" errors
```bash
# Make sure you're in the root directory
pwd  # should show .../copygrid

# Reinstall dependencies
npm install
```

### Port already in use
```bash
# Kill processes on ports 5173 or 3001
lsof -ti:5173 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### MSW not working
1. Check that `frontend/.env.development` contains `VITE_ENABLE_MSW=true`
2. Restart the dev server: `npm run dev`
3. Check browser console for MSW messages

### Build fails
```bash
# Clean and reinstall
npm run clean
npm install
npm run build:both
```

## 📚 Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Router, MSW
- **Backend**: Node.js, Express, TypeScript, CORS, Helmet
- **Tools**: ESLint, PostCSS, npm workspaces
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## 🎉 What Makes This Special

1. **Zero Backend Required** for frontend development
2. **Seamless API Transition** - same code, real or mocked APIs
3. **Stakeholder Friendly** - deploy demos without backend costs
4. **Team Parallel Development** - frontend and backend teams work independently
5. **Production Ready** - just flip environment variables

---

**Ready to start?** Run `npm run dev` and open http://localhost:5173

**Questions?** Check the troubleshooting section above or open an issue.

**Happy coding!** 🚀
