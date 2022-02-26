"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegulation = exports.RegulationType = exports.Regulation = void 0;
const distribution_1 = require("../distribution");
const Expression_1 = require("./Expression");
const MappingTable_1 = require("./MappingTable");
const Regulation_1 = require("./Regulation");
exports.Regulation = {
    Expression: Expression_1.Expression,
    MappingTable: MappingTable_1.MappingTable
};
var RegulationType;
(function (RegulationType) {
    RegulationType["Expression"] = "expression";
    RegulationType["MappingTable"] = "mappingtable";
})(RegulationType = exports.RegulationType || (exports.RegulationType = {}));
function CreateExpression(source, config) {
    const expression = new Expression_1.Expression(source, config.expression);
    if (config.distribution) {
        const type = config.distribution;
        if (type === distribution_1.DistributionType.Cauchy)
            expression.Cauchy(config.theta);
        else if (type === distribution_1.DistributionType.Normal)
            expression.Normal(config.sigma);
        else if (type === distribution_1.DistributionType.Uniform)
            expression.Uniform(config.difference);
        else
            throw Error('only cauchy | normal | uniform type of distribution is avaliable for expression');
    }
    return expression;
}
function CreateRegulation(config) {
    if (config.type === RegulationType.Expression) {
        return CreateExpression(config.source, config);
    }
    else if (config.type === RegulationType.MappingTable) {
        const conditions = config.conditions.map((condition) => {
            const value = condition.value;
            if (value instanceof distribution_1.DistributionConstructor ||
                value instanceof Expression_1.Expression ||
                typeof value === 'string' ||
                typeof value === 'number')
                return condition;
            else {
                if (value.type === RegulationType.Expression) {
                    condition.value = CreateExpression(config.source, value);
                }
                else if (value.type === distribution_1.DistributionType.Cauchy ||
                    value.type === distribution_1.DistributionType.Compound ||
                    value.type === distribution_1.DistributionType.Disposable ||
                    value.type === distribution_1.DistributionType.Exponential ||
                    value.type === distribution_1.DistributionType.Hypergeometric ||
                    value.type === distribution_1.DistributionType.Normal ||
                    value.type === distribution_1.DistributionType.Standard ||
                    value.type === distribution_1.DistributionType.Uniform) {
                    condition.value = distribution_1.DistributionCreater(value);
                }
                else {
                    throw Error('value type should be expression or distribution');
                }
                return condition;
            }
        });
        return new MappingTable_1.MappingTable(config.source, conditions);
    }
    throw Error('type of regulation should be defined');
}
exports.CreateRegulation = CreateRegulation;
exports.default = {
    Expression: Expression_1.Expression,
    MappingTable: MappingTable_1.MappingTable,
    RegulationConstructor: Regulation_1.RegulationConstructor
};
