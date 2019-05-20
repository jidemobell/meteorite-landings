import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FastLoader } from 'react-spinners';

// import Spinner from './components/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const smile = <FontAwesomeIcon icon ={faSmile} className="smile"/> 

// function Spinner(props) {
//     return (
//       <div className="sweet-loading" style={{ marginTop: "100px" }}>
//         <FastLoader
//           sizeUnit="px"
//           size={50}
//           color="#01C4A7"
//           loading={props.loading}
//         />
//       </div>
//     );
// }




function App() {
  const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
  const [meteors, setMeteors] = useState([]);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoading] =useState(false);

  async function getData(){
    try {
      const response = await fetch(url)
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("fetch error", error.message);
    }
  }

  // only fetch once and not at every update
  useEffect(() => {
      getData()
  }, []);  
  



  return (
    <div className="App">
      <header className="App-header">
         <nav>
           <p>Meteorite Explorer</p>
         </nav>
      </header>
      <section id="data-body">
      <form 
        className="search-wrapper"
        onSubmit={(e) => {
           e.preventDefault();
           setLoading(true);
           setTimeout(() => {
            if (inputValue === '') {
              setMeteors(data);
              setLoading(false);
            } else {
              let tempData = data.filter(item => {
                return item.name === inputValue
              })
              if(tempData.length !== 0){
               setMeteors(tempData);
               setLoading(false);
              }
              else{
                console.log("doesn't exist")
              }
            }
           }, 2000);
        }}
      >
        <input 
          placeholder="Enter search items" 
          type="search" 
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* <button>SEARCH</button> */}
        <input type="submit" value="SEARCH"/>
      </form>
      <section className="data-window">
        {
        loader ? 
        // <p style={{color: "white"}}>Texting</p>
        <FastLoader
          sizeUnit="px"
          size={50}
          color="#01C4A7"
          loading={loader}
        /> 
        :
          meteors.length !== 0 ? 
           (
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
                meteors.map(item => {
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
           )
          :
          (
            <div id="no-data-message">
              <p> {smile} 
                 <span>
                 Please search a meteor landing by name 
                 or simply click search to list all landings
                 </span>
              </p>
            </div>
          )
        }
      </section>
      </section>
      
    </div>
  );
}

export default App;
