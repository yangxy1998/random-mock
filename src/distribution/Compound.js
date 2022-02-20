"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compound = void 0;
const Distribution_1 = require("./Distribution");
const Rule_1 = require("../util/Rule");
const Analysis_1 = require("../util/Analysis");
class Compound extends Distribution_1.Distribution {
    constructor(confiurations) {
        super();
        this.orders = Rule_1.GetRuleOrder(confiurations.attributes, confiurations.rules);
    }
    random() {
        let item = {};
        for (let rule of this.orders) {
            if (rule.name) {
                //attribute
                if (!item[rule.name])
                    // not initialized attribute
                    item[rule.name] = rule.distribution.random();
            }
            else if (rule.filter) {
                //rule
                if (Analysis_1.AnalysisFilter(rule.filter)(item) &&
                    !item[rule.dependent] &&
                    Math.random() <= rule.confidence)
                    // not initialized attribute
                    item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
            }
            else {
                //rule
                if (!item[rule.dependent] && Math.random() <= rule.confidence)
                    // not initialized attribute
                    item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
            }
        }
        return item;
    }
}
exports.Compound = Compound;
