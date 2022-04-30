const quote_container = document.getElementById("quote_container");
const quote_text = document.getElementById("quote_text");
const quote_auther = document.getElementById("quote_auther");
const twitter_btn = document.getElementById("twitter");
const new_quote_btn = document.getElementById("new_quote");

const loader = document.getElementById("loader");

// loading start function
function loading_start() {
    loader.hidden = false;
    quote_container.hidden = true
}

loading_start()
// loading end function 
function loading_end() {
    loader.hidden = true;
    quote_container.hidden = false;
 
}

// function to get new quote
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    
    try {
        loading_start();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if auther name is empty giving it "unknown"
        if(data.quoteAuthor === '' ){
            quote_auther.innerText = 'Unknown';
        } else {
            quote_auther.innerText = data.quoteAuthor;
        }

        // fixing the font size of the quote if it is too long
        if(data.quoteText.length > 120){
            quote_text.classList.add('long-quote');
        } else {
            quote_text.classList.remove('long-quote');
        }
        quote_text.innerText = data.quoteText;

        loading_end();
    } catch(error) {
        console.log("Whopps, no quote" , error);
        getQuote();
    }
}

function tweet() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote_text.innerText} __ ${quote_auther.innerText}`
    window.open(tweetUrl , '_blank')
}

// All eventListeners 

twitter_btn.addEventListener("click" , tweet);
new_quote_btn.addEventListener("click" , getQuote )


// calling getQuote function to run this on loading

getQuote();