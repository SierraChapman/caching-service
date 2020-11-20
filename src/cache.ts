class Cache {
    private data: object;

    constructor() {
        this.data = {};
    }

    add(name: string, value: any) {
        this.data = { ...this.data, [name]: value };
    }
}

export default Cache;
