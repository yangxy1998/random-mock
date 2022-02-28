"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = exports.Standard = exports.Normal = exports.Hypergeometric = exports.Exponential = exports.Disposable = exports.Cauchy = exports.DistributionConstructor = exports.DistributionType = exports.Distribution = exports.DistributionCreater = void 0;
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
var DistributionType;
(function (DistributionType) {
    DistributionType["Cauchy"] = "cauchy";
    DistributionType["Disposable"] = "disposable";
    DistributionType["Exponential"] = "exponential";
    DistributionType["Standard"] = "standard";
    DistributionType["Uniform"] = "uniform";
    DistributionType["Normal"] = "normal";
    DistributionType["Hypergeometric"] = "hypergeometric";
})(DistributionType || (DistributionType = {}));
exports.DistributionType = DistributionType;
function DistributionCreater(config, format = (source) => source) {
    if (config.type === DistributionType.Cauchy) {
        return new Cauchy_1.Cauchy(format(config.x0), format(config.theta));
    }
    else if (config.type === DistributionType.Disposable) {
        return new Disposable_1.Disposable(config.dataset.map(format));
    }
    else if (config.type === DistributionType.Exponential) {
        return new Exponential_1.Exponential(format(config.offset), format(config.lambda));
    }
    else if (config.type === DistributionType.Hypergeometric) {
        return new Hypergeometric_1.Hypergeometric(config.range.map(format), config.N, config.M, config.n);
    }
    else if (config.type === DistributionType.Normal) {
        return new Normal_1.Normal(format(config.u), format(config.sigma));
    }
    else if (config.type === DistributionType.Standard) {
        return new Standard_1.Standard(config.range.map(format), config.p);
    }
    else if (config.type === DistributionType.Uniform) {
        return config.range
            ? new Uniform_1.Uniform(config.range.map(format))
            : new Uniform_1.Uniform(format(config.begin), format(config.end));
    }
    else
        return new Distribution_1.DistributionConstructor();
}
exports.DistributionCreater = DistributionCreater;
exports.Distribution = {
    Cauchy: Cauchy_1.Cauchy,
    Disposable: Disposable_1.Disposable,
    Exponential: Exponential_1.Exponential,
    Standard: Standard_1.Standard,
    Uniform: Uniform_1.Uniform,
    Normal: Normal_1.Normal,
    Hypergeometric: Hypergeometric_1.Hypergeometric
};
