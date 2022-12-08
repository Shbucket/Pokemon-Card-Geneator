const cont = document.getElementById("container");
const div = document.createElement("div");
const title = document.createElement("h1");
const image = document.createElement('IMG')
const type = document.createElement('p')

cont.appendChild(div);
div.appendChild(title);
div.appendChild(image);
div.appendChild(type)



const fetchPokemon = () => {
  let num = Math.floor(Math.random() * 905);
  fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemon = {
        name: data.name,
        image: data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
      };
      title.textContent = pokemon.name;
      image.src = pokemon.image
      type.textContent = pokemon.type

    
    });
};




fetchPokemon();


