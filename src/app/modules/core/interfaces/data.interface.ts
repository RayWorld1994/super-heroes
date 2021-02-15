export interface Data<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T;
}
