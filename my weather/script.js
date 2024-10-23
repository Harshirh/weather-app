const apiKey = '07730e0bb14b480c82a102556240910'; // Replace with your actual WeatherAPI.com API key
const city = 'Denver'; // Replace with a default city (optional)

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search button');
const weatherDiv = document.querySelector('.weather');

const updateUI = (data) => {
  const cityName = data.location.name;
  const currentTemp = data.current.temp_c;
  const weatherIcon = data.current.condition.icon;
  const weatherDesc = data.current.condition.text;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;

  weatherDiv.classList.remove('loading');
  document.querySelector('.city').textContent = `Weather in ${cityName}`;
  document.querySelector('.temp').textContent = `${currentTemp}°C`;
  document.querySelector('.icon').src = `https:${weatherIcon}`;
  document.querySelector('.description').textContent = weatherDesc;
  document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
  document.querySelector('.wind').textContent = `Wind speed: ${windSpeed} km/h`;
};

const fetchWeather = (searchCity) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${'07730e0bb14b480c82a102556240910'}&q=${searchCity}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle errors (e.g., city not found)
        console.error(data.error.message);
        return;
      }
      updateUI(data);
    })
    .catch(error => console.error(error));
};

// Fetch weather for default city on page load
fetchWeather(city);

// Add event listener for search button click
searchButton.addEventListener('click', () => {
  const searchTerm = searchBar.value;
  if (searchTerm) {
    fetchWeather(searchTerm);
    searchBar.value = ''; // Clear search bar after fetching
  }
});