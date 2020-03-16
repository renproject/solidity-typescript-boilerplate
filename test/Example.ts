import { ExampleInstance } from "../types/truffle-contracts";
import "./helper/testUtils";

const Example = artifacts.require("Example");

contract("Example", (accounts) => {

    let example: ExampleInstance;

    before(async () => {
        example = await Example.new();
    });

    it("Can call increment", async () => {
        await example.increment({ from: accounts[0] });
    });
});
