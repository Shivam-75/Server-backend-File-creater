import fs from "fs";
export const createFile = (filePath, content = "") => {
    try {
        fs.writeFileSync(filePath, content);
        console.log("📝 File Created:", filePath);
    } catch (err) {
        console.log("❌ File Not Created:", err.message);
    }
};