import { error } from "@pnotify/core";

export default class CountriesApiService {
  constructor() {
  this.searchCountry = '';
  }
  fetchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.searchCountry}`;
  
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    }).then(data => {
      return data;
    })
  }

  get country() {
    return this.country;
  }

  set country(newCountry) {
    this.searchCountry = newCountry;
  }
}