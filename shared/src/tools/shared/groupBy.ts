export function groupBy<
  U extends string | number | symbol,
  T extends Record<U, any>,
>(items: T[], key: U): Map<T[U], T[]> {
  const map = new Map<T[U], T[]>();

  for (const item of items) {
    const groupingKey = item[key];
    const groupedValues = map.get(groupingKey);

    if (groupedValues) groupedValues.push(item);
    else map.set(groupingKey, [item]);
  }
  return map;
}
