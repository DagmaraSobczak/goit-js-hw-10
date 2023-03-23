import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES = 10;
const fetchCountriesInput = document.querySelector('input#search-box');

fetchCountriesInput.addEventListener(
  'input',
  debounce(event => {
    const inputText = event.target.value.trim();
    if (inputText === '') {
      clearResults();
      return;
    }
    fetchCountries(inputText)
      .then(data => {
        if (data.length > MAX_COUNTRIES) {
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (data.length < MAX_COUNTRIES || data.length > 2) {
          const countryList = document.querySelector('.country-list');
          data.forEach(country => {
            const li = document.createElement('li');
            const name = data[0].name.official;
            const flag = data[0].flags.svg;
            const textContent = name + ' ' + flag;
            li.textContent = textContent;
            countryList.appendChild(li);
          });
        }

        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, DEBOUNCE_DELAY)
);
