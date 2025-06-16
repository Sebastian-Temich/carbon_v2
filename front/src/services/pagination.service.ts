export interface PaginationHeader {
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
}

export const parsePaginationHeader = (paginationValue?: string): PaginationHeader | undefined => {
  try {
    if (!paginationValue) return undefined;

    return JSON.parse(paginationValue) as PaginationHeader;
  } catch {
    return undefined;
  }
};
