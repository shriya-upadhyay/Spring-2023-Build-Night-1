# Hello World and Counter App 👋 🌎 🔢

### Hello World Contract:
1. Navigate to https://remix.ethereum.org/
2. Create a new file under the contracts folder and name it `HelloWorld.sol`
3. Add the following two lines at the top of your file:
    ```solidity
    //SPX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    ```
    The first line defines which license the code should be released under - which is useful for legal purposes and if someone wants to reuse the code later.

    The second line determines which compiler version can be used to compile the code. This one means compiler version greater than 0.8.0 but less than 0.9.0.
4. Create the HelloWorld contract by adding the following to your file (everything else will go inside of these brackets):
    ```solidity
    contract HelloWorld {
    }
    ```
    This declares a new contract and names it **HelloWorld**

5. Add the following variable inside your contract:
    ```solidity
    string private message;
    ```
    This defines the type of the variable (string), the keyword **private** means only functions inside the contract can access it. Other keywords include **public** (anyone can call/access it), **internal** (contract itself and contracts that inherit from it can access it), **external** (can only be called by functions outside the contract).

6. Add the following constructor inside your contract:
    ```solidity
    constructor() {
        message = "Hello World!";
    }
    ```
    This constructor sets up the initial value of the message variable when the contract is deployed (published to the blockchain).

7. Add the following function inside your contract:
    ```solidity
    function getMessage() public view returns (string memory) {
        return message;
    }
    ```
    This function is public (so it can be called by anyone) and has the view acccess modifier so callers of the function cannot modify state so the function can read from storage (permanently on-chain) but not write to it. 
    
    The message variable is stored in storage, however, when the value is returned to a function it is copied to memory (temporary) because function return values are temporarily stored to return to the user.

8. Add the following function inside your contract:
    ```solidity
    function setMessage(string memory newMessage) public {
        message = newMessage;
    } 
    ```
    This function is public (can be called by anyone) and takes a temporary string variable newMessage as a parameter. newMessage is not stored permanently on-chain, hence the memory keyword. 

    It then updates the message variable to contain the value of newMessage.

9. This is what your final contract should look like:
    ```solidity
    //SPX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract HelloWorld {
        //Private variable to store message

        string private message;

        // Constructor sets initial message
        constructor() {
            message = "Hello World!";
        }

        //Get current message

        function getMessage() public view returns (string memory) {
            return message;
        }

        function setMessage(string memory newMessage) public {
            message = newMessage;
        }



    }
    ```

10. Navigate to the Solidity compiler on the menu bar on the left side (or press Ctrl/Cmd + S) to compile your contract.

11. Navigate to the deploy button on the menu bar on the left side to deploy your contract.

12. Scroll down after deploying your contract to the **Deployed Contracts** section. You can interact with your contract now by hitting the getMessage button or adding a value in the textbox next to the setMessage button and then hitting the setMessage button. 


## Counter dApp 🔢

