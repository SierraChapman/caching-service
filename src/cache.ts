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
    private maxItems?: number;
    private itemCount: number;
    private optionalPrint: () => void;

    constructor(options: { maxItems?: number, verbose?: boolean } = {}) {
        this.data = {};
        this.head = {};
        this.tail = {};

        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.itemCount = 0;
        this.maxItems = options.maxItems;

        this.optionalPrint = options.verbose ? this.print : () => {};
    }

    add(name: string, value: any) {

        let newItem: CacheItem;

        if (name in this.data) {
            newItem = this.data[name];
            newItem.value = value;
            this.removeFromLinkedList(newItem);
        } else {
            newItem = { name, value };
            this.data[name] = newItem;
            this.itemCount++;

            if (this.maxItems && this.itemCount > this.maxItems) {
                this.evictLeastRecentlyUsed();
            }
        }

        this.pushToLinkedList(newItem);

        this.optionalPrint();
    }

    remove(name: string): boolean {
        if (name in this.data) {
            this.removeFromLinkedList(this.data[name]);
            delete this.data[name];
            this.itemCount--;

            this.optionalPrint();
            return true;
        } else {

            this.optionalPrint();
            return false;
        }
        
    }

    fetch(name: string) {
        if (name in this.data) {
            const item = this.data[name];
            this.removeFromLinkedList(item);
            this.pushToLinkedList(item);

            this.optionalPrint();
            return item.value;
        } else {
            this.optionalPrint();
            return undefined;
        }
    }

    private pushToLinkedList(item: CacheItem) {
        item.next = this.tail;
        item.prev = this.tail.prev;

        this.tail.prev = item;
        if (item.prev !== undefined) { item.prev.next = item; }
    }

    private removeFromLinkedList(item: CacheItem) {
        if (item.prev && item.next) {
            item.prev.next = item.next;
            item.next.prev = item.prev;
        }
    }

    private evictLeastRecentlyUsed() {
        const itemToEvict = this.head.next;

        if (itemToEvict !== undefined && "name" in itemToEvict) {
            this.removeFromLinkedList(itemToEvict);
            delete this.data[itemToEvict.name];
            this.itemCount--;
        }
    }

    private print() {
        let currentItem = this.head.next;
        let i = 1;

        console.log("\nCurrent cache contents:");

        while (currentItem !== undefined && "value" in currentItem) {
            console.log(`${i}) ${currentItem.name}: ${currentItem.value}`);
            currentItem = currentItem.next;
            i++;
        }

        const memoryUsage = process.memoryUsage();
        console.log(`Memory usage: ${Math.round(memoryUsage.heapUsed / memoryUsage.heapTotal * 100)}%`);
    }
}

export default Cache;
