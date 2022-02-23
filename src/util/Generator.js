"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const Analysis_1 = require("./Analysis");
const Attribute_1 = require("./Attribute");
const PrecedenceGraph_1 = require("./PrecedenceGraph");
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
        this.precedence = new PrecedenceGraph_1.PrecedenceGraph(config.attributes, config.rules);
        for (let attribute of config.attributes) {
            this.attributes[attribute.name] = {
                type: attribute.type,
                distribution: attribute.distribution
            };
        }
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
        if (this.config.primary) {
            const cart = (target, unique) => {
                if (target.length === 0) {
                    return unique.range.map((value) => {
                        return { [unique.name]: value };
                    });
                }
                else {
                    const result = [];
                    target.forEach((element) => {
                        unique.range.forEach((value) => {
                            result.push({ [unique.name]: value, ...element });
                        });
                    });
                    return result;
                }
            };
            this.config.primary.forEach((unique) => {
                items = cart(items, unique);
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
            let index = 0;
            const cart = (target, unique) => {
                if (target.length === 0) {
                    return unique.range.map((value) => {
                        return [value];
                    });
                }
                else {
                    const result = [];
                    target.forEach((element) => {
                        unique.range.forEach((value) => {
                            result.push([...element, value]);
                        });
                    });
                    return result;
                }
            };
            let items = [];
            if (this.config.primary) {
                this.config.primary.forEach((unique) => {
                    mapper[unique.name] = index;
                    header.push(unique.name);
                    items = cart(items, unique);
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
