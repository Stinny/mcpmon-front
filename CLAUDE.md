# Frontend - MCP Server Uptime Monitor

## App Overview

### Description
Frontend application for a web-based monitoring tool for remote MCP (Model Context Protocol) servers. Similar to UptimeRobot, this application allows users to monitor the health and availability of their MCP servers with real-time status updates and alerts. The app focuses on ease of use with a minimal, clean UI design.

### Key Features
- Dashboard for monitoring MCP server status
- Real-time health checks and uptime monitoring
- Alert configuration and notification management
- Server management interface (add, edit, delete monitors)
- User authentication and authorization
- Minimal, user-friendly design
- Documentation and support pages

## Architecture

**Frontend Stack:**
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Feather
- **Build Tool**: Vite

## Development Setup

```bash
# Installation
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Sidebar.jsx          # Navigation sidebar
├── pages/
│   ├── Landing/             # Home page
│   ├── Scan/                # Scan configuration form
│   ├── Report/              # Report viewing page
│   ├── Documentation/       # API and usage docs
│   ├── About/               # About page
│   └── Support/             # Support page
├── assets/                  # Static assets
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css               # Global styles
```

## Key Pages

- **Landing** (`/`) - Main landing page and app introduction
- **Home** (`/home`) - Protected dashboard showing monitored servers and their status
- **Login** (`/login`) - User login page
- **Signup** (`/signup`) - User registration page
- **Documentation** (`/documentation`) - API documentation and usage guides
- **Support** (`/support`) - Help and support resources

## Design Principles

- **Minimal UI**: Clean, distraction-free interface
- **Ease of Use**: Simple form-based workflow
- **Responsive Design**: Works on all device sizes
- **Fast Loading**: Optimized with Vite build system

## Deployment

Frontend will be deployed to Netlify with automatic builds from the main branch.

## Environment Variables

Frontend environment variables (if any) should be prefixed with `VITE_` for Vite compatibility.

---

# Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.