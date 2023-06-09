import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES = 10;
const fetchCountriesInput = document.querySelector('input#search-box');

function clearCountries() {
  const countryList = document.querySelector('.country-list');
  countryList.innerHTML = '';
}
fetchCountriesInput.addEventListener(
  'input',
  debounce(event => {
    clearCountries();
    const inputText = event.target.value.trim();
    if (inputText === '') {
      return;
    }
    fetchCountries(inputText)
      .then(data => {
        if (data.length > MAX_COUNTRIES) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        if (data.length < MAX_COUNTRIES && data.length > 1) {
          const countryList = document.querySelector('.country-list');
          data.forEach(country => {
            const li = document.createElement('li');
            const name = country.name.official;
            const flag = country.flags.svg;
            const textContent = `<img src="${flag}" alt="${name}" /> ${name}`;
            li.innerHTML = textContent;
            countryList.appendChild(li);
          });
        }
        if (data.length === 1) {
          const countryList = document.querySelector('.country-list');
          const country = data[0];
          const li = document.createElement('li');
          const name = country.name.official;
          const flag = country.flags.svg;
          const capital = country.capital;
          const population = country.population;
          const languages = country.languages;
          const textContent = `<img src="${flag}" alt="${name}" /> <b>${name}</b>  <br> <b>Capital:</b> ${capital} <br> <b>Population:</b> ${population} <br> <b>Laungueges:</b> ${Object.values(
            country.languages
          )}`;
          li.innerHTML = textContent;
          countryList.appendChild(li);
        }
        console.log(data);
      })
      .catch(error => {
        if (error.status === 404) {
          return;
        }
        console.error(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
