import Cache from "./cache";

const cache = new Cache();

cache.add("abc", 123);
console.log(cache.fetch("abc"));

cache.remove("abc");
console.log(cache.fetch("abc"));