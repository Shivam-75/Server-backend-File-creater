import { exec } from "child_process";
export function run(cmd, cwd) {
    return new Promise((resolve, reject) => {
        exec(cmd, { cwd }, (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
}

