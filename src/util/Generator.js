"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const attribute_1 = require("../attribute");
const PrecedenceGraph_1 = require("./PrecedenceGraph");
const Primary_1 = require("../attribute/Primary");
const Regulation_1 = require("../regulation/Regulation");
const regulation_1 = require("../regulation");
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
        this.compounds = [];
        this.attributeMap = {};
        for (let attributeConfig of config.attributes) {
            const attribute = attribute_1.AttributeCreater(attributeConfig);
            if (attribute instanceof Primary_1.Primary) {
                this.primaries.push(attribute);
                this.attributes.push(attribute);
            }
            else if (attribute instanceof attribute_1.Compound)
                this.compounds.push(attribute);
            else {
                this.attributes.push(attribute);
            }
            this.attributeMap[attribute.name] = attribute;
        }
        const rules = config.rules.map((rule) => {
            if (rule.regulation instanceof Regulation_1.RegulationConstructor)
                return rule;
            else {
                rule.regulation = regulation_1.CreateRegulation(rule);
                return rule;
            }
        });
        this.precedence = new PrecedenceGraph_1.PrecedenceGraph(this.attributes, rules);
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
            else {
                //rule
                const rule = singlerule;
                items.forEach((item) => {
                    if (Math.random() <= (rule.confidence ? rule.confidence : 1)) {
                        // not initialized attribute
                        const value = rule.regulation.getValue(item);
                        if (value)
                            item[rule.target] = value;
                    }
                });
            }
        }
        for (let compound of this.compounds) {
            items.forEach((item) => {
                item[compound.name] = compound.random(item);
                compound.args.forEach((name) => {
                    delete item[name];
                });
            });
        }
        return items;
    }
    _createTable(count, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        let items = this._createObjectList(count);
        let array = [];
        const header = Object.keys(items[0]);
        if (settings.head)
            array.push(header);
        items.forEach((item) => array.push(header.map((name) => item[name])));
        return array;
    }
}
exports.Generator = Generator;
