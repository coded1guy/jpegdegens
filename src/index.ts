import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";
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
        Counter.abi,
        new ethers.providers.Web3Provider(getEth()).getSigner(),
    )
    //@ts-ignore
    const el = document.createElement('div');
    //@ts-ignore
    async function setCounter(count) {
        el.innerHTML = count || await counter.getCounter();
    }
    //@ts-ignore
    setCounter();
    const button = document.createElement('button');
    button.innerText = "Increment count";
    button.onclick = async function() {
        await counter.count();
    }
    //@ts-ignore
    counter.on(counter.filters.CounterInc(), function(count) {setCounter(count)})
    document.body.appendChild(el);
    document.body.appendChild(button);
}

run();