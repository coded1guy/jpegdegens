import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", function() {
    it("should say hi", async function() {
        const HelloWorld = await ethers.getContractFactory("helloWorld");
        const hello = await HelloWorld.deploy();
        //await hello.deployed();

        expect(await hello.getter()).to.equal("Hello, World");
    })
})