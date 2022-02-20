"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distribution = void 0;
const Discrete_1 = require("./Discrete");
const Continuous_1 = require("./Continuous");
const Compound_1 = require("./Compound");
const Date_1 = require("./Date");
exports.Distribution = {
    Compound: Compound_1.Compound,
    Continuous: {
        Uniform: Continuous_1.Uniform,
        Normal: // 均匀分布
        Continuous_1.Normal,
        Exponential: // 正态分布
        Continuous_1.Exponential,
        Cauchy: // 指数分布
        Continuous_1.Cauchy // 柯西分布
    },
    Date: {
        Uniform: Date_1.UniformDate,
        Normal: Date_1.NormalDate
    },
    Discrete: {
        Standard: Discrete_1.Standard,
        Hypergeometric: Discrete_1.Hypergeometric // 超几何分布
    }
};
