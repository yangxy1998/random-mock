"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discrete = void 0;
const Attribute_1 = require("./Attribute");
class Discrete extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, step, record = false, sort = false, formatTovalue, valueToFormat) {
        super(name, distribution, formatTovalue, valueToFormat);
        this.type = Attribute_1.AttributeType.Discrete;
        this.step = step ? step : 1;
        this.range = [];
        this.record = record;
        this.sort = sort;
    }
    random() {
        const result = Math.floor(super.random() / this.step) * this.step;
        if (this.record && !this.range.includes(result)) {
            this.range.push(result);
            if (this.sort)
                this.range.sort((a, b) => a - b);
        }
        return result;
    }
}
exports.Discrete = Discrete;
