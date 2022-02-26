"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const dayjs = require("dayjs");
const Attribute_1 = require("./Attribute");
const Discrete_1 = require("./Discrete");
class Date extends Discrete_1.Discrete {
    constructor(name, distribution, format = 'YYYY/MM/DD', record = false, sort = false) {
        super(name, distribution, 1, record, sort, (source) => {
            return dayjs(source).unix();
        }, (source) => {
            return dayjs.unix(source).format(format);
        });
        this.type = Attribute_1.AttributeType.Date;
        this.formatString = format;
        this.range = [];
    }
    random() {
        const result = dayjs.unix(super.random()).format(this.formatString);
        if (this.record && !this.range.includes(result)) {
            this.range.push(result);
            if (this.sort)
                this.range.sort();
        }
        return result;
    }
}
exports.Date = Date;
