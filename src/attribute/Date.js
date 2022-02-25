"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const dayjs = require("dayjs");
const Attribute_1 = require("./Attribute");
const Discrete_1 = require("./Discrete");
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
