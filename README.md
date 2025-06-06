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


## 🔧 One-time setup

### 🍎 Connect GitHub

ONE TIME SETUP:

Confirm git is installed by opening Terminal on the Mac and running this (it should show "git version 2.x.x or higher"): 
git --version

Run this in terminal (replacing with your name):
git config --global user.name "Your Name"

Run this in terminal (replace with your GitHub email):
git config --global user.email "your.email@example.com"

Run this in terminal (replace with your GitHub email):
ssh-keygen -t ed25519 -C "your.email@example.com"

When prompted for file location, press Enter for default
When prompted for passphrase, you can press Enter for no passphrase

Run this in terminal
eval "$(ssh-agent -s)"

Run this in terminal
ssh-add ~/.ssh/id_ed25519

Run this in terminal to copy the key to your clipboard
pbcopy < ~/.ssh/id_ed25519.pub

Sign in to github.com
Click your profile picture → Settings
In the left sidebar, click SSH and GPG keys
Click "New SSH key"
Add a title (e.g., "My MacBook" or "Work Laptop")
Paste your key into the "Key" field (it should already be in your clipboard)
Click "Add SSH key"

Run this in terminal to test your connection
ssh -T git@github.com

You should see:
Hi YourUsername! You've successfully authenticated, but GitHub does not provide shell access.

Run this in terminal to navigate to where you want the project folder (e.g. Desktop):
cd ~/Desktop

Run this in terminal to clone the repository:
git clone git@github.com:GitHubGreg/copygrid.git

Run this in the terminal to navigate into the project
cd copygrid

Run this in terminal to create the environment file (since for safety it isn't part of the code we commit to GitHub)
echo "VITE_ENABLE_MSW=true" > frontend/.env.development

Run this to open this project in Cursor (include the period):
cursor .

If the above doesn't work, you can also just open Cursor and choose "Open Project" and choose that folder

You now have the CopyGrid repository on your local machine and are working on it in Cursor, an excellent AI code editor. You can close Terminal now because Cursor has an integrated one.


WORKING ON THE APP:

Once the above one-time setup is done, here is how you can work on the app day to day:

If not already done, open Cursor and choose the existing copygrid project

If you don't see Cursor's integrated terminal at the bottom of Cursor, click View > Terminal (or click the icon at the top right corner of Cursor which looks like a square with a bottom white rectangle)

Run this in Cursor's integrated terminal:
npm run dev

Your app is now running, open the URL http://localhost:5173 in your browser

If you don't see Cursor's integrated chat along the right, click View > Appearance > Secondary sidebar (or click the icon at the top right corner of Cursor which looks like a square with a right white rectangle)

In the chat, type something like "Make all the buttons red" and when it is done, go look at your app, the changes should be made. Back in cursor you can click "Accept all" at the bottom of the chat and these changes will be saved.




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
