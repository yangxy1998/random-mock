"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = exports.Standard = exports.Normal = exports.Hypergeometric = exports.Exponential = exports.Disposable = exports.Compound = exports.Cauchy = exports.DistributionConstructor = exports.Distribution = void 0;
const Compound_1 = require("./Compound");
Object.defineProperty(exports, "Compound", { enumerable: true, get: function () { return Compound_1.Compound; } });
const Exponential_1 = require("./Exponential");
Object.defineProperty(exports, "Exponential", { enumerable: true, get: function () { return Exponential_1.Exponential; } });
const Standard_1 = require("./Standard");
Object.defineProperty(exports, "Standard", { enumerable: true, get: function () { return Standard_1.Standard; } });
const Uniform_1 = require("./Uniform");
Object.defineProperty(exports, "Uniform", { enumerable: true, get: function () { return Uniform_1.Uniform; } });
const Normal_1 = require("./Normal");
Object.defineProperty(exports, "Normal", { enumerable: true, get: function () { return Normal_1.Normal; } });
const Cauchy_1 = require("./Cauchy");
Object.defineProperty(exports, "Cauchy", { enumerable: true, get: function () { return Cauchy_1.Cauchy; } });
const Hypergeometric_1 = require("./Hypergeometric");
Object.defineProperty(exports, "Hypergeometric", { enumerable: true, get: function () { return Hypergeometric_1.Hypergeometric; } });
const Disposable_1 = require("./Disposable");
Object.defineProperty(exports, "Disposable", { enumerable: true, get: function () { return Disposable_1.Disposable; } });
const Distribution_1 = require("./Distribution");
Object.defineProperty(exports, "DistributionConstructor", { enumerable: true, get: function () { return Distribution_1.DistributionConstructor; } });
exports.Distribution = {
    Cauchy: Cauchy_1.Cauchy,
    Compound: Compound_1.Compound,
    Disposable: Disposable_1.Disposable,
    Exponential: Exponential_1.Exponential,
    Standard: Standard_1.Standard,
    Uniform: Uniform_1.Uniform,
    Normal: Normal_1.Normal,
    Hypergeometric: Hypergeometric_1.Hypergeometric
};
