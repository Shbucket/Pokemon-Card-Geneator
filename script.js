const cont = document.getElementById("container");
//fetches information to
const fetchPokemon = async () => {
  const promises = [];
  for (let i = 1; i < 152; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }
  const results = await Promise.all(promises);
  const pokemon = results.map((data) => ({
    name: data.name,
    id: data.id,
    image: data.sprites["front_default"],
    weight: data.weight,
    height: data.height,
    type: data.types.map((type) => type.type.name).join(", "),
   
   
  }));
  displayPokemon(pokemon);
};

//creates card to display pokemon details
const displayPokemon = (data) => {
  const pokemonTitle = data
    .map(
      (pokeman) =>
        `<li class='card'>
  <h1 class='card-title'>${pokeman.id}. ${
          pokeman.name.charAt(0).toUpperCase() + pokeman.name.slice(1)
        }</h1>
   <img class='card-image' src="${pokeman.image}"/>
  <p class='card-subtitle'>Type: ${pokeman.type} | Height: ${
          pokeman.height
        } | Weight: ${pokeman.weight}</p>
  
  </li>`
    )
    .join(" ");

  cont.innerHTML = pokemonTitle;
};

//displays pokemon that matches user entered number from input form
const displayPoke = (poke) => {
  const pokemonInfo = `<li class='card'>
  <h1 class='card-title'>${poke.id}. ${
    poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
  }</h1>
   <img class='card-image' src="${poke.image}"/>
  <p class='card-subtitle'>Type: ${poke.type} | Height: ${
    poke.height
  } | Weight: ${poke.weight} |</p>
  
  </li>`;
  cont.innerHTML = pokemonInfo;
};
//fetches pokemon that matches user entered string from input form and replaces dom children to feed in new one
const findPokemon = async () => {
  cont.replaceChildren();
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${text.value.toLowerCase()}`
    );
    const data = await response.json();

    const poke = {
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
      weight: data.weight,
      height: data.height,
      moves: data.moves.map((move) => move.move.name).join(", "),
    };
    console.log(poke.name);
    displayPoke(poke);
  } catch (err) {
    const errC = err.code;
    const errM = err.message;
    console.log(eerC,errM);
    cont.innerHTML = "Pokemon not found please try again";
  }
};
