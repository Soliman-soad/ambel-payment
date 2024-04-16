const axios = require('axios');

const CurrencyConverter = async (from, to, amount) => {
    try {

        const response = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`, {
            headers: {
                "apikey": process.env.LAYER_API_KEY
            }
        });


        return response?.data?.result?.toFixed(2);
    } catch (error) {

        console.error("Error fetching data:", error.message);
        throw error; // You may want to handle the error appropriately in your application
    }
}

module.exports = CurrencyConverter;
