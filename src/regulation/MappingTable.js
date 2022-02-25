"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingTable = void 0;
const distribution_1 = require("../distribution");
const Expression_1 = require("./Expression");
const Regulation_1 = require("./Regulation");
class MappingTable extends Regulation_1.RegulationConstructor {
    constructor(args, conditions) {
        super(args);
        this.conditions = conditions;
    }
    getValue(item) {
        for (let condition of this.conditions) {
            let passed = true;
            this.args.forEach((name) => {
                if (condition[name]) {
                    passed = passed && condition[name].includes(item[name]);
                }
            });
            if (condition.and)
                passed = passed && condition.and(item);
            if (condition.or)
                passed = passed || condition.or(item);
            if (passed)
                return this._getValue(condition.value)(item);
        }
        return null;
    }
    _getValue(value) {
        if (value instanceof Expression_1.Expression) {
            return value.getValue;
        }
        else if (value instanceof distribution_1.DistributionConstructor) {
            return value.random;
        }
        else
            return () => value;
    }
}
exports.MappingTable = MappingTable;
