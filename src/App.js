import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';

function App() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [loader, setLoader] = useState(true);
  const [background, setBackground] = useState('');

  const [locationName, setLocationName] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=b2d5551a787e0a0e9adee56a4d04b6b3`;

  const { data } = useFetch();

  const chooseBackground = icon => {
    let gifReturned = '';
    switch (icon) {
      case '01d':
        gifReturned =
          'https://media.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif';
        break;
      case '01n':
        gifReturned = 'https://i.gifer.com/VTNI.gif';
        break;
      case '02d':
        gifReturned = 'https://media.giphy.com/media/5HK4TiiBeLSZq/giphy.gif';
        break;
      case '03d':
      case '03n':
        gifReturned = 'https://media.giphy.com/media/mno6BJfy8USic/giphy.gif';
        break;
      case '04d':
      case '02n':
      case '04n':
        gifReturned = 'https://media.giphy.com/media/ncCPUIh4esiVG/giphy.gif';
        break;
      case '09d':
      case '09n':
      case '10n':
        gifReturned =
          'https://media.giphy.com/media/7H0ZKUp3IV1tvEGYVf/giphy-downsized-lrge.gif';
        break;
      case '10d':
        gifReturned = 'https://media.giphy.com/media/PbOaO2fedzQLm/giphy.gif';
        break;
      case '11d':
      case '11n':
        gifReturned = 'https://media.giphy.com/media/CIYF0RVOmd2qQ/giphy.gif';
        break;
      case '13d':
      case '13n':
        gifReturned = 'https://media.giphy.com/media/12wteMTXxjLaVO/giphy.gif';
        break;
      case '50d':
      case '50n':
        gifReturned = 'https://media.giphy.com/media/cJPDsufGbi9lC/giphy.gif';
        break;
      default:
        gifReturned = 'https://i.gifer.com/CTa.gif';
    }
    return gifReturned;
  };

  useEffect(() => {
    if (data) {
      setLoader(false);
      setWeather(data);
      setBackground(chooseBackground(data.weather?.[0].icon));
    }
  }, [data]);

  const searchLocation = () => {
    axios.get(url)
      .then(res => {
        setWeather(res.data);
        setBackground(chooseBackground(res.data.weather?.[0].icon));
        /* console.log(res.data.weather?.[0].icon); */
      })
      .catch(error => alert(error.response.data.message));
    setLocationName('');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      {!loader ? (
        <>
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="Type a location"
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
            />
            <button
              type="button"
              className="search-button"
              onClick={searchLocation}
            >
              Search
            </button>
          </form>
          <div className="main">
            <h1>Weather App</h1>
            <h2>
              {weather.name}, {weather.sys?.country}
            </h2>
            <div className="container">
              <div className="container__temp">
                <p>
                  <b>
                    {isCelsius
                      ? (weather.main?.temp - 273.15).toFixed(2) + ' °C'
                      : (((weather.main?.temp - 273.15) * 9) / 5 + 32).toFixed(2) + ' °F'}
                  </b>
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <div className="container__data">
                <p>
                  <b>"{weather.weather?.[0].description}"</b>
                </p>
                <p>
                  Wind speed: <b>{weather.wind?.speed} m/s</b>
                </p>
                <p>
                  Clouds: <b>{weather.clouds?.all} %</b>
                </p>
                <p>
                  Pressure: <b>{weather.main?.pressure} hPa</b>
                </p>
              </div>
            </div>
            <button
              className="degrees-button"
              onClick={() => setIsCelsius(!isCelsius)}
            >
              Degrees °F/°C
            </button>
          </div>
        </>
      ) : (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default App;
