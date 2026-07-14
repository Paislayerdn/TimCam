import db from "./db";

db.exec(`
CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    group_id INTEGER NOT NULL,

    FOREIGN KEY(group_id)
        REFERENCES groups(id)
);
`);


const groupCount = db
    .prepare("SELECT COUNT(*) as count FROM groups")
    .get() as { count: number };


if (groupCount.count === 0) {
    const insert = db.prepare(
        "INSERT INTO groups (name) VALUES (?)"
    );

    insert.run("PM");
    insert.run("SA");
    insert.run("Dev");
    insert.run("UX/UI");
}