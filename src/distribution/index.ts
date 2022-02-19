import { Discrete } from './Discrete'
import { Uniform, Normal } from './Continuous'
import { Compound } from './Compound'
import { UniformDate, NormalDate } from './Date'
export const Distribution = {
    Compound,
    Continuous: {
        Uniform, //均匀分布
        Normal //正态分布
    },
    Date: {
        Uniform,
        Normal
    },
    Discrete: {
        Discrete
    }
}
