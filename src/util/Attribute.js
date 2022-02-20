"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttribute = exports.AttributeType = void 0;
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["Discrete"] = 0] = "Discrete";
    AttributeType[AttributeType["Continuous"] = 1] = "Continuous";
    AttributeType[AttributeType["Date"] = 2] = "Date";
    AttributeType[AttributeType["Compound"] = 3] = "Compound";
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
function isAttribute(attribute) {
    return 'name' in attribute && 'type' in attribute && 'distribution' in attribute;
}
exports.isAttribute = isAttribute;
