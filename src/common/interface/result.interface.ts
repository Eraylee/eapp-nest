export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  maxPage: number;
}
