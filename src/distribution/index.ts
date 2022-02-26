import { Compound } from './Compound'
import { Exponential } from './Exponential'
import { Standard } from './Standard'
import { Uniform } from './Uniform'
import { Normal } from './Normal'
import { Cauchy } from './Cauchy'
import { Hypergeometric } from './Hypergeometric'
import { Disposable } from './Disposable'
import { DistributionConstructor } from './Distribution'
enum DistributionType {
    Cauchy = 'cauchy',
    Compound = 'compound',
    Disposable = 'disposable',
    Exponential = 'exponential',
    Standard = 'standard',
    Uniform = 'uniform',
    Normal = 'normal',
    Hypergeometric = 'hypergeometric'
}
export type DistributionConfig = {
    type: DistributionType
    [argument: string]: any
}
export function DistributionCreater(config: DistributionConfig, format = (source: any) => source) {
    if (config.type === DistributionType.Cauchy) {
        return new Cauchy(format(config.x0), format(config.theta))
    } else if (config.type === DistributionType.Disposable) {
        return new Disposable(config.dataset.map(format))
    } else if (config.type === DistributionType.Exponential) {
        return new Exponential(format(config.offset), format(config.lambda))
    } else if (config.type === DistributionType.Hypergeometric) {
        return new Hypergeometric(config.range.map(format), config.N, config.M, config.n)
    } else if (config.type === DistributionType.Normal) {
        return new Normal(format(config.u), format(config.sigma))
    } else if (config.type === DistributionType.Standard) {
        return new Standard(config.range.map(format), config.p)
    } else if (config.type === DistributionType.Uniform) {
        return config.range
            ? new Uniform(config.range.map(format))
            : new Uniform(format(config.begin), format(config.end))
    } else return new DistributionConstructor()
}
export const Distribution = {
    Cauchy,
    Compound,
    Disposable,
    Exponential,
    Standard,
    Uniform,
    Normal,
    Hypergeometric
}
export {
    DistributionType,
    DistributionConstructor,
    Cauchy,
    Compound,
    Disposable,
    Exponential,
    Hypergeometric,
    Normal,
    Standard,
    Uniform
}
