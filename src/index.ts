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
    const counter = new ethers.Contract(
        //@ts-ignore
        process.env.CONTRACT_ADDRESS,
        [
            "function count() public",
            "function getCounter() public view returns (uint32)",
        ],
        new ethers.providers.Web3Provider(getEth()),
    )
    //@ts-ignore
    const el = document.createElement('div');
    async function setCounter() {
        el.innerHTML = await counter.getCounter();
    }
    setCounter();
    const button = document.createElement('button');
    button.innerText = "Increment count";
    button.onclick = async function() {
        await counter.count();
        setCounter();
    }
    document.body.appendChild(el);
    document.body.appendChild(button);
}

run();