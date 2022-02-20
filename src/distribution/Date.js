"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalDate = exports.UniformDate = void 0;
const dayjs = require("dayjs");
const Continuous_1 = require("./Continuous");
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
