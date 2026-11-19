import { BrowserRouter, Route, Routes } from 'react-router'
import AuthProvider from './auth/AuthProvider.tsx'
import RequireAuth from './auth/RequireAuth.tsx'
import AppLayout from './layout/AppLayout.tsx'
import AuthPage from './pages/AuthPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import TasksPage from './pages/TasksPage.tsx'
import NewTaskPage from './pages/NewTaskPage.tsx'
import TaskDetailPage from './pages/TaskDetailPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="tasks/new" element={<NewTaskPage />} />
              <Route path="tasks/:id" element={<TaskDetailPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
