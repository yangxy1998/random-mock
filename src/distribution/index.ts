import { Standard, Hypergeometric } from './Discrete'
import { Uniform, Normal, Exponential, Cauchy } from './Continuous'
import { Compound } from './Compound'
import { UniformDate, NormalDate } from './Date'
export const Distribution = {
    Compound,
    Continuous: {
        Uniform, // 均匀分布
        Normal, // 正态分布
        Exponential, // 指数分布
        Cauchy // 柯西分布
    },
    Date: {
        Uniform: UniformDate,
        Normal: NormalDate
    },
    Discrete: {
        Standard,
        Hypergeometric // 超几何分布
    }
}
