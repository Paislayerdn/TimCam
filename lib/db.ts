import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database/timcam.db");

export default db;