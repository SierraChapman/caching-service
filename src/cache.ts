class Cache {
    private data: { [name: string]: any };

    constructor() {
        this.data = {};
    }

    add(name: string, value: any) {
        this.data = { ...this.data, [name]: value };
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
