"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = void 0;
const Attribute_1 = require("./Attribute");
class Unique extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, formatToValue = (source) => source, valueToFormat = (source) => source, retryCount = 100) {
        super(name, distribution, formatToValue, valueToFormat);
        this.type = Attribute_1.AttributeType.Unique;
        this.retryCount = retryCount;
        this.range = [];
        this.index = -1;
    }
    random() {
        let i = 0;
        do {
            const result = this.valueToFormat(super.random());
            if (!this.range.includes(result)) {
                this.range.push(result);
                return result;
            }
            i++;
        } while (i < this.retryCount);
        throw Error('exceed max retry count');
    }
}
exports.Unique = Unique;
