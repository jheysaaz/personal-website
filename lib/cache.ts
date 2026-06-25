export function createCache<T>(ttlMs: number) {
  let cached: T | null = null;
  let cachedAt = 0;

  return {
    get: (): T | null => (Date.now() - cachedAt < ttlMs ? cached : null),
    set: (value: T) => {
      cached = value;
      cachedAt = Date.now();
    },
    clear: () => {
      cached = null;
      cachedAt = 0;
    },
  };
}
