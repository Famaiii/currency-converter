import React from 'react';
import {Block} from './Block';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = React.useState('RUB');
    const [toCurrency, setToCurrency] = React.useState('USD');
    const [fromPrice, setFromPrice] = React.useState(0);
    const [toPrice, setToPrice] = React.useState(1);


    // const [rates, setRates] = React.useState({});
    const ratesRef = React.useRef({});

    React.useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json())
            .then((json) => {
                // setRates(json.rates);
                onChangeToPrice(1);
                ratesRef.current = json.rates;
            }).catch(err => {
            console.warn(err)
            alert("Не удалось получить информаци")
        })
    }, [])

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[toCurrency];
        setFromPrice(value)
        setToPrice(Number(result.toFixed(3)));
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrice(Number(result.toFixed(3)));
        setToPrice(value)
    }

    React.useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency])

    React.useEffect(() => {
        onChangeToPrice(toPrice);
    }, [toCurrency])


    return (
        <div className="App">
            <Block value={fromPrice}
                   currency={fromCurrency}
                   onChangeCurrency={setFromCurrency}
                   onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;