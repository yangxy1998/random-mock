"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cauchy = exports.Exponential = exports.Normal = exports.Uniform = void 0;
const Distribution_1 = require("./Distribution");
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
