import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Monitors from './pages/Monitors/Monitors'
import AddMonitor from './pages/Monitors/AddMonitor'
import EditMonitor from './pages/Monitors/EditMonitor'
import Settings from './pages/Settings/Settings'
import Documentation from './pages/Documentation'
import Support from './pages/Support'
import { selectIsAuthenticated } from './features/authSlice'

function AppContent() {
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Show sidebar on protected routes when authenticated
  const protectedRoutes = ['/home', '/monitors', '/settings']
  const showSidebar = isAuthenticated && protectedRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + '/')
  )

  return (
    <div className="min-h-screen bg-white font-sans">
      {!showSidebar && <Navbar />}
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? 'ml-64' : ''}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/support" element={<Support />} />
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
