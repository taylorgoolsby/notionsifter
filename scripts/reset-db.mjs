import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH || "./data/app.db");
for (const suffix of ["", "-wal", "-shm"]) {
  fs.rmSync(dbPath + suffix, { force: true });
}
console.log("Database removed:", dbPath);
