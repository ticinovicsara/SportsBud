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
  EditMyEventsPage,
  EditEventPage,
} from '../pages/index.js';
import { ProtectedRoute } from '../components/index.js';
import { useUser } from '../context/UserContext.jsx';
import { MainLayout, AuthLayout } from '../layouts/index.js';

export default function AppRoutes() {
  const { user } = useUser();
  if (user) {
    console.log('User is logged in with ID:', user.id);
  } else {
    console.log('No user logged in yet');
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/edit-events" element={<EditMyEventsPage />} />
          <Route path="/edit-event/:id" element={<EditEventPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/events/:id/participants" element={<EventParticipantsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
