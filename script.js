const cityName = document.querySelector(".search1");
const searchBtn1 = document.querySelector(".searchBtn1");
const searchBtn2 = document.querySelector(".searchBtn2");
const displayName = document.querySelector("[nameCity]");
const fullData = document.querySelector("[fullData]");
const leftContainer = document.querySelector(".left-container")
const searchContainer = document.querySelector(".search-bar");
const rightContainer = document.querySelector(".right-container")



let element = document.createElement("div");
fullData.appendChild(element);

async function show() {
  let city = cityName.value;
  console.log(city);
  let API_KEY = `e6950672506ee809372a686670733dd1`;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const apiData = await response.json();
  displayName.innerHTML = city;
  fullData.innerText = apiData.weather[0].icon;
  element.innerText = apiData.weather[0].main + "\n" + '\n' + apiData.weather[0].description;

  let lat = apiData.coord.lat;
  let lon = apiData.coord.lon;

  const forcastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  const forcastData = await forcastResponse.json();

  //console.log(forcastData);
  // console.log(displayName);
  // console.log(data);
  var labels1 = [];
  var values = [];
  for (i = 0; i < 10; i++) {

    let date = forcastData.list[i].dt_txt;
    console.log(date);
    let arr = date.split(' ');
    console.log(arr);
    labels1.push(arr[1]);
    values.push(forcastData.list[i].main.temp);
  }
  console.log(labels1);
  const ctx = document.getElementById('myChart');
  const data =
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels1,
        datasets: [{
          label: '# temperature',
          data: values,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
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
  show();
})

// const weather = api.openweathermap.org/data/2.5/forecast?id={cityName.value}&appid={e6950672506ee809372a686670733dd1}
// const forcast = api.openweathermap.org/data/2.5/forecast?lat={latvalue}&lon={lonvalue}&appid={API key}&units=metric


