import { useState } from 'react';
import './App.css';
// import { ReactComponent as Logo } from "./svg/main-logo.svg";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
      // Implement your search logic here using the searchQuery state.
      console.log("Search query:", searchQuery);
  };
  return (
      <main className="main">
          <section className="upper">
              <section className="sidebar">
                  <div className="logo">logo here</div>
                  <div className="option token-address">Token Address</div>
                  <div className="option pair-address">Pair Address</div>
              </section>
              <section className="content">
                  <div className="head">
                      <div className='search'>
                          <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <button onClick={handleSearch}>Search</button>
                      </div>
                      <div className='connect'>Connect</div>
                  </div>
                  Content
              </section>
          </section>
          <section className="lower">
              <footer className="footer">footer</footer>
          </section>
      </main>
  );
}

export default App;
