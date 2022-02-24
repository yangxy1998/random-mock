"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Attribute_1 = require("./Attribute");
class Primary extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, count, format = (source) => source, retryCount = 100) {
        super(name, distribution);
        this.format = format;
        this.type = Attribute_1.AttributeType.Unique;
        this.retryCount = retryCount;
        this.range = [];
        this.index = -1;
        for (let i = 0; i < count; i++) {
            do {
                const result = this.format(super.random());
                if (!this.range.includes(result)) {
                    this.range.push(result);
                }
                i++;
            } while (i < this.retryCount);
            throw Error('exceed max retry count');
        }
        this.random = () => {
            if (this.index < this.range.length)
                this.index++;
            else
                this.index = 0;
            return this.range[this.index];
        };
    }
}
exports.Primary = Primary;
