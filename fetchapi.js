
var fromBasis = document.getElementById("source");
var toPrice = document.getElementById("target");
var toMenu = document.getElementById("to-menu");
var fromMenu = document.getElementById("from-menu");
var toSelect = document.getElementsByClassName("to-currency");
var fromSelect = document.getElementsByClassName("from-currency");
var valueInput = document.getElementById("currency-qty");
var toCurrency = "USD";
var fromCurrency = "BTC";

async function getCryptoPrices() {
     try {
        // Use the Fetch API to retrieve cryptocurrency prices from the API
        let response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=" + fromCurrency + "&tsyms=" + toCurrency + "&api_key=fb6b949401ee6d719e0f0ba8904d30819b9690f05fd46b9096ebe6df91640d53");

        // Check if the response was successful (status code 200)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Get the JSON data from the response
        let multiplier = valueInput.value;
        let data = await response.json();
        let price = data[toCurrency];
        document.getElementById("final-value").value = price * multiplier;
    } 

    // Handle any errors that might occur during the fetch operation
    catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
    }
}

// adding eventlistener for currency list
for(var i = 0; i < toSelect.length; i++) {
    toSelect[i].addEventListener("click", function() {
        toMenu.classList.remove("expand");
        toCurrency = this.textContent;
        toPrice.textContent = toCurrency;
        getCryptoPrices();
    });
}

// adding eventlistener for crypto list
for(var i = 0; i < fromSelect.length; i++) {
    fromSelect[i].addEventListener("click", function() {
        fromMenu.classList.remove("expand");
        fromCurrency = this.textContent;
        fromBasis.textContent = fromCurrency;
        getCryptoPrices();
    });
}

// to show/remove currency list
toPrice.addEventListener("click", function() {
    if(toMenu.classList.contains("expand")) {
        toMenu.classList.remove("expand");
    } else {
        toMenu.classList.add("expand");
    }
});

// to show/remove crypto list
fromBasis.addEventListener("click", function() {
    if(fromMenu.classList.contains("expand")) {
        fromMenu.classList.remove("expand");
    } else {
        fromMenu.classList.add("expand");
    }
});

// to call function on each crypto value change
valueInput.addEventListener("input",getCryptoPrices);

getCryptoPrices();