"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = exports.Primary = exports.Discrete = exports.Date = exports.Continuous = exports.Category = exports.AttributeConstructor = exports.AttributeType = exports.AttributeCreater = exports.Attribute = void 0;
const Continuous_1 = require("./Continuous");
Object.defineProperty(exports, "Continuous", { enumerable: true, get: function () { return Continuous_1.Continuous; } });
const Date_1 = require("./Date");
Object.defineProperty(exports, "Date", { enumerable: true, get: function () { return Date_1.Date; } });
const Discrete_1 = require("./Discrete");
Object.defineProperty(exports, "Discrete", { enumerable: true, get: function () { return Discrete_1.Discrete; } });
const Category_1 = require("./Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const Unique_1 = require("./Unique");
Object.defineProperty(exports, "Unique", { enumerable: true, get: function () { return Unique_1.Unique; } });
const Primary_1 = require("./Primary");
Object.defineProperty(exports, "Primary", { enumerable: true, get: function () { return Primary_1.Primary; } });
const Attribute_1 = require("./Attribute");
Object.defineProperty(exports, "AttributeConstructor", { enumerable: true, get: function () { return Attribute_1.AttributeConstructor; } });
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
exports.Attribute = {
    Continuous: Continuous_1.Continuous,
    Date: Date_1.Date,
    Discrete: Discrete_1.Discrete,
    Category: Category_1.Category,
    Unique: Unique_1.Unique,
    Primary: Primary_1.Primary
};
function AttributeCreater(config) {
    const another = Object.values(config).slice(3);
    if (config.type === Attribute_1.AttributeType.Category) {
        return new Category_1.Category(config.name, config.distribution);
    }
    else if (config.type === Attribute_1.AttributeType.Continuous) {
        return new Continuous_1.Continuous(config.name, config.distribution);
    }
    else if (config.type === Attribute_1.AttributeType.Date) {
        return new Date_1.Date(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Discrete) {
        return new Discrete_1.Discrete(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Primary) {
        return new Primary_1.Primary(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Unique) {
        return new Unique_1.Unique(config.name, config.distribution, ...another);
    }
    else
        return new Attribute_1.AttributeConstructor(config.name, config.distribution);
}
exports.AttributeCreater = AttributeCreater;
