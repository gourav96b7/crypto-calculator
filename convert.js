function convert() {
    var fromCryto = document.getElementById("fromCrypto").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var currencyQty = document.getElementById("quantity").value;
    async function getCryptoPrices() {
        try {
           // Use the Fetch API to retrieve cryptocurrency prices from the API
           let response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=" + fromCryto + "&tsyms=" + toCurrency + "&api_key=fb6b949401ee6d719e0f0ba8904d30819b9690f05fd46b9096ebe6df91640d53");
    
           // Check if the response was successful
           if (!response.ok) {
               throw new Error("Network response was not ok");
           }
    
           // Get the JSON data from the response
           let data = await response.json();
           let price = data[toCurrency];
           document.getElementById("result").value = (price * currencyQty).toFixed(2);
       } 
    
       // Handle any errors that might occur during the fetch operation
       catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
        }
    }
    getCryptoPrices();
}