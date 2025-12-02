import { exicution } from "./exicuter.js";
import { createFile } from "./fileCreater.js";

export async function fileExicution(rl) {

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
