import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [Celsius, setCelsius] = useState(0);
  const [loader, setLoader] = useState(true);
  const [background, setBackground] = useState('');
 
  useEffect(() => {
    function success(pos){
        var crd = pos.coords
        setInterval(() => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b2d5551a787e0a0e9adee56a4d04b6b3`)
            .then(res => {
              setWeather(res.data);
              setCelsius((res.data.main.temp - 273.15).toFixed(2));
              setLoader(false);

              switch (res.data?.weather[0].icon) {
                case '01d': setBackground('https://media.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif');break;
                case '02d': setBackground('https://media.giphy.com/media/5HK4TiiBeLSZq/giphy.gif');break;
                case '03d': setBackground('https://media.giphy.com/media/mno6BJfy8USic/giphy.gif');break;
                case '04d': setBackground('https://media.giphy.com/media/ncCPUIh4esiVG/giphy.gif');break;
                case '09d': setBackground('https://media.giphy.com/media/7H0ZKUp3IV1tvEGYVf/giphy-downsized-large.gif');break;
                case '10d': setBackground('https://media.giphy.com/media/PbOaO2fedzQLm/giphy.gif');break;
                case '11d': setBackground('https://media.giphy.com/media/CIYF0RVOmd2qQ/giphy.gif');break;
                case '13d': setBackground('https://media.giphy.com/media/12wteMTXxjLaVO/giphy.gif');break;
                case '50d': setBackground('https://media.giphy.com/media/cJPDsufGbi9lC/giphy.gif');break;
                default: break;
              }
            });
        }, 2000);
    };
    function error(err) {console.warn(`ERROR(${err.code}): ${err.message}`)};
    navigator.geolocation.getCurrentPosition(success, error);

    
    
  }, []);

  return (
    <div className="App" style={{backgroundImage: `url(${background})`}}>
      {!loader?
        <div className="main">
        <h1>Weather App</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <div className="container">
          <div className="container__temp">
            <p><b>{isCelsius ? Celsius + ' °C' : (Celsius * 9 / 5) + 32 + ' °F'}</b></p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
          </div>
          <div className="container__data">
            <p><b>"{weather.weather?.[0].description}"</b></p>
            <p>Wind speed: <b>{weather.wind?.speed} m/s</b></p>
            <p>Clouds: <b>{weather.clouds?.all} %</b></p>
            <p>Pressure: <b>{weather.main?.pressure} hPa</b></p>
          </div>
        </div>
        <button onClick={() => setIsCelsius(!isCelsius)}>Degrees °F/°C</button>
      </div>
      : <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      }
    </div>
  );
}

export default App;
