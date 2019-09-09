//console.log('main.js is connected!');

//addEventListeners to search button
document.getElementById('searchBtn').addEventListener("click", zipCheck);

document.getElementById('searchBtn').addEventListener("click", apiCall);

//api call function
function apiCall(e) {
  e.preventDefault();


  const zipValue = document.querySelector('#zipInput').value;
  const appId = process.env.API_Id;
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipValue}&units=imperial&appid=${appId}`)

  .then((res) => {
    return res.json();
  })

  .then((res) => {
    //below checks res object is returned
    //console.log("res", res);

    //stores location
    const loc = res.name;
    //console.log('res.name : ', loc);

    //assigns #loc
    document.getElementById('loc').innerHTML = `${loc}`;

    //stores current temperature
    const currTemp = Math.round(res.main.temp);
    //console.log('res.main.temp : ', currTemp);

    //assigns #currTemp
    document.getElementById('currTemp').innerHTML = `${currTemp} &#8457;`;

    //stores weather description
    const descript = res.weather[0].description;
    //console.log('res.weather[0].description', descript);

    //assigns #descript
    document.getElementById('descript').innerHTML = `expect: ${descript}`;

    //styles #descript
    document.getElementById('descript').style.fontVariant = 'small-caps';

    document.getElementById('descript').style.color = '#004225';

    document.getElementById('descript').style.textAlign = 'center';

    //stores min temp
    const minTemp = Math.round(res.main.temp_min);
    //console.log('res.main.temp_min', minTemp);

    //assigns #minTemp
    document.getElementById('minTemp').innerHTML = `${minTemp}`;

    //stores max temp
    const maxTemp = Math.round(res.main.temp_max);
    //console.log('res.main.temp_max', maxTemp);

    //assigns #minTemp
    document.getElementById('maxTemp').innerHTML = `${maxTemp}`;

    //conditionals for temps - turns blue if temps are below 40 and red if above 90
    let tempStyle = document.getElementById('currTemp').style;
    let highStyle = document.getElementById('maxTemp').style;
    let lowStyle = document.getElementById('minTemp').style;

    if((currTemp < 40) || (minTemp < 40) || (maxTemp < 40)) {
      tempStyle.color = "#a1caf1";
      highStyle.color = "#a1caf1";
      lowStyle.color = "#a1caf1";
    } else if ((currTemp > 90) || (minTemp > 90) || (maxTemp > 90)){
      tempStyle.color = "#a52a2a";
      highStyle.color = "#a52a2a";
      lowStyle.color = "#a52a2a";
    } else {
      tempStyle.color = "#004225";
      highStyle.color = "#004225";
      lowStyle.color = "#004225";
    }

//extraInfo - *bonus*
  const long = res.coord.lon;
  //console.log("res.coord.long : ", long);

  document.querySelector('#long').innerHTML = `Longitude: ${long}`;

  const lat = res.coord.lat;
  //console.log("res.coor.lat : ", lat);

  document.querySelector('#lat').innerHTML = `Latitude: ${lat}`;

  const humid = res.main.humidity;
  //console.log("res.main.humidity", humid);

  document.querySelector('#humid').innerHTML = `Humidity: ${humid} &#37;`;

  const wind = res.wind.speed;
  //console.log("res.wind.speed", wind);

  document.querySelector('#wind').innerHTML = `Wind Speed: ${wind} mph`;

  const sunrise = res.sys.sunrise;

//unix tick units = seconds, must multiply by 1000
  const sunriseDateTime = new Date(sunrise * 1000);

  //Returns a string date portion based on system settings
  //second parameter specifies only hour and minutes in 2-digit format
  const riseTime = sunriseDateTime.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
  //console.log("res.sys.sunrise", riseTime);

  document.querySelector('#sunrise').innerHTML = `Sunrise: ${riseTime}`;

  const sunset = res.sys.sunset;

  const sunsetDateTime = new Date(sunset * 1000);
  const setTime = sunsetDateTime.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
  //console.log("res.sys.sunset", setTime);

  document.querySelector('#sunset').innerHTML = `Sunset: ${setTime}`;

  })

  .catch((err) => {
    console.log("Error : ", err);
  })

}

//checks if zip code is 5 digits
function zipCheck(e) {
  e.preventDefault();

  if(document.querySelector('#zipInput').value.length === 5) {
    //hides alert message
    document.querySelector('.message').classList.add("none");

    //reveals weatherInfo
    document.querySelector('.weatherInfo').classList.remove("none");

    //reveals extraInfo - *bonus*
    document.querySelector('.extraInfo').classList.remove("none");

  } else {
    document.querySelector('.message').classList.remove("none");
  }
}
