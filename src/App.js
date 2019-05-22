import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faSadTear } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const smile = <FontAwesomeIcon icon ={faSmile} className="smile"/> 
const sad = <FontAwesomeIcon icon ={faSadTear} className="smile"/> 




function App() {
  const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
  const [meteors, setMeteors] = useState([]);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoading] =useState(false);
  const [submitted, setSubmitted] = useState(false);

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
           setSubmitted(true)
           setTimeout(() => {
            if (inputValue === '') {
              setMeteors(data);
              setLoading(false);
            } else {
              let tempData = data.filter(item => {
                let val = inputValue.slice(0,1).toUpperCase() + inputValue.slice(1)
                return item.name === val
              })
              if(tempData.length !== 0){
               setMeteors(tempData);
               setLoading(false);
              }
              else{
                console.log("doesn't exist")
                setMeteors([]);
                setLoading(false);
              }
            }
           }, 3000);
        }}
      >
        <input 
          placeholder="Enter search items" 
          type="search" 
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* <button>SEARCH</button> */}
        <input type="submit" value="SEARCH" className="enter" />
      </form>
      <section className="data-window">
        {
        loader ? 
        <div id="spinner">
           <Loader 
            type="ThreeDots"
            color="white"
            height="100"	
            width="100"
         />
        </div>
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
          inputValue === '' || submitted === false ?
          (
            <div id="no-data-message" className="message-one">
              <p> 
                {smile} 
                 <span className="initial">
                 Please search a meteor landing by name 
                 or simply click search to list all landings
                 </span>
              </p>
            </div>
          ) :
          (
            <div id="no-data-message" className="message-two">
              <p> 
                {sad} 
                 <span className="flashed">
                 Please confirm your meteor query
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

