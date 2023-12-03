import { TodoModel } from "@/model";

export class TodoController {
  #todo: TodoModel;

  constructor() {
    this.#todo = new TodoModel();
  }

  async read(params: Parameters<TodoModel["read"]>[0]) {
    return await this.#todo.read(params);
  }

  async create(params: Parameters<TodoModel["create"]>[0]) {
    return await this.#todo.create(params);
  }

  async update(param: Parameters<TodoModel["update"]>[0]) {
    return await this.#todo.update(param);
  }

  async delete(param: Parameters<TodoModel["delete"]>[0]) {
    return await this.#todo.delete(param);
  }
}

export const todoController = new TodoController();
