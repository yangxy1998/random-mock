import { Compound } from './Compound'
import { Exponential } from './Exponential'
import { Standard } from './Standard'
import { Uniform } from './Uniform'
import { Normal } from './Normal'
import { Cauchy } from './Cauchy'
import { Hypergeometric } from './Hypergeometric'
import { Disposable } from './Disposable'
import { DistributionConstructor } from './Distribution'
export type Distribution = (format: (source: any) => any) => DistributionConstructor
export default {
    Cauchy: (x0: any, theta: any): Distribution => {
        return (format = (source: any) => source) => {
            x0 = format(x0)
            theta = format(theta)
            return new Cauchy(x0, theta)
        }
    },
    Compound: (config: any): Distribution => {
        return (format = (source: any) => source) => {
            config = format(config)
            return new Compound(config)
        }
    },
    Disposable: (dataset: any[]): Distribution => {
        return (format = (source: any) => source) => {
            dataset = dataset.map(format)
            return new Disposable(dataset)
        }
    },
    Exponential: (offset: any, lambda: any): Distribution => {
        return (format = (source: any) => source) => {
            offset = format(offset)
            lambda = format(lambda)
            return new Exponential(offset, lambda)
        }
    },
    Standard: (range: any[], p?: number[]): Distribution => {
        return (format = (source: any) => source) => {
            range = range.map(format)
            return new Standard(range, p)
        }
    },
    Uniform: (range: [any, any]): Distribution => {
        return (format = (source: any) => source) => {
            range[0] = format(range[0])
            range[1] = format(range[1])
            return new Uniform(range)
        }
    },
    Normal: (u: any, sigma: any): Distribution => {
        return (format = (source: any) => source) => {
            u = format(u)
            sigma = format(sigma)
            return new Normal(u, sigma)
        }
    },
    Hypergeometric: (range: any[], N: any, M: any, n: any): Distribution => {
        return (format = (source: any) => source) => {
            N = format(N)
            M = format(M)
            n = format(n)
            return new Hypergeometric(range, N, M, n)
        }
    }
}
export {
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
