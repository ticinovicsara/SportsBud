import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  EventDetailsPage,
  CreateEventPage,
  NotFoundPage,
  EventsPage,
  SearchResultsPage,
  EventParticipantsPage,
} from '../pages/index.js';
import { useUser } from '../context/UserContext.jsx';
import { MainLayout, AuthLayout } from '../layouts/index.js';
//import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';

export default function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      </Route>

      {/* add for later <ProtectedRoute> <MainLayout /> </ProtectedRoute>{' '}*/}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/events/:id/participants" element={<EventParticipantsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
