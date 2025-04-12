export const noopStorage = {
    getItem: (_key: string) => Promise.resolve(null),
    setItem: (_key: string, _value: any) => Promise.resolve(),
    removeItem: (_key: string) => Promise.resolve(),
  }
  