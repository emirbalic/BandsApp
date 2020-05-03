export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalNumber: number;
  totalPages: number;
}

export class PaginatedResult <T> {
  result: T;
  pagination: Pagination;
}
