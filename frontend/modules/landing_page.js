import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
 // debugger;
  let cities = await fetchCities();
  console.log('From init()');
  console.log(cities);
  //console.log(config.backendEndpoint+"/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
   // debugger;
    addCityToDOM(key.id, key.city, key.description, key.image);
    
  });
  addCityToDOM("london", "London", "London", "London");
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  //let rawData = await fetch("http://65.1.180.182:8082/cities");
  const apiRec = config.backendEndpoint+"/cities"
  try{
  let rawData = await fetch(apiRec);
  if (!rawData.ok) {
    throw new Error(`Response status: ${rawData.status}`);
  }
  let finalData = await rawData.json();
  //console.log(finalData)
  return finalData;
}catch (error) {
  //console.error(error.message);
  return null;
}

// let hardcodedcity = [
//   {
//     "city":"London",
// "description":"London",
// "id":"london",
// "image":"London"
//    }
// ]
// return hardcodedcity;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  let tRow = document.createElement("div");
  tRow.setAttribute("class", "col-lg-3 col-sm-6 col-12  mt-4 position-relative tile");
  tRow.innerHTML = `
  <div class="tile">
    <a id=${id} href="pages/adventures/?city=${id}"><img src=${image} class="card-img" alt=${city}></a>
  <div class="card-body position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
    <h4 class="card-tile ">${city}</h4>
    <p class="card-text">${description}</p>
  </div>
`
let addElement = document.querySelector("#data");
addElement.append(tRow);

  // let addElement = document.querySelector("#data");
  // console.log(id+"  "+city+"  "+image);  
  
}
 function addcity() {
  addCityToDOM("london", "London", "London", "London");
 }



export { init, fetchCities, addCityToDOM };
