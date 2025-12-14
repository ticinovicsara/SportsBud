import './notFoundPage.css';
import notFound from './not-found.jpg';

function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Page not found</p>
      <img src={notFound} alt="Not Found" />
    </div>
  );
}

export default NotFound;
