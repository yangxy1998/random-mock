"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compound = void 0;
const Distribution_1 = require("../distribution/Distribution");
const Attribute_1 = require("./Attribute");
class Compound extends Attribute_1.AttributeConstructor {
    constructor(name, args) {
        super(name, new Distribution_1.DistributionConstructor());
        this.type = Attribute_1.AttributeType.Compound;
        this.args = args;
    }
    random(item) {
        let value = {};
        this.args.forEach((name) => {
            value[name] = item[name];
        });
        return JSON.stringify(value);
    }
}
exports.Compound = Compound;
