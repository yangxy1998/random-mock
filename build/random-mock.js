(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RandMock"] = factory();
	else
		root["RandMock"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeConstructor = exports.AttributeType = void 0;
var AttributeType;
(function (AttributeType) {
    AttributeType["Category"] = "category";
    AttributeType["Discrete"] = "discrete";
    AttributeType["Continuous"] = "continuous";
    AttributeType["Date"] = "date";
    AttributeType["Compound"] = "compound";
    AttributeType["Unique"] = "unique";
    AttributeType["Primary"] = "primary"; // 作为主键的变量
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
class AttributeConstructor {
    constructor(name, distribution) {
        this.name = name;
        this.distribution = distribution;
    }
    random() {
        return this.valueToFormat(this.distribution.random());
    }
    formatToValue(source) {
        // 自然语言数据转换成分布算法可执行的数据
        return source;
    }
    valueToFormat(source) {
        // 算法数据转换成自然语言数据
        return source;
    }
}
exports.AttributeConstructor = AttributeConstructor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionConstructor = void 0;
class DistributionConstructor {
    constructor() { }
    random(...args) { }
    static Random(...args) { }
}
exports.DistributionConstructor = DistributionConstructor;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = exports.Primary = exports.Discrete = exports.Date = exports.Continuous = exports.Category = exports.AttributeConstructor = exports.AttributeType = exports.AttributeCreater = exports.Attribute = void 0;
const Continuous_1 = __webpack_require__(12);
Object.defineProperty(exports, "Continuous", { enumerable: true, get: function () { return Continuous_1.Continuous; } });
const Date_1 = __webpack_require__(13);
Object.defineProperty(exports, "Date", { enumerable: true, get: function () { return Date_1.Date; } });
const Discrete_1 = __webpack_require__(5);
Object.defineProperty(exports, "Discrete", { enumerable: true, get: function () { return Discrete_1.Discrete; } });
const Category_1 = __webpack_require__(15);
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const Unique_1 = __webpack_require__(16);
Object.defineProperty(exports, "Unique", { enumerable: true, get: function () { return Unique_1.Unique; } });
const Primary_1 = __webpack_require__(6);
Object.defineProperty(exports, "Primary", { enumerable: true, get: function () { return Primary_1.Primary; } });
const Attribute_1 = __webpack_require__(0);
Object.defineProperty(exports, "AttributeConstructor", { enumerable: true, get: function () { return Attribute_1.AttributeConstructor; } });
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
exports.Attribute = {
    Continuous: Continuous_1.Continuous,
    Date: Date_1.Date,
    Discrete: Discrete_1.Discrete,
    Category: Category_1.Category,
    Unique: Unique_1.Unique,
    Primary: Primary_1.Primary
};
function AttributeCreater(config) {
    const another = Object.values(config).slice(3);
    if (config.type === Attribute_1.AttributeType.Category) {
        return new Category_1.Category(config.name, config.distribution);
    }
    else if (config.type === Attribute_1.AttributeType.Continuous) {
        return new Continuous_1.Continuous(config.name, config.distribution);
    }
    else if (config.type === Attribute_1.AttributeType.Date) {
        return new Date_1.Date(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Discrete) {
        return new Discrete_1.Discrete(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Primary) {
        return new Primary_1.Primary(config.name, config.distribution, ...another);
    }
    else if (config.type === Attribute_1.AttributeType.Unique) {
        return new Unique_1.Unique(config.name, config.distribution, ...another);
    }
    else
        return new Attribute_1.AttributeConstructor(config.name, config.distribution);
}
exports.AttributeCreater = AttributeCreater;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = exports.Standard = exports.Normal = exports.Hypergeometric = exports.Exponential = exports.Disposable = exports.Compound = exports.Cauchy = exports.DistributionConstructor = exports.Distribution = void 0;
const Compound_1 = __webpack_require__(17);
Object.defineProperty(exports, "Compound", { enumerable: true, get: function () { return Compound_1.Compound; } });
const Exponential_1 = __webpack_require__(19);
Object.defineProperty(exports, "Exponential", { enumerable: true, get: function () { return Exponential_1.Exponential; } });
const Standard_1 = __webpack_require__(8);
Object.defineProperty(exports, "Standard", { enumerable: true, get: function () { return Standard_1.Standard; } });
const Uniform_1 = __webpack_require__(20);
Object.defineProperty(exports, "Uniform", { enumerable: true, get: function () { return Uniform_1.Uniform; } });
const Normal_1 = __webpack_require__(21);
Object.defineProperty(exports, "Normal", { enumerable: true, get: function () { return Normal_1.Normal; } });
const Cauchy_1 = __webpack_require__(22);
Object.defineProperty(exports, "Cauchy", { enumerable: true, get: function () { return Cauchy_1.Cauchy; } });
const Hypergeometric_1 = __webpack_require__(23);
Object.defineProperty(exports, "Hypergeometric", { enumerable: true, get: function () { return Hypergeometric_1.Hypergeometric; } });
const Disposable_1 = __webpack_require__(24);
Object.defineProperty(exports, "Disposable", { enumerable: true, get: function () { return Disposable_1.Disposable; } });
const Distribution_1 = __webpack_require__(1);
Object.defineProperty(exports, "DistributionConstructor", { enumerable: true, get: function () { return Distribution_1.DistributionConstructor; } });
exports.Distribution = {
    Cauchy: Cauchy_1.Cauchy,
    Compound: Compound_1.Compound,
    Disposable: Disposable_1.Disposable,
    Exponential: Exponential_1.Exponential,
    Standard: Standard_1.Standard,
    Uniform: Uniform_1.Uniform,
    Normal: Normal_1.Normal,
    Hypergeometric: Hypergeometric_1.Hypergeometric
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RegulationConstructor = void 0;
class RegulationConstructor {
    constructor(args) {
        this.args = args;
    }
}
exports.RegulationConstructor = RegulationConstructor;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Discrete = void 0;
const Attribute_1 = __webpack_require__(0);
class Discrete extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, step) {
        super(name, distribution);
        this.type = Attribute_1.AttributeType.Discrete;
        this.step = step ? step : 1;
        this.range = [];
    }
    random() {
        const result = Math.floor(super.random() / this.step) * this.step;
        if (!this.range.includes(result)) {
            this.range.push(result);
            this.range.sort((a, b) => a - b);
        }
        return result;
    }
    valueToFormat(source) {
        return Math.floor(source / this.step) * this.step;
    }
}
exports.Discrete = Discrete;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Attribute_1 = __webpack_require__(0);
class Primary extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, count = 100, formatToValue = (source) => source, valueToFormat = (source) => source, retryCount = 100) {
        super(name, distribution);
        this.formatToValue = formatToValue;
        this.valueToFormat = valueToFormat;
        this.type = Attribute_1.AttributeType.Unique;
        this.retryCount = retryCount;
        this.range = [];
        this.index = -1;
        for (let i = 0; i < count; i++) {
            let finded = false;
            do {
                const result = this.valueToFormat(super.random());
                if (!this.range.includes(result)) {
                    this.range.push(result);
                    finded = true;
                    break;
                }
                i++;
            } while (i < this.retryCount);
            if (!finded)
                throw Error('exceed max retry count');
        }
    }
    random() {
        if (this.index < this.range.length)
            this.index++;
        else
            this.index = 0;
        return this.range[this.index];
    }
}
exports.Primary = Primary;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecedenceGraph = void 0;
const attribute_1 = __webpack_require__(2);
class PrecedenceGraph {
    constructor(attributes, rules) {
        let leading = attributes
            .filter((attribute) => attribute.type === attribute_1.AttributeType.Primary)
            .map((attribute) => attribute.name);
        let following = [];
        let order = [];
        this.nodes = new Map(attributes.map((attribute) => [attribute.name, { name: attribute.name }]));
        this.links = [];
        function updateState() {
            following = [];
            for (let rule of rules) {
                if (!following.includes(rule.target))
                    following.push(rule.target);
            }
            for (let attribute of attributes) {
                if (!following.includes(attribute.name) && !leading.includes(attribute.name)) {
                    order.push(attribute);
                    leading.push(attribute.name);
                }
            }
        }
        updateState();
        let i = 0;
        while (rules.length > 0) {
            let rule = rules[i];
            let clear = true;
            rule.regulation.args.forEach((argument) => {
                if (!leading.includes(argument)) {
                    clear = false;
                }
            });
            if (!clear) {
                i++;
            }
            else {
                order.push(rule);
                this.links.push(...rule.regulation.args.map((source) => {
                    return { source, target: rule.target, weight: rule.confidence };
                }));
                rules.splice(i, 1);
            }
            if (i >= rules.length) {
                updateState();
                i = 0;
            }
        }
        this.sequence = order;
    }
    getSequence() {
        return this.sequence;
    }
    getGraph() {
        return { nodes: this.nodes, links: this.links };
    }
}
exports.PrecedenceGraph = PrecedenceGraph;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Standard = void 0;
const Distribution_1 = __webpack_require__(1);
class Standard extends Distribution_1.DistributionConstructor {
    constructor(range, p) {
        super();
        this.range = range;
        if (p) {
            if (p.length !== range.length) {
                throw Error('the rate is not matched to range');
            }
            this.p = [0];
            let current = 0;
            for (let range_p of p) {
                current += range_p;
                if (current > 1) {
                    throw Error('the rate is above 1, please check your definition');
                }
                this.p.push(current);
            }
            if (current !== 1) {
                this.p[this.p.length - 1] = 1;
            }
        }
        else {
            this.p = [];
            for (let i = 0; i < range.length; i++) {
                this.p.push(i / range.length);
            }
            this.p.push(1);
        }
    }
    random() {
        let random = Math.random();
        for (let i = 0; i < this.p.length - 1; i++) {
            if (random <= this.p[i + 1] && random >= this.p[i])
                return this.range[i];
        }
        return this.range[0];
    }
    static Random(range, p) {
        let random = Math.random();
        if (p) {
            for (let i = 0; i < p.length; i++) {
                random -= p[i];
                if (random < 0)
                    return range[i];
            }
        }
        else {
            let index = Math.floor(random * range.length);
            if (index < range.length)
                return range[index];
        }
        return range[range.length - 1];
    }
}
exports.Standard = Standard;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const distribution_1 = __webpack_require__(3);
const Regulation_1 = __webpack_require__(4);
class Expression extends Regulation_1.RegulationConstructor {
    constructor(args, expression) {
        super(args);
        this.expression = expression;
        this.distribution = (value) => new distribution_1.Normal(value, 1);
    }
    Uniform(sigma) {
        this.distribution = (value) => new distribution_1.Normal(value, sigma);
        return this;
    }
    Normal(difference) {
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocker = exports.Regulation = exports.Distribution = exports.DataMode = exports.AttributeType = exports.Attribute = void 0;
const Generator_1 = __webpack_require__(11);
Object.defineProperty(exports, "DataMode", { enumerable: true, get: function () { return Generator_1.DataMode; } });
const distribution_1 = __webpack_require__(3);
Object.defineProperty(exports, "Distribution", { enumerable: true, get: function () { return distribution_1.Distribution; } });
const attribute_1 = __webpack_require__(2);
Object.defineProperty(exports, "Attribute", { enumerable: true, get: function () { return attribute_1.Attribute; } });
const Attribute_1 = __webpack_require__(0);
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
const regulation_1 = __webpack_require__(25);
Object.defineProperty(exports, "Regulation", { enumerable: true, get: function () { return regulation_1.Regulation; } });
const Mocker = Generator_1.Generator;
exports.Mocker = Mocker;
exports.default = Mocker;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const attribute_1 = __webpack_require__(2);
const PrecedenceGraph_1 = __webpack_require__(7);
const Primary_1 = __webpack_require__(6);
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
        this.attributeMap = {};
        for (let attributeConfig of config.attributes) {
            const attribute = attribute_1.AttributeCreater(attributeConfig);
            if (attribute instanceof Primary_1.Primary) {
                this.primaries.push(attribute);
            }
            this.attributes.push(attribute);
            this.attributeMap[attribute.name] = attribute;
        }
        this.regulations = config.rules.map((rule) => rule.regulation);
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
                else {
                    //rule
                    const rule = singlerule;
                    const index = header.indexOf(rule.target);
                    items.forEach((item) => {
                        if (Math.random() <= (rule.confidence ? rule.confidence : 1)) {
                            // not initialized attribute
                            const value = rule.regulation.getValue(item);
                            if (value)
                                item[index] = value;
                        }
                    });
                }
            }
            return items;
        }
    }
}
exports.Generator = Generator;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Continuous = void 0;
const Attribute_1 = __webpack_require__(0);
class Continuous extends Attribute_1.AttributeConstructor {
    constructor(name, distribution) {
        super(name, distribution);
        this.type = Attribute_1.AttributeType.Continuous;
    }
}
exports.Continuous = Continuous;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const dayjs = __webpack_require__(14);
const Attribute_1 = __webpack_require__(0);
const Discrete_1 = __webpack_require__(5);
class Date extends Discrete_1.Discrete {
    constructor(name, distribution, format) {
        super(name, distribution);
        this.range = [];
        this.type = Attribute_1.AttributeType.Date;
        this.formatString = format ? format : 'YYYY/MM/DD';
    }
    random() {
        const result = dayjs.unix(super.random()).format(this.formatString);
        if (!this.range.includes(result)) {
            this.range.push(result);
            this.range.sort();
        }
        return result;
    }
    formatToValue(source) {
        return dayjs(source).unix();
    }
    valueToFormat(source) {
        return dayjs.unix(source).format(this.formatString);
    }
}
exports.Date = Date;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const Attribute_1 = __webpack_require__(0);
class Category extends Attribute_1.AttributeConstructor {
    constructor(name, distribution) {
        super(name, distribution);
        this.random = () => {
            const result = super.random();
            if (!this.range.includes(result))
                this.range.push(result);
            return result;
        };
        this.range = [];
        this.type = Attribute_1.AttributeType.Category;
    }
}
exports.Category = Category;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = void 0;
const Attribute_1 = __webpack_require__(0);
class Unique extends Attribute_1.AttributeConstructor {
    constructor(name, distribution, formatToValue = (source) => source, valueToFormat = (source) => source, retryCount = 100) {
        super(name, distribution);
        this.formatToValue = formatToValue;
        this.valueToFormat = valueToFormat;
        this.type = Attribute_1.AttributeType.Unique;
        this.retryCount = retryCount;
        this.range = [];
        this.index = -1;
        this.random = () => {
            let i = 0;
            do {
                const result = this.valueToFormat(super.random());
                if (!this.range.includes(result)) {
                    this.range.push(result);
                    return result;
                }
                i++;
            } while (i < this.retryCount);
            throw Error('exceed max retry count');
        };
    }
}
exports.Unique = Unique;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Compound = void 0;
const Distribution_1 = __webpack_require__(1);
const PrecedenceGraph_1 = __webpack_require__(7);
const Analysis_1 = __webpack_require__(18);
class Compound extends Distribution_1.DistributionConstructor {
    constructor(confiurations) {
        super();
        this.orders = new PrecedenceGraph_1.PrecedenceGraph(confiurations.attributes, confiurations.rules).getSequence();
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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisFilter = exports.AnalysisEffect = void 0;
function AnalysisEffect(effect, mapper) {
    const str = effect.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name]);
        return effect(...args);
    };
}
exports.AnalysisEffect = AnalysisEffect;
function AnalysisFilter(filter, mapper) {
    const str = filter.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item, index, items) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name]);
        return filter(...args);
    };
}
exports.AnalysisFilter = AnalysisFilter;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Exponential = void 0;
const Distribution_1 = __webpack_require__(1);
class Exponential extends Distribution_1.DistributionConstructor {
    constructor(offset, lambda) {
        super();
        this.begin = offset;
        this.lambda = lambda;
    }
    random() {
        return this.begin - Math.log(Math.random()) / this.lambda;
    }
    static Random(begin, lambda) {
        return begin - Math.log(Math.random()) / lambda;
    }
}
exports.Exponential = Exponential;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = void 0;
const Distribution_1 = __webpack_require__(1);
class Uniform extends Distribution_1.DistributionConstructor {
    constructor(range) {
        super();
        this.begin = range[0];
        this.length = range[1] - range[0];
    }
    random() {
        return this.begin + Math.random() * this.length;
    }
    static Random(range, ...args) {
        let begin = range[0];
        let length = range[1] - range[0];
        return begin + Math.random() * length;
    }
}
exports.Uniform = Uniform;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Normal = void 0;
const Distribution_1 = __webpack_require__(1);
class Normal extends Distribution_1.DistributionConstructor {
    constructor(u, sigma) {
        super();
        this.u = u;
        this.sigma = sigma;
    }
    random() {
        //Box-Muller
        return this.u + Normal._BoxMuller() * this.sigma;
    }
    static Random(u, sigma, ...args) {
        return u + Normal._BoxMuller() * sigma;
    }
    static _BoxMuller() {
        var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
        do {
            //获得两个（-1,1）的独立随机变量
            u = Math.random() * 2 - 1.0;
            v = Math.random() * 2 - 1.0;
            w = u * u + v * v;
        } while (w == 0.0 || w >= 1.0);
        //这里就是 Box-Muller转换
        c = Math.sqrt((-2 * Math.log(w)) / w);
        //返回2个标准正态分布的随机数，封装进一个数组返回
        //当然，因为这个函数运行较快，也可以扔掉一个
        //return [u*c,v*c];
        return u * c;
    }
}
exports.Normal = Normal;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Cauchy = void 0;
const Distribution_1 = __webpack_require__(1);
class Cauchy extends Distribution_1.DistributionConstructor {
    constructor(x0, theta) {
        super();
        this.begin = x0;
        this.theta = theta;
    }
    random() {
        return Math.tan((Math.random() - 0.5) * Math.PI) * this.theta + this.begin;
    }
    static Random(x0, theta) {
        return Math.tan((Math.random() - 0.5) * Math.PI) * theta + x0;
    }
}
exports.Cauchy = Cauchy;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Hypergeometric = void 0;
const Standard_1 = __webpack_require__(8);
class Hypergeometric extends Standard_1.Standard {
    constructor(range, N, M, n) {
        const denominator = C(n, N);
        let p = [];
        let value = 0;
        for (let k = 0; k <= n; k++) {
            const numerator = C(k, M) * C(n - k, N - M);
            value += numerator / denominator;
            p.push(value);
        }
        super(range, p);
    }
    static Random() {
        if (arguments.length === 4) {
            const range = arguments[0];
            const N = arguments[1];
            const M = arguments[2];
            const n = arguments[3];
            const denominator = C(n, N);
            let p = [];
            let value = 0;
            for (let k = 0; k <= n; k++) {
                const numerator = C(k, M) * C(n - k, N - M);
                value += numerator / denominator;
                p.push(value);
            }
            return Standard_1.Standard.Random(range, p);
        }
        else {
            return Standard_1.Standard.Random(arguments[0], arguments[1]);
        }
    }
}
exports.Hypergeometric = Hypergeometric;
function C(M, N) {
    if (M >= N || M === 0 || N === 0)
        return 1;
    if (M > N / 2)
        M = N - M;
    let numerator = 1, denominator = 1;
    for (let i = 1; i <= M; i++) {
        numerator *= N - i + 1;
        denominator *= i;
    }
    return Math.round(numerator / denominator);
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Disposable = void 0;
const Distribution_1 = __webpack_require__(1);
class Disposable extends Distribution_1.DistributionConstructor {
    constructor(dataset) {
        super();
        this.samples = dataset;
    }
    random() {
        if (this.samples.length === 0)
            throw Error('out of samples');
        let random = Math.floor(Math.random() * this.samples.length);
        if (random === this.samples.length)
            random--;
        const sample = this.samples.splice(random, 1)[0];
        return sample;
    }
    static Random(dataset) {
        let random = Math.floor(Math.random() * dataset.length);
        if (random === dataset.length)
            random--;
        const sample = dataset.splice(random, 1)[0];
        return sample;
    }
}
exports.Disposable = Disposable;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Regulation = void 0;
const Expression_1 = __webpack_require__(9);
const MappingTable_1 = __webpack_require__(26);
const Regulation_1 = __webpack_require__(4);
exports.Regulation = {
    Expression: Expression_1.Expression,
    MappingTable: MappingTable_1.MappingTable
};
exports.default = {
    Expression: Expression_1.Expression,
    MappingTable: MappingTable_1.MappingTable,
    RegulationConstructor: Regulation_1.RegulationConstructor
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingTable = void 0;
const distribution_1 = __webpack_require__(3);
const Expression_1 = __webpack_require__(9);
const Regulation_1 = __webpack_require__(4);
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=random-mock.js.map