document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
  
  // Clear previous results
  document.getElementById("pokemon-name").textContent = "";
  document.getElementById("pokemon-id").textContent = "";
  document.getElementById("weight").textContent = "";
  document.getElementById("height").textContent = "";
  document.getElementById("types").innerHTML = "";
  document.getElementById("hp").textContent = "";
  document.getElementById("attack").textContent = "";
  document.getElementById("defense").textContent = "";
  document.getElementById("special-attack").textContent = "";
  document.getElementById("special-defense").textContent = "";
  document.getElementById("speed").textContent = "";

  // Remove previous sprite
  const existingSprite = document.getElementById("sprite");
  if (existingSprite) {
    existingSprite.remove();
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Populate Pokémon information
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${data.id}`;
    document.getElementById("weight").textContent = `Weight: ${data.weight}`;
    document.getElementById("height").textContent = `Height: ${data.height}`;

    // Add Pokémon types
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement("span");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      document.getElementById("types").appendChild(typeElement);
    });

    // Add Pokémon stats
    const stats = {};
    data.stats.forEach(statInfo => {
      stats[statInfo.stat.name] = statInfo.base_stat;
    });

    document.getElementById("hp").textContent = stats.hp;
    document.getElementById("attack").textContent = stats.attack;
    document.getElementById("defense").textContent = stats.defense;
    document.getElementById("special-attack").textContent = stats["special-attack"];
    document.getElementById("special-defense").textContent = stats["special-defense"];
    document.getElementById("speed").textContent = stats.speed;

    // Add Pokémon sprite
    const sprite = document.createElement("img");
    sprite.id = "sprite";
    sprite.src = data.sprites.front_default;
    document.getElementById("pokemon-info").appendChild(sprite);

  } catch (error) {
    alert("Pokémon not found");
  }
});
