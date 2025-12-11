import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
