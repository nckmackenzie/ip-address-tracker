const form = document.querySelector('form');
const ipaddElm = document.querySelector('#ipaddress');
const locationElm = document.querySelector('#location');
const timezoneElm = document.querySelector('#timezone');
const ispElm = document.querySelector('#isp');
const inputElm = document.querySelector('input');
const apiKey = 'at_eU8jp5DLa4QYV64JPrE9qUuYES6lM';
const spinnerContainer = document.querySelector('.spinner');

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (inputElm.value === '') {
    alert('Enter ip address or domain');
    return;
  }

  bindData(inputElm.value);
});

const getData = async ipaddress => {
  try {
    spinnerContainer.classList.add('show');
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipaddress.trim()}`
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Unable to fetch data based on provided IP Address');
      return;
    }

    return data;
  } catch (error) {
    alert('Unable to fetch data based on provided IP Address');
    console.error(error.response.data);
  } finally {
    spinnerContainer.classList.remove('show');
  }
};

async function bindData(ipadd) {
  const data = await getData(ipadd);
  ipaddElm.textContent = data.ip;
  ispElm.textContent = data.isp;
  timezoneElm.textContent = data.location.timezone;
  locationElm.textContent = `${data.location.city},${data.location.country}`;
  const lat = data.location.lat;
  const lng = data.location.lng;
  bindMap(lat, lng);
  inputElm.value = '';
  centralizeResults();
}

function bindMap(lat, lng) {
  document.getElementById('mymap').innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  const osmLayer = new L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  var map = new L.map('map');
  map.setView(new L.LatLng(lat, lng), 13);
  var marker = L.marker([lat, lng]).addTo(map);
  map.addLayer(osmLayer);
  // var map = L.map('map').setView([lat, lng], 13);
  //  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);
  // var marker = L.marker([lat, lng]).addTo(map);
}

function centralizeResults() {
  const resultsElm = document.querySelector('.results');
  //get hieght of elm
  const height = resultsElm.offsetHeight;
  resultsElm.style.bottom = `-${height}px`;
}

async function getIP() {
  const { data } = await axios.get(`https://api.ipify.org?format=json`);
  const ip = data.ip;
  bindData(ip);
}

window.addEventListener('resize', centralizeResults);

centralizeResults();
getIP();
