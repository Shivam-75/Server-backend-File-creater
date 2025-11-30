#!/usr/bin/env node
import fs from "fs";
import { exec } from "child_process";

console.log("Author : Shivam Pandey");
console.log("📁 Creating Backend Structure...\n");

const createFolder = (folderPath) => {
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log("📂 Folder Created:", folderPath);
    } catch (err) {
        console.log("❌ Folder not Created:", err);
    }
};

const createFile = (filePath, content = "") => {
    try {
        fs.writeFileSync(filePath, content);
        console.log("📝 File Created:", filePath);
    } catch (err) {
        console.log("❌ File not Created:", err);
    }
};

// Create backend folder structure
createFolder("Server");
createFolder("Server/public");
createFolder("Server/src");
createFolder("Server/src/controller");
createFolder("Server/src/models");
createFolder("Server/src/routes");
createFolder("Server/src/database");
createFolder("Server/src/middleware");

// Server code
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
  res.send("Welcome");
});

Db().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log("🚀 Server running at http://localhost:" + PORT));
});
`;

createFile("Server/index.js", serverCode);

// ENV file
createFile("Server/.env", `MONGO_DB_URL=\nPORT=3000`);

// Database code
const databaseCode = `
import mongoose from "mongoose";

const Db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("📡 Database Connected:", connection.connection.host);
  } catch (err) {
    console.log("❌ Database Connection Failed:", err.message);
  }
};

export default Db;
`;

createFile("Server/src/database/Db.js", databaseCode);

console.log("\n⚡ Installing Required Packages...\n");

// Install dependencies
exec(
    "npm install express mongoose dotenv cors cookie-parser compression",
    (err, stdout, stderr) => {
        if (err) {
            console.log("❌ Installation Error:", err.message);
            return;
        }
        console.log(stdout);
        console.log("✔️ All packages installed successfully!");
    }
);
