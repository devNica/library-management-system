import { RedisCache } from '@core/aplication/ports/cache/redis.cache'
import { redisInstance } from '@common/config/redis.config'

export class RedisAdapter implements RedisCache {
  async getItemsByStoreName <T>(storeName: string): Promise<T[]> {
    return await new Promise((resolve, reject) => {
      void redisInstance.get(storeName, (err, result: any) => {
        if (err != null) reject(err)
        resolve(JSON.parse(result))
      })
    })
  }

  async updateStoreItems <T>(payload: T, storeName: string): Promise<boolean | Error> {
    return await new Promise((resolve, reject) => {
      void redisInstance.multi().set(storeName, JSON.stringify(payload)).exec((err, _result) => {
        if (err !== null) reject(err)
        resolve(true)
      })
    })
  }

  async removeItemFromStoreById (id: string, storeName: string): Promise<void> {
    const currentItems = await this.getItemsByStoreName(storeName)
    const updateCurrentItems = currentItems.filter((item: any) => item.id !== id)
    await this.updateStoreItems(updateCurrentItems, storeName)
  }
}
