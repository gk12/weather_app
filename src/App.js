import winnter from "./assets/cold.jpg";
import summer from "./assets/hot.jpg";
import Description from "./component/description";
import { useEffect, useState } from "react";
import { getweather_data } from "./weather_data";
function App() {

  const [city, setCity] = useState("Paris");
  const [weather,setweather]=useState(null);
  const [units,setUnits]=useState("metric");
  const [bg, setBg] = useState(summer);

  // if we want to show data in fahrenheit
  // then we will use imperial instead of metric  

  useEffect(()=>{
     const fetchweatherdata=async()=>{
      const data=await getweather_data(city,units);
      // console.log(data);
      setweather(data);

      // make background dynamic 
      const threshold = units === "metric" ? 20 : 74;
      if (data.temp > threshold) setBg(summer);
      else setBg(winnter);
     };
     fetchweatherdata();
  },[units,city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
   
  return (
    <div className="app" style={{backgroundImage: `url(${bg})` }}>
     <div className="overlay" >
      {weather && (
 
        <div className="container">
        <div className="section sec_inputs">
            <input 
            onKeyDown={enterKeyPressed}
            type="text" 
            name="city" 
            placeholder="Enter City Name"
            ></input>
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>
        <div className="section sec_temp">
            <div className="icon">
            <h2>{`${weather.name},${weather.country}`}</h2>
            <img src={weather.iconURL}
            alt="weather icon">
            </img>
            <h3>{weather.description}</h3>
            </div>
            <div className="temp">
            <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
          </div>
        </div>
        <Description weather={weather} units={units}/>
        </div>
      )}
      
     </div>      
    </div>
  );
}

export default App;
