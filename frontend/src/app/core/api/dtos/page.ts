export interface Page<T> {
  content: T[];
  totalPages: number;
  last: boolean;
  totalElements: number;
  number: number;
  size: number;
}
