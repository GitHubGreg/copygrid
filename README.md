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

## 🚀 Quick Start

### For New Users (Recommended)

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
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
