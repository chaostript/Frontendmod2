# Mod2

The contract contains a private array variable called "names," which will store the names added by users. The "private" visibility modifier restricts direct access to this variable from outside the contract.

- The setName function allows users to add a new name to the "names" array. It takes a string parameter _name and appends it to the end of the array.

- The getAllNames function is a view function, meaning it does not modify the contract's state. It returns the complete list of names stored in the "names" array.

- The reset function deletes all the names stored in the "names" array. It uses the delete keyword to clear the array.

- The deleteName function allows users to remove a specific name from the "names" array. It takes a string parameter _name and iterates through the array to find a match. If a match is found, the function shifts all subsequent elements one position to the left to overwrite the matched name. Finally, it uses the pop function to remove the last element from the array, effectively deleting the target name.

### index.js

- It is a React component that interacts with a Solidity smart contract. It allows users to perform various actions on a list of names stored in the contract. The component displays an input field and a button for adding a name to the list, an input field and a button for deleting a name from the list, and buttons for retrieving all names and deleting all names.

- When a user adds a name, the component calls the setName function of the contract and sends a transaction to add the name to the list. When a user deletes a name, the component calls the deleteName function of the contract and sends a transaction to remove the specified name from the list.

### Setup
After cloning the github, you will want to do the following to get the code running on your computer.

- Inside the project directory, in the terminal type: npm i
- Open two additional terminals in your VS code
- In the second terminal type: npx hardhat node
- In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
- Back in the first terminal, type npm run dev to launch the front-end.
  
## After this, the project will be running on your localhost. Typically at http://localhost:3000/
