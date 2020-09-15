'use strict';

const doCalc = document.getElementById('do-calc'),
    doChange = document.getElementById('do-change'),
    selectFirst = document.getElementById('select1'),
    selectSecond = document.getElementById('select2'),
    strong = document.getElementById('strong');
    
    let rates = {} ;
    
    document.addEventListener('DOMContentLoaded', () => {
        fetch('https://api.exchangeratesapi.io/latest?base=USD')
            .then((response) => {
                if (response.status !== 200){
                    // console.log('fetch1:', response.status)
                    throw new Error('Custom error: status network not 200');
                }
                // console.log(response);
                return response.json()
            }).then((data) => {
                // console.log('fetch1:', data)
                // console.log('fetch1:', data.base)
                // console.log('fetch1:', data.rates.RUB)
                rates = data.rates;
                // console.log('fetch1:', rates)
                for (let el in rates){
                    const option = document.createElement('option');
                    const option1 = document.createElement('option');
                    option.setAttribute('value', el);
                    option1.setAttribute('value', el);
                    option.innerText = el;
                    option1.innerText = el;
                    selectFirst.append(option);
                    selectSecond.append(option1);
                }
            })
            .catch((error) => console.log('fetch1:', error));
    });

    doCalc.addEventListener('click', () => {
        const baseCurrency = selectFirst[selectFirst.selectedIndex],
               secondCurrency = selectSecond[selectSecond.selectedIndex],
               inputValue = document.getElementById('input-value');

       if (inputValue.value.length === 0){
            alert ('Введите сумму')
            return;
        } 
        else if (baseCurrency === undefined || secondCurrency === undefined) {
            alert ('Выберите валюту')
            return;
        }
        else if (baseCurrency.value === secondCurrency.value) {
            alert ('Выберите разные валюты')
            return;
        }
       
         
        // console.log(`https://api.exchangeratesapi.io/latest?base=${baseCurrency.value}`)
        
        fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency.value}`)
            .then((response) => {
                if (response.status !== 200){
                    // console.log('fetch2:', response.status)
                    throw new Error('Custom2 error: status network not 200');
                }
                return response.json();
            }).then((data) => {
                 const newRates = data.rates;
            
                for (let el in newRates){
                   if (el === secondCurrency.value)
                   {
                    //    console.log('let el in newRates', newRates[el]);
                       let total = +inputValue.value * newRates[el]
                       strong.innerText = ` ${total} ${secondCurrency.value} за ${+inputValue.value} ${baseCurrency.value} `;
                   }
                }
            })
            .catch((error) => console.log('fetch2:', error));
    });

    doChange.addEventListener('click', (e) => {
        e.preventDefault();
        const selectFirstValue = selectFirst.value,
            selectSecondValue = selectSecond.value;

            selectFirst.value = selectSecondValue;
            selectSecond.value = selectFirstValue; 
    });

  