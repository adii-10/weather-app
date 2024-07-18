import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdSearch } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';
import { WiThunderstorm } from 'react-icons/wi';
import './App.css'; // Make sure to import your CSS file

const APIkey = 'aaebf7a177dfcbdfe29789c8755ef6a4';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Dehradun');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if (input.value === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = '';
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-screen glossy-gradient-bg flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-6xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case 'Thunderstorm':
      icon = <WiThunderstorm />;
      break;
    default:
      icon = <BsEye />;
  }

  const date = new Date();
  return (
    <div className="w-full h-screen glossy-gradient-bg flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">
          {`${errorMsg.response.data.message}`}
        </div>
      )}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`${animate ? 'animate-shake' : 'animate-none'} h-14 bg-black/30 w-full max-w-[400px] rounded-full backdrop-blur-[32px] mb-6 mt-16 lg:mt-20`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country"
            onChange={(e) => handleInput(e)}
          />
          <button
            type="submit"
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-16 h-10 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[400px] bg-black/20 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-8 px-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-6xl animate-spin" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5">
              <div className="text-[70px]">{icon}</div>
              <div>
                <div className="text-xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className="my-16">
              <div className="flex justify-center items-center">
                <div className="text-[100px] leading-none font-light">{parseInt(data.main.temp)}</div>
                <div className="text-3xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize text-center">{data.weather[0].description}</div>
            </div>
            <div className="max-w-[350px] mx-auto flex flex-col gap-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
