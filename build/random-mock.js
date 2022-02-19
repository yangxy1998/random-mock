(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rmock"] = factory();
	else
		root["rmock"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Distribution = void 0;
class Distribution {
    constructor() { }
    static Random(...args) { }
}
exports.Distribution = Distribution;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisFilter = exports.AnalysisEffect = void 0;
function AnalysisEffect(effect) {
    const str = effect.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item) => {
        const args = names.map((name) => item[name]);
        return effect(...args);
    };
}
exports.AnalysisEffect = AnalysisEffect;
function AnalysisFilter(filter) {
    const str = filter.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item, index, items) => {
        const args = names.map((name) => item[name]);
        return filter(...args);
    };
}
exports.AnalysisFilter = AnalysisFilter;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRuleOrder = void 0;
function GetRuleOrder(attributes, rules) {
    let leading = [];
    let following = [];
    let order = [];
    function updateState() {
        following = [];
        for (let rule of rules) {
            if (!following.includes(rule.dependent))
                following.push(rule.dependent);
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
        rule.arguments.forEach((argument) => {
            if (!leading.includes(argument)) {
                clear = false;
            }
        });
        if (!clear) {
            i++;
        }
        else {
            order.push(rule);
            rules.splice(i, 1);
        }
        if (i >= rules.length) {
            updateState();
            i = 0;
        }
    }
    return order;
}
exports.GetRuleOrder = GetRuleOrder;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocker = exports.Distribution = exports.DataMode = exports.AttributeType = void 0;
const generator_1 = __webpack_require__(4);
Object.defineProperty(exports, "DataMode", { enumerable: true, get: function () { return generator_1.DataMode; } });
const distribution_1 = __webpack_require__(5);
Object.defineProperty(exports, "Distribution", { enumerable: true, get: function () { return distribution_1.Distribution; } });
const Attribute_1 = __webpack_require__(9);
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
const Mocker = generator_1.Generator;
exports.Mocker = Mocker;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.Table = exports.DataMode = void 0;
const Analysis_1 = __webpack_require__(1);
const Rule_1 = __webpack_require__(2);
var DataMode;
(function (DataMode) {
    DataMode[DataMode["Object"] = 0] = "Object";
    DataMode[DataMode["Table"] = 1] = "Table";
})(DataMode = exports.DataMode || (exports.DataMode = {}));
var Table;
(function (Table) {
    Table[Table["ArrangeByRow"] = 0] = "ArrangeByRow";
    Table[Table["ArrangeByCol"] = 1] = "ArrangeByCol";
})(Table = exports.Table || (exports.Table = {}));
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
        for (let rule of rules) {
            if (rule.name) {
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.distribution.random();
                });
            }
            else if (rule.filter) {
                //rule
                items.filter(Analysis_1.AnalysisFilter(rule.filter)).forEach((item) => {
                    if (!item[rule.dependent] && Math.random() <= rule.confidence)
                        // not initialized attribute
                        item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
                });
            }
            else {
                //rule
                items.forEach((item) => {
                    if (!item[rule.dependent] && Math.random() <= rule.confidence)
                        // not initialized attribute
                        item[rule.dependent] = Analysis_1.AnalysisEffect(rule.effect)(item);
                });
            }
        }
        return items;
    }
    _createTable(count, settings = { head: true, mode: Table.ArrangeByRow }) {
        if (settings.mode === Table.ArrangeByRow) {
            let header = this.config.attributes.map((attribute) => attribute.name);
            let items = settings.head ? [header] : [];
            for (let i = 0; i < count; i++) {
                items.push(Array(this.config.attributes.length));
            }
            let rules = Rule_1.GetRuleOrder(this.config.attributes, this.config.rules);
            for (let rule of rules) {
                if (rule.type) {
                    //attribute
                    const index = header.indexOf(rule.name);
                    items.forEach((item) => {
                        if (!item[index])
                            item[index] = rule.distribution.random();
                    });
                }
                else {
                    //rule
                    const index = header.indexOf(rule.dependent);
                    items.filter(Analysis_1.AnalysisFilter(rule.filter)).forEach((item) => {
                        item[index] =
                            Math.random() <= rule.confidence
                                ? Analysis_1.AnalysisEffect(rule.effect)
                                : this.attributes[index].distribution.random();
                    });
                }
            }
            return items;
        }
    }
}
exports.Generator = Generator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Distribution = void 0;
const Discrete_1 = __webpack_require__(6);
const Continuous_1 = __webpack_require__(7);
const Compound_1 = __webpack_require__(8);
exports.Distribution = {
    Compound: Compound_1.Compound,
    Continuous: {
        Uniform: Continuous_1.Uniform,
        Normal: //均匀分布
        Continuous_1.Normal //正态分布
    },
    Date: {
        Uniform: Continuous_1.Uniform,
        Normal: Continuous_1.Normal
    },
    Discrete: {
        Discrete: Discrete_1.Discrete
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Discrete = void 0;
const Distribution_1 = __webpack_require__(0);
class Discrete extends Distribution_1.Distribution {
    constructor(range, p) {
        super();
        this.range = range;
        if (p) {
            this.p = [0];
            let current = 0;
            for (let range_p of p) {
                current += range_p;
                this.p.push(current);
            }
            if (current !== 1) {
                throw Error('the total rate is not 1');
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
}
exports.Discrete = Discrete;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Normal = exports.Uniform = void 0;
const Distribution_1 = __webpack_require__(0);
class Uniform extends Distribution_1.Distribution {
    constructor(range) {
        super();
        this.begin = range[0];
        this.length = range[1] - range[0];
    }
    random() {
        return this.begin + Math.random() * this.length;
    }
    static Random(range) {
        let begin = range[0];
        let length = range[1] - range[0];
        return begin + Math.random() * length;
    }
}
exports.Uniform = Uniform;
class Normal extends Distribution_1.Distribution {
    constructor(u, sigma) {
        super();
        this.u = u;
        this.sigma = sigma;
    }
    random() {
        //Box-Muller
        return this.u + Normal._BoxMuller() * this.sigma;
    }
    static Random(u, sigma) {
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
exports.default = { Uniform, Normal };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Compound = void 0;
const Distribution_1 = __webpack_require__(0);
const Rule_1 = __webpack_require__(2);
const Analysis_1 = __webpack_require__(1);
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeType = void 0;
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["Discrete"] = 0] = "Discrete";
    AttributeType[AttributeType["Continuous"] = 1] = "Continuous";
    AttributeType[AttributeType["Date"] = 2] = "Date";
    AttributeType[AttributeType["Compound"] = 3] = "Compound";
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));


/***/ })
/******/ ]);
});
//# sourceMappingURL=random-mock.js.map