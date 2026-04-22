export interface Pagination<T> {
  content: T[]
  total: number;
  page: number;
  size: number;
}
