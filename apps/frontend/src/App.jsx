import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { Navbar } from './components/index.js';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
