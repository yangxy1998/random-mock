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
function CreateRegulation(config) {
    if (config.type === RegulationType.Expression) {
        const expression = new Expression_1.Expression(config.source, config.expression);
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
                    condition.value = new Expression_1.Expression(value.source, value.expression);
                }
                else if (value.type in distribution_1.DistributionType) {
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
