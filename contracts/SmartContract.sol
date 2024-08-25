// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string[] private names; // Adding a list to store names

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event NameAdded(string name); // Event for name addition
    event NameDeleted(string name); // Event for name deletion

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    // Add a name to the list
    function setName(string memory _name) public {
        require(msg.sender == owner, "You are not the owner");
        names.push(_name);
        emit NameAdded(_name);
    }

    // Get all names
    function getAllNames() public view returns (string[] memory) {
        return names;
    }

    // Delete a name from the list
    function deleteName(string memory _name) public {
        require(msg.sender == owner, "You are not the owner");
        for (uint i = 0; i < names.length; i++) {
            if (keccak256(abi.encodePacked(names[i])) == keccak256(abi.encodePacked(_name))) {
                names[i] = names[names.length - 1];
                names.pop();
                emit NameDeleted(_name);
                break;
            }
        }
    }

    // Reset all names
    function reset() public {
        require(msg.sender == owner, "You are not the owner");
        delete names;
    }
}
