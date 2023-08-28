const cityName = document.querySelector(".search1");
const cityNameleftContainer = document.querySelector(".search");
const searchBtn1 = document.querySelector(".searchBtn1");
const searchBtn2 = document.querySelector(".searchBtn2");
const displayName = document.querySelector("[nameCity]");
const fullData = document.querySelector("[fullData]");
const leftContainer = document.querySelector(".left-container")
const searchContainer = document.querySelector(".search-bar");
const rightContainer = document.querySelector(".right-container")
const humidata = document.querySelector("[values]");
const clouddata = document.querySelector("[values1]");
const raindata = document.querySelector("[values2]");
const winddata = document.querySelector("[value-wind]");


let element = document.createElement("div");
fullData.appendChild(element);

async function show() {
  let city = cityName.value;
  console.log(city);
  let API_KEY = `e6950672506ee809372a686670733dd1`;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const apiData = await response.json();
  console.log(apiData);
  const icons = await fetch(`https://openweathermap.org/img/w/${apiData?.weather[0]?.icon}.png`);
  console.log(icons);
  displayName.innerHTML = city;
  fullData.innerHTML = icons;
  
  element.innerText = apiData.weather[0].main + "\n" + '\n' + apiData.weather[0].description;
  humidata.innerText = 'Humidity '+apiData.main.humidity+' g.m-³';
  clouddata.innerText = 'rain'+apiData.clouds.all+'%';
  winddata.innerText = 'wind speed:- '+apiData.wind.speed+' km/h'; 

  let lat = apiData.coord.lat;
  let lon = apiData.coord.lon;

  const forcastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  const forcastData = await forcastResponse.json();

  //console.log(forcastData);
  // console.log(displayName);
  
  var labels1 = [];
  var values = [];
  for (i = 0; i < 10; i++) {

    let date = forcastData.list[i].dt_txt;
    //console.log(date);
    let arr = date.split(' ');
    //console.log(arr);
    labels1.push(arr[1]);
    values.push(forcastData.list[i].main.temp);
  }
  //console.log(labels1);
 
  const ctx = document.getElementById('myChart');
  new Chart(ctx,{
		type : 'line',
		data : {
			labels : labels1,
			datasets : [
					{
						data :values,
						label : "temperature *C",
						borderColor : "#3cba9f",
						fill : true
					}]
		},
		options : {
			title : {
				display : true,
				text : 'Chart JS'
			}
		}
	});
}


searchBtn1.addEventListener('click', () => {
  if (cityName.value === "") {
    return;
  }
  else{
    document.querySelector(".container").classList.toggle('click');
    const element = document.querySelector(".search-bar");
    element.remove();
    leftContainer.style.scale = "1";
    rightContainer.style.scale = "1";
    show();
  }
})


searchBtn2.addEventListener('click', () => {
  if (cityNameleftContainer.value === "") {
    return;
  }
  show();
})

// const weather = api.openweathermap.org/data/2.5/forecast?id={cityName.value}&appid={e6950672506ee809372a686670733dd1}
// const forcast = api.openweathermap.org/data/2.5/forecast?lat={latvalue}&lon={lonvalue}&appid={API key}&units=metric
// `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`

