#!/usr/bin/env node
import readline from "node:readline/promises"
import { createFolder } from "./folderCreater.js";
import { fileExicution } from "./fileexicution.js";

console.log("\n=======================================");
console.log(" Auto Backend folder Generator - author Shivam Pandey");
console.log("=========================================\n");


async function main() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        while (true) {
            const userDt = await rl.question("You Want to Create Folder Structure yes/no :  ");
            if (userDt === "yes") {
                createFolder("server/public");
                createFolder("server/src");
                createFolder("server/src/controller");
                createFolder("server/src/models");
                createFolder("server/src/routes");
                createFolder("server/src/database");
                createFolder("server/src/middleware");
                createFolder("server/src/utils");
                await fileExicution(rl);
                break;
            }
            else {
                break;
            }
        }

        rl.close();
    } catch (err) {
        console.log(err);
    }
}
main();
