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

### Option 1: Frontend Only (with MSW)
Perfect for UI development and stakeholder demos:

```bash
# Install dependencies
npm install

# Create environment file
echo "VITE_ENABLE_MSW=true" > frontend/.env.development

# Start frontend with mocked APIs
npm run dev
```

### Option 2: Full-Stack Development
When you're ready to develop with real backend APIs:

```bash
# Install dependencies
npm install

# Create environment files
echo "VITE_ENABLE_MSW=false" > frontend/.env.development
echo "PORT=3001\nFRONTEND_URL=http://localhost:5173" > backend/.env

# Start both frontend and backend
npm run dev:both
```

Visit:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health

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
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   └── package.json               # Frontend dependencies
├── backend/                    # Node.js API server
│   ├── src/
│   │   ├── routes/
│   │   │   └── users.ts           # User API routes
│   │   └── index.ts               # Express server setup
│   ├── tsconfig.json              # Backend TypeScript config
│   └── package.json               # Backend dependencies
├── package.json                # Root workspace configuration
└── README.md                   # This file
```

## 🎯 Development Modes

### 1. MSW Mode (Default)
- ✅ Fast UI development
- ✅ Works offline
- ✅ Perfect for stakeholder demos
- ✅ No backend required
- 🎯 Set `VITE_ENABLE_MSW=true`

### 2. Full-Stack Mode
- ✅ Real API integration
- ✅ Database connectivity ready
- ✅ Production-like environment
- ✅ End-to-end testing
- 🎯 Set `VITE_ENABLE_MSW=false`

## 📜 Available Scripts

### Root Commands
```bash
npm run dev              # Frontend only (MSW mode)
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only  
npm run dev:both         # Both frontend and backend

npm run build            # Build frontend
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend
npm run build:both       # Build both

npm run start:frontend   # Start frontend production server
npm run start:backend    # Start backend production server

npm run lint             # Lint both frontend and backend
npm run clean            # Clean all node_modules and dist folders
```

### Frontend Commands
```bash
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Backend Commands
```bash
cd backend
npm run dev              # Start with hot reload
npm run build            # Compile TypeScript
npm run start            # Start compiled server
npm run lint             # Run ESLint
```

## 🔌 API Endpoints

### Frontend Calls (Same in Both Modes)
Your frontend makes the same API calls regardless of MSW mode:

```typescript
// This works in both MSW and real backend modes
const response = await fetch('/api/users')
const users = await response.json()
```

### MSW Handlers (frontend/src/mocks/handlers.ts)
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user

### Real Backend Routes (backend/src/routes/users.ts)
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🚀 Deployment

### Frontend Only (MSW Mode)
Deploy to any static hosting (Vercel, Netlify, Cloudflare Pages):

```bash
cd frontend
npm run build
# Deploy the 'dist' folder
# Set VITE_ENABLE_MSW=true in hosting dashboard
```

### Full-Stack Application
1. **Backend**: Deploy to Railway, Render, Heroku, etc.
2. **Frontend**: Deploy to static hosting with `VITE_ENABLE_MSW=false`

## 🔄 Migration Path

### Phase 1: UI Development (MSW)
```bash
npm run dev  # Frontend with mocked APIs
```

### Phase 2: Backend Development
```bash
npm run dev:both  # Frontend + Backend
```

### Phase 3: Production
- Deploy backend → Get API URL
- Update frontend environment → `VITE_ENABLE_MSW=false`
- Deploy frontend

## 🛠️ Environment Configuration

### Frontend (.env files)
```env
# frontend/.env.development
VITE_ENABLE_MSW=true        # Use mocked APIs

# frontend/.env.production  
VITE_ENABLE_MSW=false       # Use real backend
VITE_API_URL=https://your-api.com  # Backend URL (optional)
```

### Backend (.env file)
```env
# backend/.env
PORT=3001
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://...  # When ready
```

## 🤝 Team Workflow

### For UI/Frontend Developers
```bash
npm run dev  # MSW mode - no backend needed
```

### For Backend Developers
```bash
npm run dev:backend  # Backend only
```

### For Full-Stack Development
```bash
npm run dev:both  # Both frontend and backend
```

### For Stakeholder Demos
Deploy frontend with `VITE_ENABLE_MSW=true` - fully functional without backend!

## 🧪 Adding New Features

### 1. Add API Endpoint
1. **MSW Handler** (for immediate frontend development):
   ```typescript
   // frontend/src/mocks/handlers.ts
   http.get('/api/new-feature', () => HttpResponse.json({ data: 'mock' }))
   ```

2. **Real Backend Route** (when ready):
   ```typescript
   // backend/src/routes/newFeature.ts
   router.get('/', (req, res) => res.json({ data: 'real' }))
   ```

### 2. Frontend Implementation
Your frontend code stays the same regardless of MSW vs real backend!

## 📚 Technologies

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router, MSW
- **Backend**: Node.js, Express, TypeScript
- **Tools**: ESLint, PostCSS, npm workspaces
- **Deployment**: Static hosting + API hosting

## 🎉 Next Steps

1. **Start developing**: `npm run dev`
2. **Add your features** in MSW mode
3. **Build real backend** when ready
4. **Switch modes** with one environment variable
5. **Deploy** independently

---

**Happy coding!** 🚀 The beauty of this setup is that your frontend code never changes - just flip the MSW switch when your backend is ready.