### Environment Setup:
- Install [Visual Studio Code](https://code.visualstudio.com/) (or your favorite IDE)
- Install [wsl](https://learn.microsoft.com/en-us/windows/wsl/install) if you have windows
- Install [Node/npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) (I used Node Version Manager but you can also use Homebrew/Node installer)
- Fork the Build Night 1 repo at [this](https://github.com/BlockchainUSC/Spring-2023-Build-Night-1) link
- Navigate to the folder where you want to store your repo in your terminal
- Clone the repo by typing `git clone <URL>`, where `<URL>` is the link that appears after hitting the green **Code** button in the top right of your repo.

### Getting Started
- Open the folder that contains the repo for Build Night 1 in Visual Studio Code (or your preferred IDE)
- Create a new Terminal window by hitting terminal in the top left and clicking new terminal
- Navigate to the Build Night 1 folder in terminal
- Type in the command: `cd start` to enter the starting code directory
- Create a new folder called blockchain: `mkdir blockchain`
- Navigate to the blockchain folder: `cd blockchain`


### Setting up Hardhat
- What is Hardhat? 
    JavaScript-based framework to compile, test, deploy smart contracts. 
- Run the command: `npx hardhat --init`
- Choose Hardhat 3 Beta
- project root is the current directory (hit enter)
- Select Typescript Project using Mocha and Ethers.js
- Hit true for installing necessary dependencies


### Smart Contract
- Inside of blockchain/contracts, delete Counter.sol (we'll write our own counter) and create a file called **firstDapp.sol** and copy the following code into the file: 
    ```solidity
    //SPDX-License-Identifier: MIT
    pragma solidity^0.8.17;
    ```
    This initializes the compiler version and licensing.
- Create the contract
    ```solidity
    contract Counter {

    }
    ```
- Add necessary on-chain data members to the contract

    ```solidity
    uint public count;
    ```
    This is an unsigned, public integer called count.
- Add the counter increment function:
    ```solidity
    function get() public view returns (uint) {
        return count;
    }
    ```
    This is a public function that cannot modify state. It returns a uint which is the count variable. We don't need the memory keyword here because uint is always passed by value instead of by reference.

- Add the counter increment function:
    ```solidity
    function inc() public {
        count +=1;
    }
    ```
    This is a public function that modifies the state of the count variable.

- Add the counter decrement function:
    ```solidity
    function dec() public {
        //This function will fail if count <= 0
        count -=1;
    }
    ```
    This is a public function that modifies the state of the count variable.


### Add your private key and environment variables
- run `npm install dotenv` in your terminal
- Create a .env file in your blockchain folder and add your private key to it in this format:  `PRIVATE_KEY=Private_KEY` (no quotes)

- Navigate to Alchemy, create an account, and navigate to dashboard: https://dashboard.alchemy.com/
- Navigate to Apps and click create new app, select the Ethereum Chain, Hit next on the services page
- On the Integrate your app page, select Sepolia as the Network
- Navigate to Neworks page, change the drop down to Sepolia and copy the URL

- Add the URL to your .env file in this format: `RPC_URL=URL` (no quotes)

- Update your hardhat.config.ts file to reference these values like this:  (make sure to import dotenv/config)

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import "dotenv/config";

const Private_Key = process.env.PRIVATE_KEY || "";
const RPC_URL = process.env.RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      type: "http",
      url: RPC_URL,
      accounts: Private_Key ? [`0x${Private_Key}`] : [],
    },
  },
};

export default config;
```

### Creating a deployment script:
- Within the blockchain folder, create a folder called scripts and within scripts create a file called **deploy.ts** which will allow hardhat to deploy our contract
- Add the following code to deploy.ts:

```typescript
// scripts/deploy.ts

import { ethers } from "ethers";
import hre from "hardhat";

async function main() {
    console.log("Deploying Counter contract to Sepolia...");
    
    // Create provider and wallet using environment variables
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    //check if private key exists
    if (!process.env.PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY environment variable is not set");
    }

    //create ethers wallet using prviate key and RPC provider
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    // Get the contract artifacts (the ABI and bytecode that were generated from the compilation)
    const counterArtifact = await hre.artifacts.readArtifact("Counter");
    
    // Create contract factory using user's private key, abi, and bytecode of the contract
    const Counter = new ethers.ContractFactory(
        counterArtifact.abi,
        counterArtifact.bytecode,
        wallet
    );
    
    // Deploy the contract
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    
    console.log(`Counter contract deployed to: ${await counter.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

```


### Compile your contract
In terminal (in the blockchain directory), run `npx hardhat compile`


### Deploy your contract
In terminal (in the blockchain directory), run `npx hardhat run scripts/deploy.ts --network sepolia`

You should see an output like `Deploying Counter contract to Sepolia... Counter contract deployed to: 0xFC045EA72FEb94531f98f3B3bB7EE09F0650c934`

***Save*** your contract address. We will need it again later.


## Integrating with Frontend
- Navigate to frontend folder in terminal
- Run npm install
- Run npm run start
- Copy the Counter.json file from the artifacts/contracts folder in the blockchain folder into the src folder in the frontend
- Add import firstContract from "./Counter.json"; at the top of the App.js file

## Create a contract object in App.js
- At the very top of function App() {
    }, add the following code to store our contract info:
    `const contractAddress = "0x... <your contract address from earlier"";` and `let signer;` directly below it.
- Add your address from earlier into the contract address variable.
- Then, add the following code block `  const [contract, setContract] = useState();` to keep track of our contract object.
- Update the onClickConnect function so that it looks like this:

```solidity
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

      signer = provider.getSigner();
      setContract( 
        new ethers.Contract(contractAddress, firstContract.abi, signer)
      );
  };
```
Note how the last two lines store the signer, an object that can sign transactions on behalf of the connected wallet account and create a contract object using your contract's address, its ABI, and your signer information.

## Store number returned by Contract

- Add the following two imports at the top of your file: `import { useState, useEffect } from "react";` and `import { ethers, BigNumber } from "ethers";`
- Create another function getCount in App.js to store the value returned by the contract:

```javascript
const getCount = async () => {
    let count = await contract.get();
    setCount(BigNumber.from(count).toNumber());
};

```

- Ensure that getCount is called initially when the user connects their wallet using a useEffect hook in App.js. Add the following code in your App function

```javascript
useEffect(() => {
    if (contract == undefined) return;
    console.log("Getting initial count from contract");
    getCount();
    console.log("Initial count received");
}, [contract]);

```


## Create increase and decrease functions
Add the following additional functions to your App.js to force the increase and decrease buttons to call your smart contract:

```javascript
async function increase() {
    if (contract == undefined) {
        return;
    }

    console.log("increasing count");
    const tx = await contract.inc();
    await tx.wait();
    console.log("getting count");
    //update count in frontend
    getCount();
}
```

```javascript
async function decrease() {
    if (contract == undefined) {
        return;
    }
    console.log("decreasing count");
    const tx = await contract.dec();
    await tx.wait();
    console.log("getting count");
    //update count in frontend
    getCount();
}
```

## Update your buttons to call these functions

Change this line of code to say onClick = {increase} as shown below:
```HTML
<button className="mx-8 rounded-2xl py-1 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-gradient-to-l" onClick={increase} > Increase </button>
```

Change this line of code to say onClick = {decrease} as shown below:

```HTML
 <button className="mx-8 rounded-2xl py-1 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-gradient-to-l" onClick={decrease} > Decrease </button>
```


# Try out your counter app!











Notion: 
-   https://blockchain-usc.notion.site/Spring-23-Build-Nights-e091ae838f7d447d8fce9740a0f9c1c2
