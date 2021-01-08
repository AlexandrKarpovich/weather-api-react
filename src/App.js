// import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import Form from './components/Form';
import Info from "./components/Info";
import Weather from './components/Weather';


const API_KEY = "816b538b340dff0e3939f9a5da76f1df";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;

    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();
      console.log(data);

      let sunset = data.sys.sunset;
      let date = new Date();
          date.setTime(sunset);
      let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      let sunrise = data.sys.sunrise;
          date.setTime(sunrise);
      let sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_date,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите назваание города"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 info"><Info /></div>
                <div className="col-sm-7 form">
                  <Form weatherMethod={this.gettingWeather} />
                  <Weather 
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
