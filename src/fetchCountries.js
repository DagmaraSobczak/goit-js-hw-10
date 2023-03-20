function fetchCountries(name) {
  return;
  fetchCountries('https://restcountries.com/v3.1/name/{name}')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export { fetchCountries };
