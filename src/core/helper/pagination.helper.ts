export interface PaginationResult<T> {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  nextPage: number | null;
  prevPage: number | null;
  data: T[];
}

export const getPagination = <T>(
  page: number,
  perPage: number,
  totalRecords: number,
  data: T[]
): PaginationResult<T> => {
  const totalPages = Math.ceil(totalRecords / perPage);

  return {
    totalRecords,
    totalPages,
    currentPage: page,
    perPage,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
    data,
  };
};

export const getPaginationParams = (page: number, perPage: number) => {
  const limit = perPage;
  const offset = (page - 1) * perPage;
  return { limit, offset };
};
