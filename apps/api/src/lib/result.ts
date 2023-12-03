export type Result<T extends Record<string, any>[]> =
  | {
      status: "ok";
      data: T;
    }
  | {
      status: "error";
      error: Error;
    };
