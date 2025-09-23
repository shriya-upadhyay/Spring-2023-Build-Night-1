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
- Install [Visual Studio Code](https://code.visualstudio.com/)
- Install [wsl](https://learn.microsoft.com/en-us/windows/wsl/install) if you have windows
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
- Run the command `npm install -d hardhat@latest @nomicfoundation/hardhat-ethers ethers@6.1.0`
  - Installs Hardhat, Hardhat plugin for ethers.js, and the ethers.js library
- Run the command: `npx hardhat init`
  - Select Typescript Project 
  - project root is the current directory (hit enter)
  - add gitignore: y 
  - Install this sample project’s dependencies with npm: y



Notion: 
-   https://blockchain-usc.notion.site/Spring-23-Build-Nights-e091ae838f7d447d8fce9740a0f9c1c2