import './css/styles.css';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const fetchCountriesInput = document.querySelector('input#search-box');

fetchCountriesInput.addEventListener(
  'input',
  _.debounce(event => {
    fetchCountries(event.target.value.trim())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, DEBOUNCE_DELAY)
);
