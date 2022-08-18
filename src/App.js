import React from "react";
// import axios from "axios";

import { Block } from "./Block";

import "./index.scss";

const rates = { RUB: 60.7, USD: 1, EUR: 0.983777, GBP: 0.831459 };

function App() {
  // const [rates, setRates] = React.useState({});
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(1);

  // React.useEffect(() => {
  //   try {
  //     const fetchRates = async () => {
  //       const { rates } = await axios.get("https://cdn.cur.su/api/latest.json");
  //       setRates(rates);
  //     };
  //     fetchRates()
  //   } catch (error) {
  //     alert("Ошибка!");
  //     console.log("Ошибка при получении валют");
  //     console.log(error);
  //   }
  // }, []);

  React.useEffect(() => {
    onChangeToValue(toValue)
  }, []);

  const onChangeFromValue = (value) => {
    const result = (value / rates[fromCurrency]) * rates[toCurrency];

    setToValue(result.toFixed(3));
    setFromValue(value);
  };
  const onChangeToValue = (value) => {
    const result = (value / rates[toCurrency]) * rates[fromCurrency];

    setToValue(value);
    setFromValue(result.toFixed(3));
  };

  const onChangeFromCurrency = (cur) => {
    if (cur === toCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setFromValue(toValue);
      setToValue(fromValue);
    }

    setFromCurrency(cur);
    onChangeFromValue(fromValue);
  };
  const onChangeToCurrency = (cur) => {
    if (cur === fromCurrency) {
      setToCurrency(fromCurrency);
      setFromCurrency(toCurrency);
      setToValue(fromValue);
      setFromValue(toValue);
    }

    setToCurrency(cur);
    onChangeToValue(toValue);
  };

  return (
    <div className="App">
      <Block
        value={fromValue}
        setValue={setFromValue}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency}
        onChangeValue={onChangeFromValue}
      />
      <Block
        value={toValue}
        setValue={setToValue}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency}
        onChangeValue={onChangeToValue}
      />
    </div>
  );
}

export default App;
