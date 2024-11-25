const database = require('better-sqlite3')
const sql = new database('crud.db')

sql.prepare(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    `).run()