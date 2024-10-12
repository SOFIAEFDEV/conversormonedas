async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    if (amount === '' || fromCurrency === '' || toCurrency === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/65b86fc2d10f063fe5f144b7/latest/${fromCurrency}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];

        if (rate) {
            const result = amount * rate;
            document.getElementById('result').innerText = `${amount} ${fromCurrency} es igual a ${result.toFixed(2)} ${toCurrency}`;
        } else {
            alert('Moneda no válida.');
        }
    } catch (error) {
        alert('Error al convertir la moneda: ' + error.message);
        console.error('Error:', error);
    }
}
