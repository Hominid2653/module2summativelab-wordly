const api_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

async function getWordData(word) {
    try {
        const response = await fetch(`${api_url}${word}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching word data:', error);
        throw error;
    }
}

// get html elements
const form = document.querySelector(".search-box");
const input = document.querySelector(".search-box input");
const wordTitle = document.querySelector("#word-title");
const definition = document.querySelector("#definition");

// handle user search
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const word = input.value.trim();
    if (!word) return;

    getWordData(word)
    .then(data => {
        console.log('Word data:', data);

        // showing data in UI safely
        if (data && data[0] && data[0].meanings) {
            wordTitle.textContent = data[0].word;
            definition.textContent = data[0].meanings[0].definitions[0].definition;
        } else {
            wordTitle.textContent = "Word not found";
            definition.textContent = "No definition available";
        }
    })
    .catch(() => {
        wordTitle.textContent = "Error";
        definition.textContent = "Something went wrong.";
    });
});