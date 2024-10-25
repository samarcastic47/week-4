import * as dotenv from "dotenv";
dotenv.config();

export function env(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw `${key} is undefined`;
    }
    return value;
  }  