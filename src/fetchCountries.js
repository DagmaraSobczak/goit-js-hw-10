function fetchCountries(name) {
  const params = new URLSearchParams({
    fields: 'name.official,capital,population,flags.svg,languages',
  });

  return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`)
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
