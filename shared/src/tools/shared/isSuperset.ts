export function isSuperset<T>(setA: Set<T>, subset: Set<T>) {
  for (const elem of subset) {
    if (!setA.has(elem)) return false;
  }
  return true;
}
