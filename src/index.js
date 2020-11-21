import { notice, error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import CountriesApiService from './js/countrysApi';
import countryCard from './templates/countryCard.hbs';
import countryList from './templates/countryList.hbs'
import debounce from "lodash.debounce";

const refs = {
  inputSearch: document.querySelector('.input-search'),
  cardContainer: document.querySelector('.js-card-container')
}

refs.inputSearch.addEventListener('input', debounce(onInputSearch, 500))

const countriesApiService = new CountriesApiService();

function onInputSearch(e) {
  countriesApiService.country = e.target.value;
  if (countriesApiService.searchCountry === '') {
    clearMarkup();
    return;
  }
  
  countriesApiService.fetchCountries().then(countsCountries).catch(errorNotFound)
  
}

function countsCountries(searchCountries) {
  const  allCountriesFound = searchCountries.length;
    if (allCountriesFound === 1) {
      renderCountryCard(searchCountries)
    }
    if (allCountriesFound >= 2 && allCountriesFound <= 10) {
      renderCountryList(searchCountries)
    }
    if (allCountriesFound > 10) {
      errorTooMachCountries();
    }
  }

function clearMarkup() {
  refs.cardContainer.innerHTML = "";
}

function renderCountryCard(searchCountries) {
refs.cardContainer.innerHTML = countryCard(...searchCountries)
}

function renderCountryList(searchCountries) {
  refs.cardContainer.innerHTML = countryList(searchCountries)
}

function errorTooMachCountries() {
  notice({
    text: "Too many matches found. Please enter a more specific query!",
    delay: 1000,
  });
}

function errorNotFound() {
  error({
    text: "WE COULD NOT FIND ANYTHING",
    delay: 1000,
  });
}