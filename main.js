const city = "Seoul";

const apikey = "4228550c90726bad987b1c72d6333998"; // API 사이트에서 제공하는 개인 API_KEY
const lang = "kr";

//! 페이지 로드 시 날짜 데이터 자동 업데이트
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
});


async function fetchWeather(city = "Seoul") {
  const API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=${lang}&units=metric`;

  try {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    updateWeatherUI(data);
    updateWeatherBackground(data.weather[0].main);
  } catch (error) {
    console.log("Error fetching weather data: ", error);
  }
}

function updateWeatherUI(data) {
  const now = new Date();
  const year = now.getFullYear();
  const date = now.getDate();
  const day = now.getDay();
  const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  const dayLabel = days[day];
  const month = now.getMonth();
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const monthLabel = months[month];

  document.querySelector("#now-date").textContent = `${dayLabel}, ${monthLabel} ${date}, ${year}`;

  // 날씨 정보
  document.querySelector("#current-temp").textContent = `${data.main.temp}℃`;
  document.querySelector("#city-name").textContent = data.name;
  document.querySelector("#weather-icon").textContent = getWeatherIcon(data.weather[0].main);

  // weather Details
  document.querySelector("#temp-min-max").textContent = `${data.main.temp_min}℃ / ${data.main.temp_max}℃`;
  document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
  document.querySelector("#wind").textContent = `${data.wind.speed}km/h`;
  document.querySelector("#cloudy").textContent = `${data.clouds.all}%`;
}

//* 날씨 아이콘 변환
function getWeatherIcon(weather) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧",
    Snow: "❄️" 
  };
  return icons[weather] || "☀️";
}

function updateWeatherBackground(weather) {
  const weatherContainer = document.querySelector("#weather-container");
  let backgroundImage = '';

  switch (weather) {
    case 'Clear':
      backgroundImage = 'url("./images/sunny.jpg")';
      break;
    case 'Clouds':
      backgroundImage = 'url("./images/cloudy.jpg")';
      break;
    case 'Rain':
      backgroundImage = 'url("./images/rainy.jpg")';
      break;
    case 'Snow':
      backgroundImage = 'url("./images/snow.jpg")';
      break;
  }
  weatherContainer.style.backgroundImage = backgroundImage;
}

//* 검색
document.querySelector("#search-button").addEventListener("click", handleSearch);
document.querySelector("#city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  } 
});

function handleSearch() {
  const city = document.querySelector("#city-input").value.trim();
  if (city) {
    fetchWeather(city);
    document.querySelector("#city-input").value = "";
  } else {
    alert("정확하게 입력해주세요!");
  }
}

//* 다크모드
const button = document.querySelector(".dark");
const overlay = document.querySelector(".overlay");
const container = document.querySelector("#weather-container");
const input = document.querySelector(".search");

button.addEventListener("click", () => {
  const isDarkMode = container.classList.toggle("dark");

  if (isDarkMode) {
    button.textContent = "Light";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

    // button.classList.remove("dark");
  } else {
    button.textContent = "Dark";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";

    // button.classList.add("dark");
  }
});
