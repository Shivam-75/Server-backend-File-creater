#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟢 User project location (IMPORTANT!)
const projectPath = process.cwd();

console.log("\n===================================");
console.log(" Author : Shivam Pandey");
console.log(" Backend Auto Folder Generator");
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

// 🟢 Create Folder Structure in USER PROJECT (not node_modules!)
createFolder(path.join(projectPath, "Server"));
createFolder(path.join(projectPath, "Server/public"));
createFolder(path.join(projectPath, "Server/src"));
createFolder(path.join(projectPath, "Server/src/controller"));
createFolder(path.join(projectPath, "Server/src/models"));
createFolder(path.join(projectPath, "Server/src/routes"));
createFolder(path.join(projectPath, "Server/src/database"));
createFolder(path.join(projectPath, "Server/src/middleware"));

// 🟢 Server Code
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
}).catch((err) => {
  console.log("❌ Database Error:", err.message);
});
`;

createFile(path.join(projectPath, "Server/index.js"), serverCode);

// 🟢 .env
createFile(
    path.join(projectPath, "Server/.env"),
    `MONGO_DB_URL=\nPORT=5000`
);

// 🟢 Database File
const dbCode = `
import mongoose from "mongoose";

const Db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("📡 Database Connected:", conn.connection.host);
  } catch (err) {
    console.log("❌ Database Connection Failed:", err.message);
  }
};

export default Db;
`;

createFile(
    path.join(projectPath, "Server/src/database/Db.js"),
    dbCode
);

// 🟢 Install all required packages in USER PROJECT
console.log("\n⚡ Installing Required Packages...\n");

exec(
    "npm install express mongoose dotenv cors cookie-parser compression",
    { cwd: projectPath },
    (err, stdout, stderr) => {
        if (err) {
            console.log("❌ Installation Error:", err.message);
            return;
        }

        console.log(stdout);
        console.log("✔ All Packages Installed Successfully!");
        console.log("\n🎉 Backend Folder Structure Ready!");
        console.log("👉 Navigate to folder:  Server/");
        console.log("👉 Start server:        node Server/index.js\n");
    }
);
