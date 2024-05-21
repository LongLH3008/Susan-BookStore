import cache from 'memory-cache';
import ICache from '../interfaces/vendors/ICache';

class Cache {
    public storeCache(obj: ICache<string, string>) : void{
        cache.put(obj.key, obj.val, obj.time*1000, obj.callback);
    }

    public getCache(key: string): string{
        return cache.get(key);
    }

    public clearCache(): void{
        cache.clear();
    }

    public delCache(key: string) : boolean {
        return cache.del(key);
    }

    public infoCache(): void{
        console.log(`Cache size: ${cache.size()}\nCache memory size: ${cache.memsize()}`);
    }
}

export default Cache;