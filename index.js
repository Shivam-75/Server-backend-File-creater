import fs from "fs"
import path from "path"
import { exec } from "child_process";
import { stdout } from "process";

console.log("author : Shivam Pandey")

console.log(`File Creates....`);

const createFolder = async (folderPath) => {
    try {

        fs.mkdirSync(folderPath, { recursive: true });
        console.log("Folder Created Successfully !! ", folderPath);
    } catch (err) {
        console.log("Folder not Created !! ", err);
        return
    }
}

const createFile = async (filePath, content = "") => {
    try {

        fs.writeFileSync(filePath, content);
        console.log("Created File ....")

    } catch (err) {
        console.log("file not Created !! ", err)
        return;
    }
}

//?create file folder
createFolder("Server");
createFolder("Server/public");
createFolder("Server/src");
createFolder("Server/src/controller");
createFolder("Server/src/models");
createFolder("Server/src/routes");
createFolder("Server/src/database");
createFolder("Server/src/middleware");

const serverCode = `
import express from "express";
import { config } from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import Db from "./src/database/Db.js";
import cors from "cors";

config({ path: "./.env" });
 
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: [ "GET", "POST", "DELETE", "PUT", "PATCH" ],
    })
);

app.use(compression());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome");
})

const PORT = process.env.PORT || 5000;
Db()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("🚀 Server running on http://localhost:${PORT}");
    });
  })
  .catch ((err) => {
    console.error("❌ Database connection failed!", err.message);
    process.exit(1);
})
`

createFile("index.js", serverCode);

const envCode = `MONGO_DB_URL = url
PORT=3000`;

createFile(".env", envCode);

const databaseCode = `import mongoose from "mongoose";
const Db = async() => {
    try {
        const DatabaseConnection = await mongoose.connect(process.env.URL);

        console.log(DatabaseConnection.connection.host);
        console.log('Database Connected Successfully !!');

    } catch (err) {
        console.log("Database Connection Failed !!", err);
    }
}
export default Db;`

createFile("cd database/db.js", databaseCode);

console.log("\n ⚡ Installing express mongoose dotenv cors cookie-parser compression ")

    `exec("npm install express mongoose dotenv cors cookie-parser compression ", (err, stdout, stderr) => {
    if (err) {
        console.log("😂 Installation Field Error : ", err.message);
    }

    console.log(stdout);
    console.log("\n☑️ All packages install Successfully !!")

    console.log("http://localhost:${process.env.PORT}/");
})`
