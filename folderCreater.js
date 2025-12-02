import fs from "fs";
export const createFolder = (folderPath) => {
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log("📁 Folder Created:", folderPath);
    } catch (err) {
        console.log("❌ Folder Not Created:", err.message);
    }
};