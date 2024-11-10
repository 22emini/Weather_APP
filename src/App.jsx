import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "ce698fa94719cb81237bfa47329b5161";

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      setError("");
      
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        setData(response.data);
        setLocation("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch weather data");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=' bg-slate-500 p-3'>
    <div className="min-h-screen  border-2 border-gray-400 rounded-lg bg-purple-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mt-7 p-4">
          <h1 className=' text-center text-3xl text-white font-bold pb-7'> LonShoreMan Weather App</h1>
          <input
            type="text"
            className="py-3 px-6 w-full max-w-[700px] text-lg rounded-3xl border-gray-200 text-gray-700 placeholder:text-gray-400 focus:outline-none border-b-2 bg-slate-100 shadow-md"
            placeholder="Enter Location and Press Enter"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
          />
        </div>

        {loading && (
          <div className="text-center text-white text-lg">
            Loading...
          </div>
        )}

        {error && (
          <div className="text-center text-red-300 text-lg">
            {error}
          </div>
        )}

        {data && (
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 mt-4 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {data.name}, {data.sys.country}
              </h2>
              
              <div className="text-6xl font-bold mb-4">
                {Math.round(data.main.temp)}°C
              </div>

              <div className="text-xl mb-4">
                {data.weather[0].main} - {data.weather[0].description}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
                <div className="bg-white/10 p-3 rounded">
                  <div className="font-bold">Feels Like</div>
                  <div>{Math.round(data.main.feels_like)}°C</div>
                </div>
                
                <div className="bg-white/10 p-3 rounded">
                  <div className="font-bold">Humidity</div>
                  <div>{data.main.humidity}%</div>
                </div>

                <div className="bg-white/10 p-3 rounded">
                  <div className="font-bold">Wind Speed</div>
                  <div>{data.wind.speed} m/s</div>
                </div>

                <div className="bg-white/10 p-3 rounded">
                  <div className="font-bold">Pressure</div>
                  <div>{data.main.pressure} hPa</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
    </div>
  );
};

export default App;