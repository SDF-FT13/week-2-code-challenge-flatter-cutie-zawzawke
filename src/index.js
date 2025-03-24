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

const detailedInfo = document.getElementById("detailed-info");
const characterName = document.getElementById("name");
const characterImage = document.getElementById("image");
const characterVotes = document.getElementById("vote-count");
const baseURL = "http://localhost:3000/characters";

document.getElementById("character-bar").addEventListener("click",(event) => {
    if (event.target.classList.contains("character-name")) {
        const characterId = event.target.dataset.id;

        fetch(`${baseURL}/${characterId}`)
           .then(response => response.json())
           .then(character => {
               characterName.textContent = character.name;
               characterImage.src = character.image;
               characterVotes.textContent = character.votes;
               characterImage.alt = character.name;
               detailedInfo.dataset.id = character.id;
           });
    }

});

const votesForm = document.getElementById("votes-form");

votesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const voteInput = document.getElementById("votes").value;
    let currentVotes = parseInt(characterVotes.textContent, 10);
    characterVotes.textContent = currentVotes + parseInt(voteInput, 10);

    votesForm.reset();

});
