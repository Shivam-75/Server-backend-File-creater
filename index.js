import fs from "fs/promises"
import path from "path"
import { exec } from "child_process";
import { stdout } from "process";

console.log(`File Creates....\n`);
const createFolder = (folderPath) => {
    try {
        if (folderPath) {
            console.log("Folder Exist Try Anoter Name !!");
            return;
        }
        fs.mkdirSync(folderPath, { recursive: true });

        console.log("Folder Created Successfully !! ", folderPath);
    } catch (err) {
        console.log("Folder not Created !! ");
    }
}

const createFile = (filePath, content = "") => {
    try {

        fs.writeFileSync(filePath, content);

        console.log("Created File ....")

    } catch (err) {
        console.log("file not Created !! ");
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
    import cors from "cors";

    config({ path: "./.env" });
 
   const app = express();

    const allowedOrigins = [
    "http://localhost:5173",
    ];

    app.use(
     cors({
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
    app.listen(PORT, () => {
      console.log(" Server running ....");
    });
`

createFile("./index.js", serverCode);

const envCode = `MONGO_DB_URL = url
PORT=3000`;

createFile("./.env", envCode);

console.log("\n ⚡ Installing express mongoose dotenv cors cookie-parser compression ")

exec("npm  install express mongoose dotenv cors cookie-parser compression ", (err, stdout, stderr) => {
    if (err) {
        console.log("😂 Installation Field Error : ", err.message);
    }

    console.log(stdout);
    console.log("\n☑️ All packages install Successfully !!")

    console.log(`http://localhost:${process.env.PORT}/`);
    exec("npm run dev")
})

exec("rmdi /s /q ../../../backend-cli-folder-creater");

console.log("success");