"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocker = exports.Regulation = exports.DistributionType = exports.Distribution = exports.DataMode = exports.AttributeType = exports.Attribute = void 0;
const Generator_1 = require("./util/Generator");
Object.defineProperty(exports, "DataMode", { enumerable: true, get: function () { return Generator_1.DataMode; } });
const distribution_1 = require("./distribution");
Object.defineProperty(exports, "Distribution", { enumerable: true, get: function () { return distribution_1.Distribution; } });
Object.defineProperty(exports, "DistributionType", { enumerable: true, get: function () { return distribution_1.DistributionType; } });
const attribute_1 = require("./attribute");
Object.defineProperty(exports, "Attribute", { enumerable: true, get: function () { return attribute_1.Attribute; } });
const Attribute_1 = require("./attribute/Attribute");
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
const regulation_1 = require("./regulation");
Object.defineProperty(exports, "Regulation", { enumerable: true, get: function () { return regulation_1.Regulation; } });
const Mocker = Generator_1.Generator;
exports.Mocker = Mocker;
exports.default = Mocker;
