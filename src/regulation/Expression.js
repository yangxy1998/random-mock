"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const distribution_1 = require("../distribution");
const Regulation_1 = require("./Regulation");
class Expression extends Regulation_1.RegulationConstructor {
    constructor(args, expression) {
        super(args);
        this.expression = expression;
        this.distribution = (value) => {
            return { random: () => value };
        };
    }
    Normal(sigma) {
        this.distribution = (value) => new distribution_1.Normal(value, sigma);
        return this;
    }
    Uniform(difference) {
        this.distribution = (value) => new distribution_1.Uniform([value - difference, value + difference]);
        return this;
    }
    Cauchy(theta) {
        this.distribution = (value) => new distribution_1.Cauchy(value, theta);
        return this;
    }
    getValue(item) {
        const value = this.expression(item);
        return this.distribution(value).random();
    }
}
exports.Expression = Expression;
