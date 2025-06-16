from web3 import Web3

from application.config import Config
from blockchain.abi import contract_abi

alchemy_url = Config.ALCHEMY_URL
contract_address = Config.CONTRACT_ADDRESS
public_key_metamask = Config.PUBLIC_KEY_METAMASK
private_key_metamask = Config.PRIVATE_KEY_METAMASK
w3 = Web3(Web3.HTTPProvider(alchemy_url))
contract_address_checksum = Web3.to_checksum_address(contract_address)
contract = w3.eth.contract(address=contract_address_checksum, abi=contract_abi)

gas = 20000000
gasPrice = w3.to_wei('150', 'gwei')

def get_token_information(carbon_credit_token_id: str):
    view_carbon_credit_func = contract.functions.viewCarbonCredit(carbon_credit_token_id)
    result = view_carbon_credit_func.call()
    return result


def create_token_on_blockchain(carbon_credit_token_id: str, owner_id: str):
    transaction = contract.functions.createCarbonCreditToken(carbon_credit_token_id, owner_id, " ").build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def create_tokens_on_blockchain(carbon_credit_tokens_ids: list[str], owner_id: str):
    transaction = contract.functions.createCarbonCreditTokens(carbon_credit_tokens_ids, owner_id, " ").build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def retire_tokens_on_blockchain(carbon_credit_tokens_ids: list[str]):
    transaction = contract.functions.retireCarbonCredits(carbon_credit_tokens_ids).build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def retire_token_on_blockchain(carbon_credit_token_id: str):
    transaction = contract.functions.retireCarbonCredit(carbon_credit_token_id).build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def change_token_owner_on_blockchain(carbon_credit_token_id: str, owner_id: str):
    transaction = contract.functions.changeOwnerOfCarbonCreditToken(carbon_credit_token_id, owner_id).build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def change_tokens_owner_on_blockchain(carbon_credit_tokens_ids: list[str], owner_id: str):
    transaction = contract.functions.changeOwnerOfCarbonCreditTokens(carbon_credit_tokens_ids, owner_id) \
        .build_transaction({
        'from': public_key_metamask,
        'gas': gas,
        'gasPrice': gasPrice,
        'nonce': w3.eth.get_transaction_count(public_key_metamask),
    })
    status = handle_write_transaction(transaction)
    if status:
        return True
    else:
        return False


def handle_write_transaction(transaction):
    signed_tx = w3.eth.account.sign_transaction(transaction, private_key=private_key_metamask)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print('tx_hash', tx_hash)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx_receipt_status', tx_receipt.status)
    return tx_receipt.status
