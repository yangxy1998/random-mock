"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const Analysis_1 = require("./Analysis");
const Attribute_1 = require("./Attribute");
const Rule_1 = require("./Rule");
var DataMode;
(function (DataMode) {
    DataMode[DataMode["Object"] = 0] = "Object";
    DataMode[DataMode["Table"] = 1] = "Table";
})(DataMode = exports.DataMode || (exports.DataMode = {}));
var TableMode;
(function (TableMode) {
    TableMode[TableMode["ArrangeByRow"] = 0] = "ArrangeByRow";
    TableMode[TableMode["ArrangeByCol"] = 1] = "ArrangeByCol";
})(TableMode = exports.TableMode || (exports.TableMode = {}));
class Generator {
    constructor(config) {
        this.config = config;
        this.attributes = {};
        for (let attribute of config.attributes) {
            this.attributes[attribute.name] = {
                type: attribute.type,
                distribution: attribute.distribution
            };
        }
    }
    create(config = {
        count: 100,
        mode: DataMode.Object
    }) {
        if (config.mode === DataMode.Object) {
            return this._createObjectList(config.count);
        }
        else if (config.mode === DataMode.Table) {
            return this._createTable(config.count, config.settings);
        }
    }
    _createObjectList(count) {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push({});
        }
        let rules = Rule_1.GetRuleOrder(this.config.attributes, this.config.rules);
        for (let singlerule of rules) {
            if (Attribute_1.isAttribute(singlerule)) {
                const rule = singlerule;
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.distribution.random();
                });
            }
            else if (singlerule.filter) {
                //rule
                const rule = singlerule;
                items.filter(Analysis_1.AnalysisFilter(singlerule.filter)).forEach((item) => {
                    if (!item[rule.dependent] &&
                        Math.random() <= (rule.confidence ? rule.confidence : 1))
                        // not initialized attribute
                        item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
                });
            }
            else {
                //rule
                const rule = singlerule;
                items.forEach((item) => {
                    if (!item[rule.dependent] &&
                        Math.random() <= (rule.confidence ? rule.confidence : 1))
                        // not initialized attribute
                        item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
                });
            }
        }
        return items;
    }
    _createTable(count, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        if (settings.mode === TableMode.ArrangeByRow) {
            const header = [];
            const mapper = {};
            this.config.attributes.forEach((attribute, index) => {
                mapper[attribute.name] = index;
                header.push(attribute.name);
            });
            const items = settings.head ? [header] : [];
            for (let i = 0; i < count; i++) {
                items.push(Array(this.config.attributes.length));
            }
            let rules = Rule_1.GetRuleOrder(this.config.attributes, this.config.rules);
            for (let singlerule of rules) {
                if (Attribute_1.isAttribute(singlerule)) {
                    //attribute
                    const rule = singlerule;
                    const index = header.indexOf(rule.name);
                    items.forEach((item) => {
                        if (!item[index])
                            item[index] = rule.distribution.random();
                    });
                }
                else if (singlerule.filter) {
                    //rule
                    const rule = singlerule;
                    const index = header.indexOf(rule.dependent);
                    items.filter(Analysis_1.AnalysisFilter(singlerule.filter, mapper)).forEach((item) => {
                        if (!item[index] &&
                            Math.random() <= (rule.confidence ? rule.confidence : 1))
                            item[index] = Analysis_1.AnalysisEffect(rule.effect, mapper)(item);
                    });
                }
                else {
                    //rule
                    const rule = singlerule;
                    const index = header.indexOf(rule.dependent);
                    items.forEach((item) => {
                        if (!item[index] &&
                            Math.random() <= (rule.confidence ? rule.confidence : 1))
                            item[index] = Analysis_1.AnalysisEffect(rule.effect, mapper)(item);
                    });
                }
            }
            return items;
        }
    }
}
exports.Generator = Generator;
