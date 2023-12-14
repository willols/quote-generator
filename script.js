const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
    // Hide Loading
    function complete() {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }


// Show New Quote 
function newQuote() {
    loading();
//  Pick A Random Quote For apiQuotes Arrray
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
authorText.textContent = quote.author;

// Check Quote Length
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// Set Quote, Hide loader
quoteText.textContent = quote.text;
complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listerner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();