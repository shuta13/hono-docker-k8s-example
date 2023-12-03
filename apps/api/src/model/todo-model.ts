import { TodoInterface, TodoDatabase } from "@/infrastructure";
import { Result } from "@/lib";

export class TodoModel {
  #todo: TodoDatabase;

  constructor() {
    this.#todo = new TodoDatabase();
  }

  read({ uid, title, completed }: Partial<TodoInterface>) {
    return new Promise<Result<TodoInterface[]>>((resolve) => {
      let sql = "SELECT * FROM todo";
      const params: TodoInterface[keyof TodoInterface][] = [];
      if (uid) {
        sql += " WHERE uid = ?";
        params.push(uid);
      }
      if (title) {
        sql += " WHERE title = ?";
        params.push(title);
      }
      if (completed) {
        sql += " WHERE completed = ?";
        params.push(completed);
      }
      this.#todo.db.all<TodoInterface>(sql, params, (error, rows) => {
        if (error) resolve({ status: "error", error });
        resolve({ status: "ok", data: rows });
      });
    });
  }

  create({ uid, title }: Pick<TodoInterface, "title" | "uid">) {
    return new Promise<Result<TodoInterface[]>>((resolve) => {
      const sql = "INSERT INTO todo (uid, title, completed) VALUES (?, ?, ?)";
      this.#todo.db.run(sql, [uid, title, 0], (error) => {
        if (error) resolve({ status: "error", error });
        resolve({ status: "ok", data: [{ uid, title, completed: 0 }] });
      });
    });
  }

  update({ uid, title, completed }: TodoInterface) {
    return new Promise<Result<TodoInterface[]>>((resolve) => {
      const sql = "UPDATE todo SET title = ?, completed = ? WHERE uid = ?";
      this.#todo.db.run(sql, [title, completed, uid], (error) => {
        if (error) resolve({ status: "error", error });
        resolve({ status: "ok", data: [{ uid, title, completed }] });
      });
    });
  }

  delete({ uid }: Pick<TodoInterface, "uid">) {
    return new Promise<Result<TodoInterface[]>>((resolve) => {
      const sql = "DELETE FROM todo WHERE uid = ?";
      this.#todo.db.run(sql, [uid], (error) => {
        if (error) resolve({ status: "error", error });
        resolve({ status: "ok", data: [] });
      });
    });
  }
}
