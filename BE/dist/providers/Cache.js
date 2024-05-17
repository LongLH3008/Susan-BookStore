"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = __importDefault(require("memory-cache"));
class Cache {
    storeCache(obj) {
        memory_cache_1.default.put(obj.key, obj.val, obj.time * 1000, obj.callback);
    }
    getCache(key) {
        return memory_cache_1.default.get(key);
    }
    clearCache() {
        memory_cache_1.default.clear();
    }
    delCache(key) {
        return memory_cache_1.default.del(key);
    }
    infoCache() {
        console.log(`Cache size: ${memory_cache_1.default.size()}\nCache memory size: ${memory_cache_1.default.memsize()}`);
    }
}
exports.default = Cache;
