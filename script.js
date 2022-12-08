const cont = document.getElementById("container");
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 152; i++) {
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
    displayPokemon(pokemon);
  });
};

const displayPokemon = (data) => {
  const pokemonTitle = data
    .map(
      (pokeman) =>
        `<li class='card'>
  <h1 class='card-title'>${pokeman.id}. ${pokeman.name}</h1>
   <img class='card-image' src="${pokeman.image}"/>
  <p class='card-subtitle'>Type: ${pokeman.type}</p>
  
  </li>`
    )
    .join(" ");

  cont.innerHTML = pokemonTitle;
};

//displays pokemon that matches user entered number from input form
const displayPoke = (poke) => {
  const pokemonInfo = `<li class='card'>
  <h1 class='card-title'>${poke.id}. ${poke.name}</h1>
   <img class='card-image' src="${poke.image}"/>
  <p class='card-subtitle'>Type: ${poke.type}</p>
  
  </li>`;
  cont.innerHTML = pokemonInfo
}
//fetches pokemon that matches user entered number from input form and replaces dom children to feed in new one 
const findPokemon = () => {
  cont.replaceChildren();
  fetch(`https://pokeapi.co/api/v2/pokemon/${number.value}`)
    .then((response) => response.json())
    .then((data) => {
      const poke = {
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
      };
    console.log(poke.name)
    displayPoke(poke);
    }).catch((err)=> cont.innerHTML = 'Pokemon not found please try again');
 
};

fetchPokemon();
