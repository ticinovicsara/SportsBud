import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  EventDetailsPage,
  CreateEventPage,
  NotFoundPage,
} from '../pages/index.js';
import { useUser } from '../context/UserContext.jsx';
//import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';

export default function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />

      <Route
        path="/"
        element={
          //<ProtectedRoute>
          <HomePage />
          //</ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          //<ProtectedRoute>
          <ProfilePage />
          //</ProtectedRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          //<ProtectedRoute>
          <CreateEventPage />
          //</ProtectedRoute>
        }
      />
      <Route
        path="/event/:id"
        element={
          //<ProtectedRoute>
          <EventDetailsPage />
          //</ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
