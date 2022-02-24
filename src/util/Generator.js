"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const Analysis_1 = require("./Analysis");
const attribute_1 = require("../attribute");
const PrecedenceGraph_1 = require("./PrecedenceGraph");
const Primary_1 = require("../attribute/Primary");
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
        this.attributes = [];
        this.primaries = [];
        for (let attributeConfig of config.attributes) {
            const attribute = attributeConfig.type(attributeConfig.name, attributeConfig.distribution);
            if (attribute instanceof Primary_1.Primary) {
                this.primaries.push(attribute);
            }
            else {
                this.attributes.push(attribute);
            }
        }
        this.precedence = new PrecedenceGraph_1.PrecedenceGraph(this.attributes, config.rules);
    }
    create(config) {
        config = {
            mode: DataMode.Object,
            ...config
        };
        if (config.mode === DataMode.Object) {
            return this._createObjectList(config.count);
        }
        else if (config.mode === DataMode.Table) {
            return this._createTable(config.count, config.settings);
        }
    }
    _createObjectList(count) {
        let items = [];
        if (this.primaries.length > 0) {
            const cart = (target, primary) => {
                if (target.length === 0) {
                    return primary.range.map((value) => {
                        return { [primary.name]: value };
                    });
                }
                else {
                    const result = [];
                    target.forEach((element) => {
                        primary.range.forEach((value) => {
                            result.push({ [primary.name]: value, ...element });
                        });
                    });
                    return result;
                }
            };
            this.primaries.forEach((primary) => {
                items = cart(items, primary);
            });
            if (count)
                if (count > items.length)
                    console.warn('requested count greater than primary keys');
                else
                    items = items.slice(0, count);
        }
        else {
            if (count)
                for (let i = 0; i < count; i++) {
                    items.push({});
                }
            else
                throw Error('count is needed while primary is not defined');
        }
        let sequence = this.precedence.getSequence();
        for (let singlerule of sequence) {
            if (singlerule instanceof attribute_1.AttributeConstructor) {
                const rule = singlerule;
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.random();
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
            let index = 0;
            const cart = (target, primary) => {
                if (target.length === 0) {
                    return primary.range.map((value) => {
                        return [value];
                    });
                }
                else {
                    const result = [];
                    target.forEach((element) => {
                        primary.range.forEach((value) => {
                            result.push([...element, value]);
                        });
                    });
                    return result;
                }
            };
            let items = [];
            if (this.primaries.length > 0) {
                this.primaries.forEach((primary) => {
                    mapper[primary.name] = index;
                    header.push(primary.name);
                    items = cart(items, primary);
                    index++;
                });
                if (count)
                    if (count > items.length)
                        console.warn('requested count greater than primary keys');
                    else
                        items = items.slice(0, count);
                items = items.map((item) => item.concat(Array(this.config.attributes.length)));
            }
            else {
                if (count) {
                    for (let i = 0; i < count; i++) {
                        items.push(Array(this.config.attributes.length));
                    }
                }
                else
                    throw Error('count is needed while primary is not defined');
            }
            this.config.attributes.forEach((attribute) => {
                mapper[attribute.name] = index;
                header.push(attribute.name);
                index++;
            });
            if (settings.head)
                items.unshift(header);
            let sequence = this.precedence.getSequence();
            for (let singlerule of sequence) {
                if (singlerule instanceof attribute_1.AttributeConstructor) {
                    //attribute
                    const rule = singlerule;
                    const index = header.indexOf(rule.name);
                    items.forEach((item) => {
                        if (!item[index])
                            item[index] = rule.random();
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
