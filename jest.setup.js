// Polyfill for Request object in Jest environment
global.Request = class {
    constructor(input, init) {
        this.input = input;
        this.init = init;
    }
    async json() {
        if (this.init && this.init.body) {
            return JSON.parse(this.init.body);
        }
        return {};
    }
};

// Polyfill for Response object in Jest environment
global.Response = class {
    constructor(body, init) {
        this.body = body;
        this._status = init && init.status ? init.status : 200;
    }
    async json() {
        if (typeof this.body === 'string') {
            return JSON.parse(this.body);
        }
        return this.body;
    }
    get status() {
        return this._status;
    }
};
