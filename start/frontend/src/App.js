import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [count, setCount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState();

  const onClickConnect = async () => {
    if (!window.ethereum) {
      alert("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <body className="App-header from-gray-900 to-gray-600 bg-gradient-to-b">
        {/* Dapp Buttons */}

        <div className="mb-10">
          <h1 className="mb-8 font-semibold text-3xl">Count: {count} </h1>
          <div>
            <button
              className="mx-8 rounded-2xl py-1 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-gradient-to-l"
              onClick={() => setCount(count + 1)}
            >
              Increment
            </button>
            <button
              className="mx-8 rounded-2xl py-1 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-gradient-to-l"
              onClick={() => setCount(count - 1)}
            >
              Decrement
            </button>
          </div>

          <button
            className="mx-8 my-10 rounded-2xl py-1.5 px-8 bg-gray-600 hover:bg-gray-700"
            onClick={onClickConnect}
          >
            {currentAccount ? "Connected" : "Connect Wallet"}
          </button>
        </div>

        {/* Image + Links */}
        <img src={logo} className="App-logo" alt="logo" />
        <div className="flex flex-row gap-8 ">
          <a
            className=""
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Notion
          </a>
          <a
            className=""
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className=""
            href="https://www.blockchainusc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockchain@USC
          </a>
        </div>
      </body>
    </div>
  );
}

export default App;
