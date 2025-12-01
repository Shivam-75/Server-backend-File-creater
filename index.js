#!/usr/bin/env node
import fs from "fs";
import { exec } from "child_process";
import readline from "node:readline/promises"

console.log("\n=======================================");
console.log(" Auto Backend folder Generator - author Shivam Pandey");
console.log("=========================================\n");

const createFolder = (folderPath) => {
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log("📁 Folder Created:", folderPath);
    } catch (err) {
        console.log("❌ Folder Not Created:", err.message);
    }
};

const createFile = (filePath, content = "") => {
    try {
        fs.writeFileSync(filePath, content);
        console.log("📝 File Created:", filePath);
    } catch (err) {
        console.log("❌ File Not Created:", err.message);
    }
};

function run(cmd, cwd) {
    return new Promise((resolve, reject) => {
        exec(cmd, { cwd }, (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
}



async function exicution(rl) {
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


async function fileExicution(rl) {

    const userDt = await rl.question("\n You Want to Create File like Server and Database yes/no : ");

    if (userDt === "yes") {
        const serverCode = `
    import express from "express";
    import { config } from "dotenv";
    import compression from "compression";
    import cookieParser from "cookie-parser";
    import Db from "./src/database/Db.js";
    import cors from "cors";

    config();

    const app = express();

    app.use(cors({ origin: "*", credentials: true }));
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.get("/", (req, res) => {
      res.send("Welcome to Auto Generated Backend!");
    });

    Db().then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () =>
        console.log("🚀 Server running at http://localhost:" + PORT)
      );
    });
    `;

        createFile("server/index.js", serverCode);

        createFile("server/.env", `MONGO_DB_URL=\nPORT=5000`);

        const dbCode = `
    import mongoose from "mongoose";

    const Db = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("📡 Database Connected:", conn.connection.host);
      } catch (err) {
        console.log("❌ Database Error:", err.message);
      }
    };

    export default Db;
    `;
        createFile("server/src/database/Db.js", dbCode);
        await exicution(rl);
    } else {
        return;
    }

}

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
