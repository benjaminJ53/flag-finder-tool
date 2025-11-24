let countriesData = [];
function handleResponse(response) {
  if (response.ok) {
    return response.json(); 
  } else {
    return Promise.reject("Error");
  }
}
function handleData(data) {
  countriesData = data;
}
function handleError(error) {
  console.error(error);
}
function findCountry(country) {
  const searchvalue = document.getElementById('searchinput').value.trim().toLowerCase();
  const commonNameMatches = country.name.common.toLowerCase().includes(searchvalue);
  let altSpellingMatches = false;
  if (country.altSpellings) {
    altSpellingMatches = country.altSpellings.some(function(s) {
      return s.toLowerCase().includes(searchvalue);
    });
  }
  return commonNameMatches || altSpellingMatches;
}
function displayResult(result) { 
  const displayArea = document.getElementById('flag-display-area');
  displayArea.innerHTML = '';
  const flagImg = document.createElement('img');
  flagImg.src = result.flags.png;
  flagImg.alt = result.name.common + " flag";
  flagImg.width = 280;
  flagImg.height = 160;
  const nameDiv = document.createElement('div');
  nameDiv.textContent = result.name.common;
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
document.getElementById('searchbutton').addEventListener('click', handleSearchClick);