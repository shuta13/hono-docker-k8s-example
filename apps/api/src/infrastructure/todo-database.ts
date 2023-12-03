import { sqlite3 } from "@/lib";
import { Database } from "sqlite3";
import path from "path";

export const TODO_DATABASE_PATH = path.join(__dirname, "todo.db");

export interface TodoInterface {
  uid: string;
  title: string;
  completed: 0 | 1;
}

export class TodoDatabase {
  db: Database;

  constructor() {
    this.db = new sqlite3.Database(TODO_DATABASE_PATH);
    this.#creataTable();
  }

  close() {
    this.db.close();
  }

  #creataTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT,
        title TEXT,
        completed INTEGER
      )`;
    this.db.run(sql);
  }
}
