"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = exports.Primary = exports.Discrete = exports.Date = exports.Continuous = exports.Category = exports.AttributeConstructor = void 0;
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
exports.default = {
    Continuous: () => (name, distribution) => new Continuous_1.Continuous(name, distribution),
    Date: (format) => (name, distribution) => new Date_1.Date(name, distribution, format),
    Discrete: (step) => (name, distribution) => new Discrete_1.Discrete(name, distribution, step),
    Category: () => (name, distribution) => new Category_1.Category(name, distribution),
    Unique: (format, retryCount) => (name, distribution) => new Unique_1.Unique(name, distribution, format, retryCount),
    Primary: (count = 100, format, retryCount) => (name, distribution) => new Primary_1.Primary(name, distribution, count, format, retryCount)
};
