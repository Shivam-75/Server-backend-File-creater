#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const projectPath = process.cwd();  // user project root

console.log("\n===================================");
console.log(" Auto Backend Generator - Shivam Pandey");
console.log("===================================\n");

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

// Path set for Server folder OUTSIDE node_modules
const serverRoot = path.join(projectPath, "Server");
exec(`npm init -y`, { cwd: serverRoot }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error initializing npm: ${error}`);
        return;
    }
    console.log(stdout);
});

// Create structure
createFolder(serverRoot);
createFolder(path.join(serverRoot, "public"));
createFolder(path.join(serverRoot, "src"));
createFolder(path.join(serverRoot, "src/controller"));
createFolder(path.join(serverRoot, "src/models"));
createFolder(path.join(serverRoot, "src/routes"));
createFolder(path.join(serverRoot, "src/database"));
createFolder(path.join(serverRoot, "src/middleware"));

// Server file
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

createFile(path.join(serverRoot, "index.js"), serverCode);

// .env
createFile(path.join(serverRoot, ".env"), `MONGO_DB_URL=\nPORT=5000`);

// DB
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

createFile(path.join(serverRoot, "src/database/Db.js"), dbCode);

// Install dependencies
console.log("\n⚡ Installing Required Packages...");

exec(
    "npm install express mongoose dotenv cors cookie-parser compression",
    { cwd: "./Server" },
    (err, stdout) => {
        if (err) {
            console.log("❌ Package Install Error:", err.message);
            return;
        }

        console.log(stdout);
        console.log("\n✔ Backend Packages Installed Successfully!");

    }
);

exec(
    "del .gitiindex.js",
    { cwd: "/dsd/index.js" },
    (err, stdout) => {
        if (err) {
            console.log("❌ Package Install Error:", err.message);
            return;
        }

    }
);
const fnlunking = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

fnlunking("./index.js")
fnlunking("./package-lock.json")
fnlunking("./package.json")
fnlunking("./gitignore")

console.log("Success");