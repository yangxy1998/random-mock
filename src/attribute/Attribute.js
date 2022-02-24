"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeConstructor = exports.AttributeType = void 0;
const Distribution_1 = require("../distribution/Distribution");
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["Category"] = 0] = "Category";
    AttributeType[AttributeType["Discrete"] = 1] = "Discrete";
    AttributeType[AttributeType["Continuous"] = 2] = "Continuous";
    AttributeType[AttributeType["Date"] = 3] = "Date";
    AttributeType[AttributeType["Compound"] = 4] = "Compound";
    AttributeType[AttributeType["Unique"] = 5] = "Unique";
    AttributeType[AttributeType["Primary"] = 6] = "Primary"; // 作为主键的变量
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
class AttributeConstructor {
    constructor(name, distribution) {
        this.name = name;
        if (distribution(this.format) instanceof Distribution_1.DistributionConstructor) {
            this.distribution = distribution(this.format);
            this.random = this.distribution.random;
        }
        else {
            this.random = () => distribution;
        }
    }
    format(source) {
        return source;
    }
}
exports.AttributeConstructor = AttributeConstructor;
