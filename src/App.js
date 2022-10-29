import React, { useState, useEffect } from 'react';
import './App.css';

const api = {
  key: '321c531125e17deb15ecc3632bbd0d57',
  base: 'https://api.openweathermap.org/data/2.5/',
};

document.title = 'Weather';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErroMessage] = useState(false);
  const [weatherInfor, setWeatherInfor] = useState('');

  useEffect(() => {
    const dataWeather = async () => {
      if (!searchCity) return;
      setLoading(true);

      try {
        const response = await fetch(
          `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`,
        );
        console.log(
          `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`,
        );

        const data = await response.json();
        if (response.ok) {
          setWeatherInfor(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`,
          );
          setErroMessage('');
        } else {
          setErroMessage(data.message);
        }
      } catch (error) {
        setErroMessage(error.message);
      }
      setLoading(false);
    };
    dataWeather();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: 'red' }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfor}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
