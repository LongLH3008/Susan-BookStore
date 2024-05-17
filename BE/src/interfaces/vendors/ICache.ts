
interface ICache<K, V>{ 
    key: K;
    val: V;
    time: number;
    callback(): void;
}

export default ICache;