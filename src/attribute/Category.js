"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const Attribute_1 = require("./Attribute");
class Category extends Attribute_1.AttributeConstructor {
    constructor(name, distribution) {
        super(name, distribution);
        this.random = () => {
            const result = super.random();
            if (!this.range.includes(result))
                this.range.push(result);
            return result;
        };
        this.range = [];
        this.type = Attribute_1.AttributeType.Category;
    }
}
exports.Category = Category;
