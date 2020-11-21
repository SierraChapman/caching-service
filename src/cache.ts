interface CacheItem {
    name: string;
    value: any;
    next: CacheItem | Tail;
    prev: CacheItem | Head;
}

interface Head {
    next?: CacheItem | Tail;
}

interface Tail {
    prev?: CacheItem | Head;
}

class Cache {
    private data: { [name: string]: CacheItem };
    private head: Head;
    private tail: Tail;

    constructor() {
        this.data = {};
        this.head = {};
        this.tail = {};

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    add(name: string, value: any) {
        this.data = { ...this.data, [name]: { name, value, next: this.tail, prev: this.head } };
    }

    remove(name: string): boolean {
        if (name in this.data) {
            delete this.data[name];
            return true;
        } else {
            return false;
        }
    }

    fetch(name: string) {
        return this.data[name];
    }
}

export default Cache;
