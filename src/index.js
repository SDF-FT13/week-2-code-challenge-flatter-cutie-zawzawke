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

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    characterVotes.textContent = 0;
});


//BONUS
//Submit the form to add a new character
const characterForm = document.getElementById("character-form");

characterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = document.getElementById("new-name").value;
    const newImage = document.getElementById("image-url").value;

    if (!newName || !newImage) {
        alert("Please fill out both fields.");
        return;
    }

    const newCharacter = {
        id: Date.now(),
        name: newName,
        image: newImage,
        votes: 0
    };


    const span = document.createElement("span");
    span.textContent = newCharacter.name;
    span.classList.add("character-name");
    span.dataset.id = newCharacter.id;
    characterBar.appendChild(span);



    characterName.textContent = newCharacter.name;
    characterImage.src = newCharacter.image;
    characterVotes.textContent = 0;
    characterImage.alt = newCharacter.name;

    characterForm.reset();
});

//saves votes to backend
votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const voteInput = parseInt(document.getElementById("votes").value, 10);
    let newVoteCount = parseInt(characterVotes.textContent, 10) + voteInput;

    fetch(`${baseURL}/${detailedInfo.dataset.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: newVoteCount })
    })
    .then(response => response.json())
    .then(updatedCharacter => {
        characterVotes.textContent = updatedCharacter.votes;
    });

    votesForm.reset();
});



//Saves new characters to backend
characterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = document.getElementById("new-name").value;
    const newImage = document.getElementById("image-url").value;

    if (!newName || !newImage) {
        alert("Please fill out both fields.");
        return;
    }

    const newCharacter = { name: newName, image: newImage, votes: 0 };

    fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(addedCharacter => {
        // Add to character bar
        const span = document.createElement("span");
        span.textContent = addedCharacter.name;
        span.classList.add("character-name");
        span.dataset.id = addedCharacter.id;
        characterBar.appendChild(span);

        // Display character
        characterName.textContent = addedCharacter.name;
        characterImage.src = addedCharacter.image;
        characterVotes.textContent = addedCharacter.votes;
        characterImage.alt = addedCharacter.name;
    });

    characterForm.reset();
});






