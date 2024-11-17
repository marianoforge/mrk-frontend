export function calculatePagination(totalItems: number, limit: number) {
  return Math.ceil(totalItems / limit);
}
