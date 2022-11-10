
export interface RedisCache {
  getItemsByStoreName: <T>(storeName: string) => Promise<T[] | Error>
  updateStoreItems: <T>(payload: T, storeName: string) => Promise<boolean | Error>
  removeItemFromStoreById: (id: string, storeName: string) => Promise<void>
}
