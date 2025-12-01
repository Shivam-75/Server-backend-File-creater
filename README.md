# Server CLI [ Server-backend-File-creater ]

- Code By Shivam Pandey

## Install

Lucid can be installed with npm

```sh
  npx Server-File-creater
```

## Usage

```js
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
```

## Backend Database

```js
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
```

### Setup .env File

```js
MONGO_DB_URL = "put here your mongodb url";
PORT = 5000;
```
