import dayjs = require('dayjs')
import { Uniform, Normal } from './Continuous'

export class UniformDate extends Uniform {
    format: string
    constructor(range: [number, number], format: string) {
        super([dayjs(range[0]).unix(), dayjs(range[1]).unix()])
        this.format = format
    }
    random(): string {
        return dayjs.unix(super.random()).format(this.format)
    }
    static Random(range: [number, number], format: string) {
        return dayjs
            .unix(Uniform.Random([dayjs(range[0]).unix(), dayjs(range[1]).unix()]))
            .format(format)
    }
}
export class NormalDate extends Normal {
    format: string
    constructor(u: number, sigma: number, format: string) {
        super(dayjs(u).unix(), dayjs(sigma).unix())
        this.format = format
    }
    random(): string {
        return dayjs.unix(super.random()).format(this.format)
    }
    static Random(u: number, sigma: number, format: string) {
        return dayjs.unix(Normal.Random(dayjs(u).unix(), dayjs(sigma).unix())).format(format)
    }
}
