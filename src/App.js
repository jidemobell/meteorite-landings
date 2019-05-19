import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
  const [data, setData] = useState([]);

  async function getData(){
    try {
      const response = await fetch(url)
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("fetch error", error.message);
    }
  }

  useEffect(() => {
      getData();
  }, []);     // only fetch once and not at every update

  return (
    <div className="App">
      <header className="App-header">
         <nav>
           <p>Meteorite Explorer</p>
         </nav>
      </header>
      <section id="data-body">
      <div className="search-wrapper">
        <input placeholder="Enter search items" type="search" />
        <button>SEARCH</button>
      </div>
      <section className="data-window">
        <Table bordered striped className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>id</th>
              <th>Name Type</th>
              <th>Rec Class</th>
              <th>Mass (g)</th>
              <th>Fall</th>
              <th>Year</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {
              data !== undefined && data.map(item => {
                console.log(data);
                return (
                  <tr key={`meteor-${item.name}`}>
                  <td>{item.name !== undefined ? item.name : ''}</td>
                  <td>{item.id !== undefined ? item.id : ''}</td>
                  <td>{item.nameType !== undefined ? item.nameType : ''}</td>
                  <td>{item.recclass !== undefined ? item.recclass : '' }</td>
                  <td>{item.mass !== undefined ? item.mass : ''}</td>
                  <td>{item.fall !== undefined ? item.fall : ''}</td>
                  <td>{item.year !== undefined ? 
                   ( new Date(item.year)).getFullYear() : ''}</td>
                  <td>{item.geolocation !== undefined ? 
                    item.geolocation.latitude : ''}</td>
                  <td>{item.geolocation !== undefined ? 
                    item.geolocation.longitude : ''}</td>
                </tr>
                )
              })
            }
          </tbody>
        </Table>
      </section>
      </section>
      
    </div>
  );
}

export default App;
