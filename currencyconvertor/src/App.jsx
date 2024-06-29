import { useState } from "react";
import "./App.css";

import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/usecurrencyinfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to] || 1);
  };

  return (
    <>
      <div
        className=" w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat   "
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/15876210/pexels-photo-15876210/free-photo-of-tallebudgera-creek-bridge.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load")`,
        }}
      >
        <div className="w-full">
          <div className="bg-orange-950   max-w-md mx-auto border border-gray-950 rounded-lg p-5 backdrop-blur-sm  ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setAmount(amount)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>

              <div className="  relative w-full h-0.5">
                <button
                  className="bg-red-300 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-pink-400 rounded-md text-black px-2 py-0.5"
                  type="button"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                className="w-full bg-red-300 text-black px-4 py-3 rounded-lg"
                type="submit"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
