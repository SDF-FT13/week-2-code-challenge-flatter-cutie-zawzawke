document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetBtn = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");

    // Fetch and display characters in the character bar
    fetch(baseURL)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => addCharacterToBar(character));
        })
        .catch(error => console.error("Error fetching characters:", error));

    function addCharacterToBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.classList.add("character-name");
        span.dataset.id = character.id;
        characterBar.appendChild(span);
    }

    // Display detailed character info when a name is clicked
    characterBar.addEventListener("click", event => {
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
                })
                .catch(error => console.error("Error fetching character details:", error));
        }
    });

    // Handle voting
    votesForm.addEventListener("submit", event => {
        event.preventDefault();

        const voteInput = parseInt(document.getElementById("votes").value, 10);
        const characterId = detailedInfo.dataset.id;
        if (!characterId) return;

        let newVoteCount = parseInt(characterVotes.textContent, 10) + voteInput;

        fetch(`${baseURL}/${characterId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: newVoteCount })
        })
        .then(response => response.json())
        .then(updatedCharacter => {
            characterVotes.textContent = updatedCharacter.votes;
        })
        .catch(error => console.error("Error updating votes:", error));

        votesForm.reset();
    });

    // Reset votes to 0
    resetBtn.addEventListener("click", () => {
        characterVotes.textContent = 0;
    });

    // Handle adding a new character
    characterForm.addEventListener("submit", event => {
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
            addCharacterToBar(addedCharacter);

            // Display newly added character
            characterName.textContent = addedCharacter.name;
            characterImage.src = addedCharacter.image;
            characterVotes.textContent = addedCharacter.votes;
            characterImage.alt = addedCharacter.name;
        })
        .catch(error => console.error("Error adding new character:", error));

        characterForm.reset();
    });
});






