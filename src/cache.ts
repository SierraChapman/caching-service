interface CacheItem {
    name: string;
    value: any;
    next?: CacheItem | Tail;
    prev?: CacheItem | Head;
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
        const newItem: CacheItem = { name, value };

        this.pushToLinkedList(newItem);
        this.data[name] = newItem;
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

    private pushToLinkedList(item: CacheItem) {
        item.next = this.tail;
        item.prev = this.tail.prev;

        this.tail.prev = item;
        if (item.prev !== undefined) { item.prev.next = item; }
    }

    print() {
        let currentItem = this.head.next;
        let i = 1;

        console.log("\nCurrent cache contents:");

        while (currentItem !== undefined && "value" in currentItem) {
            console.log(`${i}) ${currentItem.name}: ${currentItem.value}`);
            currentItem = currentItem.next;
            i++;
        }
    }
}

export default Cache;
