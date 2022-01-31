import { useEffect, useState } from "react";
import axios from "axios";
import CountryFilter from "./CountryFilter";
import Nations from "./Nations";
function App() {
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    if (countries) {
      const results = countries.filter((countrie) =>
        countrie.name.common.includes(e.target.value)
      );
      setResults(results);
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <CountryFilter handleInputChange={handleInputChange} />
      <Nations results={results} />
    </>
  );
}

export default App;
