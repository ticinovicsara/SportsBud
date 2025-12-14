import { SearchBar } from '../../components';
import { useState } from 'react';

function HomePage() {
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="home-page">
      <h1>HomePage</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
    </div>
  );
}

export default HomePage;
