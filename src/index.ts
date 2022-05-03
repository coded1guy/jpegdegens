import { ethers } from "ethers";

function getEth() {
    //@ts-ignore
    const ethObj = window.ethereum;
    if(!ethObj) {
        throw new Error("Get metamask from the extensions marketplace of your browser");
    } else {
        return ethObj;
    }
}

async function hasAccount() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_accounts"}) as string[];
    return accounts && accounts.length;
}

async function requestAccount() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_requestAccounts"}) as string[];
    return accounts && accounts.length;
}

async function run() {
    if(!await hasAccount() && !await requestAccount()) {
        throw new Error("please let us take your money");
    }
    const hello = new ethers.Contract(
        "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        [
            "function getter() public pure returns(string memory)"
        ],
        new ethers.providers.Web3Provider(getEth()),
    )
    //@ts-ignore
    document.querySelector("#hello").innerHTML = "waiting.....";
    document.querySelector("#hello").innerHTML = await hello.getter();
}

run();