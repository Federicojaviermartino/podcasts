export const isOutdated = timestamp => {
  const oneday = 60 * 60 * 24 * 1000
  const now = Date.now();
  return now - timestamp > oneday;
}
