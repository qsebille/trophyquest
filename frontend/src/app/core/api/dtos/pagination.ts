export interface Pagination<T> {
  content: T[]
  total: number;
  currentPage: number;
  pageSize: number;
}

export const initPagination = (pageSize: number): Pagination<any> => {
  return {content: [], total: 0, currentPage: 0, pageSize: pageSize};
}
