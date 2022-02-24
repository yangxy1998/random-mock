"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = exports.Standard = exports.Normal = exports.Hypergeometric = exports.Exponential = exports.Disposable = exports.Compound = exports.Cauchy = exports.DistributionConstructor = void 0;
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
exports.default = {
    Cauchy: (x0, theta) => {
        return (format) => {
            x0 = format(x0);
            theta = format(theta);
            return new Cauchy_1.Cauchy(x0, theta);
        };
    },
    Compound: (config) => {
        return (format) => {
            config = format(config);
            return new Compound_1.Compound(config);
        };
    },
    Disposable: (dataset) => {
        return (format) => {
            dataset = dataset.map(format);
            return new Disposable_1.Disposable(dataset);
        };
    },
    Exponential: (offset, lambda) => {
        return (format) => {
            offset = format(offset);
            lambda = format(lambda);
            return new Exponential_1.Exponential(offset, lambda);
        };
    },
    Standard: (range, p) => {
        return (format) => {
            range = range.map(format);
            return new Standard_1.Standard(range, p);
        };
    },
    Uniform: (range) => {
        return (format) => {
            range[0] = format(range[0]);
            range[1] = format(range[1]);
            return new Uniform_1.Uniform(range);
        };
    },
    Normal: (u, sigma) => {
        return (format) => {
            u = format(u);
            sigma = format(sigma);
            return new Normal_1.Normal(u, sigma);
        };
    },
    Hypergeometric: (range, N, M, n) => {
        return (format) => {
            N = format(N);
            M = format(M);
            n = format(n);
            return new Hypergeometric_1.Hypergeometric(range, N, M, n);
        };
    }
};
