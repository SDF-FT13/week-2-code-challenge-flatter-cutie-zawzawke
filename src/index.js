// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");

    fetch(baseURL)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.classList.add("character-name");
                span.dataset.id = character.id;
                characterBar.appendChild(span);
            });
        })
        .catch(error => console.error("Error fetching characters:", error));

        

});
