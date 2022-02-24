"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Normal = void 0;
const Distribution_1 = require("./Distribution");
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
