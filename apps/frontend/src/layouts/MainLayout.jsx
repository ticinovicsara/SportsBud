import { Header, Navbar } from '../components';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
