contract_abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_carbonCreditTokenId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_newOwnerId",
                "type": "string"
            }
        ],
        "name": "changeOwnerOfCarbonCreditToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_carbonCreditTokenIds",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "_newOwnerId",
                "type": "string"
            }
        ],
        "name": "changeOwnerOfCarbonCreditTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_carbonCreditTokenId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_ownerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "createCarbonCreditToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_carbonCreditTokenIds",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "_ownerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "createCarbonCreditTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_carbonCreditTokenId",
                "type": "string"
            }
        ],
        "name": "retireCarbonCredit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_carbonCreditTokenIds",
                "type": "string[]"
            }
        ],
        "name": "retireCarbonCredits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_carbonCreditTokenIds",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "setTokensDescription",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_carbonCreditTokenId",
                "type": "string"
            }
        ],
        "name": "viewCarbonCredit",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
