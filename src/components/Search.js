import {useState} from 'react';
import Results from "./Results";

function Search() {
  const [currencies, setCurrencies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  function getCurrencies() {
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.Currencies);
        setCurrencies(response.Currencies);
      })
      .catch(err => {
        console.log(err);
      })
  }

   function getLocations() {
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(output => {
        console.log(output.Countries);
        setLocations(output.Countries);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function searchForFlights() {
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/%7Bcurrency%7D/en-US/%7Boriginplace%7D/%7Bdestinationplace%7D/%7Boutboundpartialdate%7D?inboundpartialdate=2019-12-01", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        setResults(response);
        setShowResults(true);
        setQuery("");
      })
      .catch(err => {
        console.log(err);
      })
  }

  getCurrencies();
  getLocations();

  return (
    <div className="search">
      <form onSubmit={searchForFlights}>
        <label htmlFor="currency">Currency: </label>
        <select id="currency">
          {currencies.map(
            currency => <option key={currency.Code}>{currency.Code}</option>
          )}
        </select>
        <label htmlFor="locationInput">Location: </label>
        <input list="locations" id="locationInput"/>
        <datalist id="locations">
          {locations.map(
            location => <option key={location.Code}>{location.Name}</option>
          )}
        </datalist>
        <button>Search</button>
      </form>
      { showResults ? <Results/> : <></>}
    </div>
  );
}

export default Search;