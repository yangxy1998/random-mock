"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discrete = void 0;
const Attribute_1 = require("./Attribute");
class Discrete extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, step) {
        super(name, distribution);
        this.type = Attribute_1.AttributeType.Discrete;
        this.step = step ? step : 1;
        this.range = [];
    }
    random() {
        const result = Math.floor(super.random() / this.step) * this.step;
        if (!this.range.includes(result)) {
            this.range.push(result);
            this.range.sort((a, b) => a - b);
        }
        return result;
    }
    valueToFormat(source) {
        return Math.floor(source / this.step) * this.step;
    }
}
exports.Discrete = Discrete;
