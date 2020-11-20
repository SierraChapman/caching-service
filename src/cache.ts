class Cache {
    private data: {[name: string]: any};

    constructor() {
        this.data = {};
    }

    add(name: string, value: any) {
        this.data = { ...this.data, [name]: value };
    }

    remove(name: string) {
        delete this.data[name];
    }
}

export default Cache;
