import { Character } from "./character.interface";

export interface Data<T> {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: T[];
}
