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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
exports.Cauchy = exports.Exponential = exports.Normal = exports.Uniform = void 0;
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
    static Random(range, ...args) {
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
class Exponential extends Distribution_1.Distribution {
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
class Cauchy extends Distribution_1.Distribution {
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
exports.default = { Uniform, Normal, Exponential, Cauchy };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocker = exports.Distribution = exports.DataMode = exports.AttributeType = void 0;
const generator_1 = __webpack_require__(5);
Object.defineProperty(exports, "DataMode", { enumerable: true, get: function () { return generator_1.DataMode; } });
const distribution_1 = __webpack_require__(6);
Object.defineProperty(exports, "Distribution", { enumerable: true, get: function () { return distribution_1.Distribution; } });
const Attribute_1 = __webpack_require__(11);
Object.defineProperty(exports, "AttributeType", { enumerable: true, get: function () { return Attribute_1.AttributeType; } });
const Mocker = generator_1.Generator;
exports.Mocker = Mocker;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = exports.TableMode = exports.DataMode = void 0;
const Analysis_1 = __webpack_require__(1);
const Rule_1 = __webpack_require__(2);
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
            for (let rule of rules) {
                if (rule.name) {
                    //attribute
                    const index = header.indexOf(rule.name);
                    items.forEach((item) => {
                        if (!item[index])
                            item[index] = rule.distribution.random();
                    });
                }
                else if (rule.filter) {
                    //rule
                    const index = header.indexOf(rule.dependent);
                    items.filter(Analysis_1.AnalysisFilter(rule.filter, mapper)).forEach((item) => {
                        if (!item[index] && Math.random() <= rule.confidence)
                            item[index] = Analysis_1.AnalysisEffect(rule.effect, mapper)(item);
                    });
                }
                else {
                    //rule
                    const index = header.indexOf(rule.dependent);
                    items.forEach((item) => {
                        if (!item[index] && Math.random() <= rule.confidence)
                            item[index] = Analysis_1.AnalysisEffect(rule.effect, mapper)(item);
                    });
                }
            }
            return items;
        }
    }
}
exports.Generator = Generator;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Distribution = void 0;
const Discrete_1 = __webpack_require__(7);
const Continuous_1 = __webpack_require__(3);
const Compound_1 = __webpack_require__(8);
const Date_1 = __webpack_require__(9);
exports.Distribution = {
    Compound: Compound_1.Compound,
    Continuous: {
        Uniform: Continuous_1.Uniform,
        Normal: // 均匀分布
        Continuous_1.Normal,
        Exponential: // 正态分布
        Continuous_1.Exponential,
        Cauchy: // 指数分布
        Continuous_1.Cauchy // 柯西分布
    },
    Date: {
        Uniform: Date_1.UniformDate,
        Normal: Date_1.NormalDate
    },
    Discrete: {
        Standard: Discrete_1.Standard,
        Hypergeometric: Discrete_1.Hypergeometric // 超几何分布
    }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Hypergeometric = exports.Standard = void 0;
const Distribution_1 = __webpack_require__(0);
class Standard extends Distribution_1.Distribution {
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
class Hypergeometric extends Standard {
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
            Standard.Random(range, p);
        }
        else {
            Standard.Random(arguments[0], arguments[1]);
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
exports.NormalDate = exports.UniformDate = void 0;
const dayjs = __webpack_require__(10);
const Continuous_1 = __webpack_require__(3);
class UniformDate extends Continuous_1.Uniform {
    constructor(range, format) {
        super([dayjs(range[0]).unix(), dayjs(range[1]).unix()]);
        this.format = format;
    }
    random() {
        return dayjs.unix(super.random()).format(this.format);
    }
    static Random(range, format) {
        return dayjs
            .unix(Continuous_1.Uniform.Random([dayjs(range[0]).unix(), dayjs(range[1]).unix()]))
            .format(format);
    }
}
exports.UniformDate = UniformDate;
class NormalDate extends Continuous_1.Normal {
    constructor(u, sigma, format) {
        super(dayjs(u).unix(), dayjs(sigma).unix());
        this.format = format;
    }
    random() {
        return dayjs.unix(super.random()).format(this.format);
    }
    static Random(u, sigma, format) {
        return dayjs.unix(Continuous_1.Normal.Random(dayjs(u).unix(), dayjs(sigma).unix())).format(format);
    }
}
exports.NormalDate = NormalDate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 11 */
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