import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Landing from './pages/Landing'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import Pricing from './pages/Pricing/Pricing'
import Monitors from './pages/Monitors/Monitors'
import AddMonitor from './pages/Monitors/AddMonitor'
import EditMonitor from './pages/Monitors/EditMonitor'
import Settings from './pages/Settings/Settings'
import Feedback from './pages/Feedback/Feedback'
import Documentation from './pages/Documentation'
import Contact from './pages/Contact/Contact'
import MonitorStatus from './pages/MonitorStatus/MonitorStatus'
import { selectIsAuthenticated } from './features/authSlice'

function AppContent() {
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Show sidebar on protected routes when authenticated
  const protectedRoutes = ['/home', '/monitors', '/settings', '/feedback']
  const showSidebar = isAuthenticated && protectedRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + '/')
  )

  // Hide navbar on login/signup/pricing/documentation/contact pages and monitor status pages
  const authRoutes = ['/login', '/signup', '/pricing', '/documentation', '/contact']
  const hideNavbarRoutes = authRoutes.concat(['/verify-email', '/m'])
  const showNavbar = !showSidebar && !hideNavbarRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + '/')
  )

  return (
    <div className="min-h-screen bg-white font-sans">
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? 'ml-64' : ''}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/m/:monitorId" element={<MonitorStatus />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors"
            element={
              <ProtectedRoute>
                <Monitors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors/add"
            element={
              <ProtectedRoute>
                <AddMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors/edit/:id"
            element={
              <ProtectedRoute>
                <EditMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
