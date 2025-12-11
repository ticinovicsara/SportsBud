import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { Header } from './components';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
