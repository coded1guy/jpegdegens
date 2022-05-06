import "@nomiclabs/hardhat-ethers";
//@ts-ignore
import { ethers } from "hardhat";

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    return counter;
}

//@ts-ignore
async function count(counter) {
    await counter.count();
    console.log("Counter is now", await counter.getCounter());
}

deploy().then(count);