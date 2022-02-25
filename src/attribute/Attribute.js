"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeConstructor = exports.AttributeType = void 0;
var AttributeType;
(function (AttributeType) {
    AttributeType["Category"] = "category";
    AttributeType["Discrete"] = "discrete";
    AttributeType["Continuous"] = "continuous";
    AttributeType["Date"] = "date";
    AttributeType["Compound"] = "compound";
    AttributeType["Unique"] = "unique";
    AttributeType["Primary"] = "primary"; // 作为主键的变量
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
class AttributeConstructor {
    constructor(name, distribution) {
        this.name = name;
        this.distribution = distribution;
    }
    random() {
        return this.valueToFormat(this.distribution.random());
    }
    formatToValue(source) {
        // 自然语言数据转换成分布算法可执行的数据
        return source;
    }
    valueToFormat(source) {
        // 算法数据转换成自然语言数据
        return source;
    }
}
exports.AttributeConstructor = AttributeConstructor;
