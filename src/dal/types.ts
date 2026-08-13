import type { DrizzleQueryError } from "drizzle-orm";

export type DalReturn<T, E extends DalError = DalError> =
  | {
      success: false;
      error: E;
    }
  | {
      success: true;
      data: T;
    };

export type DalError =
  | {
      type: "drizzle-error";
      error: DrizzleQueryError;
      message?: string;
    }
  | {
      type: "fetch-error";
      message?: string;
      status: number;
    }
  | {
      type: "no-access";
      message?: string;
    }
  | {
      type: "no-user";
      message?: string;
    }
  | {
      type: "not-found";
      message?: string;
    }
  | {
      type: "unknown-error";
      error: unknown;
      message?: string;
    }
  | { type: "validation"; message: string };

export class ThrowableDalError extends Error {
  dalError: DalError;

  constructor(dalError: DalError) {
    super("ThrowableDalError");
    this.dalError = dalError;
  }
}

export function createSuccessReturn<T>(data: T): DalReturn<T> {
  return { success: true, data };
}

export function createErrorReturn<E extends DalError>(
  error: E,
): DalReturn<never> {
  return { success: false, error };
}
