let countriesData = []; /*final load point - 'let' because value changes after loading*/

function handleResponse(response) {
  if (response.ok) {
    return response.json(); /*usable data format*/
  } else {
    return Promise.reject("Error");
  }
}

function handleData(data) {
  countriesData = data; /*data > final load point*/
}

function handleError(error) {
  console.error(error); /*error > display data in log (F12)*/
}

function findCountry(country) { /*checks inputted value within the search bar*/
  const searchvalue = document.getElementById('searchinput').value.trim /*spaces*/().toLowerCase /*case-insensitive*/();
  const commonNameMatches = country.name.common.toLowerCase().includes(searchvalue); /*does common name match*/

  let altSpellingMatches = false;
  if (country.altSpellings) {
    altSpellingMatches = country.altSpellings.some(function(s) {
      return s.toLowerCase().includes(searchvalue);
    });
  } /* if common name = false > altspelling check > if altspelling = false > partial match check (s.)*/

  return commonNameMatches || altSpellingMatches; /*if common name OR altspelling > return data*/
}

function displayResult(result) { 
  const displayArea = document.getElementById('flag-display-area');
  displayArea.innerHTML = ''; /* clear old results */

  const flagImg = document.createElement('img'); /*data from API > flag img (.png) > common name below img*/
  flagImg.src = result.flags.png;
  flagImg.alt = result.name.common + " flag";
  flagImg.width = 280;
  flagImg.height = 160;

  const nameDiv = document.createElement('div');
  nameDiv.textContent = result.name.common; /*creates div > common name below img*/

  displayArea.appendChild(flagImg);
  displayArea.appendChild(nameDiv);
}

function handleSearchClick() {
  const result = countriesData.find(findCountry);
  if (result) {
    displayResult(result);
  } else {
    console.log("No matching data");
  }
}

fetch('https://restcountries.com/v3.1/all?fields=name,flags,altSpellings')
  .then(handleResponse)
  .then(handleData)
  .catch(handleError);

document.getElementById('searchbutton').addEventListener('click', handleSearchClick); /* register user click */