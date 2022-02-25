"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Attribute_1 = require("./Attribute");
class Primary extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, count = 100, formatToValue = (source) => source, valueToFormat = (source) => source, retryCount = 100) {
        super(name, distribution);
        this.formatToValue = formatToValue;
        this.valueToFormat = valueToFormat;
        this.type = Attribute_1.AttributeType.Unique;
        this.retryCount = retryCount;
        this.range = [];
        this.index = -1;
        for (let i = 0; i < count; i++) {
            let finded = false;
            do {
                const result = this.valueToFormat(super.random());
                if (!this.range.includes(result)) {
                    this.range.push(result);
                    finded = true;
                    break;
                }
                i++;
            } while (i < this.retryCount);
            if (!finded)
                throw Error('exceed max retry count');
        }
    }
    random() {
        if (this.index < this.range.length)
            this.index++;
        else
            this.index = 0;
        return this.range[this.index];
    }
}
exports.Primary = Primary;
