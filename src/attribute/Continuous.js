"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continuous = void 0;
const Attribute_1 = require("./Attribute");
class Continuous extends Attribute_1.AttributeConstructor {
    constructor(name, distribution) {
        super(name, distribution);
        this.type = Attribute_1.AttributeType.Continuous;
    }
}
exports.Continuous = Continuous;
