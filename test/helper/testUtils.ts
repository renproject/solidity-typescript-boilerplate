
import * as chai from "chai";
import * as crypto from "crypto";

import BigNumber from "bignumber.js";
import chaiAsPromised from "chai-as-promised";
import chaiBigNumber from "chai-bignumber";

// Import chai log helper
import "./logs";

chai.use(chaiAsPromised);
chai.use((chaiBigNumber as any)(BigNumber) as any);
chai.should();

export const ETHEREUM_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const NULL = "0x0000000000000000000000000000000000000000";
export const NULL20 = NULL;
export const NULL32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const randomBytes = (bytes: number): string => {
    return `0x${crypto.randomBytes(bytes).toString("hex")}`;
};

const increaseTimeHelper = async (seconds: number) => {
    await new Promise((resolve, reject) => {
        web3.currentProvider.send(
            { jsonrpc: "2.0", method: "evm_increaseTime", params: [seconds], id: 0 } as any,
            ((error, _response) => {
                if (error) {
                    reject(error);
                }
                web3.currentProvider.send({
                    jsonrpc: "2.0",
                    method: "evm_mine",
                    params: [],
                    id: new Date().getSeconds()
                } as any, ((internalError, _responseInner) => {
                    if (internalError) {
                        reject();
                    }
                    resolve();
                }) as any);
            }) as any
        );
    });
};

const getCurrentTimestamp = async (): Promise<number> => {
    const ts = new BigNumber((await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp);
    return ts.toNumber();
};

export const increaseTime = async (seconds: number) => {
    let currentTimestamp = await getCurrentTimestamp();
    const target = currentTimestamp + seconds;
    do {
        const increase = Math.ceil(target - currentTimestamp + 1);
        increaseTimeHelper(increase);
        currentTimestamp = await getCurrentTimestamp();
        // console.log(`Increased by ${increase} to is ${currentTimestamp}. Target is ${target}. Reached: ${currentTimestamp >= target}`);
    } while (currentTimestamp < target);
};
