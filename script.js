// Объект с курсами 3-х валют
const rates = {};
// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value = "USD"]');
const elementEUR = document.querySelector('[data-value = "EUR"]');
const elementGBP = document.querySelector('[data-value = "GBP"]');
// Элементы формы, ввод сумм, выбор валют, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


getCurrencies();
// Функция получения курса валют мим отображения их на странице
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    console.log(rates);

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    // Цвет для инликаторов USD
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    // Цвет для инликаторов EUR
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }
// Цвет для инликаторов GBP
    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
}

}

// Слушаем изменения  в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

//Функиця конвертации
function convertValue () {
    result.value = (parseFloat(input.value) / rates[select.value].Value ).toFixed(2);
}