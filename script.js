const cont = document.getElementById('container');
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
   displayPokemon(pokemon)
  });
};

const displayPokemon = (pokemon) => {
const pokemonTitle = pokemon
  .map(
    (pokeman) =>
      `<li class='card'>
  <h1 class='card-title'>${pokeman.id}. ${pokeman.name}</h1>
   <img class='card-image' src="${pokeman.image}"/>
  <p class='card-subtitle'>Type: ${pokeman.type}</p>
  
  </li>`
  )
  .join(" ");

  cont.innerHTML = pokemonTitle

}
fetchPokemon();
