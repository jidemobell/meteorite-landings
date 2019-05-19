import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <nav>
           <p>Meteorite Explorer</p>
         </nav>
      </header>
      <div className="search-wrapper">
        <input placeholder="Enter search items" />
        <button>SEARCH</button>
      </div>
      <section className="data-window">

      </section>
    </div>
  );
}

export default App;
