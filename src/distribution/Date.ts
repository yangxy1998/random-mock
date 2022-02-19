import { Uniform, Normal } from './Continuous'
import dayjs = require('dayjs')

export class UniformDate extends Uniform {
    constructor(range) {
        super([dayjs(range[0]).unix(), dayjs(range[1]).unix()])
    }
    static Random(range) {
        return Uniform.Random([dayjs(range[0]).unix(), dayjs(range[1]).unix()])
    }
}
export class NormalDate extends Normal {
    u: number
    sigma: number
    constructor(u, sigma) {
        super(dayjs(u).unix(), dayjs(sigma).unix())
    }
    static Random(u, sigma) {
        return Normal.Random(dayjs(u).unix(), dayjs(sigma).unix())
    }
}
