"use strict";

const ipInputForm = document.querySelector("#ipInputform");
const formInputData = document.querySelector("#formInputData");
const mapContainer = document.querySelector("#map");

let api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_ek10vBmUSAqIBwc0C8IgA26UhgGRg";

const updateMap = (latitude, longitude) => {
  if (mapContainer != null) {
    mapContainer.innerHTML = ""; // Clear previous map
  }

  const map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.popup()
    .setLatLng([latitude, longitude])
    .setContent("Current Location 👇")
    .openOn(map);
};

const fetchApi = () => {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const {
        ip: apiIPAddress,
        location: { country: apiCountry, region: apiRegion, city: apiCity, lat: latitude, lng: longitude },
        isp: apiISP,
      } = data;

      updateMap(latitude, longitude);

      console.log(apiIPAddress, apiCountry, apiRegion, apiCity, apiISP);

      const ipAddress = document.querySelector("#ipAddress");
      const ipLocation = document.querySelector("#ipLocation");
      const ipISP = document.querySelector("#ipISP");

      ipAddress.textContent = apiIPAddress;
      ipLocation.textContent = `${apiRegion}, ${apiCity}, ${apiCountry}`;
      ipISP.textContent = apiISP;
    })
    .catch((error) => {
      console.log(error);
      formInputData.value = "";
    });
};

fetchApi();

ipInputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInputData.value;
  console.log(formInputData.value);

  const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const domainRegex = /^[\w\d\W+]+.+[a-z]{2,3}/;

  if (ipRegex.test(inputValue)) {
    api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ek10vBmUSAqIBwc0C8IgA26UhgGRg&ip=${inputValue}`;
    console.log(inputValue);
  } else if (domainRegex.test(inputValue)) {
    api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ek10vBmUSAqIBwc0C8IgA26UhgGRg&domain=${inputValue}`;
    console.log(inputValue);
  } else {
    console.log("error");
    formInputData.value = "";
  }

  fetchApi();
});