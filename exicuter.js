import { run } from "./runcomd.js";

export async function exicution(rl) {
    try {
        const userDt = await rl.question("You Want to install Package express mongoose dotenv cors cookie-parser compression : yes/no ");
        if (userDt === "yes") {
            console.log("\n⚡ npm init process.....");

            await run("npm init -y", "server");
            console.log("\n✔ npm init done");

            console.log("\n⚡ Installing Required Packages...");
            await run("npm install express mongoose dotenv cors cookie-parser compression", "server");
            console.log("\n✔ installation Done ");
        }
        else {
            return;
        }
    } catch (err) {
        console.log(err);
    }
}